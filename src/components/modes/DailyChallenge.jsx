import { useState, useEffect } from 'react';
import { Fire, CheckCircle, Clock } from '@phosphor-icons/react';
import { MODE_THEMES } from '../../themes/modeThemes';
import { DAILY_CHALLENGES } from '../../data/dailyChallenges';
import { useDatabase } from '../../hooks/useDatabase';
import {
  getStreakInfo, updateStreak, isChallengeCompletedToday,
  saveChallengeCompletion, getChallengeHistory, getOverallProgress
} from '../../utils/database';
import { scoreQuestion, getTodaysChallenge } from '../../utils/scoring';
import { getTodayString, getHoursUntilMidnight } from '../../utils/dateHelpers';
import { awardXP, XP_RULES } from '../../engine/xpSystem';
import { updateQuestProgress } from '../../engine/dailyQuests';
import { checkAchievements } from '../../engine/achievements';
import ModeHeader from '../layout/ModeHeader';
import Button from '../common/Button';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Confetti from '../common/Confetti';
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

export default function DailyChallenge() {
  const { db, isReady } = useDatabase();
  const [challenge, setChallenge] = useState(null);
  const [response, setResponse] = useState('');
  const [completed, setCompleted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [history, setHistory] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hoursLeft, setHoursLeft] = useState(getHoursUntilMidnight());

  useEffect(() => {
    const today = getTodaysChallenge(DAILY_CHALLENGES);
    setChallenge(today);

    if (!isReady || !db) return;

    const todayStr = getTodayString();
    const done = isChallengeCompletedToday(db, todayStr);
    setCompleted(done);

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

  const handleSubmit = () => {
    if (!db || !response.trim() || !challenge) return;

    const todayStr = getTodayString();
    saveChallengeCompletion(db, todayStr, challenge.type, challenge.title, response);

    let newStreak = 0;
    try {
      newStreak = updateStreak(db, todayStr);
      awardXP(db, 'daily_challenge', XP_RULES.dailyChallenge(), `Daily: ${challenge.title}`);
      if (newStreak > 0) {
        awardXP(db, 'streak', XP_RULES.streakBonus(newStreak), `${newStreak}-day streak`);
      }
      updateQuestProgress(db, 'daily_challenge');
      updateQuestProgress(db, 'streak');
      checkAchievements(db, getOverallProgress(db));
    } catch (err) {
      console.error('Engine error during challenge completion:', err);
    }

    setStreak(newStreak);
    setCompleted(true);
    setShowConfetti(true);
    setHistory(getChallengeHistory(db, 7));
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
      const isActive = i < info.currentStreak || (isToday && completed);
      days.push({ dayLabel, isToday, isActive });
    }
    return days;
  };

  const streakCalendar = getStreakCalendar();
  const challengeColor = challenge ? (CHALLENGE_TYPE_COLORS[challenge.type] || theme.primary) : theme.primary;

  return (
    <div className="daily-mode">
      <ModeHeader theme={theme} title="Daily Challenge" subtitle="One question, every day" />
      <Confetti active={showConfetti} />

      <div className="daily-content">
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
          {streakCalendar.map((day, i) => (
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

        {completed ? (
          <div className="daily-completed animate-fade-in">
            <CheckCircle size={56} weight="fill" color="#10B981" />
            <h2>Challenge Complete!</h2>
            <p>Great work! Come back tomorrow for a new challenge.</p>
          </div>
        ) : challenge ? (
          <div className="daily-challenge-card animate-fade-in">
            <div className="challenge-type-row">
              <Badge text={challenge.type} color={challengeColor} variant="soft" size="sm" />
              {challenge.skillCategory && (
                <Badge text={challenge.skillCategory} color="var(--text-muted)" variant="outlined" size="sm" />
              )}
            </div>
            <h2>{challenge.title}</h2>
            <p className="challenge-desc">{challenge.description}</p>

            <div className="challenge-prompt">
              <strong>Your task:</strong>
              <p>{challenge.prompt}</p>
            </div>

            {challenge.example && (
              <div className="challenge-example">
                <strong>Example:</strong>
                <p>{challenge.example}</p>
              </div>
            )}

            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Write your response here..."
              rows={4}
            />

            <Button
              variant="mode"
              modeColor={theme.primary}
              onClick={handleSubmit}
              disabled={!response.trim()}
            >
              Complete Challenge
            </Button>
          </div>
        ) : null}

        {history.length > 0 && (
          <div className="challenge-history">
            <h3>Recent Challenges</h3>
            {history.map((h, i) => (
              <Card key={i} padding="sm">
                <div className="history-item">
                  <div className="history-meta">
                    <Badge text={h.type} color={CHALLENGE_TYPE_COLORS[h.type] || theme.primary} variant="soft" size="sm" />
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
