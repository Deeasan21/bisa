/**
 * System 3: Smart Recommendations Engine
 *
 * Analyzes user performance to recommend what to work on next.
 * Identifies weak and stale categories, generates prioritized recommendations.
 */

import { queryStmt } from '../utils/database';
import { SKILL_CATEGORIES, getCategoryAverage, getAllTiers } from './adaptiveDifficulty';

const STALE_DAYS = 5;

/**
 * Get the last activity date per category
 */
function getCategoryLastActive(db) {
  if (!db) return {};
  const rows = queryStmt(db,
    "SELECT category, MAX(created_at) as last_active FROM user_scores GROUP BY category",
    []
  );
  const result = {};
  for (const row of rows) {
    result[row.category] = row.last_active;
  }
  return result;
}

/**
 * Calculate days since last activity for a category
 */
function daysSince(dateStr) {
  if (!dateStr) return Infinity;
  const d = new Date(dateStr);
  const now = new Date();
  return Math.floor((now - d) / (1000 * 60 * 60 * 24));
}

/**
 * Analyze all categories and return recommendations
 */
export function getRecommendations(db) {
  if (!db) return { weak: [], stale: [], recommended: [], strongestCategory: null, weakestCategory: null };

  const lastActive = getCategoryLastActive(db);
  const tiers = getAllTiers(db);

  const categories = SKILL_CATEGORIES.map(cat => {
    const avg = getCategoryAverage(db, cat);
    const tier = tiers[cat]?.tier || 1;
    const staleDays = daysSince(lastActive[cat]);
    const isStale = staleDays >= STALE_DAYS;
    const isWeak = avg > 0 && avg < 60;
    const isNew = avg === 0;

    let priority = 0;
    if (isWeak && isStale) priority = 4; // highest
    else if (isNew) priority = 3;
    else if (isWeak) priority = 2;
    else if (isStale) priority = 1;

    return { category: cat, avg, tier, staleDays, isStale, isWeak, isNew, priority };
  });

  // Sort by priority descending, then by avg ascending (weakest first)
  categories.sort((a, b) => b.priority - a.priority || a.avg - b.avg);

  const weak = categories.filter(c => c.isWeak);
  const stale = categories.filter(c => c.isStale && !c.isWeak);
  const recommended = categories.filter(c => c.priority > 0).slice(0, 3);

  // Find strongest and weakest (among categories with data)
  const withData = categories.filter(c => c.avg > 0);
  const strongestCategory = withData.length > 0
    ? withData.reduce((a, b) => a.avg > b.avg ? a : b)
    : null;
  const weakestCategory = withData.length > 0
    ? withData.reduce((a, b) => a.avg < b.avg ? a : b)
    : null;

  return { weak, stale, recommended, strongestCategory, weakestCategory, all: categories };
}

/**
 * Get a recommended mode based on user's weaknesses
 * Returns a mode key and reason
 */
export function getRecommendedMode(db) {
  if (!db) return { mode: 'practice', reason: 'Start with practice to build your skills' };

  const { recommended, weakestCategory } = getRecommendations(db);

  if (recommended.length === 0) {
    return { mode: 'practice', reason: 'Try a practice scenario to get started' };
  }

  const top = recommended[0];

  if (top.isNew) {
    return {
      mode: 'practice',
      reason: `Try a ${top.category} scenario to discover your level`,
      category: top.category,
    };
  }

  if (top.isWeak && top.isStale) {
    return {
      mode: 'learn',
      reason: `Review ${top.category} — it's been ${top.staleDays} days and needs practice`,
      category: top.category,
    };
  }

  if (top.isWeak) {
    return {
      mode: 'practice',
      reason: `Focus on ${top.category} — your average is ${top.avg}%`,
      category: top.category,
    };
  }

  if (top.isStale) {
    return {
      mode: 'review',
      reason: `${top.category} is getting rusty — review some cards`,
      category: top.category,
    };
  }

  return { mode: 'practice', reason: 'Keep building your questioning skills' };
}

/**
 * Get recommended categories for daily quest generation
 * Returns 1-2 weak categories to target
 */
export function getQuestCategories(db) {
  const { recommended } = getRecommendations(db);
  return recommended.slice(0, 2).map(r => r.category);
}
