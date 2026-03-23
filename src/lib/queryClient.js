/**
 * TanStack React Query client configuration.
 *
 * Provides caching, deduplication, and background refetching
 * for all Supabase data fetches.
 */
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,        // 30s — data stays fresh
      gcTime: 5 * 60_000,       // 5min — garbage collect unused
      retry: 1,                  // Retry once on failure
      refetchOnWindowFocus: false, // Don't refetch on tab switch (mobile-first)
    },
  },
});
