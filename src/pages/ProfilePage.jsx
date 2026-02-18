import { useState, useEffect, useRef } from 'react';
import { Fire, Trophy, Lightning, Lock, CheckCircle, Target, BookOpen } from '@phosphor-icons/react';
import * as Icons from '@phosphor-icons/react';
import { useDatabase } from '../hooks/useDatabase';
import { getOrCreateProfile, updateProfile, getTotalXP, getStreakInfo, getUnlockedAchievements, getOverallProgress } from '../utils/database';
import { calculateLevel, calculateLeague } from '../utils/xpCalculator';
import { getLeague, getNextLeague, getLeagueProgress, getWeeklyXP, getSimulatedRanking } from '../engine/leagues';
import { ACHIEVEMENTS } from '../data/achievements';
import Card from '../components/common/Card';
import './ProfilePage.css';

function AnimatedNumber({ value, duration = 800 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const start = 0;
    const end = value;
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
  const { db, isReady } = useDatabase();
  const [profile, setProfile] = useState(null);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [unlocked, setUnlocked] = useState([]);
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    if (!isReady || !db) return;
    const p = getOrCreateProfile(db);
    setProfile(p);
    setNameInput(p.display_name || 'Learner');
    setXp(getTotalXP(db));
    setStreak(getStreakInfo(db).currentStreak);
    setUnlocked(getUnlockedAchievements(db).map(a => a.achievement_id));
    setProgress(getOverallProgress(db));
  }, [db, isReady]);

  const handleSaveName = () => {
    if (!db || !nameInput.trim()) return;
    updateProfile(db, { displayName: nameInput.trim() });
    setProfile(prev => ({ ...prev, display_name: nameInput.trim() }));
    setEditing(false);
  };

  const level = calculateLevel(xp);
  const league = calculateLeague(xp);
  const displayName = profile?.display_name || 'Learner';
  const initial = displayName.charAt(0).toUpperCase();

  // Use engine league system
  const engineLeague = getLeague(xp);
  const nextLeague = getNextLeague(xp);
  const leagueProgressVal = getLeagueProgress(xp);
  const weekXP = db ? getWeeklyXP(db) : 0;
  const ranking = getSimulatedRanking(xp);

  // Weekly summary
  const weeklyStats = progress ? {
    scenarios: progress.totalPracticeAttempts,
    challenges: progress.challengesCompleted,
    xp: weekXP,
  } : null;

  // Recommended next activity (using engine)
  const getRecommendation = () => {
    if (!progress) return null;
    if (progress.lessonsWithReflections < 5) return { label: 'Continue learning', path: '/mode/learn', color: '#F59E0B' };
    if (progress.totalPracticeAttempts < 10) return { label: 'Practice more scenarios', path: '/mode/practice', color: '#EF4444' };
    if (progress.challengesCompleted < 7) return { label: 'Try daily challenges', path: '/mode/daily', color: '#10B981' };
    if (progress.simulationsCompleted < 3) return { label: 'Try a simulation', path: '/mode/simulate', color: '#8B5CF6' };
    return { label: 'Review flashcards', path: '/mode/review', color: '#3B82F6' };
  };

  const recommendation = getRecommendation();

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
    </div>
  );
}
