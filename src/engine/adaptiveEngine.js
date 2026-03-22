// Adaptive Difficulty Engine for Bisa
// Pure JavaScript — no external dependencies

const TIERS = ['beginner', 'intermediate', 'advanced', 'expert', 'master'];

const TIER_THRESHOLDS = [
  { tier: 'master', min: 90 },
  { tier: 'expert', min: 75 },
  { tier: 'advanced', min: 55 },
  { tier: 'intermediate', min: 30 },
  { tier: 'beginner', min: 0 },
];

const ALL_CATEGORIES = [
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

// --- Helpers ---

/** Exponential decay weight: more recent scores matter more. */
function weightedAverage(scores) {
  if (!scores.length) return 0;

  // Sort oldest → newest so the last entry is the most recent
  const sorted = [...scores].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const decay = 0.15; // decay rate per position from newest
  let totalWeight = 0;
  let weightedSum = 0;

  for (let i = 0; i < sorted.length; i++) {
    // Position 0 = oldest, sorted.length-1 = newest
    const recency = i; // higher = more recent
    const weight = Math.exp(-decay * (sorted.length - 1 - recency));
    weightedSum += sorted[i].score * weight;
    totalWeight += weight;
  }

  return totalWeight > 0 ? weightedSum / totalWeight : 0;
}

function tierFromScore(score) {
  for (const { tier, min } of TIER_THRESHOLDS) {
    if (score >= min) return tier;
  }
  return 'beginner';
}

function tierIndex(tier) {
  return TIERS.indexOf(tier);
}

function clampTier(index) {
  return TIERS[Math.max(0, Math.min(TIERS.length - 1, index))];
}

/**
 * Compute trend from an array of scores (must already be sorted oldest → newest).
 * Uses simple linear regression on the score values.
 */
function computeTrend(scores) {
  if (scores.length < 2) return 'stable';

  const sorted = [...scores].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const n = sorted.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;

  for (let i = 0; i < n; i++) {
    sumX += i;
    sumY += sorted[i].score;
    sumXY += i * sorted[i].score;
    sumXX += i * i;
  }

  const denom = n * sumXX - sumX * sumX;
  if (denom === 0) return 'stable';

  const slope = (n * sumXY - sumX * sumY) / denom;

  // Thresholds: slope per attempt position
  if (slope > 1.5) return 'improving';
  if (slope < -1.5) return 'declining';
  return 'stable';
}

/**
 * Confidence is based on the number of attempts. More data → higher confidence.
 * Caps at 1.0 around 15+ attempts.
 */
function computeConfidence(count) {
  if (count <= 0) return 0;
  return Math.min(1, 1 - Math.exp(-0.2 * count));
}

// --- Exported Functions ---

/**
 * Calculate the user's overall adaptive level from recent attempt scores.
 *
 * @param {Array<{category: string, score: number, date: string}>} scores
 * @returns {{ level: string, confidence: number, trend: string }}
 */
export function calculateAdaptiveLevel(scores) {
  if (!scores || scores.length === 0) {
    return { level: 'beginner', confidence: 0, trend: 'stable' };
  }

  const avg = weightedAverage(scores);
  const level = tierFromScore(avg);
  const confidence = computeConfidence(scores.length);
  const trend = computeTrend(scores);

  return {
    level,
    confidence: Math.round(confidence * 100) / 100,
    trend,
  };
}

/**
 * For a specific category, determine the difficulty tier to serve next.
 * If improving → push up one tier; declining → drop one; stable → stay.
 *
 * @param {string} category
 * @param {Array<{category: string, score: number, date: string}>} scores
 * @returns {string} difficulty tier
 */
export function getAdaptiveDifficulty(category, scores) {
  const catScores = (scores || []).filter((s) => s.category === category);

  if (catScores.length === 0) return 'beginner';

  const avg = weightedAverage(catScores);
  const baseTier = tierFromScore(avg);
  const trend = computeTrend(catScores);
  const baseIndex = tierIndex(baseTier);

  if (trend === 'improving') return clampTier(baseIndex + 1);
  if (trend === 'declining') return clampTier(baseIndex - 1);
  return baseTier;
}

/**
 * Returns true if the user should be auto-promoted in this category.
 * Requires 3+ recent attempts above the upper threshold of their current tier.
 *
 * @param {string} category
 * @param {Array<{category: string, score: number, date: string}>} scores
 * @returns {boolean}
 */
export function shouldPromote(category, scores) {
  const catScores = (scores || []).filter((s) => s.category === category);
  if (catScores.length < 3) return false;

  const avg = weightedAverage(catScores);
  const currentTier = tierFromScore(avg);
  const currentIndex = tierIndex(currentTier);

  // Already at master — cannot promote further
  if (currentIndex >= TIERS.length - 1) return false;

  // The threshold to cross is the min score for the next tier up
  const nextTierMin = TIER_THRESHOLDS.find(
    (t) => t.tier === TIERS[currentIndex + 1]
  )?.min;
  if (nextTierMin == null) return false;

  // Check the 3 most recent attempts
  const recent = [...catScores]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return recent.every((s) => s.score >= nextTierMin);
}

/**
 * Returns true if the user should be auto-demoted in this category.
 * Requires 3+ recent attempts below the lower threshold of their current tier.
 *
 * @param {string} category
 * @param {Array<{category: string, score: number, date: string}>} scores
 * @returns {boolean}
 */
export function shouldDemote(category, scores) {
  const catScores = (scores || []).filter((s) => s.category === category);
  if (catScores.length < 3) return false;

  const avg = weightedAverage(catScores);
  const currentTier = tierFromScore(avg);
  const currentIndex = tierIndex(currentTier);

  // Already at beginner — cannot demote further
  if (currentIndex <= 0) return false;

  // The threshold to drop below is the min score for the current tier
  const currentTierMin = TIER_THRESHOLDS.find(
    (t) => t.tier === currentTier
  )?.min;
  if (currentTierMin == null) return false;

  // Check the 3 most recent attempts
  const recent = [...catScores]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return recent.every((s) => s.score < currentTierMin);
}

/**
 * Returns categories sorted by weakness (lowest weighted average first).
 *
 * @param {Array<{category: string, score: number, date: string}>} allScores
 * @returns {Array<{category: string, avg: number, attempts: number, trend: string}>}
 */
export function getWeakCategories(allScores) {
  if (!allScores || allScores.length === 0) return [];

  const grouped = {};
  for (const s of allScores) {
    if (!grouped[s.category]) grouped[s.category] = [];
    grouped[s.category].push(s);
  }

  const results = Object.entries(grouped).map(([category, catScores]) => ({
    category,
    avg: Math.round(weightedAverage(catScores) * 10) / 10,
    attempts: catScores.length,
    trend: computeTrend(catScores),
  }));

  // Sort weakest first (lowest avg)
  results.sort((a, b) => a.avg - b.avg);

  return results;
}

/**
 * Detects anti-patterns across the user's scores.
 *
 * @param {Array<{category: string, score: number, date: string}>} allScores
 * @returns {Array<{pattern: string, label: string, description: string, relatedCategories: string[]}>}
 */
export function getAntiPatterns(allScores) {
  if (!allScores || allScores.length === 0) return [];

  // Build per-category averages
  const avgByCategory = {};
  const grouped = {};
  for (const s of allScores) {
    if (!grouped[s.category]) grouped[s.category] = [];
    grouped[s.category].push(s);
  }
  for (const [cat, catScores] of Object.entries(grouped)) {
    avgByCategory[cat] = weightedAverage(catScores);
  }

  const LOW = 40; // threshold to consider a category "low"
  const detected = [];

  const definitions = [
    {
      pattern: 'too_closed',
      label: 'Too Many Closed Questions',
      description:
        'You tend to ask closed-ended questions that limit conversation. Practice turning yes/no questions into open-ended ones.',
      relatedCategories: ['Open vs. Closed'],
      check: () => (avgByCategory['Open vs. Closed'] ?? 100) < LOW,
    },
    {
      pattern: 'too_leading',
      label: 'Leading or Biased Framing',
      description:
        'Your questions may unintentionally steer the other person toward a specific answer. Focus on neutral framing.',
      relatedCategories: ['Framing'],
      check: () => (avgByCategory['Framing'] ?? 100) < LOW,
    },
    {
      pattern: 'surface_level',
      label: 'Staying on the Surface',
      description:
        "You're not digging deep enough. Combine probing questions with follow-ups to uncover root causes and richer insights.",
      relatedCategories: ['Probing', 'Follow-up'],
      check: () =>
        (avgByCategory['Probing'] ?? 100) < LOW &&
        (avgByCategory['Follow-up'] ?? 100) < LOW,
    },
    {
      pattern: 'missing_empathy',
      label: 'Missing the Human Element',
      description:
        "Your questions may feel transactional. Show you care about the person behind the answers — acknowledge emotions and read the room.",
      relatedCategories: ['Empathy', 'Body Language'],
      check: () =>
        (avgByCategory['Empathy'] ?? 100) < LOW &&
        (avgByCategory['Body Language'] ?? 100) < LOW,
    },
    {
      pattern: 'no_reflection',
      label: 'Skipping Self-Reflection',
      description:
        'Growth comes from reviewing your own questioning habits. Take time to reflect on what worked and what you could improve.',
      relatedCategories: ['Self-Reflection'],
      check: () => (avgByCategory['Self-Reflection'] ?? 100) < LOW,
    },
    {
      pattern: 'cultural_blindspot',
      label: 'Cultural Blind Spot',
      description:
        'Different cultures have different norms around questioning. Build awareness to ask questions that are respectful across contexts.',
      relatedCategories: ['Cultural Awareness'],
      check: () => (avgByCategory['Cultural Awareness'] ?? 100) < LOW,
    },
    {
      pattern: 'unclear_questions',
      label: 'Unclear or Vague Questions',
      description:
        'Your questions may lack specificity. Use clarifying techniques to make your intent clear and get more useful answers.',
      relatedCategories: ['Clarifying'],
      check: () => (avgByCategory['Clarifying'] ?? 100) < LOW,
    },
    {
      pattern: 'weak_leadership_questions',
      label: 'Weak Leadership Questions',
      description:
        'Effective leaders ask questions that empower others. Practice questions that coach, delegate, and inspire rather than interrogate.',
      relatedCategories: ['Leadership'],
      check: () => (avgByCategory['Leadership'] ?? 100) < LOW,
    },
  ];

  for (const def of definitions) {
    if (def.check()) {
      detected.push({
        pattern: def.pattern,
        label: def.label,
        description: def.description,
        relatedCategories: def.relatedCategories,
      });
    }
  }

  return detected;
}
