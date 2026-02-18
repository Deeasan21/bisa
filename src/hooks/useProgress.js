import { useState, useEffect } from 'react';
import { useDatabase } from './useDatabase';
import { getOverallProgress } from '../utils/database';

export function useProgress() {
  const { db, isReady } = useDatabase();
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    if (!isReady || !db) return;
    setProgress(getOverallProgress(db));
  }, [db, isReady]);

  const refresh = () => {
    if (db) setProgress(getOverallProgress(db));
  };

  return { progress, refresh, isReady };
}
