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
import Badge from '../components/common/Badge';
import ScoreGauge from '../components/common/ScoreGauge';
import MonthlyReport from '../components/common/MonthlyReport';
import { cn } from '@/lib/utils';

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

  const bpqScore = progress ? Math.min(1000, Math.round(
    ((progress.averagePracticeScore || 0) / 100) * 1000 * 0.6 +
    Math.min(progress.totalPracticeAttempts || 0, 100) * 2 +
    Math.min(progress.currentStreak || 0, 30) * 6.67
  )) : 0;
  const bpqData = { score: bpqScore, level: getBPQLevel(bpqScore), categoryScores: {} };

  const strongest = recommendations?.strongestCategory
    ? SKILL_CATEGORIES.find(c => c.key === recommendations.strongestCategory) || null : null;
  const weakest = recommendations?.weakestCategory
    ? SKILL_CATEGORIES.find(c => c.key === recommendations.weakestCategory) || null : null;

  const level = calculateLevel(xp);
  const league = calculateLeague(xp);
  const bpq = Math.round(bpqData.score / 10);

  return (
    <div className="px-4 pb-6 pt-5 space-y-4 animate-fade-in">
      <div>
        <h1 className="font-serif text-2xl font-bold text-stone-900">Progress</h1>
        <p className="text-sm text-stone-500 mt-1">Track your growth</p>
      </div>

      {/* Daily Quests */}
      {allQuests.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Lightning size={16} weight="fill" color="#D4A853" />
            <h2 className="text-sm font-semibold text-stone-900">Daily Quests</h2>
          </div>
          {allQuests.map((quest) => (
            <div
              key={quest.id || quest.label}
              className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(quest.path)}
            >
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-stone-700 font-medium mb-2">{quest.label}</p>
                  <ProgressBar value={quest.value} max={quest.max} color={quest.color} size="sm" animate />
                </div>
                <div className="flex-shrink-0">
                  {quest.completed
                    ? <Gift size={22} weight="fill" color={quest.color} />
                    : <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ color: quest.color, background: `${quest.color}14` }}>+{quest.xp} XP</span>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Monthly Report */}
      <MonthlyReport db={db} isReady={isReady} />

      {/* BPQ Gauge */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 flex flex-col items-center gap-2">
        <ScoreGauge score={bpq} />
        <div className="text-center">
          <p className="text-sm font-semibold text-stone-900">{bpqData.level}</p>
          <p className="text-xs text-stone-400">BPQ: {bpqData.score} / 1000</p>
        </div>
      </div>

      {/* XP & Level */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: league.color }}
            >
              {level.level}
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">{level.name}</p>
              <Badge text={league.name} color={league.color} variant="soft" size="sm" />
            </div>
          </div>
          <span className="text-lg font-bold text-stone-900">{xp} <span className="text-xs text-stone-400 font-normal">XP</span></span>
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
      </div>

      {/* Skill Area Bars */}
      {progress && progress.totalPracticeAttempts > 0 && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4">
          <h2 className="text-sm font-semibold text-stone-900 mb-3">Skill Areas</h2>
          <div className="space-y-2.5">
            {SKILL_CATEGORIES.map((cat) => {
              const catScore = Math.min(100, Math.round((bpqData.categoryScores[cat.key] || 0) / 10));
              return (
                <div key={cat.key} className="flex items-center gap-2">
                  <span className="text-xs text-stone-600 w-32 flex-shrink-0">{cat.key}</span>
                  <div className="flex-1">
                    <ProgressBar value={catScore} max={100} color={cat.color} size="sm" />
                  </div>
                  <span className="text-xs text-stone-400 w-8 text-right">{catScore}%</span>
                  <button
                    className="w-5 h-5 flex items-center justify-center text-stone-300 hover:text-gold transition-colors"
                    onClick={() => navigate(`/mode/practice?skill=${encodeURIComponent(cat.key)}`)}
                    title={`Practice ${cat.key}`}
                  >
                    <ArrowRight size={11} weight="bold" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Strongest / Weakest */}
      {strongest && weakest && (
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-3 flex items-center gap-2">
            <ArrowUp size={16} weight="bold" color="#C49240" />
            <div>
              <p className="text-[10px] text-stone-400 font-medium">Strongest</p>
              <p className="text-xs font-semibold" style={{ color: strongest.color }}>{strongest.key}</p>
            </div>
          </div>
          <div
            className="bg-white rounded-xl border border-stone-200 shadow-sm p-3 flex items-center gap-2 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(`/mode/practice?skill=${encodeURIComponent(weakest.key)}`)}
          >
            <ArrowDown size={16} weight="bold" color="#78716C" />
            <div className="flex-1">
              <p className="text-[10px] text-stone-400 font-medium">Needs Work</p>
              <p className="text-xs font-semibold text-stone-500">{weakest.key}</p>
            </div>
            <ArrowRight size={12} weight="bold" color="#78716C" />
          </div>
        </div>
      )}

      {progress && (
        <>
          {/* Stats grid */}
          <h2 className="text-sm font-semibold text-stone-900">Statistics</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Target size={22} color="#C49240" />, value: progress.totalPracticeAttempts, label: 'Practice Attempts' },
              { icon: <span className="text-lg font-bold" style={{ color: '#C49240' }}>{progress.averagePracticeScore}</span>, value: null, label: 'Avg Score', sub: 'avg score' },
              { icon: <Fire size={22} color="#D4A853" />, value: progress.currentStreak, label: 'Current Streak' },
              { icon: <Fire size={22} color="#D97706" />, value: progress.longestStreak, label: 'Best Streak' },
            ].map(({ icon, value, label, sub }, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 flex flex-col items-center gap-1">
                {icon}
                {value !== null && <span className="text-xl font-bold text-stone-900">{value}</span>}
                {sub && <span className="text-xs text-stone-400">{sub}</span>}
                <span className="text-xs text-stone-500 text-center">{label}</span>
              </div>
            ))}
          </div>

          {/* Activity accordion */}
          <h2 className="text-sm font-semibold text-stone-900">Activity</h2>
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm divide-y divide-stone-100 overflow-hidden">

            {/* Lessons */}
            <div>
              <button
                className="w-full flex items-center gap-3 p-4 hover:bg-stone-50 transition-colors"
                onClick={() => toggleAccordion('lessons')}
              >
                <div className="w-8 h-8 rounded-lg bg-stone-50 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={16} color="#C49240" />
                </div>
                <span className="flex-1 text-sm font-medium text-stone-700 text-left">Lessons Reflected</span>
                <span className="text-sm text-stone-500 mr-2">{progress.lessonsWithReflections} / {LESSONS.length}</span>
                {openAccordion === 'lessons' ? <CaretUp size={14} color="#A8A29E" /> : <CaretDown size={14} color="#A8A29E" />}
              </button>
              {openAccordion === 'lessons' && (
                <div className="px-4 pb-3 space-y-2">
                  {(reflections || []).length === 0 ? (
                    <p className="text-xs text-stone-400 py-2">No reflections yet — complete a lesson to add one.</p>
                  ) : (reflections || []).map(r => {
                    const lesson = LESSONS.find(l => l.id === r.lesson_id);
                    return (
                      <div
                        key={r.lesson_id}
                        className="p-3 bg-stone-50 rounded-lg cursor-pointer hover:bg-stone-100 transition-colors"
                        onClick={() => navigate('/mode/learn', { state: { lessonIndex: r.lesson_id } })}
                      >
                        <p className="text-xs font-medium text-stone-800">{lesson?.title || `Lesson ${r.lesson_id}`}</p>
                        <p className="text-xs text-stone-500 mt-0.5">{r.content?.slice(0, 80)}{r.content?.length > 80 ? '…' : ''}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Challenges */}
            <div>
              <button
                className="w-full flex items-center gap-3 p-4 hover:bg-stone-50 transition-colors"
                onClick={() => toggleAccordion('challenges')}
              >
                <div className="w-8 h-8 rounded-lg bg-stone-50 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={16} color="#C49240" />
                </div>
                <span className="flex-1 text-sm font-medium text-stone-700 text-left">Challenges Completed</span>
                <span className="text-sm text-stone-500 mr-2">{progress.challengesCompleted}</span>
                {openAccordion === 'challenges' ? <CaretUp size={14} color="#A8A29E" /> : <CaretDown size={14} color="#A8A29E" />}
              </button>
              {openAccordion === 'challenges' && (
                <div className="px-4 pb-3 space-y-2">
                  {(challengeHistory || []).length === 0 ? (
                    <p className="text-xs text-stone-400 py-2">No challenges completed yet.</p>
                  ) : (challengeHistory || []).map((c, i) => (
                    <div key={i} className="p-3 bg-stone-50 rounded-lg">
                      <p className="text-xs font-medium text-stone-800">{c.title || c.challenge_title || 'Daily Challenge'}</p>
                      <p className="text-xs text-stone-500 mt-0.5">{c.date || c.challenge_date}{c.score ? ` · ${c.score}%` : ''}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Journal */}
            <button
              className="w-full flex items-center gap-3 p-4 hover:bg-stone-50 transition-colors"
              onClick={() => navigate('/journal')}
            >
              <div className="w-8 h-8 rounded-lg bg-stone-50 flex items-center justify-center flex-shrink-0">
                <Notebook size={16} color="#C49240" />
              </div>
              <span className="flex-1 text-sm font-medium text-stone-700 text-left">Journal Entries</span>
              <span className="text-sm text-stone-500 mr-2">{progress.journalEntries}</span>
              <ArrowRight size={14} color="#A8A29E" />
            </button>

            {/* Simulations */}
            <div>
              <button
                className="w-full flex items-center gap-3 p-4 hover:bg-stone-50 transition-colors"
                onClick={() => toggleAccordion('simulations')}
              >
                <div className="w-8 h-8 rounded-lg bg-stone-50 flex items-center justify-center flex-shrink-0">
                  <ChatsCircle size={16} color="#C49240" />
                </div>
                <span className="flex-1 text-sm font-medium text-stone-700 text-left">Simulations</span>
                <span className="text-sm text-stone-500 mr-2">{progress.simulationsCompleted}</span>
                {openAccordion === 'simulations' ? <CaretUp size={14} color="#A8A29E" /> : <CaretDown size={14} color="#A8A29E" />}
              </button>
              {openAccordion === 'simulations' && (
                <div className="px-4 pb-3 space-y-2">
                  {(simulationHistory || []).length === 0 ? (
                    <p className="text-xs text-stone-400 py-2">No simulations completed yet.</p>
                  ) : (simulationHistory || []).map((s, i) => {
                    const result = s.ending_node?.includes('great') ? 'Great ending'
                      : s.ending_node?.includes('good') || s.ending_node?.includes('medium') ? 'Good ending'
                      : 'Needs work';
                    const date = s.created_at ? new Date(s.created_at).toLocaleDateString() : '';
                    return (
                      <div key={i} className="p-3 bg-stone-50 rounded-lg">
                        <p className="text-xs font-medium text-stone-800">Simulation #{s.simulation_id}</p>
                        <p className="text-xs text-stone-500 mt-0.5">{date}{result ? ` · ${result}` : ''}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Cards Learned */}
            <div>
              <button
                className="w-full flex items-center gap-3 p-4 hover:bg-stone-50 transition-colors"
                onClick={() => toggleAccordion('cards')}
              >
                <div className="w-8 h-8 rounded-lg bg-stone-50 flex items-center justify-center flex-shrink-0">
                  <Brain size={16} color="#C49240" />
                </div>
                <span className="flex-1 text-sm font-medium text-stone-700 text-left">Cards Learned</span>
                <span className="text-sm text-stone-500 mr-2">{progress.cardsLearned}</span>
                {openAccordion === 'cards' ? <CaretUp size={14} color="#A8A29E" /> : <CaretDown size={14} color="#A8A29E" />}
              </button>
              {openAccordion === 'cards' && (
                <div className="px-4 pb-3 space-y-2">
                  {(learnedCards || []).length === 0 ? (
                    <p className="text-xs text-stone-400 py-2">No cards learned yet — try Review mode.</p>
                  ) : (learnedCards || []).map((c, i) => {
                    const date = c.last_review ? new Date(c.last_review).toLocaleDateString() : '';
                    const typeLabel = c.card_type === 'flashcard' ? 'Flashcard' : c.card_type === 'practice' ? 'Practice' : 'Challenge';
                    return (
                      <div key={i} className="p-3 bg-stone-50 rounded-lg">
                        <p className="text-xs font-medium text-stone-800">{c.front?.slice(0, 70)}{c.front?.length > 70 ? '…' : ''}</p>
                        <p className="text-xs text-stone-500 mt-0.5">{typeLabel}{date ? ` · ${date}` : ''} · {c.repetitions} rep{c.repetitions !== 1 ? 's' : ''}</p>
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
