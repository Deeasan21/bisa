import { useEffect, useState } from 'react';
import { Trophy } from '@phosphor-icons/react';
import { ACHIEVEMENT_DEFS } from '../../engine/achievements';
import './AchievementToast.css';

export default function AchievementToast({ achievementId, visible = false, onDone }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible && achievementId) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onDone?.();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [visible, achievementId, onDone]);

  if (!show || !achievementId) return null;

  const def = ACHIEVEMENT_DEFS[achievementId];
  if (!def) return null;

  return (
    <div className="achievement-toast" aria-live="polite">
      <div className="achievement-icon">
        <Trophy size={22} weight="fill" color="#F59E0B" />
      </div>
      <div className="achievement-text">
        <span className="achievement-label">Achievement Unlocked!</span>
        <span className="achievement-title">{def.title}</span>
        <span className="achievement-desc">{def.description}</span>
      </div>
    </div>
  );
}
