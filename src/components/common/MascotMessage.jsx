import './MascotMessage.css';

const EMOTIONS = {
  happy: { eyes: '◠', mouth: '‿', color: '#F59E0B' },
  thinking: { eyes: '◑', mouth: '~', color: '#3B82F6' },
  celebrating: { eyes: '★', mouth: 'D', color: '#10B981' },
  encouraging: { eyes: '◠', mouth: '◡', color: '#8B5CF6' },
};

export default function MascotMessage({ message, emotion = 'happy' }) {
  const e = EMOTIONS[emotion] || EMOTIONS.happy;

  return (
    <div className="mascot-message">
      <div className="mascot" style={{ '--mascot-color': e.color }}>
        <svg viewBox="0 0 80 80" className="mascot-svg">
          {/* Lightbulb body */}
          <ellipse cx="40" cy="36" rx="26" ry="28" fill={e.color} opacity="0.15" />
          <ellipse cx="40" cy="36" rx="24" ry="26" fill={e.color} opacity="0.25" />
          <ellipse cx="40" cy="36" rx="22" ry="24" fill={e.color} />

          {/* Eyes */}
          <text x="30" y="36" fontSize="12" textAnchor="middle" fill="#FFFFFF">{e.eyes}</text>
          <text x="50" y="36" fontSize="12" textAnchor="middle" fill="#FFFFFF">{e.eyes}</text>

          {/* Mouth */}
          <text x="40" y="48" fontSize="14" textAnchor="middle" fill="#FFFFFF">{e.mouth}</text>

          {/* Lightbulb filament base */}
          <rect x="34" y="58" width="12" height="4" rx="1" fill={e.color} opacity="0.6" />
          <rect x="36" y="62" width="8" height="3" rx="1" fill={e.color} opacity="0.4" />
          <rect x="38" y="65" width="4" height="2" rx="1" fill={e.color} opacity="0.3" />

          {/* Glow rays */}
          <line x1="40" y1="4" x2="40" y2="8" stroke={e.color} strokeWidth="2" strokeLinecap="round" opacity="0.3" />
          <line x1="12" y1="20" x2="16" y2="22" stroke={e.color} strokeWidth="2" strokeLinecap="round" opacity="0.3" />
          <line x1="68" y1="20" x2="64" y2="22" stroke={e.color} strokeWidth="2" strokeLinecap="round" opacity="0.3" />
          <line x1="6" y1="40" x2="10" y2="40" stroke={e.color} strokeWidth="2" strokeLinecap="round" opacity="0.3" />
          <line x1="74" y1="40" x2="70" y2="40" stroke={e.color} strokeWidth="2" strokeLinecap="round" opacity="0.3" />
        </svg>
      </div>
      {message && (
        <div className="mascot-bubble">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
