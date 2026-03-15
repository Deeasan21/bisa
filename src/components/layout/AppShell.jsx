import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import BottomTabBar from './BottomTabBar';
import InstallPrompt from '../common/InstallPrompt';
import { useAuth } from '../../hooks/useAuth';
import './AppShell.css';

export default function AppShell() {
  const { signOut } = useAuth();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('bisa-theme', 'light');
  }, []);

  return (
    <div className="app-shell">
      <main className="app-content">
        <Outlet context={{ signOut }} />
      </main>
      <BottomTabBar />
      <InstallPrompt />
    </div>
  );
}
