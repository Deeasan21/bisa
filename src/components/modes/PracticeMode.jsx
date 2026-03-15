import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Robot, Sparkle, Eye } from '@phosphor-icons/react';
import { MODE_THEMES } from '../../themes/modeThemes';
import { PRACTICE_SCENARIOS } from '../../data/practiceScenarios';
import { useSupabaseDB } from '../../hooks/useSupabaseDB';
import { getRandomScenario } from '../../utils/scoring';
import { scoreResponse } from '../../engine/responseScorer';
import { aiScoreQuestion } from '../../engine/aiScorer';
import { XP_RULES } from '../../engine/xpSystem';
import { hasApiKey } from '../../services/claudeApi';
import { getAIFeedback } from '../../engine/aiFeedback';
import { generateObservationClues } from '../../engine/observationClues';
import ModeHeader from '../layout/ModeHeader';
import ScoreGauge from '../common/ScoreGauge';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Skeleton from '../common/Skeleton';
import AchievementToast from '../common/AchievementToast';
import FloatingOrbs from '../common/FloatingOrbs';
import './PracticeMode.css';

const theme = MODE_THEMES.practice;

function ObservationCard({ label, clue }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`obs-card${flipped ? ' flipped' : ''}`}
      onClick={() => setFlipped(f => !f)}
      role="button"
      aria-label={`${label}: tap to reveal`}
    >
      <div className="obs-card-inner">
        <div className="obs-card-front">
          <Eye size={16} weight="duotone" color="#78716C" />
          <span className="obs-card-label">{label}</span>
          <span className="obs-card-hint">tap to reveal</span>
        </div>
        <div className="obs-card-back">
          <span className="obs-card-back-label">{label}</span>
          <p>{clue}</p>
        </div>
      </div>
    </div>
  );
}

const DIFFICULTY_COLORS = {
  beginner: '#10B981',
  intermediate: '#3B82F6',
  advanced: '#8B5CF6',
  expert: '#F59E0B',
  master: '#EF4444',
};

export default function PracticeMode() {
  const { db } = useSupabaseDB();
  const [scenario, setScenario] = useState(null);
  const [userQuestion, setUserQuestion] = useState('');
  const [result, setResult] = useState(null);
  const [completedIds, setCompletedIds] = useState([]);
  const [searchParams] = useSearchParams();
  const [categoryFilter, setCategoryFilter] = useState(() => searchParams.get('skill') || '');

  const [newAchievement, setNewAchievement] = useState(null);

  const [observationClues, setObservationClues] = useState([]);

  // AI feedback state
  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [showAiButton, setShowAiButton] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set();
    PRACTICE_SCENARIOS.forEach(s => {
      const cat = s.skillCategory || s.skill;
      if (cat) cats.add(cat);
    });
    return Array.from(cats).sort();
  }, []);

  // Filtered scenarios by category (adaptive difficulty tier filtering removed for Supabase migration)
  const filteredScenarios = useMemo(() => {
    let filtered = PRACTICE_SCENARIOS;
    if (categoryFilter) {
      filtered = filtered.filter(s => (s.skillCategory || s.skill) === categoryFilter);
    }
    return filtered;
  }, [categoryFilter]);

  // Auto-start when arriving from Progress page with a skill param
  useEffect(() => {
    if (searchParams.get('skill') && !scenario) {
      loadScenario();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadScenario = () => {
    const next = getRandomScenario(filteredScenarios, completedIds);
    setScenario(next);
    setUserQuestion('');
    setResult(null);
    setAiResult(null);
    setAiLoading(false);
    setAiError(null);
    setShowAiButton(false);
    setObservationClues(next ? generateObservationClues(next) : []);
  };

  const handleSubmit = async () => {
    if (!scenario || !userQuestion.trim()) return;

    // AI-first scoring: try Haiku for fast, context-aware scoring
    // Falls back to rule-based if AI fails
    setAiLoading(true);
    let scored;
    try {
      scored = await aiScoreQuestion(userQuestion, scenario);
    } catch {
      scored = scoreResponse(userQuestion, scenario);
    }
    setAiLoading(false);

    setResult(scored);
    setCompletedIds([...completedIds, scenario.id]);

    if (db) {
      try {
        const feedbackText = scored.feedback.join(' ');
        await db.savePracticeAttempt(scenario.id, userQuestion, scored.score, feedbackText);
        const category = scenario.skillCategory || scenario.skill || 'Open vs. Closed';
        await db.recordScore('practice', category, scored.score);
        const xpAmount = XP_RULES.practice(scored.score);
        await db.awardXP('practice', xpAmount, `Practiced: ${category}`);
        await db.updateQuestProgress('practice');
        const { newlyUnlocked } = await db.checkAchievements();
        if (newlyUnlocked.length > 0) setNewAchievement(newlyUnlocked[0]);
      } catch (err) {
        console.error('Engine error during practice submission:', err);
      }
    }

    // Show AI coaching button for deeper feedback (uses Sonnet)
    if (hasApiKey() && scored.score > 0) {
      setShowAiButton(true);
    }
  };

  const handleRequestAI = async () => {
    if (!scenario || !userQuestion.trim()) return;
    setShowAiButton(false);
    setAiLoading(true);
    setAiError(null);
    try {
      const aiFeedback = await getAIFeedback(userQuestion, scenario);
      setAiResult(aiFeedback);
    } catch (err) {
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const skillLabel = scenario ? (scenario.skillCategory || scenario.skill) : '';
  const diffLabel = scenario?.difficultyTier;

  return (
    <div className="practice-mode">
      <FloatingOrbs color={theme.primary} count={4} />
      <AchievementToast achievementId={newAchievement} visible={!!newAchievement} onDone={() => setNewAchievement(null)} />
      <ModeHeader theme={theme} subtitle={`${PRACTICE_SCENARIOS.length} scenarios`} />

      <div className="practice-content">
        {!scenario ? (
          <div className="practice-empty animate-fade-in">
            <div className="practice-empty-icon">?</div>
            <h2>Transform Weak Questions</h2>
            <p>You'll see a scenario with a weak question. Your job: rewrite it into a powerful, open-ended question.</p>

            {/* Category Filter Chips */}
            <div className="category-filters">
              <button
                className={`category-chip${!categoryFilter ? ' active' : ''}`}
                onClick={() => setCategoryFilter('')}
              >
                All ({PRACTICE_SCENARIOS.length})
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`category-chip${categoryFilter === cat ? ' active' : ''}`}
                  onClick={() => setCategoryFilter(categoryFilter === cat ? '' : cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <Button variant="mode" modeColor={theme.primary} onClick={loadScenario}>
              Start Practicing
            </Button>
          </div>
        ) : (
          <div className="practice-scenario animate-fade-in">
            <div className="scenario-badges">
              <Badge text={skillLabel} color={theme.primary} variant="soft" />
              {diffLabel && (
                <Badge
                  text={diffLabel}
                  color={DIFFICULTY_COLORS[diffLabel] || '#6B7280'}
                  variant="outlined"
                  size="sm"
                />
              )}
            </div>
            <div className="scenario-context">
              <h3>Scenario</h3>
              <p>{scenario.context}</p>
            </div>
            <div className="weak-question">
              <span className="weak-label">Weak question:</span>
              <p>"{scenario.weakQuestion}"</p>
            </div>

            {!result && observationClues.length > 0 && (
              <div className="observation-section">
                <div className="observation-header">
                  <Eye size={13} weight="duotone" />
                  <span>Notice before you ask</span>
                </div>
                <div className="observation-cards">
                  {observationClues.map((c, i) => (
                    <ObservationCard key={i} label={c.label} clue={c.clue} />
                  ))}
                </div>
              </div>
            )}

            {!result && !aiLoading ? (
              <div className="practice-input">
                <label>Write a better question:</label>
                <textarea
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Transform this into an open, powerful question..."
                  rows={3}
                />
                <p className="practice-hint">Shift+Enter to submit</p>
                <Button
                  variant="mode"
                  modeColor={theme.primary}
                  onClick={handleSubmit}
                  disabled={!userQuestion.trim()}
                >
                  Submit
                </Button>
              </div>
            ) : !result && aiLoading ? (
              <div className="practice-scoring animate-fade-in" style={{ textAlign: 'center', padding: '40px 20px' }}>
                <Robot size={32} weight="duotone" color={theme.primary} style={{ marginBottom: 12 }} />
                <p style={{ fontWeight: 600, marginBottom: 8 }}>Evaluating your question...</p>
                <Skeleton height={14} width="70%" />
                <Skeleton height={14} width="50%" />
              </div>
            ) : (
              <div className="practice-result animate-fade-in">
                <div className="score-reveal animate-scale-in">
                  <ScoreGauge score={result.score} />
                </div>

                <div className="feedback-box">
                  {result.feedback.map((msg, i) => (
                    <p key={i}>{msg}</p>
                  ))}
                  {result.techniques && result.techniques.length > 0 && (
                    <div className="matched-keywords">
                      <span>Techniques detected:</span>
                      {result.techniques.map(t => (
                        <Badge key={t} text={t} color={theme.primary} variant="outlined" size="sm" />
                      ))}
                    </div>
                  )}
                </div>

                {/* AI Coach Feedback */}
                {aiLoading && (
                  <div className="ai-feedback-section animate-fade-in">
                    <div className="ai-feedback-header">
                      <Robot size={16} weight="duotone" />
                      <span>AI Coach is reviewing...</span>
                    </div>
                    <Skeleton height={16} width="90%" />
                    <Skeleton height={16} width="75%" />
                    <Skeleton height={16} width="60%" />
                  </div>
                )}

                {aiResult && (
                  <div className="ai-feedback-section animate-fade-in">
                    <div className="ai-feedback-header">
                      <Sparkle size={16} weight="fill" color="#8B5CF6" />
                      <span>AI Coach Feedback</span>
                    </div>

                    {aiResult.strengths?.length > 0 && (
                      <div className="ai-feedback-group strengths">
                        <h5>Strengths</h5>
                        {aiResult.strengths.map((s, i) => (
                          <p key={i}>{s}</p>
                        ))}
                      </div>
                    )}

                    {aiResult.improvements?.length > 0 && (
                      <div className="ai-feedback-group improvements">
                        <h5>Try This</h5>
                        {aiResult.improvements.map((s, i) => (
                          <p key={i}>{s}</p>
                        ))}
                      </div>
                    )}

                    {aiResult.suggestedRewrite && (
                      <div className="ai-suggested-rewrite">
                        <span className="rewrite-label">Suggested rewrite:</span>
                        <p>"{aiResult.suggestedRewrite}"</p>
                      </div>
                    )}

                    {aiResult.techniques?.length > 0 && (
                      <div className="ai-techniques">
                        {aiResult.techniques.map(t => (
                          <Badge key={t} text={t} color="#8B5CF6" variant="soft" size="sm" />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {aiError && (
                  <div className="ai-feedback-error animate-fade-in">
                    <p>AI feedback unavailable right now. Your score above is still valid!</p>
                  </div>
                )}

                {/* Manual AI coaching button for scores outside auto-trigger range */}
                {showAiButton && !aiLoading && !aiResult && (
                  <button className="ai-coaching-btn animate-fade-in" onClick={handleRequestAI}>
                    <Sparkle size={16} weight="fill" color="#8B5CF6" />
                    <span>Get AI Coaching</span>
                  </button>
                )}

                {/* Soft upsell when no API key */}
                {!hasApiKey() && !aiLoading && result.score > 0 && (
                  <div className="ai-upsell animate-fade-in">
                    <Robot size={16} weight="duotone" color="#8B5CF6" />
                    <p>Want more detailed feedback? Add your API key in <strong>Settings</strong> on your Profile page.</p>
                  </div>
                )}

                {scenario.strongExamples && scenario.strongExamples.length > 0 && (
                  <div className="strong-examples">
                    <h4>Strong Examples</h4>
                    {scenario.strongExamples.map((ex, i) => (
                      <p key={i} className="strong-example">"{ex}"</p>
                    ))}
                  </div>
                )}

                <Button variant="mode" modeColor={theme.primary} onClick={loadScenario}>
                  Next Scenario
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
