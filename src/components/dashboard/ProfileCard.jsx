import { Fire, Trophy, Lightning } from '@phosphor-icons/react';
import './ProfileCard.css';

export default function ProfileCard({ name, level, league, xp, streak }) {
  const initial = (name || 'L').charAt(0).toUpperCase();

  return (
    <div className="profile-card">
      <div className="pc-avatar" style={{ background: league?.color || '#CD7F32' }}>
        <span>{initial}</span>
      </div>
      <h2 className="pc-name">{name || 'Learner'}</h2>
      <span className="pc-level">{level?.name || 'Curious Beginner'}</span>
      <div className="pc-stats">
        <div className="pc-stat">
          <Fire size={16} weight="fill" color="#F59E0B" />
          <span>{streak}</span>
        </div>
        <div className="pc-stat">
          <Trophy size={16} weight="fill" color={league?.color} />
          <span>{league?.name}</span>
        </div>
        <div className="pc-stat">
          <Lightning size={16} weight="fill" color="#F97316" />
          <span>{xp} XP</span>
        </div>
      </div>
    </div>
  );
}
