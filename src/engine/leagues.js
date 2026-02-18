/**
 * System 6: League & Ranking System
 *
 * Progression based on total XP with weekly tracking.
 * Simulated rankings until user accounts are added in Phase 3.
 */

import { query, queryStmt, runStmt, saveDatabase } from '../utils/database';

export const LEAGUES = [
  { name: 'Bronze', color: '#CD7F32', minXP: 0, maxXP: 499, icon: 'Shield' },
  { name: 'Silver', color: '#C0C0C0', minXP: 500, maxXP: 1499, icon: 'ShieldStar' },
  { name: 'Gold', color: '#FFD700', minXP: 1500, maxXP: 3499, icon: 'Crown' },
  { name: 'Sapphire', color: '#0F52BA', minXP: 3500, maxXP: 6999, icon: 'Diamond' },
  { name: 'Diamond', color: '#B9F2FF', minXP: 7000, maxXP: 14999, icon: 'Gem' },
  { name: 'Master', color: '#9333EA', minXP: 15000, maxXP: Infinity, icon: 'CrownSimple' },
];

/**
 * Get current league based on total XP
 */
export function getLeague(totalXP) {
  let current = LEAGUES[0];
  for (const league of LEAGUES) {
    if (totalXP >= league.minXP) current = league;
    else break;
  }
  return current;
}

/**
 * Get next league (for progress bar)
 */
export function getNextLeague(totalXP) {
  for (const league of LEAGUES) {
    if (totalXP < league.minXP) return league;
  }
  return null; // Already at max
}

/**
 * Get league progress (0-1) toward next league
 */
export function getLeagueProgress(totalXP) {
  const current = getLeague(totalXP);
  const next = getNextLeague(totalXP);
  if (!next) return 1; // Max league
  return (totalXP - current.minXP) / (next.minXP - current.minXP);
}

/**
 * Check if user just promoted to a new league
 */
export function checkLeaguePromotion(db, newTotalXP) {
  if (!db) return null;
  const stats = queryStmt(db, "SELECT current_league FROM user_stats WHERE id = 1", []);
  const oldLeagueName = stats.length > 0 ? stats[0].current_league : 'Bronze';
  const newLeague = getLeague(newTotalXP);

  if (newLeague.name !== oldLeagueName) {
    runStmt(db, "UPDATE user_stats SET current_league = ? WHERE id = 1", [newLeague.name]);
    saveDatabase(db);
    return newLeague; // Promoted!
  }
  return null; // No change
}

/**
 * Get weekly XP earned (Monday-Sunday)
 */
export function getWeeklyXP(db) {
  if (!db) return 0;

  // Find start of current week (Monday)
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0=Sun, 1=Mon, ...
  const monday = new Date(now);
  monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  monday.setHours(0, 0, 0, 0);
  const mondayStr = monday.toISOString();

  const result = query(db,
    `SELECT COALESCE(SUM(xp_amount), 0) as total FROM xp_log WHERE created_at >= '${mondayStr}'`
  );
  return result.length > 0 ? result[0].total : 0;
}

/**
 * Simulate a percentile ranking based on total XP
 * This is motivational, not competitive — always encouraging
 */
export function getSimulatedRanking(totalXP) {
  // Percentile curve: higher XP = better percentile
  // Using a logarithmic curve so early progress feels impactful
  if (totalXP <= 0) return { percentile: 50, message: 'Start your journey!' };

  // Rough percentile based on XP milestones
  let percentile;
  if (totalXP >= 15000) percentile = 99;
  else if (totalXP >= 7000) percentile = 95;
  else if (totalXP >= 3500) percentile = 85;
  else if (totalXP >= 1500) percentile = 70;
  else if (totalXP >= 500) percentile = 50;
  else if (totalXP >= 100) percentile = 30;
  else percentile = 15;

  // Add some variance so it doesn't feel static
  const variance = Math.floor(Math.random() * 5) - 2;
  percentile = Math.max(5, Math.min(99, percentile + variance));

  const messages = [
    `You're in the top ${100 - percentile}% of questioners this week`,
    `Outperforming ${percentile}% of learners — keep it up!`,
    `Top ${100 - percentile}% — your questioning skills are growing`,
  ];

  return {
    percentile,
    message: messages[Math.floor(Math.random() * messages.length)],
  };
}

/**
 * Update weekly XP tracking
 */
export function updateWeeklyTracking(db) {
  if (!db) return;

  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  const weekStart = monday.toISOString().split('T')[0];

  const stats = queryStmt(db, "SELECT week_start_date, weekly_xp FROM user_stats WHERE id = 1", []);
  if (stats.length > 0 && stats[0].week_start_date !== weekStart) {
    // New week — reset weekly XP
    runStmt(db, "UPDATE user_stats SET weekly_xp = 0, week_start_date = ? WHERE id = 1", [weekStart]);
    saveDatabase(db);
  }
}
