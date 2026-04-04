import { useState, useEffect, useMemo, useRef } from 'react';
import { CheckCircle, Fire, XCircle } from '@phosphor-icons/react';
import { MODE_THEMES } from '../../themes/modeThemes';
import { PRACTICE_SCENARIOS } from '../../data/practiceScenarios';
import { DAILY_CHALLENGES } from '../../data/dailyChallenges';
import { useSupabaseDB } from '../../hooks/useSupabaseDB';
import { XP_RULES } from '../../engine/xpSystem';
import ModeHeader from '../layout/ModeHeader';
import Button from '../common/Button';
import AchievementToast from '../common/AchievementToast';
import FloatingOrbs from '../common/FloatingOrbs';
import BisaBalloon from '../common/BisaBalloon';
import { cn } from '@/lib/utils';
import './ReviewMode.css';

// Return only the context portion — strip Skill and Weak question lines
function extractContext(text) {
  if (!text) return text;
  return text
    .split('\n')
    .filter(line => !/^skill\s*:/i.test(line.trim()) && !/^weak question\s*:/i.test(line.trim()))
    .join('\n')
    .trim();
}

// Pull the weak question text out of the front field
function extractWeakQuestion(text) {
  if (!text) return null;
  const match = text.match(/weak question:\s*"([^"]+)"/i) || text.match(/weak question:\s*(.+)/i);
  return match ? match[1].trim() : null;
}

const CATEGORY_EXPLANATIONS = {
  'Open vs. Closed': 'Open questions invite elaboration and can\'t be answered with yes or no. Closed questions shut the door — they invite a one-word reply.',
  'Clarifying': 'Clarifying questions pin down exactly what someone means. They\'re used when a word or statement is vague and you need specifics.',
  'Probing': 'Probing questions dig beneath the surface to uncover the "why" behind what someone said. They push past the first answer.',
  'Empathy': 'Empathy questions acknowledge feelings before seeking information. They signal you\'ve noticed the emotional weight in a moment.',
  'Framing': 'Framing questions set context or reposition the situation before asking. They shape how the other person thinks about the topic.',
  'Follow-up': 'Follow-up questions build directly on what was just said. They show you\'re listening and want to go deeper on that specific point.',
  'Self-Reflection': 'Self-reflection questions turn the lens inward — they invite the asker or listener to examine their own assumptions and reactions.',
  'Body Language': 'Body language questions address what you\'re observing non-verbally. They name what you see and invite the person to respond to it.',
  'Cultural Awareness': 'Cultural awareness questions acknowledge that background and context shape meaning. They create space for different perspectives.',
  'Leadership': 'Leadership questions focus on direction, ownership, or team dynamics. They move a conversation from problem to possibility.',
};

function getExplanation(correctType, userChoice, wasCorrect) {
  const definition = CATEGORY_EXPLANATIONS[correctType] || '';
  if (wasCorrect) return definition;
  const wrongDef = CATEGORY_EXPLANATIONS[userChoice];
  if (!wrongDef) return definition;
  return `${definition} A ${userChoice} question would instead ${wrongDef.charAt(0).toLowerCase()}${wrongDef.slice(1)}`;
}

const theme = MODE_THEMES.review;

const ALL_TYPES = [
  'Open vs. Closed',
  'Clarifying',
  'Probing',
  'Empathy',
  'Framing',
  'Follow-up',
  'Self-Reflection',
  'Body Language',
  'Cultural Awareness',
  'Leadership',
];

const TYPE_DISPLAY = {
  'Open vs. Closed': 'Open / Closed',
  'Clarifying': 'Clarifying',
  'Probing': 'Probing',
  'Empathy': 'Empathy',
  'Framing': 'Framing',
  'Follow-up': 'Follow-up',
  'Self-Reflection': 'Reflective',
  'Body Language': 'Body Language',
  'Cultural Awareness': 'Cultural',
  'Leadership': 'Leadership',
};

// Pick 4 options: correct + 3 random distractors, shuffled
function buildOptions(correct) {
  const distractors = ALL_TYPES.filter(t => t !== correct);
  const picked = distractors.sort(() => Math.random() - 0.5).slice(0, 3);
  return [...picked, correct].sort(() => Math.random() - 0.5);
}

const QUALITY_MAP = { again: 0, good: 4 };

// Enrich cards with skillCategory using source data (no DB column needed)
function enrichCards(cards, flashcards) {
  return cards.map(card => {
    if (card.skillCategory) return card;
    if (card.card_type === 'practice') {
      const s = PRACTICE_SCENARIOS.find(s => s.id === card.source_id);
      return { ...card, skillCategory: s?.skillCategory || null };
    }
    if (card.card_type === 'challenge') {
      const c = DAILY_CHALLENGES[card.source_id];
      return { ...card, skillCategory: c?.skillCategory || null };
    }
    if (card.card_type === 'flashcard' && flashcards) {
      const f = flashcards.find(f => f.id === card.source_id);
      return { ...card, skillCategory: f?.skillCategory || null };
    }
    return card;
  });
}

export default function ReviewMode() {
  const { db, isReady } = useSupabaseDB();
  const [queue, setQueue] = useState([]);
  const [totalCards, setTotalCards] = useState(0);
  const [sessionAnswered, setSessionAnswered] = useState(new Set());
  const [stats, setStats] = useState(null);
  const [seeding, setSeeding] = useState(false);
  const [goodStreak, setGoodStreak] = useState(0);
  const [reviewed, setReviewed] = useState(0);
  const [newAchievement, setNewAchievement] = useState(null);
  const [selected, setSelected] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const flashcardsRef = useRef(null);

  // Pre-load flashcard data for enrichment
  useEffect(() => {
    import('../../data/flashcards.js')
      .then(m => { flashcardsRef.current = m.FLASHCARDS; })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!isReady || !db) return;
    loadCards();
  }, [db, isReady]);

  const loadCards = async () => {
    if (!db) return;
    const due = await db.getDueCards(20);
    const enriched = enrichCards(due, flashcardsRef.current);
    setQueue(enriched);
    setTotalCards(enriched.length);
    setSessionAnswered(new Set());
    setSelected(null);
    setStats(await db.getReviewStats());
    setReviewed(0);
    setGoodStreak(0);
  };

  const handleSeed = async () => {
    if (!db) return;
    setSeeding(true);
    await db.seedReviewCards(PRACTICE_SCENARIOS, DAILY_CHALLENGES);
    try {
      const module = await import('../../data/flashcards.js');
      if (module.FLASHCARDS) await db.seedFlashcards(module.FLASHCARDS);
    } catch { /* flashcards optional */ }
    setSeeding(false);
    loadCards();
  };

  const advance = async (quality) => {
    const card = queue[0];
    if (!card || !db || transitioning) return;

    await db.submitReview(card.id, QUALITY_MAP[quality]);
    const newCount = reviewed + 1;
    setReviewed(newCount);

    if (newCount % 10 === 0) {
      await db.awardXP('review', XP_RULES.reviewSession(), `Reviewed ${newCount} cards`);
      await db.updateQuestProgress('review', 10);
      const { newlyUnlocked } = await db.checkAchievements();
      if (newlyUnlocked.length > 0) setNewAchievement(newlyUnlocked[0]);
    }

    if (quality === 'good') setGoodStreak(prev => prev + 1);
    else setGoodStreak(0);

    const newAnswered = new Set(sessionAnswered);
    newAnswered.add(card.id);
    setSessionAnswered(newAnswered);

    setTransitioning(true);
    setTimeout(() => {
      if (newAnswered.size >= totalCards) {
        loadCards();
      } else {
        // Rotate answered card to back of queue
        setQueue(prev => [...prev.slice(1), prev[0]]);
        setSelected(null);
        setExplanation(null);
      }
      setTransitioning(false);
    }, 280);
  };

  const handleChoice = (choice) => {
    if (selected || transitioning) return;
    const card = queue[0];
    const correct = choice === card.skillCategory;
    setSelected({ choice, correct });
    setExplanation(getExplanation(card.skillCategory, choice, correct));
  };

  const handleReviewAgain = () => { setSelected(null); setExplanation(null); };

  const currentCard = queue[0];

  // Build options once per card (stable across re-renders)
  const options = useMemo(() => {
    if (!currentCard?.skillCategory) return null;
    return buildOptions(currentCard.skillCategory);
  }, [currentCard?.id]);

  return (
    <div className="review-mode">
      <FloatingOrbs color={theme.primary} count={6} />
      <AchievementToast achievementId={newAchievement} visible={!!newAchievement} onDone={() => setNewAchievement(null)} />
      <ModeHeader theme={theme} subtitle="Spaced repetition" />

      <div className="review-content">
        {stats && (
          <div className="review-stats-row">
            <div className="review-stat">
              <span className="review-stat-num">{stats.totalCards}</span>
              <span className="review-stat-label">Total</span>
            </div>
            <div className="review-stat">
              <span className="review-stat-num">{stats.cardsDue}</span>
              <span className="review-stat-label">Due</span>
            </div>
            <div className="review-stat">
              <span className="review-stat-num">{stats.cardsLearned}</span>
              <span className="review-stat-label">Learned</span>
            </div>
          </div>
        )}

        {!currentCard && (!stats || stats.totalCards === 0) ? (
          <div className="review-empty animate-fade-in">
            <BisaBalloon color={theme.primary} size={56} />
            <h2>No Review Cards Yet</h2>
            <p>Create cards from your practice scenarios and daily challenges to start reviewing.</p>
            <Button
              variant="mode"
              modeColor={theme.primary}
              onClick={handleSeed}
              loading={seeding}
              className="pulse-glow-btn"
            >
              Create Review Cards
            </Button>
          </div>
        ) : !currentCard ? (
          <div className="review-empty animate-fade-in">
            <BisaBalloon color="#C49240" size={48} />
            <h2>All Caught Up!</h2>
            <p>No cards due right now. Enya will have more for you later!</p>
          </div>
        ) : (
          <div className="review-card-area animate-fade-in">
            {/* Session progress */}
            <div className="review-session">
              <div className="review-progress-dots">
                {Array.from({ length: totalCards }).map((_, i) => (
                  <span
                    key={i}
                    className={`progress-pip${
                      i < sessionAnswered.size ? ' done'
                      : i === sessionAnswered.size ? ' current'
                      : ''
                    }`}
                    style={{ '--pip-color': theme.primary }}
                  />
                ))}
              </div>
              <span className="review-progress-info">{sessionAnswered.size} of {totalCards} answered</span>
            </div>

            {goodStreak >= 2 && (
              <div className="review-streak animate-scale-in">
                <Fire size={14} weight="fill" color="#D4A853" />
                <span>{goodStreak} streak!</span>
              </div>
            )}

            {/* Card */}
            <div className={cn('review-card-front-face', transitioning && 'card-exit')}>
              {currentCard.card_type && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ color: theme.primary, background: `${theme.primary}18` }}>
                  {currentCard.card_type}
                </span>
              )}
              <pre className="card-text">{extractContext(currentCard.front)}</pre>

              {/* Always show the strong examples so the user classifies those */}
              {currentCard.back && (
                <div className="mt-3 pt-3 border-t border-stone-100">
                  <pre className="card-text card-answer">{currentCard.back}</pre>
                </div>
              )}

              {/* After answering: reveal the weak question for self-reflection */}
              {selected && (() => {
                const weakQ = extractWeakQuestion(currentCard.front);
                return weakQ ? (
                  <div className="mt-3 pt-3 border-t border-stone-100">
                    <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1">Weak question</p>
                    <p className="card-text" style={{ fontStyle: 'italic' }}>"{weakQ}"</p>
                    <p className="text-xs text-stone-400 mt-2">What type of question is this one? Think about it.</p>
                  </div>
                ) : null;
              })()}
            </div>

            {/* Type identification choices */}
            {options ? (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-stone-400 text-center uppercase tracking-wide">
                  What type of question are the examples above?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {options.map((opt) => {
                    const isSelected = selected?.choice === opt;
                    const isCorrect = opt === currentCard.skillCategory;
                    const showResult = !!selected;

                    let style = 'border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50';
                    if (showResult && isCorrect) style = 'border-green-400 bg-green-50 text-green-800';
                    else if (showResult && isSelected && !isCorrect) style = 'border-red-300 bg-red-50 text-red-700';
                    else if (showResult) style = 'border-stone-100 bg-white text-stone-300';

                    return (
                      <button
                        key={opt}
                        disabled={!!selected}
                        onClick={() => handleChoice(opt)}
                        className={cn(
                          'flex items-center justify-between gap-2 px-3 py-3 rounded-xl border text-sm font-medium transition-all text-left',
                          style,
                          !selected && 'active:scale-95'
                        )}
                      >
                        <span>{TYPE_DISPLAY[opt] || opt}</span>
                        {showResult && isCorrect && <CheckCircle size={16} weight="fill" color="#16A34A" />}
                        {showResult && isSelected && !isCorrect && <XCircle size={16} weight="fill" color="#DC2626" />}
                      </button>
                    );
                  })}
                </div>

                {selected && (
                  <>
                    <p className={cn(
                      'text-center text-sm font-semibold mt-1',
                      selected.correct ? 'text-green-600' : 'text-red-500'
                    )}>
                      {selected.correct
                        ? `Correct! It's ${TYPE_DISPLAY[currentCard.skillCategory] || currentCard.skillCategory}`
                        : `Not quite — it's ${TYPE_DISPLAY[currentCard.skillCategory] || currentCard.skillCategory}`}
                    </p>
                    {explanation && (
                      <p className="text-sm text-stone-500 text-center leading-relaxed px-1">
                        {explanation}
                      </p>
                    )}
                    <div className="review-nav-buttons">
                      <button className="review-nav-btn review-nav-back" onClick={handleReviewAgain}>
                        Review Again
                      </button>
                      <button
                        className="review-nav-btn review-nav-next"
                        style={{ background: theme.primary }}
                        onClick={() => advance(selected.correct ? 'good' : 'again')}
                      >
                        Next Card
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* Fallback for cards without skillCategory: Show/Rate flow */
              !selected ? (
                <Button variant="mode" modeColor={theme.primary} onClick={() => setSelected({ choice: null, correct: null })}>
                  Show Answer
                </Button>
              ) : (
                <div className="review-nav-buttons">
                  <button className="review-nav-btn review-nav-back" onClick={handleReviewAgain}>
                    Review Again
                  </button>
                  <button
                    className="review-nav-btn review-nav-next"
                    style={{ background: theme.primary }}
                    onClick={() => advance('good')}
                  >
                    Next Card
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
