import { useEffect } from 'react';
import { WifiSlash, WifiHigh } from '@phosphor-icons/react';
import { useQueryClient } from '@tanstack/react-query';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

export default function OfflineBanner() {
  const { isOnline, wasOffline } = useOnlineStatus();
  const qc = useQueryClient();

  // Refetch all active queries when coming back online
  useEffect(() => {
    if (isOnline && wasOffline) {
      qc.invalidateQueries();
    }
  }, [isOnline, wasOffline, qc]);

  if (isOnline && !wasOffline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: '8px 16px',
        fontSize: '0.8rem',
        fontWeight: 600,
        color: '#fff',
        background: isOnline ? '#C49240' : '#78716C',
        transition: 'background 0.3s, opacity 0.3s',
        animation: 'offlineBannerSlideIn 0.3s ease-out',
      }}
    >
      {isOnline ? (
        <>
          <WifiHigh size={16} weight="bold" />
          Back online — syncing…
        </>
      ) : (
        <>
          <WifiSlash size={16} weight="bold" />
          You're offline — using cached data
        </>
      )}
    </div>
  );
}
