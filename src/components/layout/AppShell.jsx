import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Moon, Sun } from '@phosphor-icons/react';
import BottomTabBar from './BottomTabBar';
import './AppShell.css';

function getInitialTheme() {
  const stored = localStorage.getItem('bisa-theme');
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function AppShell() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('bisa-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="app-shell">
      <div className="app-top-bar">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
          {theme === 'dark' ? <Sun size={20} weight="bold" /> : <Moon size={20} weight="bold" />}
        </button>
      </div>
      <main className="app-content">
        <Outlet />
      </main>
      <BottomTabBar />
    </div>
  );
}
