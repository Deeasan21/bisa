/**
 * System 6: League & Ranking System
 *
 * Pure league/ranking calculations based on total XP.
 * Database operations are in useSupabaseDB.
 */

export const LEAGUES = [
  { name: 'Bronze', color: '#9A6B1F', minXP: 0, maxXP: 499, icon: 'Shield' },
  { name: 'Silver', color: '#C49240', minXP: 500, maxXP: 1499, icon: 'ShieldStar' },
  { name: 'Gold', color: '#D4A853', minXP: 1500, maxXP: 3499, icon: 'Crown' },
  { name: 'Platinum', color: '#F0C060', minXP: 3500, maxXP: 6999, icon: 'Diamond' },
  { name: 'Diamond', color: '#F5E4B0', minXP: 7000, maxXP: 14999, icon: 'Gem' },
  { name: 'Master', color: '#D4A853', minXP: 15000, maxXP: Infinity, icon: 'CrownSimple' },
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

