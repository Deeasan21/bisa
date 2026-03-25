import { useLocation, useNavigate } from 'react-router-dom';
import { Lightning, SquaresFour, ChartLineUp, Notebook, User } from '@phosphor-icons/react';
import './BottomTabBar.css';

const TABS = [
  { path: '/', label: 'Today', icon: Lightning },
  { path: '/modes', label: 'Modes', icon: SquaresFour },
  { path: '/progress', label: 'Progress', icon: ChartLineUp },
  { path: '/journal', label: 'Journal', icon: Notebook },
  { path: '/me', label: 'Me', icon: User },
];

export default function BottomTabBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bottom-tab-bar" aria-label="Main navigation" role="navigation">
      {TABS.map(({ path, label, icon: Icon }) => (
        <button
          key={path}
          className={`tab-item${isActive(path) ? ' tab-active' : ''}`}
          onClick={() => navigate(path)}
          aria-label={`Navigate to ${label}`}
          aria-current={isActive(path) ? 'page' : undefined}
        >
          <Icon size={24} weight={isActive(path) ? 'fill' : 'regular'} aria-hidden="true" />
          <span className="tab-label">{label}</span>
        </button>
      ))}
    </nav>
  );
}
