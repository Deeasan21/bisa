import { useState, useEffect, useRef } from 'react';
import { Fire, CheckCircle, Clock, Timer, PaperPlaneTilt, Sparkle, Robot } from '@phosphor-icons/react';
import { MODE_THEMES } from '../../themes/modeThemes';
import { DAILY_CHALLENGES } from '../../data/dailyChallenges';
import { BURST_CHALLENGES, getTodaysBurst } from '../../data/burstChallenges';
import { scoreBurst } from '../../engine/burstScorer';
import { getCurrentTier } from '../../engine/adaptiveDifficulty';
import { hasApiKey } from '../../services/claudeApi';
import { getAIBurstCoaching } from '../../engine/aiBurstCoaching';
import { useDatabase } from '../../hooks/useDatabase';
import {
  getStreakInfo, updateStreak, isChallengeCompletedToday,
  saveBurstCompletion, getChallengeHistory, getOverallProgress
} from '../../utils/database';
import { getTodayString, getHoursUntilMidnight } from '../../utils/dateHelpers';
import { awardXP, XP_RULES } from '../../engine/xpSystem';
import { updateQuestProgress } from '../../engine/dailyQuests';
import { checkAchievements } from '../../engine/achievements';
import ModeHeader from '../layout/ModeHeader';
import Button from '../common/Button';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Confetti from '../common/Confetti';
import MascotMessage from '../common/MascotMessage';
import ScoreGauge from '../common/ScoreGauge';
import ProgressBar from '../common/ProgressBar';
import XPToast from '../common/XPToast';
import Skeleton from '../common/Skeleton';
import AchievementToast from '../common/AchievementToast';
import './DailyChallenge.css';

const theme = MODE_THEMES.daily;

const CHALLENGE_TYPE_COLORS = {
  'Open Question Practice': '#EF4444',
  'Curiosity Challenge': '#F59E0B',
  'Follow-up Focus': '#3B82F6',
  'Silence Practice': '#8B5CF6',
  'Self-Reflection': '#06B6D4',
  'Clarifying Practice': '#F59E0B',
  'Assumption Check': '#10B981',
  'Spot the Judgment': '#EC4899',
  'Depth Ladder': '#8B5CF6',
  'Cultural Lens': '#14B8A6',
  'Empathy Stretch': '#EC4899',
  'Power Reversal': '#6366F1',
  'Silence Challenge': '#8B5CF6',
};

function getTimerDuration(tier) {
  if (tier <= 2) return 60;
  if (tier === 3) return 90;
  return 120;
}

export default function DailyChallenge() {
  const { db, isReady } = useDatabase();
  const [phase, setPhase] = useState('ready');        // ready | burst | results | completed
  const [scenario, setScenario] = useState(null);      // today's burst scenario
  const [questions, setQuestions] = useState([]);       // submitted question strings
  const [currentInput, setCurrentInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [burstResults, setBurstResults] = useState(null);
  const [xpAwarded, setXpAwarded] = useState(0);
  const [showXPToast, setShowXPToast] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [history, setHistory] = useState([]);
  const [hoursLeft, setHoursLeft] = useState(getHoursUntilMidnight());
  const [aiCoaching, setAiCoaching] = useState(null);
  const [aiCoachingLoading, setAiCoachingLoading] = useState(false);
  const [newAchievement, setNewAchievement] = useState(null);
  const inputRef = useRef(null);
  const streamRef = useRef(null);

  // Load scenario and check completion on mount
  useEffect(() => {
    const todaysBurst = getTodaysBurst();
    setScenario(todaysBurst);

    if (!isReady || !db) return;

    const todayStr = getTodayString();
    const done = isChallengeCompletedToday(db, todayStr);
    if (done) {
      setPhase('completed');
    }

    const info = getStreakInfo(db);
    setStreak(info.currentStreak);
    setLongestStreak(info.longestStreak);

    setHistory(getChallengeHistory(db, 7));
  }, [db, isReady]);

  // Update countdown every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setHoursLeft(getHoursUntilMidnight());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Burst timer countdown
  useEffect(() => {
    if (phase !== 'burst' || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleBurstEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, timeLeft]);

  // Auto-scroll question stream
  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.scrollTop = streamRef.current.scrollHeight;
    }
  }, [questions]);

  const handleStartBurst = () => {
    const tier = db ? getCurrentTier(db, scenario?.skillCategory || 'Open vs. Closed') : 1;
    const duration = getTimerDuration(tier);
    setTimeLeft(duration);
    setQuestions([]);
    setPhase('burst');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSubmitQuestion = () => {
    if (!currentInput.trim()) return;
    setQuestions(prev => [...prev, currentInput.trim()]);
    setCurrentInput('');
    inputRef.current?.focus();
  };

  const handleBurstEnd = () => {
    if (questions.length === 0) {
      setPhase('ready');
      return;
    }
    const results = scoreBurst(questions, scenario);
    setBurstResults(results);

    // Save and award XP
    const todayStr = getTodayString();
    let newStreak = 0;
    try {
      saveBurstCompletion(db, todayStr, 'Question Burst', scenario.character + ': ' + scenario.situation.slice(0, 50), questions, results.totalScore);
      newStreak = updateStreak(db, todayStr);
      const xp = XP_RULES.dailyChallenge(results.totalScore);
      awardXP(db, 'daily_challenge', xp, `Burst: ${scenario.character} (${results.totalScore})`);
      setXpAwarded(xp);
      if (newStreak > 0) {
        awardXP(db, 'streak', XP_RULES.streakBonus(newStreak), `${newStreak}-day streak`);
      }
      updateQuestProgress(db, 'daily_challenge');
      updateQuestProgress(db, 'streak');
      const { newlyUnlocked } = checkAchievements(db, getOverallProgress(db));
      if (newlyUnlocked.length > 0) setNewAchievement(newlyUnlocked[0]);
    } catch (err) {
      console.error('Engine error during burst completion:', err);
    }

    setStreak(newStreak);
    setPhase('results');
    setShowXPToast(true);
    if (results.totalScore >= 70) {
      setShowConfetti(true);
    }
    setHistory(getChallengeHistory(db, 7));

    // Trigger AI coaching if available
    if (hasApiKey()) {
      setAiCoachingLoading(true);
      getAIBurstCoaching(questions, scenario, results)
        .then(coaching => setAiCoaching(coaching))
        .catch(() => {}) // Silent fail — rule-based results are complete
        .finally(() => setAiCoachingLoading(false));
    }
  };

  const handleDone = () => {
    setPhase('completed');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitQuestion();
    }
  };

  const getMascotEmotion = (score) => {
    if (score >= 80) return 'celebrating';
    if (score >= 60) return 'happy';
    if (score >= 40) return 'encouraging';
    return 'thinking';
  };

  // Build streak calendar
  const getStreakCalendar = () => {
    const days = [];
    const today = new Date();
    const info = db ? getStreakInfo(db) : { lastChallengeDate: null, currentStreak: 0 };
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dayLabel = d.toLocaleDateString('en', { weekday: 'narrow' });
      const isToday = i === 0;
      const isActive = i < info.currentStreak || (isToday && phase === 'completed');
      days.push({ dayLabel, isToday, isActive });
    }
    return days;
  };

  return (
    <div className="daily-mode">
      <ModeHeader theme={theme} title="Daily Challenge" subtitle="Question Burst" />
      <Confetti active={showConfetti} />
      <XPToast amount={xpAwarded} visible={showXPToast} onDone={() => setShowXPToast(false)} />
      <AchievementToast achievementId={newAchievement} visible={!!newAchievement} onDone={() => setNewAchievement(null)} />

      <div className="daily-content">
        {/* Streak display — always visible in ready + completed */}
        {(phase === 'ready' || phase === 'completed') && (
          <>
            <div className="streak-display">
              <div className="streak-current">
                <Fire size={28} weight="fill" color="#F59E0B" />
                <div>
                  <span className="streak-number">{streak}</span>
                  <span className="streak-label">day streak</span>
                </div>
              </div>
              <div className="streak-best">
                <span className="streak-best-label">Best</span>
                <span className="streak-best-number">{longestStreak}</span>
              </div>
            </div>

            {/* Streak Calendar */}
            <div className="daily-streak-calendar">
              {getStreakCalendar().map((day, i) => (
                <div key={i} className={`daily-streak-day${day.isActive ? ' active' : ''}${day.isToday ? ' today' : ''}`}>
                  <span className="daily-streak-day-label">{day.dayLabel}</span>
                  <div className="daily-streak-dot" />
                </div>
              ))}
            </div>

            {/* Countdown */}
            <div className="daily-countdown">
              <Clock size={14} color="var(--text-muted)" />
              <span>New challenge in {hoursLeft}h</span>
            </div>
          </>
        )}

        {/* PHASE: READY */}
        {phase === 'ready' && scenario && (
          <div className="burst-ready animate-fade-in">
            <Card padding="md">
              <div className="challenge-type-row">
                <Badge text="Question Burst" color="#10B981" variant="soft" size="sm" />
                <Badge text={scenario.skillCategory} color="var(--text-muted)" variant="outlined" size="sm" />
                <Badge text={scenario.difficultyTier} color={scenario.difficultyTier === 'advanced' ? '#8B5CF6' : scenario.difficultyTier === 'intermediate' ? '#3B82F6' : '#10B981'} variant="outlined" size="sm" />
              </div>
              <h2 className="burst-character">{scenario.character}</h2>
              <p className="burst-role">{scenario.role}</p>
              <p className="burst-situation">{scenario.situation}</p>
              <div className="burst-timer-preview">
                <Timer size={16} color="#10B981" />
                <span>You'll have {getTimerDuration(db ? getCurrentTier(db, scenario.skillCategory) : 1)}s to ask as many questions as you can</span>
              </div>
            </Card>
            <Button variant="mode" modeColor="#10B981" onClick={handleStartBurst}>
              Start Burst
            </Button>
          </div>
        )}

        {/* PHASE: BURST */}
        {phase === 'burst' && (
          <div className="burst-active">
            {/* Timer bar */}
            <div className={`burst-timer-bar${timeLeft <= 10 ? ' pulse-red' : ''}`}>
              <Timer size={18} weight="bold" />
              <span className="burst-timer-text">{timeLeft}s</span>
              <span className="burst-question-count">{questions.length} questions</span>
            </div>

            {/* Scenario reminder */}
            <div className="burst-scenario-reminder">
              <strong>{scenario.character}</strong> — {scenario.situation.slice(0, 80)}...
            </div>

            {/* Question stream */}
            <div className="burst-question-stream" ref={streamRef}>
              {questions.map((q, i) => (
                <div key={i} className="burst-question-item animate-fade-in">
                  <span className="burst-question-number">{i + 1}</span>
                  <span className="burst-question-text">{q}</span>
                </div>
              ))}
              {questions.length === 0 && (
                <p className="burst-empty-hint">Start typing your questions below...</p>
              )}
            </div>

            {/* Input area */}
            <div className="burst-input-area">
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question..."
                className="burst-input"
                autoFocus
              />
              <button
                className="burst-send"
                onClick={handleSubmitQuestion}
                disabled={!currentInput.trim()}
              >
                <PaperPlaneTilt size={18} weight="bold" />
              </button>
            </div>
          </div>
        )}

        {/* PHASE: RESULTS */}
        {phase === 'results' && burstResults && (
          <div className="burst-results animate-fade-in">
            <MascotMessage
              message={
                burstResults.totalScore >= 80
                  ? `Amazing! ${burstResults.scoredQuestions.length} questions and they were sharp!`
                  : burstResults.totalScore >= 60
                  ? `Nice work! You asked ${burstResults.scoredQuestions.length} thoughtful questions.`
                  : burstResults.totalScore >= 40
                  ? `Good effort! ${burstResults.scoredQuestions.length} questions — keep building that skill.`
                  : `${burstResults.scoredQuestions.length} questions down! Every burst gets you better.`
              }
              emotion={getMascotEmotion(burstResults.totalScore)}
            />

            <ScoreGauge score={burstResults.totalScore} />

            <div className="burst-summary-card">
              <div className="burst-summary-stats">
                <span><strong>{burstResults.scoredQuestions.length}</strong> questions</span>
                <span><strong>{burstResults.openRatio}%</strong> open</span>
              </div>

              {burstResults.techniquesDetected.length > 0 && (
                <div className="burst-techniques">
                  {burstResults.techniquesDetected.map(t => (
                    <Badge key={t} text={t} color="#10B981" variant="soft" size="sm" />
                  ))}
                </div>
              )}

              {burstResults.strongestQuestion && (
                <div className="burst-strongest">
                  <span className="burst-strongest-label">Strongest question</span>
                  <p>"{burstResults.strongestQuestion.text}"</p>
                </div>
              )}

              <p className="burst-coaching-tip">{burstResults.coachingTip}</p>
            </div>

            <div className="burst-breakdown">
              <h3>Breakdown</h3>
              <ProgressBar value={burstResults.breakdown.variety} label="Variety" color="#10B981" showPercent size="sm" />
              <ProgressBar value={burstResults.breakdown.depth} label="Depth" color="#3B82F6" showPercent size="sm" />
              <ProgressBar value={burstResults.breakdown.techniques} label="Techniques" color="#8B5CF6" showPercent size="sm" />
              <ProgressBar value={burstResults.breakdown.quality} label="Quality" color="#F59E0B" showPercent size="sm" />
            </div>

            {/* AI Coaching Section */}
            {aiCoachingLoading && (
              <div className="burst-ai-coaching animate-fade-in">
                <div className="burst-ai-header">
                  <Robot size={16} weight="duotone" />
                  <span>AI Coach is analyzing your questions...</span>
                </div>
                <Skeleton height={14} width="90%" />
                <Skeleton height={14} width="75%" />
                <Skeleton height={14} width="60%" />
              </div>
            )}

            {aiCoaching && (
              <div className="burst-ai-coaching animate-fade-in">
                <div className="burst-ai-header">
                  <Sparkle size={16} weight="fill" color="#8B5CF6" />
                  <span>AI Coach Insights</span>
                </div>

                <p className="burst-ai-insight">{aiCoaching.overallInsight}</p>

                <div className="burst-ai-group strength">
                  <h5>Your Strength</h5>
                  <p>{aiCoaching.topStrength}</p>
                </div>

                <div className="burst-ai-group growth">
                  <h5>Growth Area</h5>
                  <p>{aiCoaching.growthArea}</p>
                </div>

                {aiCoaching.rewriteExample && (
                  <div className="burst-ai-rewrite">
                    <span className="burst-ai-label">Try this rewrite:</span>
                    <div className="burst-ai-rewrite-original">
                      <span>Your version:</span>
                      <p>"{aiCoaching.rewriteExample.original}"</p>
                    </div>
                    <div className="burst-ai-rewrite-improved">
                      <span>Stronger version:</span>
                      <p>"{aiCoaching.rewriteExample.improved}"</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Upsell when no API key */}
            {!hasApiKey() && (
              <div className="burst-ai-upsell animate-fade-in">
                <Robot size={16} weight="duotone" color="#8B5CF6" />
                <p>Want personalized coaching? Add your API key in <strong>Settings</strong> on your Profile page.</p>
              </div>
            )}

            <Button variant="mode" modeColor="#10B981" onClick={handleDone}>
              Done
            </Button>
          </div>
        )}

        {/* PHASE: COMPLETED */}
        {phase === 'completed' && (
          <div className="daily-completed animate-fade-in">
            <CheckCircle size={56} weight="fill" color="#10B981" />
            <h2>Challenge Complete!</h2>
            <p>Great work! Come back tomorrow for a new challenge.</p>
          </div>
        )}

        {/* History — visible in ready + completed */}
        {(phase === 'ready' || phase === 'completed') && history.length > 0 && (
          <div className="challenge-history">
            <h3>Recent Challenges</h3>
            {history.map((h, i) => (
              <Card key={i} padding="sm">
                <div className="history-item">
                  <div className="history-meta">
                    <Badge
                      text={h.format === 'burst' ? 'Question Burst' : h.type}
                      color={h.format === 'burst' ? '#10B981' : (CHALLENGE_TYPE_COLORS[h.type] || theme.primary)}
                      variant="soft"
                      size="sm"
                    />
                    {h.format === 'burst' && h.score > 0 && (
                      <Badge text={`${h.score}pts`} color="#10B981" variant="outlined" size="sm" />
                    )}
                    <span className="history-date">{h.date}</span>
                  </div>
                  <p className="history-title">{h.title}</p>
                  <p className="history-response">{h.response}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
