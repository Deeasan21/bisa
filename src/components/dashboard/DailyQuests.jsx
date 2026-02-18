import { Lightning, Gift } from '@phosphor-icons/react';
import ProgressBar from '../common/ProgressBar';
import Card from '../common/Card';
import './DailyQuests.css';

export default function DailyQuests({ quests, onQuestClick }) {
  return (
    <div className="daily-quests">
      {quests.map((quest) => (
        <Card key={quest.label} padding="md" onClick={() => onQuestClick?.(quest.path)}>
          <div className="dq-row">
            <div className="dq-info">
              <span className="dq-label">{quest.label}</span>
              <ProgressBar
                value={quest.value}
                max={quest.max}
                color={quest.color}
                size="sm"
                animate={false}
              />
            </div>
            <div className="dq-reward">
              {quest.value >= quest.max ? (
                <Gift size={24} weight="fill" color={quest.color} />
              ) : (
                <span className="dq-xp">+{quest.xp} XP</span>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
