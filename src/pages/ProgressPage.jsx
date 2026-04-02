import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CaretDown, CaretUp } from '@phosphor-icons/react';
import { Fire, Target, Notebook, ChatsCircle, Brain, ArrowUp, ArrowDown, BookOpen, CheckCircle, ArrowRight, Lightning, Gift } from '@phosphor-icons/react';
import { useSupabaseDB } from '../hooks/useSupabaseDB';
import { calculateLevel, calculateLeague } from '../utils/xpCalculator';
import { getBPQLevel } from '../engine/bpqScore';
import { LESSONS } from '../data/lessons';
import { PRACTICE_SCENARIOS } from '../data/practiceScenarios';
import ProgressBar from '../components/common/ProgressBar';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import ScoreGauge from '../components/common/ScoreGauge';
import MonthlyReport from '../components/common/MonthlyReport';
import './ProgressPage.css';

const SKILL_CATEGORIES = [
  { key: 'Open vs. Closed', color: '#C49240' },
  { key: 'Clarifying', color: '#C49240' },
  { key: 'Probing', color: '#C49240' },
  { key: 'Empathy', color: '#C49240' },
  { key: 'Framing', color: '#C49240' },
  { key: 'Follow-up', color: '#C49240' },
  { key: 'Self-Reflection', color: '#C49240' },
  { key: 'Body Language', color: '#C49240' },
  { key: 'Cultural Awareness', color: '#C49240' },
  { key: 'Leadership', color: '#C49240' },
];

export default function ProgressPage() {
  const { db, isReady } = useSupabaseDB();
  const navigate = useNavigate();

  const enabled = isReady && !!db;

  const { data: progress } = useQuery({
    queryKey: ['overallProgress'],
    queryFn: () => db.getOverallProgress(),
    enabled,
    placeholderData: null,
  });

  const { data: weekXP } = useQuery({
    queryKey: ['weeklyXP'],
    queryFn: () => db.getWeeklyXP(),
    enabled,
    placeholderData: 0,
  });

  const { data: recommendations } = useQuery({
    queryKey: ['recommendations'],
    queryFn: () => db.getRecommendations(),
    enabled,
    placeholderData: null,
  });

  const { data: engineQuests } = useQuery({
    queryKey: ['dailyQuests'],
    queryFn: () => db.generateDailyQuests(),
    enabled,
    placeholderData: [],
  });

  const [openAccordion, setOpenAccordion] = useState(null);

  const { data: reflections } = useQuery({
    queryKey: ['allReflections'],
    queryFn: () => db.getAllReflections(),
    enabled: enabled && openAccordion === 'lessons',
    placeholderData: [],
  });

  const { data: challengeHistory } = useQuery({
    queryKey: ['challengeHistory'],
    queryFn: () => db.getChallengeHistory(20),
    enabled: enabled && openAccordion === 'challenges',
    placeholderData: [],
  });

  const { data: simulationHistory } = useQuery({
    queryKey: ['simulationHistory'],
    queryFn: () => db.getSimulationHistory(20),
    enabled: enabled && openAccordion === 'simulations',
    placeholderData: [],
  });

  const { data: learnedCards } = useQuery({
    queryKey: ['learnedCards'],
    queryFn: () => db.getLearnedCards(20),
    enabled: enabled && openAccordion === 'cards',
    placeholderData: [],
  });

  const toggleAccordion = (key) => setOpenAccordion(prev => prev === key ? null : key);

  const QUEST_COLORS = {
    practice: '#D4A853', lesson: '#9A6B1F', journal: '#D4A853',
    daily_challenge: '#C49240', review: '#9A6B1F', simulation: '#D4A853', streak: '#D4A853',
  };
  const QUEST_PATHS = {
    practice: '/mode/practice', lesson: '/mode/learn', journal: '/journal',
    daily_challenge: '/mode/daily', review: '/mode/review', simulation: '/mode/simulate', streak: '/mode/daily',
  };
  const allQuests = (engineQuests || []).map(q => ({
    id: q.id,
    label: q.quest_description,
    value: q.progress || 0,
    max: q.goal || 1,
    xp: q.xp_reward,
    color: QUEST_COLORS[q.quest_type] || '#6B7280',
    path: QUEST_PATHS[q.quest_type] || '/mode/practice',
    completed: q.completed === 1 || q.completed === true,
  }));

  const xp = progress?.totalXP || 0;

  // Derive BPQ from progress
  const bpqScore = progress ? Math.min(1000, Math.round(
    ((progress.averagePracticeScore || 0) / 100) * 1000 * 0.6 +
    Math.min(progress.totalPracticeAttempts || 0, 100) * 2 +
    Math.min(progress.currentStreak || 0, 30) * 6.67
  )) : 0;
  const bpqData = { score: bpqScore, level: getBPQLevel(bpqScore), categoryScores: {} };

  // Derive insights from recommendations
  const strongest = recommendations?.strongestCategory
    ? SKILL_CATEGORIES.find(c => c.key === recommendations.strongestCategory) || null
    : null;
  const weakest = recommendations?.weakestCategory
    ? SKILL_CATEGORIES.find(c => c.key === recommendations.weakestCategory) || null
    : null;

  const level = calculateLevel(xp);
  const league = calculateLeague(xp);
  const bpq = Math.round(bpqData.score / 10); // Scale 0-1000 → 0-100 for ScoreGauge

  return (
    <div className="progress-page animate-fade-in">
      <div className="progress-header">
        <h1>Progress</h1>
        <p>Track your growth</p>
      </div>

      {/* Daily Quests */}
      {allQuests.length > 0 && (
        <div className="quests-section">
          <div className="quests-title">
            <Lightning size={18} weight="fill" color="#D4A853" />
            <h2>Daily Quests</h2>
          </div>
          {allQuests.map((quest) => (
            <Card key={quest.id || quest.label} padding="md" onClick={() => navigate(quest.path)}>
              <div className="quest-row">
                <div className="quest-info">
                  <span className="quest-label">{quest.label}</span>
                  <ProgressBar value={quest.value} max={quest.max} color={quest.color} size="sm" animate />
                </div>
                <div className="quest-reward">
                  {quest.completed
                    ? <Gift size={24} weight="fill" color={quest.color} />
                    : <span className="quest-xp" style={{ color: quest.color, background: `${quest.color}14` }}>+{quest.xp} XP</span>
                  }
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Monthly Report */}
      <MonthlyReport db={db} isReady={isReady} />

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
            color="#D4A853"
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
                  <button
                    className="skill-bar-practice-btn"
                    onClick={() => navigate(`/mode/practice?skill=${encodeURIComponent(cat.key)}`)}
                    title={`Practice ${cat.key}`}
                  >
                    <ArrowRight size={12} weight="bold" />
                  </button>
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
            <ArrowUp size={16} weight="bold" color="#C49240" />
            <div>
              <span className="callout-label">Strongest</span>
              <span className="callout-value" style={{ color: strongest.color }}>{strongest.key}</span>
            </div>
          </div>
          <div
            className="skill-callout weak skill-callout--clickable"
            onClick={() => navigate(`/mode/practice?skill=${encodeURIComponent(weakest.key)}`)}
            role="button"
            title={`Practice ${weakest.key}`}
          >
            <ArrowDown size={16} weight="bold" color="#78716C" />
            <div>
              <span className="callout-label">Needs Work</span>
              <span className="callout-value" style={{ color: '#78716C' }}>{weakest.key}</span>
            </div>
            <ArrowRight size={14} weight="bold" color="#78716C" style={{ marginLeft: 'auto' }} />
          </div>
        </div>
      )}

      {progress && (
        <>
          <h2 className="section-title">Statistics</h2>

          <div className="stats-grid">
            <div className="stat-card">
              <Target size={24} color="#C49240" />
              <span className="stat-value">{progress.totalPracticeAttempts}</span>
              <span className="stat-label">Practice Attempts</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon-text" style={{ color: '#C49240' }}>
                {progress.averagePracticeScore}
              </span>
              <span className="stat-value-sm">avg score</span>
              <span className="stat-label">Practice Score</span>
            </div>
            <div className="stat-card">
              <Fire size={24} color="#D4A853" />
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

            {/* Lessons Reflected */}
            <div>
              <div className="activity-row activity-row--clickable" onClick={() => toggleAccordion('lessons')}>
                <div className="activity-icon" style={{ background: 'var(--bg-secondary)' }}>
                  <BookOpen size={18} color="#C49240" />
                </div>
                <span className="activity-label">Lessons Reflected</span>
                <span className="activity-value">{progress.lessonsWithReflections} / {LESSONS.length}</span>
                {openAccordion === 'lessons' ? <CaretUp size={14} color="var(--text-muted)" /> : <CaretDown size={14} color="var(--text-muted)" />}
              </div>
              {openAccordion === 'lessons' && (
                <div className="accordion-body">
                  {(reflections || []).length === 0 ? (
                    <p className="accordion-empty">No reflections yet — complete a lesson to add one.</p>
                  ) : (reflections || []).map(r => {
                    const lesson = LESSONS.find(l => l.id === r.lesson_id);
                    return (
                      <div key={r.lesson_id} className="accordion-item" onClick={() => navigate('/mode/learn', { state: { lessonIndex: r.lesson_id } })}>
                        <span className="accordion-item-title">{lesson?.title || `Lesson ${r.lesson_id}`}</span>
                        <span className="accordion-item-sub">{r.content?.slice(0, 80)}{r.content?.length > 80 ? '…' : ''}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Challenges Completed */}
            <div>
              <div className="activity-row activity-row--clickable" onClick={() => toggleAccordion('challenges')}>
                <div className="activity-icon" style={{ background: 'var(--bg-secondary)' }}>
                  <CheckCircle size={18} color="#C49240" />
                </div>
                <span className="activity-label">Challenges Completed</span>
                <span className="activity-value">{progress.challengesCompleted}</span>
                {openAccordion === 'challenges' ? <CaretUp size={14} color="var(--text-muted)" /> : <CaretDown size={14} color="var(--text-muted)" />}
              </div>
              {openAccordion === 'challenges' && (
                <div className="accordion-body">
                  {(challengeHistory || []).length === 0 ? (
                    <p className="accordion-empty">No challenges completed yet.</p>
                  ) : (challengeHistory || []).map((c, i) => (
                    <div key={i} className="accordion-item">
                      <span className="accordion-item-title">{c.title || c.challenge_title || 'Daily Challenge'}</span>
                      <span className="accordion-item-sub">{c.date || c.challenge_date}{c.score ? ` · ${c.score}%` : ''}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Journal Entries */}
            <div className="activity-row activity-row--clickable" onClick={() => navigate('/journal')}>
              <div className="activity-icon" style={{ background: 'var(--bg-secondary)' }}>
                <Notebook size={18} color="#C49240" />
              </div>
              <span className="activity-label">Journal Entries</span>
              <span className="activity-value">{progress.journalEntries}</span>
              <ArrowRight size={14} color="var(--text-muted)" />
            </div>

            {/* Simulations */}
            <div>
              <div className="activity-row activity-row--clickable" onClick={() => toggleAccordion('simulations')}>
                <div className="activity-icon" style={{ background: 'var(--bg-secondary)' }}>
                  <ChatsCircle size={18} color="#C49240" />
                </div>
                <span className="activity-label">Simulations</span>
                <span className="activity-value">{progress.simulationsCompleted}</span>
                {openAccordion === 'simulations' ? <CaretUp size={14} color="var(--text-muted)" /> : <CaretDown size={14} color="var(--text-muted)" />}
              </div>
              {openAccordion === 'simulations' && (
                <div className="accordion-body">
                  {(simulationHistory || []).length === 0 ? (
                    <p className="accordion-empty">No simulations completed yet.</p>
                  ) : (simulationHistory || []).map((s, i) => {
                    const result = s.ending_node?.includes('great') ? 'Great ending'
                      : s.ending_node?.includes('good') || s.ending_node?.includes('medium') ? 'Good ending'
                      : 'Needs work';
                    const date = s.created_at ? new Date(s.created_at).toLocaleDateString() : '';
                    return (
                      <div key={i} className="accordion-item" style={{ cursor: 'default' }}>
                        <span className="accordion-item-title">Simulation #{s.simulation_id}</span>
                        <span className="accordion-item-sub">{date}{result ? ` · ${result}` : ''}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Cards Learned */}
            <div>
              <div className="activity-row activity-row--clickable" onClick={() => toggleAccordion('cards')}>
                <div className="activity-icon" style={{ background: 'var(--bg-secondary)' }}>
                  <Brain size={18} color="#C49240" />
                </div>
                <span className="activity-label">Cards Learned</span>
                <span className="activity-value">{progress.cardsLearned}</span>
                {openAccordion === 'cards' ? <CaretUp size={14} color="var(--text-muted)" /> : <CaretDown size={14} color="var(--text-muted)" />}
              </div>
              {openAccordion === 'cards' && (
                <div className="accordion-body">
                  {(learnedCards || []).length === 0 ? (
                    <p className="accordion-empty">No cards learned yet — try Review mode.</p>
                  ) : (learnedCards || []).map((c, i) => {
                    const date = c.last_review ? new Date(c.last_review).toLocaleDateString() : '';
                    const typeLabel = c.card_type === 'flashcard' ? 'Flashcard' : c.card_type === 'practice' ? 'Practice' : 'Challenge';
                    return (
                      <div key={i} className="accordion-item" style={{ cursor: 'default' }}>
                        <span className="accordion-item-title">{c.front?.slice(0, 70)}{c.front?.length > 70 ? '…' : ''}</span>
                        <span className="accordion-item-sub">{typeLabel}{date ? ` · ${date}` : ''} · {c.repetitions} rep{c.repetitions !== 1 ? 's' : ''}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        </>
      )}
    </div>
  );
}
