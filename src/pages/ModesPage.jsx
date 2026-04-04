import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from '@phosphor-icons/react';
import { PLAYABLE_MODES } from '../themes/modeThemes';
import { useSupabaseDB } from '../hooks/useSupabaseDB';
import { LESSONS } from '../data/lessons';
import { PRACTICE_SCENARIOS } from '../data/practiceScenarios';
import { SIMULATIONS } from '../data/simulations';
import HexBadge from '../components/common/HexBadge';
import { cn } from '@/lib/utils';

export default function ModesPage() {
  const navigate = useNavigate();
  const { db, isReady } = useSupabaseDB();
  const [progress, setProgress] = useState(null);
  const [recommended, setRecommended] = useState(null);

  useEffect(() => {
    if (!isReady || !db) return;
    (async () => {
      setProgress(await db.getOverallProgress());
      const rec = await db.getRecommendedMode();
      setRecommended(rec?.mode || null);
    })();
  }, [db, isReady]);

  const getProgress = (modeKey) => {
    if (!progress) return 0;
    switch (modeKey) {
      case 'learn': return Math.round((progress.lessonsWithReflections / LESSONS.length) * 100);
      case 'practice': return Math.min(100, Math.round((progress.totalPracticeAttempts / PRACTICE_SCENARIOS.length) * 100));
      case 'daily': return Math.min(100, Math.round((progress.challengesCompleted / 30) * 100));
      case 'simulate': return Math.round((progress.simulationsCompleted / SIMULATIONS.length) * 100);
      case 'review': return progress.cardsLearned > 0 ? Math.min(100, Math.round((progress.cardsLearned / 50) * 100)) : 0;
      case 'pattern': return Math.min(100, Math.round((progress.patternAttempts / 50) * 100));
      case 'technique': return Math.min(100, Math.round((progress.totalPracticeAttempts / 12) * 100));
      default: return 0;
    }
  };

  return (
    <div className="px-4 pb-6 pt-5 animate-fade-in">
      <div className="mb-5">
        <h1 className="font-serif text-2xl font-bold text-stone-900">Training Modes</h1>
        <p className="text-sm text-stone-500 mt-1">Choose how you want to grow today</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {PLAYABLE_MODES.map((mode, i) => {
          const pct = getProgress(mode.key);
          const isRecommended = mode.key === recommended;

          return (
            <button
              key={mode.key}
              className={cn(
                'bg-white rounded-xl border border-stone-200 shadow-sm text-left overflow-hidden',
                'hover:shadow-md active:scale-[0.98] transition-all',
                `stagger-${i + 1}`
              )}
              style={{ '--mode-color': mode.primary }}
              onClick={() => navigate(mode.path)}
            >
              {/* Card header band */}
              <div
                className="h-16 flex items-center justify-between px-3 relative"
                style={{ background: mode.bgGradient }}
              >
                <HexBadge icon={mode.icon} color={mode.primary} size="sm" />
                {isRecommended && (
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 text-[10px] font-semibold" style={{ color: mode.primary }}>
                    <Star size={9} weight="fill" />
                    <span>Best</span>
                  </div>
                )}
              </div>

              {/* Card content */}
              <div className="p-3">
                <h3 className="text-sm font-semibold text-stone-900 leading-tight">{mode.name}</h3>
                <span className="text-[10px] text-stone-400 font-medium">{mode.category}</span>
                <p className="text-xs text-stone-500 mt-1.5 leading-relaxed line-clamp-2">{mode.description}</p>

                {progress && (
                  <div className="flex items-center gap-2 mt-3">
                    <svg width="22" height="22" viewBox="0 0 28 28" className="flex-shrink-0">
                      <circle cx="14" cy="14" r="11" fill="none" stroke="#E7E5E4" strokeWidth="2.5" />
                      <circle
                        cx="14" cy="14" r="11" fill="none"
                        stroke={mode.primary}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray={`${(pct / 100) * 69.1} 69.1`}
                        transform="rotate(-90 14 14)"
                      />
                    </svg>
                    <span className="text-[10px] font-semibold text-stone-500">{pct}%</span>
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
