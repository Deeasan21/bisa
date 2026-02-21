import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightning, Fire, Gift, Target, Sparkle, Lightbulb, BookOpen, ArrowRight, Barbell } from '@phosphor-icons/react';
import { useDatabase } from '../hooks/useDatabase';
import { getStreakInfo, isChallengeCompletedToday, getOverallProgress } from '../utils/database';
import { getTimeOfDayGreeting, getTodayString, getHoursUntilMidnight } from '../utils/dateHelpers';
import { generateDailyQuests, allQuestsCompleted as checkAllQuests, QUEST_TYPE_TO_MODE } from '../engine/dailyQuests';
import { getRecommendedMode, getRecommendations } from '../engine/recommendations';
import { getDailyInsight, CATEGORY_COLORS } from '../data/dailyInsights';
import { LESSONS } from '../data/lessons';
import MascotMessage from '../components/common/MascotMessage';
import ProgressBar from '../components/common/ProgressBar';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Confetti from '../components/common/Confetti';
import './TodayPage.css';

export default function TodayPage() {
  const { db, isReady } = useDatabase();
  const navigate = useNavigate();
  const [streak, setStreak] = useState(0);
  const [lastDate, setLastDate] = useState(null);
  const [engineQuests, setEngineQuests] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    if (!isReady || !db) return;

    const info = getStreakInfo(db);
    setStreak(info.currentStreak);
    setLastDate(info.lastChallengeDate);

    // Generate daily quests from engine
    const quests = generateDailyQuests(db);
    setEngineQuests(quests);

    // Get recommendations
    setRecommendations(getRecommendations(db));

    // Check if all quests are done for confetti
    if (checkAllQuests(db)) {
      setShowConfetti(true);
    }
  }, [db, isReady]);

  const greeting = getTimeOfDayGreeting();
  const hoursLeft = getHoursUntilMidnight();
  const dailyInsight = getDailyInsight();
  const insightColor = CATEGORY_COLORS[dailyInsight.category] || '#6B7280';

  // Context-aware mascot based on absence, recommendations, and daily insight
  const getMascotMessage = () => {
    // Brand new user: no activity
    if (!lastDate && (!recommendations || recommendations.recommended.length === 0)) {
      return `Welcome! Today's insight is about ${dailyInsight.category}. Tap the card below to learn!`;
    }

    // Long absence
    if (lastDate) {
      const today = new Date(getTodayString());
      const last = new Date(lastDate);
      const daysSince = Math.floor((today - last) / (1000 * 60 * 60 * 24));
      if (daysSince >= 7) return "Welcome back! It's been a while. No judgment — let's start fresh today!";
      if (daysSince >= 3) return "Hey, I missed you! Ready to pick up where you left off?";
      if (daysSince === 1) return "You were just here yesterday! Let's keep the momentum going.";
    }

    // Returning user with data: reference strengths/weaknesses
    if (recommendations?.strongestCategory && recommendations?.weakestCategory) {
      const strongest = recommendations.strongestCategory.category;
      const weakest = recommendations.weakestCategory.category;
      if (strongest !== weakest) {
        return `You're getting stronger at ${strongest}. Let's work on ${weakest} today!`;
      }
    }

    // Streak-based
    if (streak >= 7) return "You're on fire! A whole week of growth. Keep going!";
    if (streak >= 3) return `${streak}-day streak! You're building a real habit.`;

    // All quests done
    if (engineQuests.length > 0 && engineQuests.every(q => q.completed))
      return "All quests complete! You're a star. Come back tomorrow!";

    return "Ready to sharpen your question skills? Pick a quest below!";
  };

  const getMascotEmotion = () => {
    if (lastDate) {
      const today = new Date(getTodayString());
      const last = new Date(lastDate);
      const daysSince = Math.floor((today - last) / (1000 * 60 * 60 * 24));
      if (daysSince >= 7) return 'encouraging';
      if (daysSince >= 3) return 'happy';
    }
    if (streak >= 7) return 'celebrating';
    if (streak >= 3) return 'happy';
    if (engineQuests.length > 0) return 'encouraging';
    return 'thinking';
  };

  // Build streak calendar (last 7 days)
  const getStreakCalendar = () => {
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayLabel = d.toLocaleDateString('en', { weekday: 'narrow' });
      const isToday = i === 0;
      // Simple heuristic: active if within streak range
      const isActive = lastDate && i < streak;
      days.push({ dateStr, dayLabel, isToday, isActive: isActive || isToday });
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

  // Build recommendation reason text and route
  const getRecInfo = (rec) => {
    let reason = '';
    let path = '/mode/practice';
    let icon = Target;

    if (rec.isWeak && rec.isStale) {
      reason = `${rec.category} needs review — it's been ${rec.staleDays} days`;
      path = '/mode/learn';
      icon = BookOpen;
    } else if (rec.isNew) {
      reason = `You haven't explored ${rec.category} yet`;
      path = '/mode/practice';
      icon = Barbell;
    } else if (rec.isWeak) {
      reason = `${rec.category} is at ${rec.avg}% — practice will help`;
      path = '/mode/practice';
      icon = Target;
    } else if (rec.isStale) {
      reason = `${rec.category} is getting rusty — time to refresh`;
      path = '/mode/review';
      icon = BookOpen;
    }

    return { reason, path, icon };
  };

  return (
    <div className="today-page animate-fade-in">
      <Confetti active={showConfetti} />

      <div className="today-header">
        <div>
          <h1>{greeting}, Questioner</h1>
          <p className="today-subtitle">Your daily quests await</p>
        </div>
        <div className="streak-pill">
          <Fire size={18} weight="fill" color="#F59E0B" />
          <span>{streak}</span>
        </div>
      </div>

      <MascotMessage message={getMascotMessage()} emotion={getMascotEmotion()} />

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
          <h2>Recommended for You</h2>
        </div>

        {(!recommendations || recommendations.recommended.length === 0) ? (
          <>
            <Card padding="md" onClick={() => navigate('/mode/learn')}>
              <div className="rec-card">
                <div className="rec-icon" style={{ background: 'rgba(245, 158, 11, 0.12)' }}>
                  <BookOpen size={22} weight="duotone" color="#F59E0B" />
                </div>
                <div className="rec-content">
                  <span className="rec-title">Start with Lesson 1</span>
                  <span className="rec-reason">Learn why questions matter and how to use them</span>
                </div>
                <ArrowRight size={18} color="var(--text-muted)" />
              </div>
            </Card>
            <Card padding="md" onClick={() => navigate('/mode/practice')}>
              <div className="rec-card">
                <div className="rec-icon" style={{ background: 'rgba(239, 68, 68, 0.12)' }}>
                  <Target size={22} weight="duotone" color="#EF4444" />
                </div>
                <div className="rec-content">
                  <span className="rec-title">Try a Practice Scenario</span>
                  <span className="rec-reason">Rewrite real questions and get instant feedback</span>
                </div>
                <ArrowRight size={18} color="var(--text-muted)" />
              </div>
            </Card>
          </>
        ) : (
          recommendations.recommended.slice(0, 3).map((rec) => {
            const color = CATEGORY_COLORS[rec.category] || '#6B7280';
            const { reason, path, icon: IconComponent } = getRecInfo(rec);

            return (
              <Card key={rec.category} padding="md" onClick={() => navigate(path)}>
                <div className="rec-card">
                  <div className="rec-icon" style={{ background: `${color}18` }}>
                    <IconComponent size={22} weight="duotone" color={color} />
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

      {/* Quick Practice */}
      <button className="quick-practice-btn" onClick={() => navigate('/mode/practice')}>
        <Target size={20} weight="bold" />
        <span>Quick Practice</span>
      </button>
    </div>
  );
}
