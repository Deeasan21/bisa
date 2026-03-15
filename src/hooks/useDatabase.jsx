import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { initializeSchema, loadFromIDB, saveToIDB, saveDatabaseNow, getStreakInfo } from '../utils/database';

const DatabaseContext = createContext(null);

export function DatabaseProvider({ children }) {
  const [db, setDb] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  const dbRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const initSqlJs = (await import('sql.js')).default;
        const SQL = await initSqlJs({ locateFile: file => `/${file}` });
        const savedData = await loadFromIDB();
        let database;
        if (savedData) {
          try {
            database = new SQL.Database(new Uint8Array(savedData));
            initializeSchema(database);
          } catch (corruptErr) {
            console.warn('Stored database corrupt, starting fresh:', corruptErr);
            database = new SQL.Database();
            initializeSchema(database);
            saveToIDB(database.export().buffer);
          }
        } else {
          database = new SQL.Database();
          initializeSchema(database);
        }

        // One-time migration: seed localStorage streak from SQL if not already there
        if (!localStorage.getItem('bisa-streak')) {
          const info = getStreakInfo(database);
          if (info.currentStreak > 0) {
            localStorage.setItem('bisa-streak', JSON.stringify({
              current: info.currentStreak,
              longest: info.longestStreak,
              lastDate: info.lastChallengeDate,
            }));
          }
        }

        if (mounted) {
          dbRef.current = database;
          setDb(database);
          setIsReady(true);
        }
      } catch (err) {
        console.error('Database init failed:', err);
        if (mounted) {
          setError(err.message);
          setIsReady(true);
        }
      }
    }

    init();

    const handleUnload = () => {
      if (dbRef.current) {
        saveDatabaseNow(dbRef.current);
      }
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      mounted = false;
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  const save = useCallback(() => {
    if (dbRef.current) {
      saveToIDB(dbRef.current.export().buffer);
    }
  }, []);

  return (
    <DatabaseContext.Provider value={{ db, isReady, save, error }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  return useContext(DatabaseContext);
}
