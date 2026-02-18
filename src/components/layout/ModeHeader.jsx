import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';
import HexBadge from '../common/HexBadge';
import './ModeHeader.css';

export default function ModeHeader({ theme, title, subtitle, backTo = '/modes' }) {
  const navigate = useNavigate();

  return (
    <div className="mode-header" style={{ background: theme.gradient }}>
      <button className="mode-header-back" onClick={() => navigate(backTo)}>
        <ArrowLeft size={24} weight="bold" color={theme.textOnGradient} />
      </button>
      <div className="mode-header-content">
        <HexBadge icon={theme.icon} color="rgba(255,255,255,0.25)" size="lg" />
        <div className="mode-header-text">
          <h1>{title || theme.name}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
