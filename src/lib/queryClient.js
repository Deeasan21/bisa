/**
 * TanStack React Query client configuration with IndexedDB persistence.
 *
 * Provides caching, deduplication, background refetching, and
 * offline-first persistence via idb-keyval.
 */
import { QueryClient, onlineManager } from '@tanstack/react-query';
import { get, set, del } from 'idb-keyval';

const CACHE_KEY = 'bisa-query-cache';

// Keep React Query's online manager in sync with the browser
onlineManager.setEventListener((setOnline) => {
  const onOnline = () => setOnline(true);
  const onOffline = () => setOnline(false);
  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);
  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  };
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,        // 30s — data stays fresh
      gcTime: 24 * 60 * 60_000, // 24h — keep cached data for offline use
      retry: 1,
      refetchOnWindowFocus: false,
      networkMode: 'offlineFirst',
    },
    mutations: {
      networkMode: 'offlineFirst',
    },
  },
});

// IndexedDB persister for PersistQueryClientProvider
let throttleTimer;
export const persister = {
  async restoreClient() {
    try {
      return await get(CACHE_KEY);
    } catch {
      return undefined;
    }
  },
  async persistClient(client) {
    // Throttle writes to IndexedDB (max once per second)
    clearTimeout(throttleTimer);
    throttleTimer = setTimeout(async () => {
      try {
        await set(CACHE_KEY, client);
      } catch { /* IndexedDB full or unavailable */ }
    }, 1000);
  },
  async removeClient() {
    try {
      await del(CACHE_KEY);
    } catch { /* ignore */ }
  },
};
