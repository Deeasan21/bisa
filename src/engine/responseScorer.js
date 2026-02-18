/**
 * System 4: Rule-Based Response Scorer (Tier 1 Feedback)
 *
 * First-pass scorer for Practice mode free-form responses.
 * Handles what it can with rules, flags ambiguous responses for AI review (Phase 2).
 */

import { FEEDBACK_MESSAGES } from '../data/feedbackMessages';

const OPEN_STARTERS = [
  'what', 'how', 'why', 'in what way', 'tell me about', 'can you describe',
  'what would', 'how might', 'what do you think', 'how do you feel',
  'what makes you', 'how would you', 'what if', 'in your experience',
  'what has been', 'how has', 'what led', 'can you walk me through',
];

const CLOSED_STARTERS = [
  'is ', 'are ', 'do ', 'did ', 'was ', 'were ', 'can ', 'will ',
  'should ', 'have ', 'has ', 'would you say', "don't you",
  "isn't ", "aren't ", "doesn't ", "didn't ",
];

const EMPATHY_MARKERS = [
  'feel', 'feeling', 'experience', 'going through', 'must be',
  'sounds like', 'seems like', 'imagine', 'perspective', 'emotional',
  'difficult', 'challenging', 'excited', 'worried', 'concerned',
];

const REFRAME_MARKERS = [
  'what if', 'another way', 'from their perspective', 'looking at it differently',
  'reframe', 'flip that', 'consider', 'suppose', 'imagine if',
  'what would happen if', 'how else could',
];

const DEPTH_MARKERS = [
  'why do you think', 'what caused', 'what led to', 'deeper',
  'underlying', 'root', 'behind', 'beneath', 'at the core',
  'fundamentally', 'what drives',
];

/**
 * Pick a random message from an array
 */
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Score a user's response against a practice scenario
 *
 * @param {string} response - The user's question
 * @param {object} scenario - The practice scenario (with keywords, skillCategory, etc.)
 * @returns {{ score: number, feedback: string[], techniques: string[], needsAIReview: boolean, breakdown: object }}
 */
export function scoreResponse(response, scenario) {
  const input = (response || '').trim();
  const lower = input.toLowerCase();
  const feedback = [];
  const techniques = [];
  const breakdown = {
    hasQuestion: false,
    adequateLength: false,
    isOpenEnded: false,
    keywordRelevance: 0,
    techniqueBonus: 0,
  };

  if (!input) {
    return {
      score: 0,
      feedback: ['Please write a question first!'],
      techniques: [],
      needsAIReview: false,
      breakdown,
    };
  }

  let score = 0;

  // 1. Question mark check (+10)
  if (input.includes('?')) {
    score += 10;
    breakdown.hasQuestion = true;
  } else {
    feedback.push(pick(FEEDBACK_MESSAGES.noQuestion));
    return {
      score: 10,
      feedback,
      techniques: [],
      needsAIReview: false,
      breakdown,
    };
  }

  // 2. Length check (+10)
  const wordCount = input.split(/\s+/).length;
  if (wordCount < 5) {
    feedback.push(pick(FEEDBACK_MESSAGES.tooShort));
    return {
      score: 20,
      feedback,
      techniques: [],
      needsAIReview: false,
      breakdown,
    };
  }
  score += 10;
  breakdown.adequateLength = true;

  // 3. Open vs. Closed detection (+20 if open when appropriate)
  const isOpen = OPEN_STARTERS.some(s => lower.startsWith(s));
  const isClosed = CLOSED_STARTERS.some(s => lower.startsWith(s));

  if (isOpen) {
    score += 20;
    breakdown.isOpenEnded = true;
  } else if (isClosed) {
    feedback.push(pick(FEEDBACK_MESSAGES.closedQuestion));
    // Still give some credit for asking
    score += 5;
  } else {
    // Neutral — could go either way
    score += 10;
  }

  // 4. Keyword relevance (up to +30)
  const keywords = scenario.keywords || [];
  if (keywords.length > 0) {
    const matched = keywords.filter(k => lower.includes(k.toLowerCase()));
    const relevance = matched.length / keywords.length;
    const keywordScore = Math.round(relevance * 30);
    score += keywordScore;
    breakdown.keywordRelevance = relevance;

    if (relevance >= 0.5) {
      feedback.push(pick(FEEDBACK_MESSAGES.goodRelevance));
    } else if (relevance > 0 && relevance < 0.3) {
      feedback.push(pick(FEEDBACK_MESSAGES.lowRelevance));
    }
  }

  // 5. Technique detection (up to +30)
  let techniqueBonus = 0;

  // Empathy markers
  if (EMPATHY_MARKERS.some(m => lower.includes(m))) {
    techniqueBonus += 10;
    techniques.push('empathy');
  }

  // Reframing markers
  if (REFRAME_MARKERS.some(m => lower.includes(m))) {
    techniqueBonus += 10;
    techniques.push('reframing');
  }

  // Depth/probing markers
  if (DEPTH_MARKERS.some(m => lower.includes(m))) {
    techniqueBonus += 10;
    techniques.push('probing');
  }

  // Follow-up indicator (references scenario context)
  const contextWords = (scenario.context || '').toLowerCase().split(/\s+/).filter(w => w.length > 4);
  const contextMatches = contextWords.filter(w => lower.includes(w)).length;
  if (contextMatches >= 3) {
    techniqueBonus += 5;
    techniques.push('follow-up');
  }

  score += Math.min(30, techniqueBonus);
  breakdown.techniqueBonus = Math.min(30, techniqueBonus);

  // Cap at 100
  score = Math.min(100, score);

  // Add technique feedback
  if (techniques.length > 0) {
    feedback.push(pick(FEEDBACK_MESSAGES.techniqueUsed).replace('{techniques}', techniques.join(', ')));
  }

  // Add overall feedback based on score
  if (score >= 80) {
    feedback.push(pick(FEEDBACK_MESSAGES.excellent));
  } else if (score >= 60) {
    feedback.push(pick(FEEDBACK_MESSAGES.good));
  } else if (score >= 40) {
    feedback.push(pick(FEEDBACK_MESSAGES.decent));
  } else {
    feedback.push(pick(FEEDBACK_MESSAGES.needsWork));
  }

  // 7. AI flag for ambiguous zone
  const needsAIReview = score >= 40 && score <= 75;

  return {
    score,
    feedback,
    techniques,
    needsAIReview,
    breakdown,
  };
}
