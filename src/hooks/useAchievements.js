import { useState, useEffect, useCallback } from 'react';
import { useDatabase } from './useDatabase';
import { getUnlockedAchievements, unlockAchievement as dbUnlock, getOverallProgress, getTotalXP, addXP } from '../utils/database';
import { ACHIEVEMENTS } from '../data/achievements';
import { SIMULATIONS } from '../data/simulations';
import { LESSONS } from '../data/lessons';

export function useAchievements() {
  const { db, isReady } = useDatabase();
  const [unlocked, setUnlocked] = useState([]);

  useEffect(() => {
    if (!isReady || !db) return;
    setUnlocked(getUnlockedAchievements(db).map(a => a.achievement_id));
  }, [db, isReady]);

  const checkAndUnlock = useCallback(() => {
    if (!db) return [];
    const progress = getOverallProgress(db);
    const totalXP = getTotalXP(db);
    const newlyUnlocked = [];

    const hour = new Date().getHours();

    // Get distinct high-scoring scenarios count
    let highScoreCount = 0;
    try {
      const result = db.exec("SELECT COUNT(DISTINCT scenario_id) as count FROM practice_attempts WHERE score >= 90");
      if (result.length > 0) highScoreCount = result[0].values[0][0] || 0;
    } catch (e) { /* ignore */ }

    // Check lessons across tiers
    let tiersWithReflections = new Set();
    try {
      // Simple heuristic: if we have reflections for lessons in different tier ranges
      const reflectionCount = progress.lessonsWithReflections;
      if (reflectionCount >= 1) tiersWithReflections.add(1);
      if (reflectionCount >= 14) tiersWithReflections.add(2);
      if (reflectionCount >= 20) tiersWithReflections.add(3);
      if (reflectionCount >= 27) tiersWithReflections.add(4);
      if (reflectionCount >= 33) tiersWithReflections.add(5);
    } catch (e) { /* ignore */ }

    const checks = {
      // Original achievements
      first_lesson: progress.lessonsWithReflections >= 1,
      practice_10: progress.totalPracticeAttempts >= 10,
      score_90: progress.averagePracticeScore >= 90 || highScoreCount >= 1,
      streak_3: progress.currentStreak >= 3,
      streak_7: progress.currentStreak >= 7,
      streak_30: progress.currentStreak >= 30,
      journal_5: progress.journalEntries >= 5,
      sim_all: progress.simulationsCompleted >= SIMULATIONS.length,
      review_50: progress.cardsLearned >= 50,
      all_lessons: progress.lessonsWithReflections >= LESSONS.length,
      xp_1000: totalXP >= 1000,

      // New achievements
      night_owl: hour >= 22 || hour < 4,
      early_bird: hour >= 4 && hour < 7,
      perfect_week: progress.currentStreak >= 7,
      category_master: progress.totalPracticeAttempts >= 10,
      sim_master: progress.simulationsCompleted >= SIMULATIONS.length,
      journal_20: progress.journalEntries >= 20,
      streak_100: progress.currentStreak >= 100,
      xp_5000: totalXP >= 5000,
      xp_10000: totalXP >= 10000,
      all_tiers: tiersWithReflections.size >= 5,
      practice_50: progress.totalPracticeAttempts >= 50,
      review_200: progress.cardsLearned >= 200,
      deep_diver: highScoreCount >= 5,
    };

    for (const [id, condition] of Object.entries(checks)) {
      if (condition && !unlocked.includes(id)) {
        const wasNew = dbUnlock(db, id);
        if (wasNew) newlyUnlocked.push(id);
      }
    }

    if (newlyUnlocked.length > 0) {
      setUnlocked(getUnlockedAchievements(db).map(a => a.achievement_id));
    }

    return newlyUnlocked;
  }, [db, unlocked]);

  const isUnlocked = useCallback((id) => unlocked.includes(id), [unlocked]);

  return { unlocked, checkAndUnlock, isUnlocked, allAchievements: ACHIEVEMENTS };
}
