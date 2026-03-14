import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import BottomTabBar from './BottomTabBar';
import './AppShell.css';

export default function AppShell() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('bisa-theme', 'light');
  }, []);

  return (
    <div className="app-shell">
      <main className="app-content">
        <Outlet />
      </main>
      <BottomTabBar />
    </div>
  );
}
