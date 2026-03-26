import { useState, useEffect } from 'react';
import { Cards, CheckCircle, Fire } from '@phosphor-icons/react';
import { MODE_THEMES } from '../../themes/modeThemes';
import { PRACTICE_SCENARIOS } from '../../data/practiceScenarios';
import { DAILY_CHALLENGES } from '../../data/dailyChallenges';
import { useSupabaseDB } from '../../hooks/useSupabaseDB';
import { XP_RULES } from '../../engine/xpSystem';
import ModeHeader from '../layout/ModeHeader';
import Button from '../common/Button';
import Card from '../common/Card';
import Badge from '../common/Badge';
import ProgressBar from '../common/ProgressBar';
import AchievementToast from '../common/AchievementToast';
import FloatingOrbs from '../common/FloatingOrbs';
import BisaBalloon from '../common/BisaBalloon';
import './ReviewMode.css';

const theme = MODE_THEMES.review;

const QUALITY_MAP = {
  again: 0,
  hard: 3,
  good: 4,
  easy: 5,
};

export default function ReviewMode() {
  const { db, isReady } = useSupabaseDB();
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [stats, setStats] = useState(null);
  const [seeding, setSeeding] = useState(false);
  const [goodStreak, setGoodStreak] = useState(0);
  const [reviewed, setReviewed] = useState(0);
  const [newAchievement, setNewAchievement] = useState(null);

  useEffect(() => {
    if (!isReady || !db) return;
    loadCards();
  }, [db, isReady]);

  const loadCards = async () => {
    if (!db) return;
    const due = await db.getDueCards(20);
    setCards(due);
    setCurrentIndex(0);
    setShowAnswer(false);
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
      if (module.FLASHCARDS) {
        await db.seedFlashcards(module.FLASHCARDS);
      }
    } catch { /* flashcards optional */ }

    setSeeding(false);
    loadCards();
  };

  const [transitioning, setTransitioning] = useState(false);

  const handleRate = async (quality) => {
    const card = cards[currentIndex];
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

    if (quality === 'good' || quality === 'easy') {
      setGoodStreak(prev => prev + 1);
    } else {
      setGoodStreak(0);
    }

    // Animate card out then bring next in
    setTransitioning(true);
    setTimeout(() => {
      const nextIndex = currentIndex + 1;
      if (nextIndex < cards.length) {
        setCurrentIndex(nextIndex);
        setShowAnswer(false);
      } else {
        loadCards();
      }
      setTransitioning(false);
    }, 280);
  };

  const currentCard = cards[currentIndex];

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
            <BisaBalloon color="#10B981" size={48} />
            <h2>All Caught Up!</h2>
            <p>No cards due right now. Enya will have more for you later!</p>
          </div>
        ) : (
          <div className="review-card-area animate-fade-in">
            {/* Session progress */}
            <div className="review-session">
              <div className="review-progress-dots">
                {cards.map((_, i) => (
                  <span
                    key={i}
                    className={`progress-pip${i < currentIndex ? ' done' : i === currentIndex ? ' current' : ''}`}
                    style={{ '--pip-color': theme.primary }}
                  />
                ))}
              </div>
              <span className="review-progress-info">
                Card {currentIndex + 1} of {cards.length}
              </span>
            </div>

            {/* Good streak counter */}
            {goodStreak >= 2 && (
              <div className="review-streak animate-scale-in">
                <Fire size={14} weight="fill" color="#F59E0B" />
                <span>{goodStreak} streak!</span>
              </div>
            )}

            {/* 3D Flip Card */}
            <div
              className={`review-card-3d${showAnswer ? ' flipped' : ''}${transitioning ? ' card-exit' : ''}`}
              onClick={() => !transitioning && setShowAnswer(v => !v)}
            >
              <div className="review-card-inner">
                <div className="review-card-front-face">
                  {currentCard.card_type && (
                    <Badge
                      text={currentCard.card_type}
                      color={theme.primary}
                      variant="soft"
                      size="sm"
                    />
                  )}
                  <pre className="card-text">{currentCard.front}</pre>
                  {!showAnswer && (
                    <span className="tap-hint">Tap to reveal</span>
                  )}
                </div>
                <div className="review-card-back-face">
                  <pre className="card-text card-answer">{currentCard.back}</pre>
                </div>
              </div>
            </div>

            {!showAnswer ? (
              <Button variant="mode" modeColor={theme.primary} onClick={() => setShowAnswer(true)}>
                Show Answer
              </Button>
            ) : (
              <div className="rating-buttons">
                <button className="rate-btn rate-again" onClick={() => handleRate('again')}>
                  <span>Again</span>
                </button>
                <button className="rate-btn rate-hard" onClick={() => handleRate('hard')}>
                  <span>Hard</span>
                </button>
                <button className="rate-btn rate-good" onClick={() => handleRate('good')}>
                  <span>Good</span>
                </button>
                <button className="rate-btn rate-easy" onClick={() => handleRate('easy')}>
                  <span>Easy</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
