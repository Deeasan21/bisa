import { useState, useEffect } from 'react';
import { useSupabaseDB } from './useSupabaseDB';

export function useStreak() {
  const { db, isReady } = useSupabaseDB();
  const [streak, setStreak] = useState({ currentStreak: 0, longestStreak: 0, lastChallengeDate: null });

  useEffect(() => {
    if (!isReady || !db) return;
    db.getStreakInfo().then(setStreak).catch(console.error);
  }, [db, isReady]);

  const refresh = async () => {
    if (db) setStreak(await db.getStreakInfo());
  };

  return { ...streak, refresh };
}
