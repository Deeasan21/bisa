/**
 * System 2: BPQ Scoring (Bisa Proficiency Quotient)
 *
 * A single 0-1000 score representing overall questioning skill.
 * Category score = weighted combination of avg score, exercise count, consistency, and improvement trend.
 * Overall BPQ = weighted average of all category scores.
 */

import { query, queryStmt, runStmt, saveDatabase } from '../utils/database';
import { SKILL_CATEGORIES } from './adaptiveDifficulty';

export const BPQ_LEVELS = [
  { min: 0, max: 149, label: 'Curious Beginner' },
  { min: 150, max: 299, label: 'Active Listener' },
  { min: 300, max: 449, label: 'Thoughtful Asker' },
  { min: 450, max: 599, label: 'Skilled Questioner' },
  { min: 600, max: 749, label: 'Question Strategist' },
  { min: 750, max: 899, label: 'Master Communicator' },
  { min: 900, max: 1000, label: 'Question Sage' },
];

/**
 * Get BPQ level label for a score
 */
export function getBPQLevel(score) {
  for (const level of BPQ_LEVELS) {
    if (score >= level.min && score <= level.max) return level.label;
  }
  return 'Curious Beginner';
}

/**
 * Calculate category score (0-1000) for a single skill category
 */
export function calculateCategoryScore(db, category) {
  if (!db) return 0;

  // 1. Average practice score (40% weight) — normalized to 0-1000
  const avgResult = queryStmt(db,
    "SELECT AVG(score) as avg, COUNT(*) as cnt FROM user_scores WHERE category = ?",
    [category]
  );
  const avgScore = avgResult.length > 0 ? (avgResult[0].avg || 0) : 0;
  const exerciseCount = avgResult.length > 0 ? (avgResult[0].cnt || 0) : 0;
  const avgComponent = (avgScore / 100) * 1000; // scale 0-100 → 0-1000

  // 2. Exercise count (20% weight) — diminishing returns, cap at 50 exercises = 1000
  const countComponent = Math.min(1000, (exerciseCount / 50) * 1000);

  // 3. Consistency (15% weight) — days with activity in last 14 days
  const consistencyResult = queryStmt(db,
    "SELECT COUNT(DISTINCT date(created_at)) as days FROM user_scores WHERE category = ? AND created_at >= datetime('now', '-14 days')",
    [category]
  );
  const activeDays = consistencyResult.length > 0 ? (consistencyResult[0].days || 0) : 0;
  const consistencyComponent = Math.min(1000, (activeDays / 10) * 1000); // 10 of 14 days = max

  // 4. Improvement trend (25% weight) — compare last 5 scores to previous 5
  const recentResult = queryStmt(db,
    "SELECT score FROM user_scores WHERE category = ? ORDER BY created_at DESC LIMIT 10",
    [category]
  );
  let trendComponent = 500; // neutral default
  if (recentResult.length >= 6) {
    const recent = recentResult.slice(0, 5);
    const older = recentResult.slice(5, 10);
    const recentAvg = recent.reduce((a, b) => a + b.score, 0) / recent.length;
    const olderAvg = older.reduce((a, b) => a + b.score, 0) / older.length;
    const improvement = recentAvg - olderAvg; // -100 to +100
    trendComponent = Math.max(0, Math.min(1000, 500 + (improvement / 100) * 500));
  } else if (recentResult.length > 0) {
    // Not enough data for trend — use avg as proxy
    trendComponent = avgComponent * 0.5 + 250;
  }

  // Weighted combination
  const score = Math.round(
    avgComponent * 0.40 +
    countComponent * 0.20 +
    consistencyComponent * 0.15 +
    trendComponent * 0.25
  );

  return Math.max(0, Math.min(1000, score));
}

/**
 * Calculate overall BPQ score
 */
export function calculateBPQ(db) {
  if (!db) return { score: 0, level: 'Curious Beginner', categoryScores: {} };

  const categoryScores = {};
  let totalScore = 0;
  let categoriesWithData = 0;

  for (const cat of SKILL_CATEGORIES) {
    const catScore = calculateCategoryScore(db, cat);
    categoryScores[cat] = catScore;
    if (catScore > 0) {
      totalScore += catScore;
      categoriesWithData++;
    }
  }

  // Weighted average — only count categories with data
  const score = categoriesWithData > 0
    ? Math.round(totalScore / categoriesWithData)
    : 0;

  const level = getBPQLevel(score);

  return { score, level, categoryScores };
}

/**
 * Save BPQ snapshot to history
 */
export function saveBPQSnapshot(db) {
  if (!db) return;
  const { score, categoryScores } = calculateBPQ(db);
  const today = new Date().toISOString().split('T')[0];

  // Check if we already have a snapshot for today
  const existing = queryStmt(db, "SELECT id FROM bpq_history WHERE date = ?", [today]);
  if (existing.length > 0) {
    runStmt(db,
      "UPDATE bpq_history SET bpq_score = ?, category_scores = ? WHERE date = ?",
      [score, JSON.stringify(categoryScores), today]
    );
  } else {
    runStmt(db,
      "INSERT INTO bpq_history (date, bpq_score, category_scores, created_at) VALUES (?, ?, ?, datetime('now'))",
      [today, score, JSON.stringify(categoryScores)]
    );
  }
  saveDatabase(db);
  return score;
}

/**
 * Get BPQ history for charting
 */
export function getBPQHistory(db, days = 30) {
  if (!db) return [];
  return queryStmt(db,
    "SELECT date, bpq_score, category_scores FROM bpq_history ORDER BY date DESC LIMIT ?",
    [days]
  ).reverse(); // oldest first for charts
}
