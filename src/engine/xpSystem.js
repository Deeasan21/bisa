/**
 * System 7: XP Award Rules
 *
 * Centralized XP calculation and awarding with level progression.
 * Replaces the simple XP_AWARDS constants with dynamic calculations.
 */

import { runStmt, saveDatabase, query, queryStmt } from '../utils/database';
import { checkLeaguePromotion, updateWeeklyTracking } from './leagues';
import { saveBPQSnapshot } from './bpqScore';

/**
 * XP award calculations
 */
export const XP_RULES = {
  /** Practice: 20 base + (score% × 30 bonus). Perfect = 50, 50% = 35 */
  practice(score) {
    return 20 + Math.round((score / 100) * 30);
  },

  /** Daily Challenge: flat 25 XP */
  dailyChallenge() {
    return 25;
  },

  /** Lesson: flat 30 XP */
  lesson() {
    return 30;
  },

  /** Simulation: 40 base + (quality% × 20 bonus) */
  simulation(qualityPercent) {
    return 40 + Math.round((qualityPercent / 100) * 20);
  },

  /** Journal: flat 15 XP */
  journal() {
    return 15;
  },

  /** Review session (10+ cards): flat 20 XP */
  reviewSession() {
    return 20;
  },

  /** Streak bonus: streak_days × 5, capped at 50 XP (10-day streak) */
  streakBonus(streakDays) {
    return Math.min(50, streakDays * 5);
  },

  /** All daily quests completed: flat 25 XP bonus */
  allQuestsBonus() {
    return 25;
  },
};

/**
 * Level progression table
 * Level 1: 0, Level 2: 100, Level 3: 250, Level 4: 500, Level 5: 1000
 * Each subsequent level requires 500 more than the previous gap
 */
export const LEVELS = [
  { level: 1, name: 'Curious Beginner', xpRequired: 0 },
  { level: 2, name: 'Question Seeker', xpRequired: 100 },
  { level: 3, name: 'Active Listener', xpRequired: 250 },
  { level: 4, name: 'Deep Diver', xpRequired: 500 },
  { level: 5, name: 'Skilled Questioner', xpRequired: 1000 },
  { level: 6, name: 'Master Asker', xpRequired: 1500 },
  { level: 7, name: 'Question Coach', xpRequired: 2500 },
  { level: 8, name: 'Wisdom Seeker', xpRequired: 4000 },
  { level: 9, name: 'Enlightened Listener', xpRequired: 6000 },
  { level: 10, name: 'Grand Questioner', xpRequired: 10000 },
  { level: 11, name: 'Question Sage', xpRequired: 15000 },
  { level: 12, name: 'Transcendent Asker', xpRequired: 20000 },
];

/**
 * Calculate current level from XP
 */
export function calculateLevel(totalXP) {
  let current = LEVELS[0];
  for (const level of LEVELS) {
    if (totalXP >= level.xpRequired) current = level;
    else break;
  }
  const nextLevel = LEVELS.find(l => l.xpRequired > totalXP);
  const progress = nextLevel
    ? (totalXP - current.xpRequired) / (nextLevel.xpRequired - current.xpRequired)
    : 1;
  return { ...current, progress, nextLevel, totalXP };
}

/**
 * Get total XP from database
 */
export function getTotalXP(db) {
  if (!db) return 0;
  const result = query(db, "SELECT COALESCE(SUM(xp_amount), 0) as total FROM xp_log");
  return result.length > 0 ? result[0].total : 0;
}

/**
 * Award XP and check for level-ups and league promotions
 *
 * @returns {{ xpAwarded, totalXP, levelUp, leaguePromotion, newLevel }}
 */
export function awardXP(db, activityType, amount, description) {
  if (!db || amount <= 0) return null;

  const oldXP = getTotalXP(db);
  const oldLevel = calculateLevel(oldXP);

  // Insert XP log entry
  runStmt(db,
    "INSERT INTO xp_log (activity_type, xp_amount, description, created_at) VALUES (?, ?, ?, datetime('now'))",
    [activityType, amount, description || null]
  );

  // Update user_stats
  const newXP = oldXP + amount;
  runStmt(db, "UPDATE user_stats SET total_xp = ?, weekly_xp = weekly_xp + ? WHERE id = 1", [newXP, amount]);

  saveDatabase(db);

  // Check for level up
  const newLevel = calculateLevel(newXP);
  const levelUp = newLevel.level > oldLevel.level ? newLevel : null;

  // Check for league promotion
  const leaguePromotion = checkLeaguePromotion(db, newXP);

  // Update weekly tracking
  updateWeeklyTracking(db);

  // Save BPQ snapshot (updates once per award)
  saveBPQSnapshot(db);

  return {
    xpAwarded: amount,
    totalXP: newXP,
    levelUp,
    leaguePromotion,
    newLevel,
  };
}

/**
 * Get XP earned today
 */
export function getTodayXP(db) {
  if (!db) return 0;
  const today = new Date().toISOString().split('T')[0];
  const result = query(db,
    `SELECT COALESCE(SUM(xp_amount), 0) as total FROM xp_log WHERE date(created_at) = '${today}'`
  );
  return result.length > 0 ? result[0].total : 0;
}
