/**
 * System 1: Adaptive Difficulty Engine
 *
 * Tracks user performance per mode and per skill category,
 * adjusting difficulty tier based on rolling averages.
 *
 * Tiers: 1 (Beginner) → 2 (Developing) → 3 (Intermediate) → 4 (Advanced) → 5 (Expert)
 */

import { queryStmt, runStmt, saveDatabase } from '../utils/database';

export const DIFFICULTY_TIERS = {
  1: 'Beginner',
  2: 'Developing',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Expert',
};

export const SKILL_CATEGORIES = [
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

const MAX_ROLLING = 5;
const PROMOTE_THRESHOLD = 85;
const DEMOTE_THRESHOLD = 50;
const SESSIONS_TO_CHANGE = 3;

/**
 * Record a score for a mode + category and adjust difficulty
 */
export function recordScore(db, mode, category, score) {
  if (!db) return;

  // Insert into user_scores
  runStmt(db,
    "INSERT INTO user_scores (mode, category, score, difficulty_tier, created_at) VALUES (?, ?, ?, ?, datetime('now'))",
    [mode, category, getCurrentTier(db, category)]
  );

  // Update rolling scores for this category
  const row = queryStmt(db, "SELECT rolling_scores, current_tier FROM difficulty_tiers WHERE category = ?", [category]);

  let rolling = [];
  let currentTier = 1;

  if (row.length > 0) {
    try { rolling = JSON.parse(row[0].rolling_scores || '[]'); } catch { rolling = []; }
    currentTier = row[0].current_tier || 1;
  }

  // Add new score, keep last MAX_ROLLING
  rolling.push(score);
  if (rolling.length > MAX_ROLLING) rolling = rolling.slice(-MAX_ROLLING);

  // Calculate rolling average
  const avg = rolling.reduce((a, b) => a + b, 0) / rolling.length;

  // Check if we should adjust tier (need at least SESSIONS_TO_CHANGE scores)
  let newTier = currentTier;
  if (rolling.length >= SESSIONS_TO_CHANGE) {
    // Check last SESSIONS_TO_CHANGE scores
    const recentScores = rolling.slice(-SESSIONS_TO_CHANGE);
    const recentAvg = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;

    if (recentAvg > PROMOTE_THRESHOLD && currentTier < 5) {
      newTier = currentTier + 1;
      rolling = []; // Reset rolling on tier change
    } else if (recentAvg < DEMOTE_THRESHOLD && currentTier > 1) {
      newTier = currentTier - 1;
      rolling = [];
    }
  }

  // Upsert difficulty tier
  if (row.length > 0) {
    runStmt(db,
      "UPDATE difficulty_tiers SET current_tier = ?, rolling_scores = ?, updated_at = datetime('now') WHERE category = ?",
      [newTier, JSON.stringify(rolling), category]
    );
  } else {
    runStmt(db,
      "INSERT INTO difficulty_tiers (category, current_tier, rolling_scores) VALUES (?, ?, ?)",
      [category, newTier, JSON.stringify(rolling)]
    );
  }

  saveDatabase(db);
  return { previousTier: currentTier, newTier, avg: Math.round(avg), promoted: newTier > currentTier, demoted: newTier < currentTier };
}

/**
 * Get current difficulty tier for a category
 */
export function getCurrentTier(db, category) {
  if (!db) return 1;
  const row = queryStmt(db, "SELECT current_tier FROM difficulty_tiers WHERE category = ?", [category]);
  return row.length > 0 ? (row[0].current_tier || 1) : 1;
}

/**
 * Get all category tiers
 */
export function getAllTiers(db) {
  if (!db) return {};
  const rows = queryStmt(db, "SELECT category, current_tier, rolling_scores FROM difficulty_tiers", []);
  const tiers = {};
  for (const row of rows) {
    tiers[row.category] = {
      tier: row.current_tier || 1,
      rollingScores: JSON.parse(row.rolling_scores || '[]'),
    };
  }
  // Fill in defaults for missing categories
  for (const cat of SKILL_CATEGORIES) {
    if (!tiers[cat]) tiers[cat] = { tier: 1, rollingScores: [] };
  }
  return tiers;
}

/**
 * Get rolling average for a category
 */
export function getCategoryAverage(db, category) {
  if (!db) return 0;
  const row = queryStmt(db, "SELECT rolling_scores FROM difficulty_tiers WHERE category = ?", [category]);
  if (row.length === 0) return 0;
  const scores = JSON.parse(row[0].rolling_scores || '[]');
  if (scores.length === 0) return 0;
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

/**
 * Filter content by appropriate difficulty tier for a category
 * Returns items at or near the user's current tier
 */
export function filterByDifficulty(items, db, category) {
  const tier = getCurrentTier(db, category);
  const tierMap = { beginner: 1, developing: 2, intermediate: 3, advanced: 4, expert: 5, master: 5 };

  // Include items at current tier, plus one above and below for variety
  return items.filter(item => {
    const itemTier = item.tier || tierMap[item.difficultyTier] || 1;
    return Math.abs(itemTier - tier) <= 1;
  }).sort((a, b) => {
    // Prioritize current tier items
    const aTier = a.tier || tierMap[a.difficultyTier] || 1;
    const bTier = b.tier || tierMap[b.difficultyTier] || 1;
    return Math.abs(aTier - tier) - Math.abs(bTier - tier);
  });
}

/**
 * Get the user's overall difficulty level (average across all categories)
 */
export function getOverallDifficulty(db) {
  if (!db) return 1;
  const tiers = getAllTiers(db);
  const values = Object.values(tiers).map(t => t.tier);
  if (values.length === 0) return 1;
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}
