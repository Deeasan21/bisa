import { useLocation, useNavigate } from 'react-router-dom';
import { Lightning, SquaresFour, ChartLineUp, Notebook, User } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

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
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-200 flex items-stretch"
      style={{ height: 64, paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label="Main navigation"
      role="navigation"
    >
      {TABS.map(({ path, label, icon: Icon }) => {
        const active = isActive(path);
        return (
          <button
            key={path}
            className={cn(
              'flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors',
              active ? 'text-gold' : 'text-stone-400 hover:text-stone-600'
            )}
            onClick={() => navigate(path)}
            aria-label={`Navigate to ${label}`}
            aria-current={active ? 'page' : undefined}
          >
            <Icon size={24} weight={active ? 'fill' : 'regular'} aria-hidden="true" />
            <span className={cn('text-[10px] font-medium', active ? 'text-gold' : 'text-stone-400')}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
