import { useState, useEffect, useCallback } from 'react';
import { useDatabase } from './useDatabase';
import { addXP as dbAddXP, getTotalXP, getXPHistory } from '../utils/database';
import { calculateLevel, calculateLeague } from '../utils/xpCalculator';

export function useXP() {
  const { db, isReady } = useDatabase();
  const [totalXP, setTotalXP] = useState(0);

  useEffect(() => {
    if (!isReady || !db) return;
    setTotalXP(getTotalXP(db));
  }, [db, isReady]);

  const awardXP = useCallback((type, amount, description) => {
    if (!db) return;
    dbAddXP(db, type, amount, description);
    setTotalXP(getTotalXP(db));
  }, [db]);

  const level = calculateLevel(totalXP);
  const league = calculateLeague(totalXP);
  const history = db ? getXPHistory(db, 20) : [];

  return { totalXP, level, league, history, awardXP };
}
