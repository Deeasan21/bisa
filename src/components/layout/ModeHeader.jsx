import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';
import HexBadge from '../common/HexBadge';

export default function ModeHeader({ theme, title, subtitle, backTo = '/modes' }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center gap-4 px-4 py-4"
      style={{ background: theme.headerGradient || 'linear-gradient(135deg, #1C1917 0%, #292524 100%)' }}
    >
      <button
        className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors flex-shrink-0"
        onClick={() => navigate(backTo)}
        aria-label="Go back"
      >
        <ArrowLeft size={20} weight="bold" color="#FFFFFF" aria-hidden="true" />
      </button>
      <HexBadge icon={theme.icon} color="#D4A853" size="lg" />
      <div>
        <h1 className="text-white font-serif text-lg font-bold leading-tight">{title || theme.name}</h1>
        {subtitle && <p className="text-white/70 text-xs mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}
