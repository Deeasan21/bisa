import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from '@phosphor-icons/react';
import { PLAYABLE_MODES } from '../themes/modeThemes';
import { useDatabase } from '../hooks/useDatabase';
import { getOverallProgress } from '../utils/database';
import { getRecommendedMode } from '../engine/recommendations';
import { LESSONS } from '../data/lessons';
import { PRACTICE_SCENARIOS } from '../data/practiceScenarios';
import { SIMULATIONS } from '../data/simulations';
import HexBadge from '../components/common/HexBadge';
import './ModesPage.css';

export default function ModesPage() {
  const navigate = useNavigate();
  const { db, isReady } = useDatabase();
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    if (!isReady || !db) return;
    setProgress(getOverallProgress(db));
  }, [db, isReady]);

  // Calculate completion percentage per mode
  const getProgress = (modeKey) => {
    if (!progress) return 0;
    switch (modeKey) {
      case 'learn': return Math.round((progress.lessonsWithReflections / LESSONS.length) * 100);
      case 'practice': return Math.min(100, Math.round((progress.totalPracticeAttempts / PRACTICE_SCENARIOS.length) * 100));
      case 'daily': return Math.min(100, Math.round((progress.challengesCompleted / 30) * 100));
      case 'simulate': return Math.round((progress.simulationsCompleted / SIMULATIONS.length) * 100);
      case 'review': return progress.cardsLearned > 0 ? Math.min(100, Math.round((progress.cardsLearned / 50) * 100)) : 0;
      case 'pattern': return Math.min(100, Math.round((progress.patternAttempts / 50) * 100));
      default: return 0;
    }
  };

  // Find recommended mode using engine
  const getRecommended = () => {
    if (!db) return null;
    const rec = getRecommendedMode(db);
    return rec?.mode || null;
  };

  const recommended = getRecommended();

  return (
    <div className="modes-page animate-fade-in">
      <div className="modes-header">
        <h1>Training Modes</h1>
        <p>Choose how you want to grow today</p>
      </div>
      <div className="modes-grid">
        {PLAYABLE_MODES.map((mode, i) => {
          const pct = getProgress(mode.key);
          const isRecommended = mode.key === recommended;
          return (
            <button
              key={mode.key}
              className={`mode-card stagger-${i + 1}`}
              style={{ '--mode-color': mode.primary, background: mode.cardBg }}
              onClick={() => navigate(mode.path)}
            >
              <div className="mode-card-gradient" style={{ background: mode.gradient }} />
              {isRecommended && (
                <div className="mode-recommended">
                  <Star size={10} weight="fill" />
                  <span>Recommended</span>
                </div>
              )}
              <div className="mode-card-content">
                <HexBadge icon={mode.icon} color={mode.primary} size="md" />
                <h3>{mode.name}</h3>
                <span className="mode-card-category">{mode.category}</span>
                <p className="mode-card-desc">{mode.description}</p>
                {progress && (
                  <div className="mode-progress-ring">
                    <svg width="28" height="28" viewBox="0 0 28 28">
                      <circle cx="14" cy="14" r="11" fill="none" stroke="var(--border)" strokeWidth="2.5" />
                      <circle
                        cx="14" cy="14" r="11" fill="none"
                        stroke={mode.primary}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray={`${(pct / 100) * 69.1} 69.1`}
                        transform="rotate(-90 14 14)"
                      />
                    </svg>
                    <span className="mode-progress-text">{pct}%</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
