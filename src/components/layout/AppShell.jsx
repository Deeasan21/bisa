import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import BottomTabBar from './BottomTabBar';
import InstallPrompt from '../common/InstallPrompt';
import OfflineBanner from '../common/OfflineBanner';
import { STORAGE_KEYS } from '../../lib/constants';
import './AppShell.css';

export default function AppShell() {
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem(STORAGE_KEYS.THEME, 'light');
  }, []);

  useEffect(() => {
    const redirect = sessionStorage.getItem('postInviteRedirect');
    if (redirect) {
      sessionStorage.removeItem('postInviteRedirect');
      navigate(redirect, { replace: true });
    }
  }, []);

  return (
    <div className="app-shell">
      <OfflineBanner />
      <a href="#main-content" className="skip-to-main">Skip to main content</a>
      <main id="main-content" className="app-content" role="main">
        <Outlet />
      </main>
      <BottomTabBar />
      <InstallPrompt />
    </div>
  );
}
