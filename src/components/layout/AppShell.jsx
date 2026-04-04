import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import BottomTabBar from './BottomTabBar';
import InstallPrompt from '../common/InstallPrompt';
import OfflineBanner from '../common/OfflineBanner';
import { useOrg } from '../../hooks/useOrg';
import { STORAGE_KEYS } from '../../lib/constants';

export default function AppShell() {
  const navigate = useNavigate();
  const { postJoinPath, clearPostJoinPath } = useOrg();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem(STORAGE_KEYS.THEME, 'light');
  }, []);

  useEffect(() => {
    if (postJoinPath) {
      clearPostJoinPath();
      navigate(postJoinPath, { replace: true });
    }
  }, [postJoinPath]);

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <OfflineBanner />
      <a
        href="#main-content"
        className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden z-[9999] focus:fixed focus:left-0 focus:top-0 focus:w-auto focus:h-auto focus:overflow-visible focus:px-4 focus:py-2 focus:bg-stone-900 focus:text-white focus:text-sm focus:rounded-br-lg"
      >
        Skip to main content
      </a>
      <main
        id="main-content"
        role="main"
        className="flex-1 overflow-y-auto pb-16 flex flex-col items-center"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="w-full max-w-5xl px-2 sm:px-4">
          <Outlet />
        </div>
      </main>
      <BottomTabBar />
      <InstallPrompt />
    </div>
  );
}
