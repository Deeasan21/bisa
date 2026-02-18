export const XP_AWARDS = {
  LESSON_REFLECTION: 20,
  PRACTICE_COMPLETE: 15,
  PRACTICE_SCORE_80_PLUS: 10,
  DAILY_CHALLENGE: 25,
  JOURNAL_ENTRY: 15,
  SIMULATION_COMPLETE: 30,
  SIMULATION_GREAT_ENDING: 15,
  REVIEW_CARD: 5,
  STREAK_DAY: 10,
};

export function calculateLevel(totalXP) {
  const LEVELS = [
    { level: 1, name: 'Curious Beginner', xpRequired: 0 },
    { level: 2, name: 'Question Seeker', xpRequired: 100 },
    { level: 3, name: 'Active Listener', xpRequired: 300 },
    { level: 4, name: 'Deep Diver', xpRequired: 600 },
    { level: 5, name: 'Skilled Questioner', xpRequired: 1000 },
    { level: 6, name: 'Master Asker', xpRequired: 1500 },
    { level: 7, name: 'Question Coach', xpRequired: 2500 },
    { level: 8, name: 'Wisdom Seeker', xpRequired: 4000 },
    { level: 9, name: 'Enlightened Listener', xpRequired: 6000 },
    { level: 10, name: 'Grand Questioner', xpRequired: 10000 },
  ];

  let current = LEVELS[0];
  for (const level of LEVELS) {
    if (totalXP >= level.xpRequired) current = level;
    else break;
  }

  const nextLevel = LEVELS.find(l => l.xpRequired > totalXP);
  const progress = nextLevel
    ? (totalXP - current.xpRequired) / (nextLevel.xpRequired - current.xpRequired)
    : 1;

  return { ...current, progress, nextLevel };
}

export function calculateLeague(totalXP) {
  const LEAGUES = [
    { name: 'Bronze', color: '#CD7F32', minXP: 0 },
    { name: 'Silver', color: '#C0C0C0', minXP: 500 },
    { name: 'Gold', color: '#FFD700', minXP: 2000 },
    { name: 'Platinum', color: '#E5E4E2', minXP: 5000 },
    { name: 'Diamond', color: '#B9F2FF', minXP: 10000 },
  ];

  let current = LEAGUES[0];
  for (const league of LEAGUES) {
    if (totalXP >= league.minXP) current = league;
    else break;
  }

  return current;
}
