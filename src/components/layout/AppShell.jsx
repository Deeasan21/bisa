import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import BottomTabBar from './BottomTabBar';
import { useXP } from '../../hooks/useXP';
import './AppShell.css';

export default function AppShell() {
  const { level } = useXP();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('bisa-theme', 'light');
  }, []);

  return (
    <div className="app-shell">
      <div className="app-top-bar">
        <div className="xp-progress-pill">
          <span className="xp-level-label">Lv.{level.level}</span>
          <div className="xp-bar-track">
            <div className="xp-bar-fill" style={{ width: `${Math.round(level.progress * 100)}%` }} />
          </div>
        </div>
      </div>
      <main className="app-content">
        <Outlet />
      </main>
      <BottomTabBar />
    </div>
  );
}
