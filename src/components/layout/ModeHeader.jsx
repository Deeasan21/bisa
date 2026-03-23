import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';
import HexBadge from '../common/HexBadge';
import './ModeHeader.css';

export default function ModeHeader({ theme, title, subtitle, backTo = '/modes' }) {
  const navigate = useNavigate();

  return (
    <div className="mode-header" style={{ background: theme.headerGradient || 'linear-gradient(135deg, #1C1917 0%, #292524 100%)' }}>
      <button className="mode-header-back" onClick={() => navigate(backTo)} aria-label="Go back">
        <ArrowLeft size={24} weight="bold" color="#FFFFFF" aria-hidden="true" />
      </button>
      <div className="mode-header-content">
        <HexBadge icon={theme.icon} color="#D4A853" size="lg" />
        <div className="mode-header-text">
          <h1>{title || theme.name}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
