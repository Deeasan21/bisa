import { useState, useEffect, useMemo } from 'react';
import { CaretDown, CaretRight, CheckCircle } from '@phosphor-icons/react';
import { MODE_THEMES } from '../../themes/modeThemes';
import { LESSONS } from '../../data/lessons';
import { useDatabase } from '../../hooks/useDatabase';
import { getReflection, saveReflection, getOverallProgress } from '../../utils/database';
import { awardXP, XP_RULES } from '../../engine/xpSystem';
import { updateQuestProgress } from '../../engine/dailyQuests';
import { checkAchievements } from '../../engine/achievements';
import ModeHeader from '../layout/ModeHeader';
import Button from '../common/Button';
import Badge from '../common/Badge';
import './LearnMode.css';

const theme = MODE_THEMES.learn;

const TIER_LABELS = {
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Advanced',
  4: 'Expert',
  5: 'Master',
};

const TIER_COLORS = {
  1: '#10B981',
  2: '#3B82F6',
  3: '#8B5CF6',
  4: '#F59E0B',
  5: '#EF4444',
};

export default function LearnMode() {
  const { db, isReady } = useDatabase();
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [reflection, setReflection] = useState('');
  const [saved, setSaved] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsedTiers, setCollapsedTiers] = useState({});
  const [reflectedLessons, setReflectedLessons] = useState(new Set());

  const lesson = LESSONS[selectedLesson];

  // Group lessons by tier
  const tierGroups = useMemo(() => {
    const groups = {};
    LESSONS.forEach((l, i) => {
      const tier = l.tier || 1;
      if (!groups[tier]) groups[tier] = [];
      groups[tier].push({ ...l, index: i });
    });
    return groups;
  }, []);

  useEffect(() => {
    if (!isReady || !db || !lesson) return;
    const existing = getReflection(db, lesson.id);
    setReflection(existing || '');
    setSaved(!!existing);

    // Check which lessons have reflections
    const reflected = new Set();
    LESSONS.forEach(l => {
      if (getReflection(db, l.id)) reflected.add(l.id);
    });
    setReflectedLessons(reflected);
  }, [db, isReady, selectedLesson, lesson]);

  const handleSave = () => {
    if (!db || !reflection.trim()) return;
    saveReflection(db, lesson.id, reflection);
    if (!saved) {
      try {
        awardXP(db, 'lesson', XP_RULES.lesson(), `Reflection on Lesson ${lesson.id}`);
        updateQuestProgress(db, 'lesson');
        checkAchievements(db, getOverallProgress(db));
      } catch (err) {
        console.error('Engine error during lesson save:', err);
      }
    }
    setSaved(true);
    setReflectedLessons(prev => new Set([...prev, lesson.id]));
  };

  const toggleTier = (tier) => {
    setCollapsedTiers(prev => ({ ...prev, [tier]: !prev[tier] }));
  };

  return (
    <div className="learn-mode">
      <ModeHeader theme={theme} subtitle={`${LESSONS.length} lessons`} />

      <button className="lesson-menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? 'Close' : 'Lessons'} ({selectedLesson + 1}/{LESSONS.length})
      </button>

      {sidebarOpen && (
        <div className="lesson-sidebar animate-fade-in">
          {Object.entries(tierGroups).map(([tier, lessons]) => (
            <div key={tier} className="tier-group">
              <button
                className="tier-header"
                onClick={() => toggleTier(tier)}
                style={{ '--tier-color': TIER_COLORS[tier] }}
              >
                {collapsedTiers[tier] ? <CaretRight size={14} weight="bold" /> : <CaretDown size={14} weight="bold" />}
                <span className="tier-label">Tier {tier}: {TIER_LABELS[tier]}</span>
                <Badge
                  text={`${lessons.filter(l => reflectedLessons.has(l.id)).length}/${lessons.length}`}
                  color={TIER_COLORS[tier]}
                  variant="soft"
                  size="sm"
                />
              </button>
              {!collapsedTiers[tier] && (
                <div className="tier-lessons">
                  {lessons.map((l) => (
                    <button
                      key={l.id}
                      className={`lesson-nav-item${l.index === selectedLesson ? ' active' : ''}`}
                      onClick={() => { setSelectedLesson(l.index); setSidebarOpen(false); }}
                    >
                      <span className="lesson-num">{l.id}</span>
                      <span className="lesson-title-text">{l.title}</span>
                      {reflectedLessons.has(l.id) && (
                        <CheckCircle size={16} weight="fill" color="#10B981" className="lesson-done" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="learn-content animate-slide-fade-in" key={selectedLesson}>
        {lesson.tier && (
          <Badge
            text={`Tier ${lesson.tier} — ${TIER_LABELS[lesson.tier] || ''}`}
            color={TIER_COLORS[lesson.tier] || theme.primary}
            variant="soft"
            size="sm"
          />
        )}
        <div
          className="lesson-content"
          dangerouslySetInnerHTML={{ __html: lesson.content }}
        />

        <div className="reflection-section">
          <h3>Your Reflection</h3>
          <p className="reflection-prompt">What stood out to you? How does this connect to your life?</p>
          <textarea
            value={reflection}
            onChange={(e) => { setReflection(e.target.value); setSaved(false); }}
            placeholder="Write your reflection here..."
            rows={5}
          />
          <Button
            variant="mode"
            modeColor={theme.primary}
            onClick={handleSave}
            disabled={!reflection.trim()}
          >
            {saved ? 'Saved!' : 'Save Reflection'}
          </Button>
        </div>

        <div className="lesson-nav-buttons">
          <Button
            variant="secondary"
            onClick={() => setSelectedLesson(Math.max(0, selectedLesson - 1))}
            disabled={selectedLesson === 0}
          >
            Previous
          </Button>
          <Button
            variant="mode"
            modeColor={theme.primary}
            onClick={() => setSelectedLesson(Math.min(LESSONS.length - 1, selectedLesson + 1))}
            disabled={selectedLesson === LESSONS.length - 1}
          >
            Next Lesson
          </Button>
        </div>
      </div>
    </div>
  );
}
