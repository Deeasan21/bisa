/**
 * System 5: Daily Quest Generator
 *
 * Generates 3 daily quests, weighted by the recommendations engine.
 * Resets at midnight local time. At least 1 targets weakest skill, 1 is easy/quick.
 */

import { queryStmt, runStmt, saveDatabase, query } from '../utils/database';
import { getQuestCategories } from './recommendations';

const QUEST_TEMPLATES = [
  {
    type: 'practice',
    template: 'Complete a Practice scenario',
    templateWithCat: 'Complete a Practice scenario in {category}',
    xp: 50,
    goal: 1,
    mode: 'practice',
  },
  {
    type: 'lesson',
    template: 'Finish a lesson in Learn mode',
    xp: 30,
    goal: 1,
    mode: 'learn',
  },
  {
    type: 'journal',
    template: 'Log a journal entry about a real conversation',
    xp: 40,
    goal: 1,
    mode: 'journal',
  },
  {
    type: 'daily_challenge',
    template: "Complete today's Daily Challenge",
    xp: 25,
    goal: 1,
    mode: 'daily',
  },
  {
    type: 'review',
    template: 'Review 10 flashcards',
    xp: 20,
    goal: 10,
    mode: 'review',
  },
  {
    type: 'simulation',
    template: 'Try a Simulation',
    xp: 60,
    goal: 1,
    mode: 'simulate',
  },
  {
    type: 'pattern',
    template: 'Complete a Pattern Recognition session',
    xp: 45,
    goal: 1,
    mode: 'pattern',
  },
  {
    type: 'streak',
    template: 'Extend your streak',
    xp: 15,
    goal: 1,
    mode: null,
  },
];

const EASY_TYPES = ['journal', 'daily_challenge', 'streak', 'review'];

/**
 * Get today's date string in YYYY-MM-DD format
 */
function todayStr() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Shuffle array (Fisher-Yates)
 */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Generate 3 daily quests for today if not already generated
 */
export function generateDailyQuests(db) {
  if (!db) return [];

  const today = todayStr();

  // Check if quests already exist for today
  const existing = queryStmt(db, "SELECT * FROM daily_quests WHERE date = ?", [today]);
  if (existing.length > 0) return existing;

  const weakCategories = getQuestCategories(db);
  const quests = [];

  // Quest 1: Target weakest skill category (if available)
  if (weakCategories.length > 0) {
    const cat = weakCategories[0];
    const practiceTemplate = QUEST_TEMPLATES.find(t => t.type === 'practice');
    quests.push({
      type: 'practice',
      target: cat,
      description: practiceTemplate.templateWithCat.replace('{category}', cat),
      xp: practiceTemplate.xp,
      goal: practiceTemplate.goal,
    });
  } else {
    // Default to any practice scenario
    const practiceTemplate = QUEST_TEMPLATES.find(t => t.type === 'practice');
    quests.push({
      type: 'practice',
      target: null,
      description: practiceTemplate.template,
      xp: practiceTemplate.xp,
      goal: practiceTemplate.goal,
    });
  }

  // Quest 2: Something medium — simulation, lesson, or challenge
  const mediumTypes = ['simulation', 'lesson', 'daily_challenge', 'pattern'];
  const mediumTemplates = shuffle(QUEST_TEMPLATES.filter(t => mediumTypes.includes(t.type)));
  if (mediumTemplates.length > 0) {
    const t = mediumTemplates[0];
    quests.push({
      type: t.type,
      target: null,
      description: t.template,
      xp: t.xp,
      goal: t.goal,
    });
  }

  // Quest 3: Something easy/quick
  const easyTemplates = shuffle(QUEST_TEMPLATES.filter(t => EASY_TYPES.includes(t.type) && !quests.some(q => q.type === t.type)));
  if (easyTemplates.length > 0) {
    const t = easyTemplates[0];
    quests.push({
      type: t.type,
      target: null,
      description: t.template,
      xp: t.xp,
      goal: t.goal,
    });
  }

  // Insert quests into database
  for (const quest of quests) {
    runStmt(db,
      "INSERT INTO daily_quests (date, quest_type, quest_target, quest_description, xp_reward, completed, progress, goal, created_at) VALUES (?, ?, ?, ?, ?, 0, 0, ?, datetime('now'))",
      [today, quest.type, quest.target, quest.description, quest.xp, quest.goal]
    );
  }

  saveDatabase(db);
  return queryStmt(db, "SELECT * FROM daily_quests WHERE date = ?", [today]);
}

/**
 * Update quest progress
 */
export function updateQuestProgress(db, questType, increment = 1) {
  if (!db) return;

  const today = todayStr();
  const quests = queryStmt(db,
    "SELECT id, progress, goal, completed FROM daily_quests WHERE date = ? AND quest_type = ? AND completed = 0",
    [today, questType]
  );

  for (const quest of quests) {
    const newProgress = Math.min(quest.goal, (quest.progress || 0) + increment);
    const completed = newProgress >= quest.goal ? 1 : 0;

    runStmt(db,
      "UPDATE daily_quests SET progress = ?, completed = ? WHERE id = ?",
      [newProgress, completed, quest.id]
    );
  }

  saveDatabase(db);
}

/**
 * Get today's quests
 */
export function getTodayQuests(db) {
  if (!db) return [];
  return queryStmt(db, "SELECT * FROM daily_quests WHERE date = ?", [todayStr()]);
}

/**
 * Check if all quests are completed for today
 */
export function allQuestsCompleted(db) {
  if (!db) return false;
  const quests = getTodayQuests(db);
  return quests.length > 0 && quests.every(q => q.completed === 1);
}

/**
 * Get minutes until midnight (for countdown timer)
 */
export function minutesUntilReset() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return Math.floor((midnight - now) / (1000 * 60));
}

/**
 * Map quest types to mode activity types for tracking
 */
export const QUEST_TYPE_TO_MODE = {
  practice: 'practice',
  lesson: 'learn',
  journal: 'journal',
  daily_challenge: 'daily',
  review: 'review',
  simulation: 'simulate',
  pattern: 'pattern',
  streak: null,
};
