import { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Trash, Sparkle } from '@phosphor-icons/react';
import { MODE_THEMES } from '../../themes/modeThemes';
import { LESSONS } from '../../data/lessons';
import { useDatabase } from '../../hooks/useDatabase';
import { getReflection, saveReflection, deleteReflection, getOverallProgress } from '../../utils/database';
import { awardXP, XP_RULES } from '../../engine/xpSystem';
import { updateQuestProgress } from '../../engine/dailyQuests';
import { checkAchievements } from '../../engine/achievements';
import { hasApiKey } from '../../services/claudeApi';
import { getAIReflectionFeedback } from '../../engine/aiReflectionCoaching';
import ModeHeader from '../layout/ModeHeader';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Skeleton from '../common/Skeleton';
import AchievementToast from '../common/AchievementToast';
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

const REFLECTION_PROMPTS = {
  'Open vs. Closed': "Think of a recent conversation. Where could you have replaced a closed question with an open one?",
  'Probing': "When was the last time you went deeper with a follow-up instead of accepting a surface answer?",
  'Empathy': "Recall a time someone felt truly heard by you. What did you say or ask that made the difference?",
  'Follow-up': "Think of a conversation that ended too quickly. What follow-up question could have opened it up?",
  'Clarifying': "When did an assumption lead you astray? What clarifying question would have helped?",
  'Framing': "How does the way you frame a question change the answer you get? Think of a real example.",
  'Self-Reflection': "What pattern do you notice in your own questioning habits? What would you like to change?",
  'Leadership': "How do your questions shape the way your team thinks and acts?",
  'Cultural Awareness': "How might someone from a different background interpret your questions differently?",
  'Body Language': "Think of a time when someone's body language told you more than their words. What did you ask next?",
};

export default function LearnMode() {
  const { db, isReady } = useDatabase();
  const location = useLocation();
  const initialLesson = location.state?.lessonIndex ?? 0;
  const [selectedLesson, setSelectedLesson] = useState(initialLesson);
  const [reflection, setReflection] = useState('');
  const [saved, setSaved] = useState(false);
  const [reflectedLessons, setReflectedLessons] = useState(new Set());
  const [aiReflectionResult, setAiReflectionResult] = useState(null);
  const [aiReflectionLoading, setAiReflectionLoading] = useState(false);
  const [newAchievement, setNewAchievement] = useState(null);

  const lesson = LESSONS[selectedLesson];
  const pillStripRef = useRef(null);

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

  // Auto-scroll pill strip to keep active lesson centered
  useEffect(() => {
    if (pillStripRef.current) {
      const activeEl = pillStripRef.current.querySelector('.lesson-pill.active');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [selectedLesson]);

  useEffect(() => {
    if (!isReady || !db || !lesson) return;
    const existing = getReflection(db, lesson.id);
    setReflection(existing || '');
    setSaved(!!existing);
    setAiReflectionResult(null);
    setAiReflectionLoading(false);

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
        const { newlyUnlocked } = checkAchievements(db, getOverallProgress(db));
        if (newlyUnlocked.length > 0) setNewAchievement(newlyUnlocked[0]);
      } catch (err) {
        console.error('Engine error during lesson save:', err);
      }
    }
    setSaved(true);
    setReflectedLessons(prev => new Set([...prev, lesson.id]));
    setAiReflectionResult(null);
  };

  const handleDelete = () => {
    if (!db) return;
    deleteReflection(db, lesson.id);
    setReflection('');
    setSaved(false);
    setAiReflectionResult(null);
    setReflectedLessons(prev => {
      const next = new Set(prev);
      next.delete(lesson.id);
      return next;
    });
  };

  const handleRequestAIReflection = async () => {
    setAiReflectionLoading(true);
    try {
      const result = await getAIReflectionFeedback(reflection, lesson);
      setAiReflectionResult(result);
    } catch (err) {
      console.error('AI reflection feedback error:', err);
      setAiReflectionResult(null);
    } finally {
      setAiReflectionLoading(false);
    }
  };

  return (
    <div className="learn-mode">
      <AchievementToast achievementId={newAchievement} visible={!!newAchievement} onDone={() => setNewAchievement(null)} />
      <ModeHeader theme={theme} subtitle={`${LESSONS.length} lessons`} />

      <select
        className="lesson-select"
        value={selectedLesson}
        onChange={(e) => setSelectedLesson(Number(e.target.value))}
      >
        {Object.entries(tierGroups).map(([tier, lessons]) => (
          <optgroup key={tier} label={`Tier ${tier}: ${TIER_LABELS[tier]}`}>
            {lessons.map((l) => (
              <option key={l.index} value={l.index}>
                {l.id}. {l.title}{reflectedLessons.has(l.id) ? ' ✓' : ''}
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      <div className="lesson-pill-strip" ref={pillStripRef}>
        {Object.entries(tierGroups).map(([tier, lessons], tierIdx) => (
          <div key={tier} className="pill-tier-group">
            {tierIdx > 0 && <span className="pill-tier-divider" />}
            {lessons.map((l) => (
              <button
                key={l.id}
                className={`lesson-pill${l.index === selectedLesson ? ' active' : ''}${reflectedLessons.has(l.id) ? ' completed' : ''}`}
                style={{ '--pill-color': TIER_COLORS[l.tier || 1] }}
                onClick={() => setSelectedLesson(l.index)}
                aria-label={`Lesson ${l.id}: ${l.title}`}
              >
                {l.id}
              </button>
            ))}
          </div>
        ))}
      </div>

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
          <p className="reflection-prompt">
            {REFLECTION_PROMPTS[lesson.skillCategory] || "What stood out to you? How does this connect to your life?"}
          </p>
          <textarea
            value={reflection}
            onChange={(e) => { setReflection(e.target.value); setSaved(false); }}
            placeholder="Write your reflection here..."
            rows={5}
          />
          <div className="reflection-actions">
            <Button
              variant="mode"
              modeColor={theme.primary}
              onClick={handleSave}
              disabled={!reflection.trim()}
            >
              {saved ? 'Saved!' : 'Save Reflection'}
            </Button>
            {saved && (
              <button className="reflection-delete" onClick={handleDelete}>
                <Trash size={14} /> Delete Reflection
              </button>
            )}
          </div>

          {aiReflectionLoading && (
            <div className="reflection-ai-feedback">
              <Skeleton height="14px" width="50%" />
              <Skeleton height="40px" />
              <Skeleton height="14px" width="70%" />
            </div>
          )}

          {aiReflectionResult && !aiReflectionLoading && (
            <div className="reflection-ai-feedback animate-fade-in">
              <div className="reflection-ai-header">
                <Sparkle size={18} weight="fill" color="#F59E0B" />
                <span>AI Reflection Coaching</span>
              </div>
              <div className="reflection-ai-group">
                <label>Insight</label>
                <p>{aiReflectionResult.insight}</p>
              </div>
              <div className="reflection-ai-question">
                <label>Go Deeper</label>
                <p>{aiReflectionResult.deeperQuestion}</p>
              </div>
              <div className="reflection-ai-group">
                <label>Connection</label>
                <p>{aiReflectionResult.connection}</p>
              </div>
            </div>
          )}

          {saved && !aiReflectionResult && !aiReflectionLoading && hasApiKey() && (
            <button className="reflection-ai-btn" onClick={handleRequestAIReflection}>
              <Sparkle size={16} weight="fill" /> Get AI Feedback
            </button>
          )}

          {saved && !hasApiKey() && !aiReflectionResult && !aiReflectionLoading && (
            <p className="reflection-ai-upsell">
              Add an API key in Settings to get AI feedback on your reflections.
            </p>
          )}
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
