import { useState, useEffect } from 'react';
import { useSupabaseDB } from './useSupabaseDB';

export function useProgress() {
  const { db, isReady } = useSupabaseDB();
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    if (!isReady || !db) return;
    db.getOverallProgress().then(setProgress).catch(console.error);
  }, [db, isReady]);

  const refresh = async () => {
    if (db) setProgress(await db.getOverallProgress());
  };

  return { progress, refresh, isReady };
}
