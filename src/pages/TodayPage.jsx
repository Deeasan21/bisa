import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightning, Fire, Gift, Target, Sparkle } from '@phosphor-icons/react';
import { useDatabase } from '../hooks/useDatabase';
import { getStreakInfo, isChallengeCompletedToday, getOverallProgress } from '../utils/database';
import { getTimeOfDayGreeting, getTodayString, getHoursUntilMidnight } from '../utils/dateHelpers';
import { generateDailyQuests, allQuestsCompleted as checkAllQuests, QUEST_TYPE_TO_MODE } from '../engine/dailyQuests';
import { getRecommendedMode } from '../engine/recommendations';
import MascotMessage from '../components/common/MascotMessage';
import ProgressBar from '../components/common/ProgressBar';
import Card from '../components/common/Card';
import Confetti from '../components/common/Confetti';
import XPToast from '../components/common/XPToast';
import './TodayPage.css';

export default function TodayPage() {
  const { db, isReady } = useDatabase();
  const navigate = useNavigate();
  const [streak, setStreak] = useState(0);
  const [lastDate, setLastDate] = useState(null);
  const [engineQuests, setEngineQuests] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    if (!isReady || !db) return;

    const info = getStreakInfo(db);
    setStreak(info.currentStreak);
    setLastDate(info.lastChallengeDate);

    // Generate daily quests from engine
    const quests = generateDailyQuests(db);
    setEngineQuests(quests);

    // Get recommendation
    setRecommendation(getRecommendedMode(db));

    // Check if all quests are done for confetti
    if (checkAllQuests(db)) {
      setShowConfetti(true);
    }
  }, [db, isReady]);

  const greeting = getTimeOfDayGreeting();
  const hoursLeft = getHoursUntilMidnight();

  // Context-aware mascot based on absence duration
  const getMascotMessage = () => {
    if (lastDate) {
      const today = new Date(getTodayString());
      const last = new Date(lastDate);
      const daysSince = Math.floor((today - last) / (1000 * 60 * 60 * 24));
      if (daysSince >= 7) return "Welcome back! It's been a while. No judgment — let's start fresh today!";
      if (daysSince >= 3) return "Hey, I missed you! Ready to pick up where you left off?";
      if (daysSince === 1) return "You were just here yesterday! Let's keep the momentum going.";
    }
    if (streak >= 7) return "You're on fire! A whole week of growth. Keep going!";
    if (streak >= 3) return `${streak}-day streak! You're building a real habit.`;
    if (engineQuests.length > 0 && engineQuests.every(q => q.completed)) return "All quests complete! You're a star. Come back tomorrow!";
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
    if (quests.challenge) return 'encouraging';
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
      days.push({ dateStr, dayLabel, isToday, isActive: isActive || (isToday && quests.challenge) });
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

      {/* Recommendation */}
      {recommendation && (
        <button className="quick-practice-btn" onClick={() => navigate(`/mode/${recommendation.mode}`)}>
          <Sparkle size={20} weight="bold" />
          <span>{recommendation.reason}</span>
        </button>
      )}

      {/* Quick Practice */}
      <button className="quick-practice-btn" onClick={() => navigate('/mode/practice')}>
        <Target size={20} weight="bold" />
        <span>Quick Practice</span>
      </button>
    </div>
  );
}
