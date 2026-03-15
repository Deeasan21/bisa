import { useState, useEffect, useCallback } from 'react';
import { useSupabaseDB } from './useSupabaseDB';
import { calculateLevel, calculateLeague } from '../utils/xpCalculator';

export function useXP() {
  const { db, isReady } = useSupabaseDB();
  const [totalXP, setTotalXP] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!isReady || !db) return;
    (async () => {
      setTotalXP(await db.getTotalXP());
      setHistory(await db.getXPHistory(20));
    })();
  }, [db, isReady]);

  const awardXP = useCallback(async (type, amount, description) => {
    if (!db) return;
    await db.addXP(type, amount, description);
    setTotalXP(await db.getTotalXP());
  }, [db]);

  const level = calculateLevel(totalXP);
  const league = calculateLeague(totalXP);

  return { totalXP, level, league, history, awardXP };
}
