import { useState, useEffect, useCallback } from 'react';
import { useSupabaseDB } from './useSupabaseDB';
import { ACHIEVEMENTS } from '../data/achievements';

export function useAchievements() {
  const { db, isReady } = useSupabaseDB();
  const [unlocked, setUnlocked] = useState([]);

  useEffect(() => {
    if (!isReady || !db) return;
    (async () => {
      const list = await db.getUnlockedAchievements();
      setUnlocked(list.map(a => a.achievement_id));
    })();
  }, [db, isReady]);

  const checkAndUnlock = useCallback(async () => {
    if (!db) return [];
    const { newlyUnlocked } = await db.checkAchievements();
    if (newlyUnlocked.length > 0) {
      const list = await db.getUnlockedAchievements();
      setUnlocked(list.map(a => a.achievement_id));
    }
    return newlyUnlocked;
  }, [db]);

  const isUnlocked = useCallback((id) => unlocked.includes(id), [unlocked]);

  return { unlocked, checkAndUnlock, isUnlocked, allAchievements: ACHIEVEMENTS };
}
