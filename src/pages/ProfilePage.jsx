import { useState, useEffect, useRef } from 'react';
import { Fire, Trophy, Lightning, Lock, CheckCircle, Target, BookOpen, SignOut, Export, FileJs, FileCsv } from '@phosphor-icons/react';
import * as Icons from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import { useSupabaseDB } from '../hooks/useSupabaseDB';
import { useAuth } from '../hooks/useAuth';
import { calculateLevel, calculateLeague } from '../utils/xpCalculator';
import { getLeague, getNextLeague, getLeagueProgress, getSimulatedRanking } from '../engine/leagues';
import { ACHIEVEMENTS } from '../data/achievements';
import { STORAGE_KEYS } from '../lib/constants';
import Card from '../components/common/Card';
import { downloadJSON, downloadCSV } from '../utils/exportData';
import './ProfilePage.css';

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
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [exporting, setExporting] = useState(false);

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
    setProfile(prev => ({ ...prev, display_name: nameInput.trim() }));
    setEditing(false);
  };

  const level = calculateLevel(xp);
  const league = calculateLeague(xp);
  const displayName = profile?.display_name || 'Learner';
  const initial = displayName.charAt(0).toUpperCase();

  // Use engine league system (pure XP calc, no db needed)
  const engineLeague = getLeague(xp);
  const nextLeague = getNextLeague(xp);
  const leagueProgressVal = getLeagueProgress(xp);
  const ranking = getSimulatedRanking(xp);

  // Weekly summary
  const weeklyStats = progress ? {
    scenarios: progress.totalPracticeAttempts,
    challenges: progress.challengesCompleted,
    xp: weekXP,
  } : null;

  // Recommended next activity
  const getRecommendation = () => {
    if (!progress) return null;
    if (progress.lessonsWithReflections < 5) return { label: 'Continue learning', path: '/mode/learn', color: '#F59E0B' };
    if (progress.totalPracticeAttempts < 10) return { label: 'Practice more scenarios', path: '/mode/practice', color: '#EF4444' };
    if (progress.challengesCompleted < 7) return { label: 'Try daily challenges', path: '/mode/daily', color: '#10B981' };
    if (progress.simulationsCompleted < 3) return { label: 'Try a simulation', path: '/mode/simulate', color: '#8B5CF6' };
    return { label: 'Review flashcards', path: '/mode/review', color: '#3B82F6' };
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
    <div className="profile-page animate-fade-in">
      <div className="profile-hero">
        <div
          className="avatar-circle animate-glow-pulse"
          style={{ background: league.color, '--glow-color': `${league.color}66` }}
        >
          <span>{initial}</span>
        </div>
        {editing ? (
          <div className="name-edit">
            <input
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
              autoFocus
            />
            <button onClick={handleSaveName}>Save</button>
          </div>
        ) : (
          <h1 onClick={() => setEditing(true)}>{displayName}</h1>
        )}
        <span className="profile-level">{level.name}</span>
      </div>

      <div className="profile-stats-row">
        <div className="profile-stat">
          <Fire size={20} weight="fill" color="#F59E0B" />
          <span className="profile-stat-val"><AnimatedNumber value={streak} /></span>
          <span className="profile-stat-lbl">Streak</span>
        </div>
        <div className="profile-stat">
          <Trophy size={20} weight="fill" color={league.color} />
          <span className="profile-stat-val">{league.name}</span>
          <span className="profile-stat-lbl">League</span>
        </div>
        <div className="profile-stat">
          <Lightning size={20} weight="fill" color="#F97316" />
          <span className="profile-stat-val"><AnimatedNumber value={xp} /></span>
          <span className="profile-stat-lbl">Total XP</span>
        </div>
      </div>

      {/* Weekly Summary */}
      {weeklyStats && (
        <Card padding="md">
          <div className="weekly-summary">
            <h3>Your Activity</h3>
            <div className="weekly-stats">
              <div className="weekly-item">
                <Target size={16} color="#EF4444" />
                <span>{weeklyStats.scenarios} scenarios</span>
              </div>
              <div className="weekly-item">
                <CheckCircle size={16} color="#10B981" />
                <span>{weeklyStats.challenges} challenges</span>
              </div>
              <div className="weekly-item">
                <Lightning size={16} color="#F59E0B" />
                <span>{weeklyStats.xp} XP earned</span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Current Focus */}
      {recommendation && (
        <div className="current-focus" style={{ '--focus-color': recommendation.color }}>
          <span className="focus-label">Recommended Next</span>
          <span className="focus-action">{recommendation.label}</span>
        </div>
      )}

      <h2 className="profile-section-title">Achievements</h2>
      <div className="achievements-grid">
        {ACHIEVEMENTS.map(ach => {
          const isAchUnlocked = unlocked.includes(ach.id);
          const IconComp = getPhosphorIcon(ach.icon);
          return (
            <div key={ach.id} className={`achievement-item${isAchUnlocked ? ' unlocked' : ''}`}>
              <div className="achievement-circle">
                {isAchUnlocked ? (
                  <IconComp size={22} weight="fill" color="#F59E0B" />
                ) : (
                  <div className="achievement-locked-overlay">
                    <Lock size={16} weight="bold" color="var(--text-muted)" />
                  </div>
                )}
              </div>
              <span className="achievement-title">{ach.title}</span>
              <span className="achievement-desc">{ach.description}</span>
            </div>
          );
        })}
      </div>

      {/* Data Export */}
      <Card padding="md">
        <div className="export-section">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Export size={20} color="var(--text-secondary)" />
            <h3 style={{ margin: 0 }}>Export Your Data</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 12px' }}>
            Download all your progress, journal entries, and practice history.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => handleExport('json')}
              disabled={exporting}
              className="export-btn"
            >
              <FileJs size={18} />
              {exporting ? 'Exporting…' : 'JSON'}
            </button>
            <button
              onClick={() => handleExport('csv')}
              disabled={exporting}
              className="export-btn"
            >
              <FileCsv size={18} />
              {exporting ? 'Exporting…' : 'CSV'}
            </button>
          </div>
        </div>
      </Card>

      <button
        onClick={handleSignOut}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          margin: '24px auto 8px', padding: '10px 20px',
          background: 'transparent', border: '1.5px solid var(--border)',
          borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)',
          fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer',
        }}
      >
        <SignOut size={16} />
        Sign out
      </button>
    </div>
  );
}
