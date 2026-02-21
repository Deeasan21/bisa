/**
 * Burst Session Scorer
 *
 * Scores a Question Burst session by evaluating individual questions
 * and computing four scoring dimensions.
 */

import { scoreResponse } from './responseScorer';

const OPEN_STARTERS = [
  'what', 'how', 'why', 'in what way', 'tell me about', 'can you describe',
  'what would', 'how might', 'what do you think', 'how do you feel',
  'what makes you', 'how would you', 'what if', 'in your experience',
  'what has been', 'how has', 'what led', 'can you walk me through',
];

const COACHING_TIPS = {
  variety: [
    "Try mixing open and closed questions more. Aim for about 60-80% open-ended questions.",
    "Your question variety could improve. Start more questions with 'What' or 'How' to open them up.",
    "Great questioners balance open and closed questions. Try leading with open, then narrowing with closed.",
  ],
  depth: [
    "Your later questions didn't build much on the earlier ones. Try going deeper as the conversation progresses.",
    "Think of your questions like a funnel — start broad, then drill into specifics as you learn more.",
    "Practice building on answers. Each new question should dig a little deeper than the last.",
  ],
  techniques: [
    "Try incorporating more questioning techniques — empathy, reframing, and probing can transform your questions.",
    "Experiment with different approaches: show empathy, reframe the situation, or probe for root causes.",
    "Expand your toolkit. Using varied techniques makes your questions more powerful and insightful.",
  ],
  quality: [
    "Focus on crafting fewer, stronger questions rather than rapid-firing. Quality beats quantity.",
    "Take a beat before submitting each question. A well-phrased question gets much better answers.",
    "Make your questions more specific to the scenario. Reference details from the situation for higher relevance.",
  ],
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Score the variety dimension: open vs closed question ratio.
 * Peaks at 60-80% open = 100 points.
 */
function scoreVariety(scoredQuestions) {
  if (scoredQuestions.length === 0) return 0;

  const openCount = scoredQuestions.filter(q => {
    const lower = q.text.toLowerCase();
    return OPEN_STARTERS.some(s => lower.startsWith(s));
  }).length;

  const ratio = openCount / scoredQuestions.length;

  // Peak at 60-80% open
  if (ratio >= 0.6 && ratio <= 0.8) return 100;
  if (ratio > 0.8) return Math.round(100 - (ratio - 0.8) * 250); // taper above 80%
  if (ratio < 0.6) return Math.round((ratio / 0.6) * 100); // ramp up to 60%

  return Math.max(0, Math.min(100, Math.round(ratio * 100)));
}

/**
 * Score depth progression: second-half avg vs first-half avg.
 */
function scoreDepthProgression(scoredQuestions) {
  if (scoredQuestions.length < 2) return 50;

  const mid = Math.floor(scoredQuestions.length / 2);
  const firstHalf = scoredQuestions.slice(0, mid);
  const secondHalf = scoredQuestions.slice(mid);

  const firstAvg = firstHalf.reduce((s, q) => s + q.score, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((s, q) => s + q.score, 0) / secondHalf.length;

  const improvement = secondAvg - firstAvg;

  // Reward improvement, neutral for flat, penalize decline
  if (improvement >= 15) return 100;
  if (improvement >= 5) return 80;
  if (improvement >= 0) return 60;
  if (improvement >= -10) return 40;
  return 20;
}

/**
 * Score techniques: unique technique tags detected.
 * Each unique technique = 25 points, capped at 100.
 */
function scoreTechniques(scoredQuestions) {
  const allTechniques = new Set();
  for (const q of scoredQuestions) {
    for (const t of q.techniques) {
      allTechniques.add(t);
    }
  }
  return Math.min(100, allTechniques.size * 25);
}

/**
 * Score quality: average of top 5 questions.
 */
function scoreQualityOverQuantity(scoredQuestions) {
  if (scoredQuestions.length === 0) return 0;

  const sorted = [...scoredQuestions].sort((a, b) => b.score - a.score);
  const top5 = sorted.slice(0, 5);
  return Math.round(top5.reduce((s, q) => s + q.score, 0) / top5.length);
}

/**
 * Pick a coaching tip based on the weakest dimension.
 */
function generateCoachingTip(breakdown) {
  const dims = [
    { key: 'variety', score: breakdown.variety },
    { key: 'depth', score: breakdown.depth },
    { key: 'techniques', score: breakdown.techniques },
    { key: 'quality', score: breakdown.quality },
  ];

  dims.sort((a, b) => a.score - b.score);
  const weakest = dims[0].key;

  return pick(COACHING_TIPS[weakest]);
}

/**
 * Score a complete Question Burst session.
 *
 * @param {string[]} questions - Array of question strings the user submitted
 * @param {object} scenario - The burst scenario (with keywords, context, skillCategory)
 * @returns {object} Full scoring results
 */
export function scoreBurst(questions, scenario) {
  if (!questions || questions.length === 0) {
    return {
      totalScore: 0,
      scoredQuestions: [],
      openRatio: 0,
      depthProgression: 0,
      techniquesDetected: [],
      strongestQuestion: null,
      coachingTip: 'Try to ask at least a few questions next time!',
      breakdown: { variety: 0, depth: 0, techniques: 0, quality: 0 },
    };
  }

  // Score each question individually
  const scoredQuestions = questions.map((text, index) => {
    const result = scoreResponse(text, scenario);
    return {
      index,
      text,
      score: result.score,
      feedback: result.feedback,
      techniques: result.techniques,
      isOpen: OPEN_STARTERS.some(s => text.toLowerCase().startsWith(s)),
    };
  });

  // Calculate four dimensions
  const variety = scoreVariety(scoredQuestions);
  const depth = scoreDepthProgression(scoredQuestions);
  const techniques = scoreTechniques(scoredQuestions);
  const quality = scoreQualityOverQuantity(scoredQuestions);

  const breakdown = { variety, depth, techniques, quality };
  const totalScore = Math.round(0.25 * variety + 0.25 * depth + 0.25 * techniques + 0.25 * quality);

  // Collect all unique techniques
  const techniquesDetected = [...new Set(scoredQuestions.flatMap(q => q.techniques))];

  // Find strongest question
  const strongest = [...scoredQuestions].sort((a, b) => b.score - a.score)[0] || null;

  // Open ratio
  const openCount = scoredQuestions.filter(q => q.isOpen).length;
  const openRatio = Math.round((openCount / scoredQuestions.length) * 100);

  // Depth progression value
  const depthProgression = depth;

  const coachingTip = generateCoachingTip(breakdown);

  return {
    totalScore,
    scoredQuestions,
    openRatio,
    depthProgression,
    techniquesDetected,
    strongestQuestion: strongest,
    coachingTip,
    breakdown,
  };
}
