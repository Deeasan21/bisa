import { useState, useEffect } from 'react';
import { useDatabase } from './useDatabase';
import { getStreakInfo } from '../utils/database';

export function useStreak() {
  const { db, isReady } = useDatabase();
  const [streak, setStreak] = useState({ currentStreak: 0, longestStreak: 0, lastChallengeDate: null });

  useEffect(() => {
    if (!isReady || !db) return;
    setStreak(getStreakInfo(db));
  }, [db, isReady]);

  const refresh = () => {
    if (db) setStreak(getStreakInfo(db));
  };

  return { ...streak, refresh };
}
