/**
 * Centralized constants for the Bisa application.
 *
 * Magic numbers, localStorage keys, and configuration values
 * that were previously scattered across the codebase.
 */

// ── localStorage Keys ───────────────────────────────────────────────────────
export const STORAGE_KEYS = {
  INTRO_SEEN: 'bisa-intro-seen',
  ONBOARDING_DONE: 'bisa-onboarding-done',
  THEME: 'bisa-theme',
  API_KEY: 'bisa_api_key',
};

// ── API Limits ──────────────────────────────────────────────────────────────
export const API_LIMITS = {
  /** Max tokens per Claude API call */
  MAX_TOKENS: 1024,
  /** Max prompt length (characters) before truncation */
  MAX_PROMPT_LENGTH: 2000,
  /** Max messages per conversation */
  MAX_MESSAGES: 20,
  /** Max AI conversation turns in simulate mode */
  MAX_AI_TURNS: 8,
  /** Free AI calls per user per day (server key) */
  DAILY_LIMIT_PER_USER: 10,
  /** Global daily cap for all users (server key) */
  DAILY_LIMIT_GLOBAL: 500,
};

// ── Gamification ────────────────────────────────────────────────────────────
export const GAMIFICATION = {
  /** Days of inactivity before a category is considered stale */
  STALE_CATEGORY_DAYS: 5,
  /** Number of rolling scores kept for difficulty tier calculation */
  ROLLING_SCORES_WINDOW: 5,
  /** Score threshold to tier up */
  TIER_UP_THRESHOLD: 80,
  /** Score threshold to tier down */
  TIER_DOWN_THRESHOLD: 50,
  /** Min difficulty tier */
  MIN_TIER: 1,
  /** Max difficulty tier */
  MAX_TIER: 5,
};

// ── Skill Categories ────────────────────────────────────────────────────────
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
