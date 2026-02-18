import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { initializeSchema, loadFromIDB, saveToIDB } from '../utils/database';

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
        const database = savedData
          ? new SQL.Database(new Uint8Array(savedData))
          : new SQL.Database();

        initializeSchema(database);

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
        saveToIDB(dbRef.current.export().buffer);
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
