import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import BottomTabBar from './BottomTabBar';
import InstallPrompt from '../common/InstallPrompt';
import { STORAGE_KEYS } from '../../lib/constants';
import './AppShell.css';

export default function AppShell() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem(STORAGE_KEYS.THEME, 'light');
  }, []);

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-to-main">Skip to main content</a>
      <main id="main-content" className="app-content" role="main">
        <Outlet />
      </main>
      <BottomTabBar />
      <InstallPrompt />
    </div>
  );
}
