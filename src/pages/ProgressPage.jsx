import { useState, useEffect } from 'react';
import { Fire, Target, Notebook, ChatsCircle, Brain, TrendUp, ArrowUp, ArrowDown } from '@phosphor-icons/react';
import { useDatabase } from '../hooks/useDatabase';
import { getOverallProgress, getTotalXP } from '../utils/database';
import { calculateLevel, calculateLeague } from '../utils/xpCalculator';
import { calculateBPQ, getBPQLevel } from '../engine/bpqScore';
import { getRecommendations } from '../engine/recommendations';
import { getWeeklyXP } from '../engine/leagues';
import { LESSONS } from '../data/lessons';
import { PRACTICE_SCENARIOS } from '../data/practiceScenarios';
import ProgressBar from '../components/common/ProgressBar';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import ScoreGauge from '../components/common/ScoreGauge';
import './ProgressPage.css';

const SKILL_CATEGORIES = [
  { key: 'Open vs. Closed', color: '#EF4444' },
  { key: 'Clarifying', color: '#F59E0B' },
  { key: 'Probing', color: '#8B5CF6' },
  { key: 'Empathy', color: '#EC4899' },
  { key: 'Framing', color: '#10B981' },
  { key: 'Follow-up', color: '#3B82F6' },
  { key: 'Self-Reflection', color: '#06B6D4' },
  { key: 'Body Language', color: '#F97316' },
  { key: 'Cultural Awareness', color: '#14B8A6' },
  { key: 'Leadership', color: '#6366F1' },
];

export default function ProgressPage() {
  const { db, isReady } = useDatabase();
  const [progress, setProgress] = useState(null);
  const [xp, setXp] = useState(0);
  const [bpqData, setBpqData] = useState({ score: 0, level: 'Curious Beginner', categoryScores: {} });
  const [insights, setInsights] = useState({ strongest: null, weakest: null });
  const [weekXP, setWeekXP] = useState(0);

  useEffect(() => {
    if (!isReady || !db) return;
    setProgress(getOverallProgress(db));
    setXp(getTotalXP(db));
    setBpqData(calculateBPQ(db));
    setWeekXP(getWeeklyXP(db));

    // Get real insights from recommendations engine
    const recs = getRecommendations(db);
    const strongCat = recs.strongestCategory
      ? SKILL_CATEGORIES.find(c => c.key === recs.strongestCategory.category) || null
      : null;
    const weakCat = recs.weakestCategory
      ? SKILL_CATEGORIES.find(c => c.key === recs.weakestCategory.category) || null
      : null;
    setInsights({ strongest: strongCat, weakest: weakCat });
  }, [db, isReady]);

  const level = calculateLevel(xp);
  const league = calculateLeague(xp);
  const bpq = Math.round(bpqData.score / 10); // Scale 0-1000 → 0-100 for ScoreGauge
  const { strongest, weakest } = insights;

  return (
    <div className="progress-page animate-fade-in">
      <div className="progress-header">
        <h1>Progress</h1>
        <p>Track your growth</p>
      </div>

      {/* BPQ Gauge */}
      <div className="bpq-section">
        <ScoreGauge score={bpq} />
        <div className="bpq-label">
          <span className="bpq-title">{bpqData.level}</span>
          <span className="bpq-subtitle">BPQ: {bpqData.score} / 1000</span>
        </div>
      </div>

      {/* XP & Level */}
      <Card padding="md">
        <div className="xp-section">
          <div className="xp-level">
            <div className="level-badge" style={{ background: league.color }}>
              <span>{level.level}</span>
            </div>
            <div>
              <h3>{level.name}</h3>
              <Badge text={league.name} color={league.color} variant="soft" size="sm" />
            </div>
          </div>
          <div className="xp-amount">{xp} XP</div>
        </div>
        {level.nextLevel && (
          <ProgressBar
            value={xp - level.xpRequired}
            max={level.nextLevel.xpRequired - level.xpRequired}
            color="#F59E0B"
            size="sm"
            label={`Next: ${level.nextLevel.name}`}
            showPercent
          />
        )}
      </Card>

      {/* Skill Category Bars */}
      {progress && progress.totalPracticeAttempts > 0 && (
        <>
          <h2 className="section-title">Skill Areas</h2>
          <div className="skill-bars">
            {SKILL_CATEGORIES.map((cat) => {
              const catScore = Math.min(100, Math.round((bpqData.categoryScores[cat.key] || 0) / 10));
              return (
                <div key={cat.key} className="skill-bar-row">
                  <span className="skill-bar-label">{cat.key}</span>
                  <div className="skill-bar-track">
                    <div
                      className="skill-bar-fill"
                      style={{ width: `${catScore}%`, background: cat.color }}
                    />
                  </div>
                  <span className="skill-bar-value">{catScore}%</span>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Strongest / Weakest */}
      {strongest && weakest && (
        <div className="skill-callouts">
          <div className="skill-callout strong">
            <ArrowUp size={16} weight="bold" color="#10B981" />
            <div>
              <span className="callout-label">Strongest</span>
              <span className="callout-value" style={{ color: strongest.color }}>{strongest.key}</span>
            </div>
          </div>
          <div className="skill-callout weak">
            <ArrowDown size={16} weight="bold" color="#EF4444" />
            <div>
              <span className="callout-label">Needs Work</span>
              <span className="callout-value" style={{ color: weakest.color }}>{weakest.key}</span>
            </div>
          </div>
        </div>
      )}

      {progress && (
        <>
          <h2 className="section-title">Statistics</h2>

          <div className="stats-grid">
            <div className="stat-card">
              <Target size={24} color="#EF4444" />
              <span className="stat-value">{progress.totalPracticeAttempts}</span>
              <span className="stat-label">Practice Attempts</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon-text" style={{ color: '#EF4444' }}>
                {progress.averagePracticeScore}
              </span>
              <span className="stat-value-sm">avg score</span>
              <span className="stat-label">Practice Score</span>
            </div>
            <div className="stat-card">
              <Fire size={24} color="#F59E0B" />
              <span className="stat-value">{progress.currentStreak}</span>
              <span className="stat-label">Current Streak</span>
            </div>
            <div className="stat-card">
              <Fire size={24} color="#D97706" />
              <span className="stat-value">{progress.longestStreak}</span>
              <span className="stat-label">Best Streak</span>
            </div>
          </div>

          <h2 className="section-title">Activity</h2>

          <div className="activity-list">
            <div className="activity-row">
              <div className="activity-icon" style={{ background: '#FEF3C7' }}>
                <span style={{ fontSize: '1rem' }}>📖</span>
              </div>
              <span className="activity-label">Lessons Reflected</span>
              <span className="activity-value">{progress.lessonsWithReflections} / {LESSONS.length}</span>
            </div>
            <div className="activity-row">
              <div className="activity-icon" style={{ background: '#D1FAE5' }}>
                <span style={{ fontSize: '1rem' }}>✅</span>
              </div>
              <span className="activity-label">Challenges Completed</span>
              <span className="activity-value">{progress.challengesCompleted}</span>
            </div>
            <div className="activity-row">
              <div className="activity-icon" style={{ background: '#CFFAFE' }}>
                <Notebook size={18} color="#06B6D4" />
              </div>
              <span className="activity-label">Journal Entries</span>
              <span className="activity-value">{progress.journalEntries}</span>
            </div>
            <div className="activity-row">
              <div className="activity-icon" style={{ background: '#EDE9FE' }}>
                <ChatsCircle size={18} color="#8B5CF6" />
              </div>
              <span className="activity-label">Simulations</span>
              <span className="activity-value">{progress.simulationsCompleted}</span>
            </div>
            <div className="activity-row">
              <div className="activity-icon" style={{ background: '#DBEAFE' }}>
                <Brain size={18} color="#3B82F6" />
              </div>
              <span className="activity-label">Cards Learned</span>
              <span className="activity-value">{progress.cardsLearned}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
