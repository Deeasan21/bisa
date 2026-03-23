/**
 * System 2: BPQ Scoring (Bisa Proficiency Quotient)
 *
 * Pure utility functions for BPQ level display.
 * Database-dependent calculations are in useSupabaseDB.
 */

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
