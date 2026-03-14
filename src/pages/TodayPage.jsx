import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lightning, Fire, Gift, Target, Sparkle, Lightbulb, BookOpen, ArrowRight, Eye, SquaresFour } from '@phosphor-icons/react';
import { useDatabase } from '../hooks/useDatabase';
import { useXP } from '../hooks/useXP';
import { getStreakInfo, isChallengeCompletedToday, getOverallProgress, getChallengeHistory, queryStmt } from '../utils/database';
import { getTimeOfDayGreeting, getTodayString, getHoursUntilMidnight, daysAgo } from '../utils/dateHelpers';
import { generateDailyQuests, allQuestsCompleted as checkAllQuests } from '../engine/dailyQuests';
import { awardXP, XP_RULES } from '../engine/xpSystem';
import { getRecommendations, getRecommendedMode } from '../engine/recommendations';
import { getDailyInsight, CATEGORY_COLORS } from '../data/dailyInsights';
import { LESSONS } from '../data/lessons';
import ProgressBar from '../components/common/ProgressBar';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Confetti from '../components/common/Confetti';
import './TodayPage.css';

const MODE_PATHS = {
  practice: '/mode/practice',
  learn: '/mode/learn',
  review: '/mode/review',
  daily: '/mode/daily',
  pattern: '/mode/pattern',
  simulate: '/mode/simulate',
};

const MODE_LABELS = {
  practice: 'Practice Mode',
  learn: 'Learn Mode',
  review: 'Review Mode',
  daily: 'Daily Challenge',
  pattern: 'Pattern Mode',
  simulate: 'Simulate Mode',
};

// Default mode suggestions for new users — no hardcoded lesson links
const NEW_USER_MODES = [
  {
    title: 'Daily Challenge',
    reason: 'Build your questioning reflex — 60 seconds a day',
    color: '#10B981',
    Icon: Lightning,
    path: '/mode/daily',
  },
  {
    title: 'Pattern Mode',
    reason: 'Discover how you read people and situations',
    color: '#8B5CF6',
    Icon: Eye,
    path: '/mode/pattern',
  },
  {
    title: 'Practice Mode',
    reason: 'Rewrite real questions and get instant AI feedback',
    color: '#EF4444',
    Icon: Target,
    path: '/mode/practice',
  },
];

export default function TodayPage() {
  const { db, isReady } = useDatabase();
  const { level } = useXP();
  const navigate = useNavigate();
  const location = useLocation();
  const [streak, setStreak] = useState(0);
  const [lastDate, setLastDate] = useState(null);
  const [lastActivity, setLastActivity] = useState(null);
  const [nextMode, setNextMode] = useState(null);
  const [engineQuests, setEngineQuests] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    if (!isReady || !db) return;

    const info = getStreakInfo(db);
    setStreak(info.currentStreak);
    setLastDate(info.lastChallengeDate);

    // Last activity for progress card
    const history = getChallengeHistory(db, 1);
    setLastActivity(history.length > 0 ? history[0] : null);

    // Next recommended mode
    setNextMode(getRecommendedMode(db));

    // Generate daily quests from engine
    const quests = generateDailyQuests(db);
    setEngineQuests(quests);

    // Get recommendations
    setRecommendations(getRecommendations(db));

    // Check if all quests are done for confetti + bonus XP (once per day)
    if (checkAllQuests(db)) {
      setShowConfetti(true);
      try {
        const today = getTodayString();
        const alreadyAwarded = queryStmt(db,
          "SELECT 1 FROM xp_log WHERE activity_type = 'all_quests_completed' AND date(created_at) = ?",
          [today]
        );
        if (alreadyAwarded.length === 0) {
          awardXP(db, 'all_quests_completed', XP_RULES.allQuestsBonus(), 'Completed all daily quests');
        }
      } catch (err) {
        console.error('Failed to award quest bonus XP:', err);
      }
    }
  }, [db, isReady, location.key]);

  const greeting = getTimeOfDayGreeting();
  const hoursLeft = getHoursUntilMidnight();
  const dailyInsight = getDailyInsight();
  const insightColor = CATEGORY_COLORS[dailyInsight.category] || '#6B7280';

  // Build streak calendar (last 7 days)
  const getStreakCalendar = () => {
    const days = [];
    const today = new Date();
    const streakEndDate = lastDate ? new Date(lastDate) : null;
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayLabel = d.toLocaleDateString('en', { weekday: 'narrow' });
      const isToday = i === 0;
      let isActive = false;
      if (streakEndDate && streak > 0) {
        const daysFromEnd = Math.floor((streakEndDate - d) / (1000 * 60 * 60 * 24));
        isActive = daysFromEnd >= 0 && daysFromEnd < streak;
      }
      days.push({ dateStr, dayLabel, isToday, isActive });
    }
    return days;
  };

  const QUEST_COLORS = {
    practice: '#EF4444',
    lesson: '#F59E0B',
    journal: '#06B6D4',
    daily_challenge: '#10B981',
    review: '#3B82F6',
    simulation: '#8B5CF6',
    streak: '#F97316',
  };

  const QUEST_PATHS = {
    practice: '/mode/practice',
    lesson: '/mode/learn',
    journal: '/journal',
    daily_challenge: '/mode/daily',
    review: '/mode/review',
    simulation: '/mode/simulate',
    streak: '/mode/daily',
  };

  const dailyQuests = engineQuests.map(q => ({
    id: q.id,
    label: q.quest_description,
    value: q.progress || 0,
    max: q.goal || 1,
    xp: q.xp_reward,
    color: QUEST_COLORS[q.quest_type] || '#6B7280',
    path: QUEST_PATHS[q.quest_type] || '/mode/practice',
    completed: q.completed === 1,
  }));

  const allQuestsDone = dailyQuests.length > 0 && dailyQuests.every(q => q.completed);
  const streakCalendar = getStreakCalendar();

  // Navigate to lesson from daily insight
  const handleInsightTap = () => {
    const lessonIndex = LESSONS.findIndex(l => l.id === dailyInsight.lessonId);
    navigate('/mode/learn', { state: { lessonIndex: lessonIndex >= 0 ? lessonIndex : 0 } });
  };

  // Build recommendation reason text and route for returning users
  const getRecInfo = (rec) => {
    let reason = '';
    let path = '/mode/practice';
    let Icon = Target;

    if (rec.isWeak && rec.isStale) {
      reason = `${rec.category} needs review — ${rec.staleDays} days since last session`;
      path = '/mode/learn';
      Icon = BookOpen;
    } else if (rec.isNew) {
      reason = `You haven't tried ${rec.category} yet — discover your level`;
      path = '/mode/practice';
      Icon = Target;
    } else if (rec.isWeak) {
      reason = `${rec.category} is at ${rec.avg}% — practice will push it higher`;
      path = '/mode/practice';
      Icon = Target;
    } else if (rec.isStale) {
      reason = `${rec.category} is getting rusty — quick review will lock it in`;
      path = '/mode/review';
      Icon = BookOpen;
    }

    return { reason, path, Icon };
  };

  // XP numbers for progress card
  const xpCurrent = level.totalXP - (level.xpRequired || 0);
  const xpNeeded = level.nextLevel
    ? level.nextLevel.xpRequired - (level.xpRequired || 0)
    : null;

  return (
    <div className="today-page animate-fade-in">
      <Confetti active={showConfetti} />

      <div className="today-header">
        <div>
          <h1>{greeting}</h1>
          <p className="today-subtitle">Your daily quests await</p>
        </div>
        <div className="streak-pill">
          <Fire size={18} weight="fill" color="#F59E0B" />
          <span>{streak}</span>
        </div>
      </div>

      {/* Progress Card — replaces mascot */}
      <Card className="progress-card" padding="md">
        <div className="progress-card-top">
          <div className="progress-level-info">
            <span className="progress-level-num">Level {level.level}</span>
            <span className="progress-level-name">{level.name}</span>
          </div>
          {xpNeeded && (
            <span className="progress-xp-text">{xpCurrent} / {xpNeeded} XP</span>
          )}
        </div>
        <ProgressBar
          value={Math.round(level.progress * 100)}
          max={100}
          color="var(--xp-color)"
          size="sm"
          animate
        />
        <div className="progress-card-footer">
          <span className="progress-last-activity">
            {lastActivity
              ? `Last: ${lastActivity.type} · ${daysAgo(lastActivity.date)}`
              : 'No activity yet — pick a mode below to start'
            }
          </span>
          {nextMode && (
            <button
              className="progress-continue-btn"
              onClick={() => navigate(MODE_PATHS[nextMode.mode] || '/modes')}
            >
              Continue: {MODE_LABELS[nextMode.mode]}
              <ArrowRight size={13} weight="bold" />
            </button>
          )}
        </div>
      </Card>

      {/* Daily Insight */}
      <Card className="daily-insight-card" padding="md" onClick={handleInsightTap}>
        <div className="insight-header">
          <Lightbulb size={20} weight="fill" color={insightColor} />
          <span className="insight-label">Daily Insight</span>
          <Badge text={dailyInsight.category} color={insightColor} variant="soft" size="sm" />
        </div>
        <h3 className="insight-title">{dailyInsight.title}</h3>
        <p className="insight-body">{dailyInsight.explanation}</p>
        <div className="insight-example">
          <span className="insight-example-label">Try this:</span>
          <span className="insight-example-text">{dailyInsight.exampleQuestion}</span>
        </div>
        <div className="insight-cta">
          <BookOpen size={16} weight="duotone" color={insightColor} />
          <span>Read the full lesson</span>
          <ArrowRight size={14} weight="bold" color={insightColor} />
        </div>
      </Card>

      {/* Streak Calendar */}
      <div className="streak-calendar">
        {streakCalendar.map((day) => (
          <div key={day.dateStr} className={`streak-day${day.isActive ? ' active' : ''}${day.isToday ? ' today' : ''}`}>
            <span className="streak-day-label">{day.dayLabel}</span>
            <div className="streak-dot" />
          </div>
        ))}
      </div>

      <div className="quests-section">
        <div className="quests-title">
          <Lightning size={20} weight="fill" color="#F59E0B" />
          <h2>Daily Quests</h2>
          <span className="quests-timer">{hoursLeft}h left</span>
        </div>

        {dailyQuests.map((quest) => (
          <Card key={quest.id || quest.label} padding="md" onClick={() => navigate(quest.path)}>
            <div className="quest-row">
              <div className="quest-info">
                <span className="quest-label">{quest.label}</span>
                <ProgressBar
                  value={quest.value}
                  max={quest.max}
                  color={quest.color}
                  size="sm"
                  animate
                />
              </div>
              <div className="quest-reward">
                {quest.completed ? (
                  <Gift size={24} weight="fill" color={quest.color} />
                ) : (
                  <span className="quest-xp">+{quest.xp} XP</span>
                )}
              </div>
            </div>
          </Card>
        ))}

        {allQuestsDone && (
          <div className="quests-complete animate-scale-in">
            All quests complete! +25 XP bonus
          </div>
        )}
      </div>

      {/* Recommended for You */}
      <div className="recommendations-section">
        <div className="recommendations-title">
          <Sparkle size={20} weight="fill" color="#8B5CF6" />
          <h2>Play Next</h2>
        </div>

        {(!recommendations || recommendations.recommended.length === 0) ? (
          // New user — suggest modes directly, not specific lessons
          NEW_USER_MODES.map(({ title, reason, color, Icon, path }) => (
            <Card key={title} padding="md" onClick={() => navigate(path)}>
              <div className="rec-card">
                <div className="rec-icon" style={{ background: `${color}18` }}>
                  <Icon size={22} weight="duotone" color={color} />
                </div>
                <div className="rec-content">
                  <span className="rec-title">{title}</span>
                  <span className="rec-reason">{reason}</span>
                </div>
                <ArrowRight size={18} color="var(--text-muted)" />
              </div>
            </Card>
          ))
        ) : (
          recommendations.recommended.slice(0, 3).map((rec) => {
            const color = CATEGORY_COLORS[rec.category] || '#6B7280';
            const { reason, path, Icon } = getRecInfo(rec);

            return (
              <Card key={rec.category} padding="md" onClick={() => navigate(path)}>
                <div className="rec-card">
                  <div className="rec-icon" style={{ background: `${color}18` }}>
                    <Icon size={22} weight="duotone" color={color} />
                  </div>
                  <div className="rec-content">
                    <div className="rec-title-row">
                      <span className="rec-title">Work on {rec.category}</span>
                      {rec.avg > 0 && <Badge text={`${rec.avg}%`} color={color} variant="soft" size="sm" />}
                    </div>
                    <span className="rec-reason">{reason}</span>
                  </div>
                  <ArrowRight size={18} color="var(--text-muted)" />
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
