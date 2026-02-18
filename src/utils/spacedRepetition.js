/**
 * SM-2 Spaced Repetition Algorithm Implementation
 *
 * Quality ratings:
 * 0 - Complete blackout, no recall
 * 1 - Incorrect response, but remembered upon seeing answer
 * 2 - Incorrect response, but answer seemed easy to recall
 * 3 - Correct response with serious difficulty
 * 4 - Correct response after hesitation
 * 5 - Perfect response with no hesitation
 */

/**
 * Calculate the next review parameters based on SM-2 algorithm
 *
 * @param {number} quality - Quality rating 0-5
 * @param {number} currentEaseFactor - Current ease factor (minimum 1.3)
 * @param {number} currentRepetitions - Number of consecutive correct reviews
 * @param {number} currentInterval - Current interval in days
 * @returns {{ newInterval: number, newEaseFactor: number, newRepetitions: number, nextReviewDate: string }}
 */
export function calculateNextReview(quality, currentEaseFactor, currentRepetitions, currentInterval) {
  // Ensure quality is between 0-5
  quality = Math.max(0, Math.min(5, quality));

  let newEaseFactor = currentEaseFactor;
  let newRepetitions = currentRepetitions;
  let newInterval = currentInterval;

  if (quality >= 3) {
    // Correct response
    if (newRepetitions === 0) {
      newInterval = 1;
    } else if (newRepetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(currentInterval * currentEaseFactor);
    }
    newRepetitions = currentRepetitions + 1;
  } else {
    // Incorrect response - reset
    newRepetitions = 0;
    newInterval = 1;
  }

  // Update ease factor
  newEaseFactor = currentEaseFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  // Minimum ease factor is 1.3
  if (newEaseFactor < 1.3) {
    newEaseFactor = 1.3;
  }

  // Calculate next review date
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + newInterval);

  return {
    newInterval,
    newEaseFactor,
    newRepetitions,
    nextReviewDate: nextDate.toISOString()
  };
}
