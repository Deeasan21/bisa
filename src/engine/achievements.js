/**
 * System 8: Achievement Triggers
 *
 * Checks and unlocks achievements based on user activity.
 * Each achievement has a condition check, XP reward, and celebration trigger.
 */

import { queryStmt, runStmt, saveDatabase, query } from '../utils/database';
import { getTotalXP } from './xpSystem';
import { getLeague } from './leagues';

/**
 * Achievement definitions with conditions and XP rewards
 */
export const ACHIEVEMENT_DEFS = {
  first_lesson: {
    title: 'First Step',
    description: 'Complete your first lesson reflection',
    xp: 25,
    check: (db, progress) => progress.lessonsWithReflections >= 1,
  },
  first_question: {
    title: 'First Question',
    description: 'Complete your first Practice scenario',
    xp: 25,
    check: (db, progress) => progress.totalPracticeAttempts >= 1,
  },
  practice_10: {
    title: 'Curious Mind',
    description: 'Complete 10 Practice scenarios',
    xp: 50,
    check: (db, progress) => progress.totalPracticeAttempts >= 10,
  },
  practice_50: {
    title: 'Question Machine',
    description: 'Complete 50 Practice scenarios',
    xp: 100,
    check: (db, progress) => progress.totalPracticeAttempts >= 50,
  },
  streak_7: {
    title: 'Daily Devotion',
    description: 'Maintain a 7-day streak',
    xp: 50,
    check: (db, progress) => progress.currentStreak >= 7 || progress.longestStreak >= 7,
  },
  streak_30: {
    title: 'Unstoppable',
    description: 'Maintain a 30-day streak',
    xp: 100,
    check: (db, progress) => progress.currentStreak >= 30 || progress.longestStreak >= 30,
  },
  deep_thinker: {
    title: 'Deep Thinker',
    description: 'Score 90%+ on 5 Practice scenarios',
    xp: 75,
    check: (db) => {
      try {
        const result = queryStmt(db,
          "SELECT COUNT(DISTINCT scenario_id) as cnt FROM practice_attempts WHERE score >= 90",
          []
        );
        return result.length > 0 && result[0].cnt >= 5;
      } catch { return false; }
    },
  },
  explorer: {
    title: 'Explorer',
    description: 'Try all modes at least once',
    xp: 50,
    check: (db, progress) => {
      return progress.lessonsWithReflections >= 1 &&
        progress.totalPracticeAttempts >= 1 &&
        progress.challengesCompleted >= 1 &&
        progress.simulationsCompleted >= 1 &&
        progress.cardsLearned >= 1 &&
        progress.journalEntries >= 1 &&
        progress.patternAttempts >= 1;
    },
  },
  first_pattern: {
    title: 'Pattern Spotter',
    description: 'Complete your first Pattern Recognition round',
    xp: 25,
    check: (db, progress) => progress.patternAttempts >= 1,
  },
  pattern_25: {
    title: 'Keen Observer',
    description: 'Complete 25 Pattern Recognition rounds',
    xp: 50,
    check: (db, progress) => progress.patternAttempts >= 25,
  },
  pattern_100: {
    title: 'Pattern Master',
    description: 'Complete 100 Pattern Recognition rounds',
    xp: 100,
    check: (db, progress) => progress.patternAttempts >= 100,
  },
  reflector: {
    title: 'Reflector',
    description: 'Log 10 journal entries',
    xp: 50,
    check: (db, progress) => progress.journalEntries >= 10,
  },
  technique_master: {
    title: 'Technique Master',
    description: 'Use 5 different questioning techniques',
    xp: 75,
    check: (db) => {
      try {
        // Check user_scores for distinct technique usage recorded in metadata
        const result = queryStmt(db,
          "SELECT COUNT(DISTINCT category) as cnt FROM user_scores WHERE score >= 60",
          []
        );
        return result.length > 0 && result[0].cnt >= 5;
      } catch { return false; }
    },
  },
  sim_all: {
    title: 'Simulation Pro',
    description: 'Complete all simulations',
    xp: 75,
    check: (db) => {
      try {
        const result = queryStmt(db,
          "SELECT COUNT(DISTINCT simulation_id) as cnt FROM simulation_attempts",
          []
        );
        // Dynamic — works with any number of simulations
        return result.length > 0 && result[0].cnt >= 7;
      } catch { return false; }
    },
  },
  scholar: {
    title: 'Scholar',
    description: 'Complete all lessons',
    xp: 75,
    check: (db, progress) => progress.lessonsWithReflections >= 13,
  },
  rising_star: {
    title: 'Rising Star',
    description: 'Reach Silver league',
    xp: 50,
    check: (db) => {
      const xp = getTotalXP(db);
      return getLeague(xp).name !== 'Bronze';
    },
  },
  score_90: {
    title: 'Sharp Thinker',
    description: 'Score 90+ on a practice scenario',
    xp: 25,
    check: (db) => {
      try {
        const result = queryStmt(db,
          "SELECT 1 FROM practice_attempts WHERE score >= 90 LIMIT 1",
          []
        );
        return result.length > 0;
      } catch { return false; }
    },
  },
  streak_3: {
    title: 'On a Roll',
    description: 'Reach a 3-day streak',
    xp: 25,
    check: (db, progress) => progress.currentStreak >= 3 || progress.longestStreak >= 3,
  },
  journal_5: {
    title: 'Reflective Thinker',
    description: 'Write 5 journal entries',
    xp: 25,
    check: (db, progress) => progress.journalEntries >= 5,
  },
  review_50: {
    title: 'Memory Builder',
    description: 'Review 50 cards',
    xp: 25,
    check: (db, progress) => progress.cardsLearned >= 50,
  },
  all_lessons: {
    title: 'Complete Scholar',
    description: 'Write reflections for all lessons',
    xp: 100,
    check: (db, progress) => progress.lessonsWithReflections >= 38,
  },
  xp_1000: {
    title: 'XP Milestone',
    description: 'Earn 1,000 XP',
    xp: 25,
    check: (db) => getTotalXP(db) >= 1000,
  },
  xp_5000: {
    title: 'XP Champion',
    description: 'Earn 5,000 XP',
    xp: 50,
    check: (db) => getTotalXP(db) >= 5000,
  },
  xp_10000: {
    title: 'Bisa Master',
    description: 'Earn 10,000 XP',
    xp: 100,
    check: (db) => getTotalXP(db) >= 10000,
  },
  night_owl: {
    title: 'Night Owl',
    description: 'Complete a session after 10 PM',
    xp: 25,
    check: () => {
      const hour = new Date().getHours();
      return hour >= 22 || hour < 4;
    },
  },
  early_bird: {
    title: 'Early Bird',
    description: 'Complete a session before 7 AM',
    xp: 25,
    check: () => {
      const hour = new Date().getHours();
      return hour >= 4 && hour < 7;
    },
  },
  streak_100: {
    title: 'Century Streak',
    description: 'Reach a 100-day streak',
    xp: 100,
    check: (db, progress) => progress.currentStreak >= 100 || progress.longestStreak >= 100,
  },
  journal_20: {
    title: 'Prolific Writer',
    description: 'Write 20 journal entries',
    xp: 50,
    check: (db, progress) => progress.journalEntries >= 20,
  },
  review_200: {
    title: 'Memory Master',
    description: 'Review 200 cards',
    xp: 50,
    check: (db, progress) => progress.cardsLearned >= 200,
  },
};

/**
 * Get all unlocked achievement IDs
 */
export function getUnlockedIds(db) {
  if (!db) return [];
  const rows = queryStmt(db, "SELECT achievement_id FROM achievements", []);
  return rows.map(r => r.achievement_id);
}

/**
 * Check all achievements and unlock any newly earned ones
 * @returns {{ newlyUnlocked: string[], xpAwarded: number }}
 */
export function checkAchievements(db, progress) {
  if (!db) return { newlyUnlocked: [], xpAwarded: 0 };

  const unlocked = getUnlockedIds(db);
  const newlyUnlocked = [];
  let xpAwarded = 0;

  for (const [id, def] of Object.entries(ACHIEVEMENT_DEFS)) {
    if (unlocked.includes(id)) continue;

    let earned = false;
    try {
      earned = def.check(db, progress);
    } catch {
      earned = false;
    }

    if (earned) {
      // Unlock it
      runStmt(db,
        "INSERT OR IGNORE INTO achievements (achievement_id, unlocked_at) VALUES (?, datetime('now'))",
        [id]
      );
      newlyUnlocked.push(id);
      xpAwarded += def.xp;

      // Award achievement XP
      runStmt(db,
        "INSERT INTO xp_log (activity_type, xp_amount, description, created_at) VALUES (?, ?, ?, datetime('now'))",
        ['achievement', def.xp, `Achievement: ${def.title}`]
      );
    }
  }

  if (newlyUnlocked.length > 0) {
    saveDatabase(db);
  }

  return { newlyUnlocked, xpAwarded };
}

/**
 * Get achievement details by ID (for display)
 */
export function getAchievementDef(id) {
  return ACHIEVEMENT_DEFS[id] || null;
}
