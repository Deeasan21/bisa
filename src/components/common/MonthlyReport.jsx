import { useState, useEffect } from 'react';
import { CalendarBlank, TrendUp, Star, Trophy } from '@phosphor-icons/react';
import './MonthlyReport.css';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function getEncouragingMessage(sessions, avgScore, streak) {
  if (sessions === 0) return null;
  if (sessions >= 20 && avgScore >= 80) {
    return "You're on fire this month! Your questioning skills are really shining.";
  }
  if (sessions >= 10) {
    return "Great consistency this month! Keep showing up — it's clearly paying off.";
  }
  if (streak >= 5) {
    return `A ${streak}-day streak speaks volumes. You're building a real habit here.`;
  }
  if (avgScore >= 70) {
    return "Solid scores! You're asking sharper questions every time you practice.";
  }
  return "Every session counts. You're investing in a skill most people overlook — keep going!";
}

export default function MonthlyReport({ db, isReady }) {
  const [data, setData] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isReady || !db) return;

    (async () => {
      try {
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

        // Fetch all data in parallel
        const [practiceStats, streakInfo, challengeHistory, categoryScores] =
          await Promise.all([
            db.getPracticeStats().catch(() => ({ count: 0, average: 0 })),
            db.getStreakInfo().catch(() => ({ currentStreak: 0, longestStreak: 0 })),
            db.getChallengeHistory(30).catch(() => []),
            db.getScoresByCategory().catch(() => []),
          ]);

        // Filter challenge history to current month only
        const thisMonthChallenges = (challengeHistory || []).filter((entry) => {
          if (!entry.date) return false;
          const d = new Date(entry.date);
          return d >= monthStart;
        });

        const totalSessions =
          (practiceStats?.count || 0) + thisMonthChallenges.length;

        // Don't show for brand new users with no activity
        if (totalSessions === 0) {
          setVisible(false);
          return;
        }

        // Compute average score from challenge history this month
        const challengeScores = thisMonthChallenges
          .map((c) => c.score)
          .filter((s) => typeof s === 'number' && !isNaN(s));
        const challengeAvg =
          challengeScores.length > 0
            ? challengeScores.reduce((a, b) => a + b, 0) / challengeScores.length
            : 0;

        // Blend practice avg and challenge avg
        const practiceAvg = practiceStats?.average || 0;
        const avgScore =
          practiceAvg && challengeAvg
            ? Math.round((practiceAvg + challengeAvg) / 2)
            : Math.round(practiceAvg || challengeAvg);

        // Determine strongest skill and biggest growth area from category scores
        let strongestSkill = null;
        let growthArea = null;
        const scores = (categoryScores || []).filter(
          (c) => c && c.category && typeof c.avg_score === 'number'
        );
        if (scores.length > 0) {
          const sorted = [...scores].sort((a, b) => b.avg_score - a.avg_score);
          strongestSkill = sorted[0];
          if (sorted.length > 1) {
            growthArea = sorted[sorted.length - 1];
          }
        }

        setData({
          totalSessions,
          avgScore,
          currentStreak: streakInfo?.currentStreak || 0,
          longestStreak: streakInfo?.longestStreak || 0,
          strongestSkill,
          growthArea,
          month: MONTH_NAMES[now.getMonth()],
          year: now.getFullYear(),
        });
        setVisible(true);
      } catch {
        setVisible(false);
      }
    })();
  }, [db, isReady]);

  if (!visible || !data) return null;

  const message = getEncouragingMessage(
    data.totalSessions,
    data.avgScore,
    data.currentStreak
  );

  return (
    <div className="monthly-report">
      <div className="monthly-report-header">
        <div className="monthly-report-header-left">
          <div className="monthly-report-icon">
            <CalendarBlank size={20} weight="duotone" color="#D4A853" />
          </div>
          <div>
            <h3 className="monthly-report-title">Your Month in Questions</h3>
            <span className="monthly-report-date">
              {data.month} {data.year}
            </span>
          </div>
        </div>
      </div>

      <div className="monthly-report-stats">
        <div className="monthly-report-stat">
          <Trophy size={18} weight="duotone" color="#D4A853" />
          <div className="monthly-report-stat-value">{data.totalSessions}</div>
          <div className="monthly-report-stat-label">Sessions</div>
        </div>
        <div className="monthly-report-stat-divider" />
        <div className="monthly-report-stat">
          <TrendUp size={18} weight="duotone" color="#D4A853" />
          <div className="monthly-report-stat-value">
            {data.avgScore > 0 ? `${data.avgScore}%` : '—'}
          </div>
          <div className="monthly-report-stat-label">Avg Score</div>
        </div>
        <div className="monthly-report-stat-divider" />
        <div className="monthly-report-stat">
          <Star size={18} weight="duotone" color="#D4A853" />
          <div className="monthly-report-stat-value">{data.currentStreak}</div>
          <div className="monthly-report-stat-label">Day Streak</div>
        </div>
      </div>

      {(data.strongestSkill || data.growthArea) && (
        <div className="monthly-report-skills">
          {data.strongestSkill && (
            <div className="monthly-report-skill">
              <span className="monthly-report-skill-badge strongest">
                Strongest Skill
              </span>
              <span className="monthly-report-skill-name">
                {data.strongestSkill.category}
              </span>
              <span className="monthly-report-skill-score">
                {Math.round(data.strongestSkill.avg_score)}%
              </span>
            </div>
          )}
          {data.growthArea && (
            <div className="monthly-report-skill">
              <span className="monthly-report-skill-badge growth">
                Biggest Growth Area
              </span>
              <span className="monthly-report-skill-name">
                {data.growthArea.category}
              </span>
              <span className="monthly-report-skill-score">
                {Math.round(data.growthArea.avg_score)}%
              </span>
            </div>
          )}
        </div>
      )}

      {message && <p className="monthly-report-message">{message}</p>}
    </div>
  );
}
