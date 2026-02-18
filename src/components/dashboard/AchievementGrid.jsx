import { ACHIEVEMENTS } from '../../data/achievements';
import './AchievementGrid.css';

export default function AchievementGrid({ unlockedIds = [] }) {
  return (
    <div className="ach-grid">
      {ACHIEVEMENTS.map(ach => {
        const isUnlocked = unlockedIds.includes(ach.id);
        return (
          <div key={ach.id} className={`ach-item${isUnlocked ? ' ach-unlocked' : ''}`}>
            <div className="ach-circle">
              {isUnlocked ? '✓' : '?'}
            </div>
            <span className="ach-title">{ach.title}</span>
          </div>
        );
      })}
    </div>
  );
}
