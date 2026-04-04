import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Lightning, Fire, Gift, Target, Sparkle, Lightbulb, BookOpen, ArrowRight, Eye } from '@phosphor-icons/react';
import { useSupabaseDB } from '../hooks/useSupabaseDB';
import { useXP } from '../hooks/useXP';
import { getTimeOfDayGreeting, getTodayString, getHoursUntilMidnight, daysAgo } from '../utils/dateHelpers';
import { XP_RULES } from '../engine/xpSystem';
import { getDailyInsight, CATEGORY_COLORS } from '../data/dailyInsights';
import { LESSONS } from '../data/lessons';
import ProgressBar from '../components/common/ProgressBar';
import Badge from '../components/common/Badge';
import Confetti from '../components/common/Confetti';
import { NeaOnnim } from '../components/brand';
import { cn } from '@/lib/utils';

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

const NEW_USER_MODES = [
  { title: 'Daily Challenge', reason: 'Build your questioning reflex — 60 seconds a day', color: '#C49240', Icon: Lightning, path: '/mode/daily' },
  { title: 'Pattern Mode', reason: 'Discover how you read people and situations', color: '#C49240', Icon: Eye, path: '/mode/pattern' },
  { title: 'Practice Mode', reason: 'Rewrite real questions and get instant AI feedback', color: '#C49240', Icon: Target, path: '/mode/practice' },
];

export default function TodayPage() {
  const { db, isReady } = useSupabaseDB();
  const { level, totalXP } = useXP();
  const navigate = useNavigate();
  const location = useLocation();
  const [showConfetti, setShowConfetti] = useState(false);

  const enabled = isReady && !!db;

  const { data: streakInfo } = useQuery({
    queryKey: ['streak'],
    queryFn: () => db.getStreakInfo(),
    enabled,
    placeholderData: { currentStreak: 0, longestStreak: 0, lastChallengeDate: null },
  });

  const { data: lastActivity } = useQuery({
    queryKey: ['lastActivity'],
    queryFn: async () => {
      const history = await db.getChallengeHistory(1);
      return history.length > 0 ? history[0] : null;
    },
    enabled,
    placeholderData: null,
  });

  const { data: nextMode } = useQuery({
    queryKey: ['recommendedMode'],
    queryFn: () => db.getRecommendedMode(),
    enabled,
    placeholderData: null,
  });

  const { data: engineQuests } = useQuery({
    queryKey: ['dailyQuests'],
    queryFn: () => db.generateDailyQuests(),
    enabled,
    placeholderData: [],
  });

  const { data: recommendations } = useQuery({
    queryKey: ['recommendations'],
    queryFn: () => db.getRecommendations(),
    enabled,
    placeholderData: null,
  });

  useEffect(() => {
    if (!enabled || !engineQuests || engineQuests.length === 0) return;
    (async () => {
      try {
        const allDone = await db.allQuestsCompleted();
        if (allDone) {
          setShowConfetti(true);
          const shouldAward = await db.checkAllQuestsXP();
          if (shouldAward) {
            await db.awardXP('all_quests_completed', XP_RULES.allQuestsBonus(), 'Completed all daily quests');
          }
        }
      } catch (err) { console.error('Failed to award quest bonus XP:', err); }
    })();
  }, [engineQuests]);

  const streak = streakInfo?.currentStreak || 0;
  const lastDate = streakInfo?.lastChallengeDate || null;

  const isNewUser = isReady && totalXP === 0 && !lastActivity;

  const greeting = getTimeOfDayGreeting();
  const hoursLeft = getHoursUntilMidnight();
  const dailyInsight = getDailyInsight();
  const insightColor = CATEGORY_COLORS[dailyInsight.category] || '#6B7280';

  const getStreakCalendar = () => {
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const y = d.getFullYear();
      const mo = String(d.getMonth() + 1).padStart(2, '0');
      const dy = String(d.getDate()).padStart(2, '0');
      const dateStr = `${y}-${mo}-${dy}`;
      const dayLabel = d.toLocaleDateString('en', { weekday: 'narrow' });
      const isToday = i === 0;
      let isActive = false;
      if (lastDate && streak > 0) {
        const end = new Date(`${lastDate}T12:00:00`);
        const cur = new Date(`${dateStr}T12:00:00`);
        const daysFromEnd = Math.round((end - cur) / (1000 * 60 * 60 * 24));
        isActive = daysFromEnd >= 0 && daysFromEnd < streak;
      }
      days.push({ dateStr, dayLabel, isToday, isActive });
    }
    return days;
  };

  const QUEST_COLORS = {
    practice: '#D4A853', lesson: '#9A6B1F', journal: '#D4A853',
    daily_challenge: '#C49240', review: '#9A6B1F', simulation: '#D4A853', streak: '#D4A853',
  };

  const QUEST_PATHS = {
    practice: '/mode/practice', lesson: '/mode/learn', journal: '/journal',
    daily_challenge: '/mode/daily', review: '/mode/review', simulation: '/mode/simulate', streak: '/mode/daily',
  };

  const dailyQuests = engineQuests.map(q => ({
    id: q.id,
    label: q.quest_description,
    value: q.progress || 0,
    max: q.goal || 1,
    xp: q.xp_reward,
    color: QUEST_COLORS[q.quest_type] || '#6B7280',
    path: QUEST_PATHS[q.quest_type] || '/mode/practice',
    completed: q.completed === 1 || q.completed === true,
    type: q.quest_type,
  }));

  const dailyChallengeQuest = dailyQuests.find(q => q.type === 'daily_challenge');
  const otherQuests = dailyQuests.filter(q => q.type !== 'daily_challenge');
  const otherQuestsDone = otherQuests.filter(q => q.completed).length;
  const allQuestsDone = dailyQuests.length > 0 && dailyQuests.every(q => q.completed);
  const streakCalendar = getStreakCalendar();

  const handleInsightTap = () => {
    const lessonIndex = LESSONS.findIndex(l => l.id === dailyInsight.lessonId);
    navigate('/mode/learn', { state: { lessonIndex: lessonIndex >= 0 ? lessonIndex : 0 } });
  };

  const getRecInfo = (rec) => {
    let reason = '';
    let path = '/mode/practice';
    let Icon = Target;
    if (rec.isWeak && rec.isStale) {
      reason = `${rec.category} needs review — ${rec.staleDays} days since last session`;
      path = '/mode/learn'; Icon = BookOpen;
    } else if (rec.isNew) {
      reason = `You haven't tried ${rec.category} yet — discover your level`;
      path = '/mode/practice'; Icon = Target;
    } else if (rec.isWeak) {
      reason = `${rec.category} is at ${rec.avg}% — practice will push it higher`;
      path = '/mode/practice'; Icon = Target;
    } else if (rec.isStale) {
      reason = `${rec.category} is getting rusty — quick review will lock it in`;
      path = '/mode/review'; Icon = BookOpen;
    }
    return { reason, path, Icon };
  };

  const xpCurrent = totalXP - (level.xpRequired || 0);
  const xpNeeded = level.nextLevel ? level.nextLevel.xpRequired - (level.xpRequired || 0) : null;

  return (
    <div className="px-4 pb-6 pt-5 space-y-4 animate-fade-in">
      <Confetti active={showConfetti} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <NeaOnnim size={36} className="flex-shrink-0" />
          <div>
            <h1 className="font-serif text-xl font-bold text-stone-900">{greeting}</h1>
            <p className="text-xs text-stone-500">Keep the streak alive</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20">
          <Fire size={16} weight="fill" color="#D4A853" />
          <span className="text-sm font-bold text-gold">{streak}</span>
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-xs font-semibold text-stone-900">Level {level.level}</span>
            <span className="text-xs text-stone-400 ml-2">{level.name}</span>
          </div>
          {xpNeeded && (
            <span className="text-xs text-stone-400">{xpCurrent} / {xpNeeded} XP</span>
          )}
        </div>
        <ProgressBar value={Math.round(level.progress * 100)} max={100} color="#D4A853" size="sm" animate />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-stone-400">
            {lastActivity
              ? `Last: ${lastActivity.type} · ${daysAgo(lastActivity.date)}`
              : 'No activity yet — pick a mode to start'
            }
          </span>
          {nextMode && (
            <button
              className="flex items-center gap-1 text-xs font-semibold text-gold hover:text-gold-dark"
              onClick={() => navigate(MODE_PATHS[nextMode.mode] || '/modes')}
            >
              Continue: {MODE_LABELS[nextMode.mode]}
              <ArrowRight size={12} weight="bold" />
            </button>
          )}
        </div>
      </div>

      {/* First-session CTA */}
      {isNewUser && (
        <div className="bg-gold/5 border border-gold/20 rounded-xl p-4 animate-fade-in">
          <span className="text-xs font-semibold text-gold uppercase tracking-wide">Start here</span>
          <h2 className="font-serif text-lg font-bold text-stone-900 mt-1">Your first 60 seconds</h2>
          <p className="text-sm text-stone-600 mt-1 mb-3">Complete today's Daily Challenge to start your streak and earn your first XP. It takes under a minute.</p>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gold text-stone-900 rounded-full text-sm font-semibold hover:bg-gold-mid transition-colors"
            onClick={() => navigate('/mode/daily')}
          >
            Begin Daily Challenge
            <ArrowRight size={14} weight="bold" />
          </button>
        </div>
      )}

      {/* Daily Insight */}
      <div
        className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
        style={{ borderLeftWidth: 3, borderLeftColor: insightColor }}
        onClick={handleInsightTap}
      >
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb size={16} weight="fill" color={insightColor} />
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Daily Insight</span>
          <Badge text={dailyInsight.category} color={insightColor} variant="soft" size="sm" />
        </div>
        <h3 className="font-serif text-base font-bold text-stone-900 mb-1">{dailyInsight.title}</h3>
        <p className="text-sm text-stone-600 mb-3">{dailyInsight.explanation}</p>
        <div className="bg-stone-50 rounded-lg p-3 mb-3">
          <span className="text-xs font-semibold text-stone-400">Try this:</span>
          <p className="text-sm text-stone-700 mt-0.5 italic">"{dailyInsight.exampleQuestion}"</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: insightColor }}>
          <BookOpen size={14} weight="duotone" />
          <span>Read the full lesson</span>
          <ArrowRight size={12} weight="bold" />
        </div>
      </div>

      {/* Streak Calendar */}
      <div className="flex justify-between px-1">
        {streakCalendar.map((day) => (
          <div key={day.dateStr} className="flex flex-col items-center gap-1.5">
            <span className="text-[10px] text-stone-400 font-medium">{day.dayLabel}</span>
            <div className={cn(
              'w-7 h-7 rounded-full border-2 transition-colors',
              day.isActive
                ? 'bg-gold border-gold'
                : day.isToday
                ? 'border-stone-300 bg-stone-50'
                : 'border-stone-200 bg-white'
            )} />
          </div>
        ))}
      </div>

      {/* Daily Challenge */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Lightning size={16} weight="fill" color="#D4A853" />
          <h2 className="text-sm font-semibold text-stone-900">Daily Challenge</h2>
          <span className="ml-auto text-xs text-stone-400">{hoursLeft}h left</span>
        </div>

        {dailyChallengeQuest ? (
          <div
            className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(dailyChallengeQuest.path)}
          >
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-stone-700 font-medium mb-2">{dailyChallengeQuest.label}</p>
                <ProgressBar value={dailyChallengeQuest.value} max={dailyChallengeQuest.max} color={dailyChallengeQuest.color} size="sm" animate />
              </div>
              <div className="flex-shrink-0">
                {dailyChallengeQuest.completed ? (
                  <Gift size={24} weight="fill" color={dailyChallengeQuest.color} />
                ) : (
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ color: dailyChallengeQuest.color, background: `${dailyChallengeQuest.color}14` }}
                  >
                    +{dailyChallengeQuest.xp} XP
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/mode/daily')}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-stone-700 font-medium">Complete today's Daily Challenge</p>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ color: '#C49240', background: '#C4924014' }}>+25 XP</span>
            </div>
          </div>
        )}

        {otherQuests.length > 0 && (
          <button
            className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-gold transition-colors w-full justify-center py-1"
            onClick={() => navigate('/progress')}
          >
            <Lightning size={12} weight="fill" color="#D4A853" />
            {otherQuestsDone}/{otherQuests.length} other quests
            <ArrowRight size={12} weight="bold" />
          </button>
        )}

        {allQuestsDone && (
          <div className="text-center py-2 text-sm font-semibold text-gold animate-scale-in">
            All quests complete! +25 XP bonus
          </div>
        )}
      </div>

      {/* Play Next / Recommendations */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Sparkle size={16} weight="fill" color="#D4A853" />
          <h2 className="text-sm font-semibold text-stone-900">Play Next</h2>
        </div>

        {(!recommendations || recommendations.recommended.length === 0) ? (
          NEW_USER_MODES.map(({ title, reason, color, Icon, path }) => (
            <div
              key={title}
              className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(path)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}18` }}>
                  <Icon size={20} weight="duotone" color={color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-stone-900">{title}</p>
                  <p className="text-xs text-stone-500 mt-0.5">{reason}</p>
                </div>
                <ArrowRight size={16} color="#A8A29E" />
              </div>
            </div>
          ))
        ) : (
          recommendations.recommended.slice(0, 3).map((rec) => {
            const color = CATEGORY_COLORS[rec.category] || '#6B7280';
            const { reason, path, Icon } = getRecInfo(rec);
            return (
              <div
                key={rec.category}
                className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(path)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}18` }}>
                    <Icon size={20} weight="duotone" color={color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold text-stone-900">Work on {rec.category}</p>
                      {rec.avg > 0 && <Badge text={`${rec.avg}%`} color={color} variant="soft" size="sm" />}
                    </div>
                    <p className="text-xs text-stone-500">{reason}</p>
                  </div>
                  <ArrowRight size={16} color="#A8A29E" />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
