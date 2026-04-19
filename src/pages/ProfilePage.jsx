import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fire, Trophy, Lightning, Lock, CheckCircle, Target, BookOpen, SignOut, Export, FileJs, FileCsv, Users, ArrowRight, Buildings, SpeakerHigh } from '@phosphor-icons/react';
import * as Icons from '@phosphor-icons/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSupabaseDB } from '../hooks/useSupabaseDB';
import { useAuth } from '../hooks/useAuth';
import { useOrg } from '../hooks/useOrg';
import { calculateLevel, calculateLeague } from '../utils/xpCalculator';
import { getLeague, getNextLeague, getLeagueProgress, getSimulatedRanking } from '../engine/leagues';
import { ACHIEVEMENTS } from '../data/achievements';
import { STORAGE_KEYS } from '../lib/constants';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import { downloadJSON, downloadCSV } from '../utils/exportData';
import { cn } from '@/lib/utils';

function AnimatedNumber({ value, duration = 800 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const start = 0;
    const end = (typeof value === 'number' && isFinite(value)) ? value : 0;
    const startTime = performance.now();

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (progress < 1) {
        ref.current = requestAnimationFrame(animate);
      }
    }
    ref.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(ref.current);
  }, [value, duration]);

  return <span>{display}</span>;
}

function getPhosphorIcon(name) {
  const Icon = Icons[name];
  return Icon || Icons.Star;
}

export default function ProfilePage() {
  const { db, isReady } = useSupabaseDB();
  const { signOut } = useAuth();
  const { org, loading: orgLoading } = useOrg();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [exporting, setExporting] = useState(false);
  const [resetIntroState, setResetIntroState] = useState('idle');

  const handleResetEnyaIntro = async () => {
    setResetIntroState('working');
    await db.resetEnyaIntro();
    await queryClient.invalidateQueries({ queryKey: ['profile'] });
    setResetIntroState('done');
    setTimeout(() => setResetIntroState('idle'), 2500);
  };

  const enabled = isReady && !!db;

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => db.getProfile(),
    enabled,
    placeholderData: null,
  });

  const { data: xp } = useQuery({
    queryKey: ['totalXP'],
    queryFn: () => db.getTotalXP(),
    enabled,
    placeholderData: 0,
  });

  const { data: streak } = useQuery({
    queryKey: ['streak'],
    queryFn: async () => (await db.getStreakInfo()).currentStreak,
    enabled,
    placeholderData: 0,
  });

  const { data: unlocked } = useQuery({
    queryKey: ['unlockedAchievements'],
    queryFn: async () => (await db.getUnlockedAchievements()).map(a => a.achievement_id),
    enabled,
    placeholderData: [],
  });

  const { data: progress } = useQuery({
    queryKey: ['overallProgress'],
    queryFn: () => db.getOverallProgress(),
    enabled,
    placeholderData: null,
  });

  const { data: weekXP } = useQuery({
    queryKey: ['weeklyXP'],
    queryFn: () => db.getWeeklyXP(),
    enabled,
    placeholderData: 0,
  });

  useEffect(() => {
    if (profile && !nameInput) setNameInput(profile.display_name || 'Learner');
  }, [profile]);

  const handleSaveName = async () => {
    if (!db || !nameInput.trim()) return;
    await db.updateProfile({ displayName: nameInput.trim() });
    queryClient.invalidateQueries({ queryKey: ['profile'] });
    setEditing(false);
  };

  const level = calculateLevel(xp);
  const league = calculateLeague(xp);
  const displayName = profile?.display_name || 'Learner';
  const initial = displayName.charAt(0).toUpperCase();

  const engineLeague = getLeague(xp);
  const nextLeague = getNextLeague(xp);
  const leagueProgressVal = getLeagueProgress(xp);
  const ranking = getSimulatedRanking(xp);

  const weeklyStats = progress ? {
    scenarios: progress.totalPracticeAttempts,
    challenges: progress.challengesCompleted,
    xp: weekXP,
  } : null;

  const getRecommendation = () => {
    if (!progress) return null;
    if (progress.lessonsWithReflections < 5) return { label: 'Continue learning', path: '/mode/learn', color: '#D4A853' };
    if (progress.totalPracticeAttempts < 10) return { label: 'Practice more scenarios', path: '/mode/practice', color: '#EF4444' };
    if (progress.challengesCompleted < 7) return { label: 'Try daily challenges', path: '/mode/daily', color: '#C49240' };
    if (progress.simulationsCompleted < 3) return { label: 'Try a simulation', path: '/mode/simulate', color: '#D4A853' };
    return { label: 'Review flashcards', path: '/mode/review', color: '#9A6B1F' };
  };

  const recommendation = getRecommendation();

  const handleExport = async (format) => {
    if (!db || exporting) return;
    setExporting(true);
    try {
      const data = await db.exportAllData();
      if (!data) return;
      if (format === 'json') downloadJSON(data, displayName);
      else downloadCSV(data, displayName);
    } catch (e) {
      console.error('Export failed:', e);
    } finally {
      setExporting(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (e) {
      console.error('Sign out failed:', e);
    }
  };

  return (
    <div className="px-4 pb-8 pt-5 space-y-5 animate-fade-in">
      {/* Hero */}
      <div className="flex flex-col items-center pt-4 pb-2 gap-3">
        <Avatar className="w-20 h-20 border-4 text-xl font-bold" style={{ borderColor: league.color }}>
          <AvatarFallback style={{ background: league.color, color: '#fff' }}>
            {initial}
          </AvatarFallback>
        </Avatar>

        {editing ? (
          <div className="flex items-center gap-2">
            <Input
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
              autoFocus
              className="text-center w-48 focus-visible:ring-gold"
            />
            <Button size="sm" className="bg-gold hover:bg-gold-mid text-stone-900" onClick={handleSaveName}>
              Save
            </Button>
          </div>
        ) : (
          <button
            className="font-serif text-2xl font-bold text-stone-900 hover:text-gold transition-colors"
            onClick={() => setEditing(true)}
          >
            {displayName}
          </button>
        )}

        <span className="text-sm text-stone-500">{level.name}</span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: <Fire size={18} weight="fill" color="#D4A853" />, value: <AnimatedNumber value={streak} />, label: 'Streak' },
          { icon: <Trophy size={18} weight="fill" color={league.color} />, value: league.name, label: 'League' },
          { icon: <Lightning size={18} weight="fill" color="#F97316" />, value: <AnimatedNumber value={xp} />, label: 'Total XP' },
        ].map(({ icon, value, label }, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-stone-200 shadow-sm p-3 flex flex-col items-center gap-1">
            {icon}
            <span className="text-base font-bold text-stone-900">{value}</span>
            <span className="text-[10px] text-stone-400">{label}</span>
          </div>
        ))}
      </div>

      {/* Weekly Summary */}
      {weeklyStats && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4">
          <h3 className="text-sm font-semibold text-stone-900 mb-3">Your Activity</h3>
          <div className="flex items-center justify-around">
            <div className="flex items-center gap-1.5 text-xs text-stone-600">
              <Target size={14} color="#EF4444" />
              <span>{weeklyStats.scenarios} scenarios</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-stone-600">
              <CheckCircle size={14} color="#C49240" />
              <span>{weeklyStats.challenges} challenges</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-stone-600">
              <Lightning size={14} color="#D4A853" />
              <span>{weeklyStats.xp} XP</span>
            </div>
          </div>
        </div>
      )}

      {/* Recommended Next */}
      {recommendation && (
        <button
          className="w-full flex items-center justify-between p-4 bg-gold/5 border border-gold/20 rounded-xl hover:bg-gold/10 transition-colors"
          onClick={() => navigate(recommendation.path)}
        >
          <div>
            <p className="text-xs font-semibold text-gold uppercase tracking-wide">Recommended Next</p>
            <p className="text-sm font-semibold text-stone-900 mt-0.5">{recommendation.label}</p>
          </div>
          <ArrowRight size={16} color="#D4A853" />
        </button>
      )}

      {/* Team */}
      {!orgLoading && (
        <div
          className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate(org ? '/team' : '/team/create')}
        >
          <div className="w-10 h-10 rounded-lg bg-stone-50 flex items-center justify-center flex-shrink-0">
            {org ? <Buildings size={20} weight="duotone" /> : <Users size={20} weight="duotone" />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-stone-900">{org ? org.name : 'Create a team'}</p>
            <p className="text-xs text-stone-500">{org ? 'View your team' : 'Invite colleagues and track progress together'}</p>
          </div>
          <ArrowRight size={16} color="#A8A29E" />
        </div>
      )}

      {/* Achievements */}
      <div>
        <h2 className="text-sm font-semibold text-stone-900 mb-3">Achievements</h2>
        <div className="grid grid-cols-3 gap-3">
          {ACHIEVEMENTS.map(ach => {
            const isAchUnlocked = unlocked.includes(ach.id);
            const IconComp = getPhosphorIcon(ach.icon);
            return (
              <div
                key={ach.id}
                className={cn(
                  'bg-white rounded-xl border p-3 flex flex-col items-center gap-1.5 text-center',
                  isAchUnlocked ? 'border-gold/30' : 'border-stone-200 opacity-60'
                )}
              >
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  isAchUnlocked ? 'bg-gold/10' : 'bg-stone-50'
                )}>
                  {isAchUnlocked ? (
                    <IconComp size={20} weight="fill" color="#D4A853" />
                  ) : (
                    <Lock size={16} weight="bold" color="#A8A29E" />
                  )}
                </div>
                <span className="text-[11px] font-semibold text-stone-800 leading-tight">{ach.title}</span>
                <span className="text-[10px] text-stone-400 leading-tight">{ach.description}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Export */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4">
        <div className="flex items-center gap-2 mb-2">
          <Export size={18} color="#57534E" />
          <h3 className="text-sm font-semibold text-stone-900">Export Your Data</h3>
        </div>
        <p className="text-xs text-stone-400 mb-3">Download all your progress, journal entries, and practice history.</p>
        <div className="flex gap-2">
          <button
            onClick={() => handleExport('json')}
            disabled={exporting}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-stone-200 text-sm text-stone-700 hover:bg-stone-50 transition-colors font-medium disabled:opacity-50"
          >
            <FileJs size={16} />
            {exporting ? 'Exporting…' : 'JSON'}
          </button>
          <button
            onClick={() => handleExport('csv')}
            disabled={exporting}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-stone-200 text-sm text-stone-700 hover:bg-stone-50 transition-colors font-medium disabled:opacity-50"
          >
            <FileCsv size={16} />
            {exporting ? 'Exporting…' : 'CSV'}
          </button>
        </div>
      </div>

      {/* Replay Enya intro */}
      <div className="flex justify-center">
        <button
          onClick={handleResetEnyaIntro}
          disabled={resetIntroState === 'working'}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-stone-200 text-sm text-stone-500 hover:text-stone-900 hover:border-stone-300 transition-colors font-medium disabled:opacity-50"
        >
          <SpeakerHigh size={15} />
          {resetIntroState === 'working'
            ? 'Resetting…'
            : resetIntroState === 'done'
              ? 'Done — open Lesson 0 to hear it'
              : "Replay Enya's intro"}
        </button>
      </div>

      {/* Sign out */}
      <div className="flex justify-center pb-2">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-stone-200 text-sm text-stone-500 hover:text-red-500 hover:border-red-200 transition-colors font-medium"
        >
          <SignOut size={15} />
          Sign out
        </button>
      </div>
    </div>
  );
}
