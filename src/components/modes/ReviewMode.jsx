import { useState, useEffect } from 'react';
import { Cards, CheckCircle, Fire } from '@phosphor-icons/react';
import { MODE_THEMES } from '../../themes/modeThemes';
import { PRACTICE_SCENARIOS } from '../../data/practiceScenarios';
import { DAILY_CHALLENGES } from '../../data/dailyChallenges';
import { useDatabase } from '../../hooks/useDatabase';
import { seedReviewCards, seedFlashcards, getDueCards, submitReview, getReviewStats, getOverallProgress } from '../../utils/database';
import { awardXP, XP_RULES } from '../../engine/xpSystem';
import { updateQuestProgress } from '../../engine/dailyQuests';
import { checkAchievements } from '../../engine/achievements';
import ModeHeader from '../layout/ModeHeader';
import Button from '../common/Button';
import Card from '../common/Card';
import Badge from '../common/Badge';
import ProgressBar from '../common/ProgressBar';
import './ReviewMode.css';

const theme = MODE_THEMES.review;

const QUALITY_MAP = {
  again: 0,
  hard: 3,
  good: 4,
  easy: 5,
};

export default function ReviewMode() {
  const { db, isReady } = useDatabase();
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [stats, setStats] = useState(null);
  const [seeding, setSeeding] = useState(false);
  const [goodStreak, setGoodStreak] = useState(0);
  const [reviewed, setReviewed] = useState(0);

  useEffect(() => {
    if (!isReady || !db) return;
    loadCards();
  }, [db, isReady]);

  const loadCards = () => {
    const due = getDueCards(db, 20);
    setCards(due);
    setCurrentIndex(0);
    setShowAnswer(false);
    setStats(getReviewStats(db));
    setReviewed(0);
    setGoodStreak(0);
  };

  const handleSeed = () => {
    if (!db) return;
    setSeeding(true);

    // Seed from practice scenarios and challenges
    seedReviewCards(db, PRACTICE_SCENARIOS, DAILY_CHALLENGES);

    // Also seed from flashcards data if available
    try {
      import('../../data/flashcards.js').then(module => {
        if (module.FLASHCARDS) {
          seedFlashcards(db, module.FLASHCARDS);
        }
        setSeeding(false);
        loadCards();
      }).catch(() => {
        setSeeding(false);
        loadCards();
      });
    } catch (e) {
      setSeeding(false);
      loadCards();
    }
  };

  const handleRate = (quality) => {
    const card = cards[currentIndex];
    if (!card || !db) return;

    submitReview(db, card.id, QUALITY_MAP[quality]);
    setReviewed(prev => {
      const newCount = prev + 1;
      // Award XP for every card, update quest for every 10 reviewed
      if (newCount % 10 === 0) {
        awardXP(db, 'review', XP_RULES.reviewSession(), `Reviewed ${newCount} cards`);
        updateQuestProgress(db, 'review', 10);
        checkAchievements(db, getOverallProgress(db));
      }
      return newCount;
    });

    // Track good/easy streak
    if (quality === 'good' || quality === 'easy') {
      setGoodStreak(prev => prev + 1);
    } else {
      setGoodStreak(0);
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex < cards.length) {
      setCurrentIndex(nextIndex);
      setShowAnswer(false);
    } else {
      loadCards();
    }
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="review-mode">
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
            <Cards size={56} weight="duotone" color={theme.primary} />
            <h2>No Review Cards Yet</h2>
            <p>Create cards from your practice scenarios and daily challenges to start reviewing.</p>
            <Button
              variant="mode"
              modeColor={theme.primary}
              onClick={handleSeed}
              loading={seeding}
            >
              Create Review Cards
            </Button>
          </div>
        ) : !currentCard ? (
          <div className="review-empty animate-fade-in">
            <CheckCircle size={56} weight="fill" color="#10B981" />
            <h2>All Caught Up!</h2>
            <p>No cards due for review right now. Come back later!</p>
          </div>
        ) : (
          <div className="review-card-area animate-fade-in">
            {/* Session progress bar */}
            <div className="review-session">
              <span className="review-progress-info">
                Card {currentIndex + 1} of {cards.length}
              </span>
              <ProgressBar
                value={reviewed}
                max={cards.length}
                color={theme.primary}
                size="sm"
                animate
              />
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
              className={`review-card-3d${showAnswer ? ' flipped' : ''}`}
              onClick={() => !showAnswer && setShowAnswer(true)}
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
