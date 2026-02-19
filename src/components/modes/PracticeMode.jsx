import { useState, useMemo } from 'react';
import { Robot, Sparkle } from '@phosphor-icons/react';
import { MODE_THEMES } from '../../themes/modeThemes';
import { PRACTICE_SCENARIOS } from '../../data/practiceScenarios';
import { useDatabase } from '../../hooks/useDatabase';
import { savePracticeAttempt } from '../../utils/database';
import { getRandomScenario } from '../../utils/scoring';
import { scoreResponse } from '../../engine/responseScorer';
import { recordScore } from '../../engine/adaptiveDifficulty';
import { awardXP, XP_RULES } from '../../engine/xpSystem';
import { updateQuestProgress } from '../../engine/dailyQuests';
import { checkAchievements } from '../../engine/achievements';
import { getOverallProgress } from '../../utils/database';
import { hasApiKey } from '../../services/claudeApi';
import { getAIFeedback } from '../../engine/aiFeedback';
import ModeHeader from '../layout/ModeHeader';
import ScoreGauge from '../common/ScoreGauge';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Skeleton from '../common/Skeleton';
import './PracticeMode.css';

const theme = MODE_THEMES.practice;

const DIFFICULTY_COLORS = {
  beginner: '#10B981',
  intermediate: '#3B82F6',
  advanced: '#8B5CF6',
  expert: '#F59E0B',
  master: '#EF4444',
};

export default function PracticeMode() {
  const { db } = useDatabase();
  const [scenario, setScenario] = useState(null);
  const [userQuestion, setUserQuestion] = useState('');
  const [result, setResult] = useState(null);
  const [completedIds, setCompletedIds] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');

  // AI feedback state
  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set();
    PRACTICE_SCENARIOS.forEach(s => {
      const cat = s.skillCategory || s.skill;
      if (cat) cats.add(cat);
    });
    return Array.from(cats).sort();
  }, []);

  // Filtered scenarios
  const filteredScenarios = useMemo(() => {
    if (!categoryFilter) return PRACTICE_SCENARIOS;
    return PRACTICE_SCENARIOS.filter(s => (s.skillCategory || s.skill) === categoryFilter);
  }, [categoryFilter]);

  const loadScenario = () => {
    const next = getRandomScenario(filteredScenarios, completedIds);
    setScenario(next);
    setUserQuestion('');
    setResult(null);
    setAiResult(null);
    setAiLoading(false);
    setAiError(null);
  };

  const handleSubmit = async () => {
    if (!scenario || !userQuestion.trim()) return;
    const scored = scoreResponse(userQuestion, scenario);
    setResult(scored);
    setCompletedIds([...completedIds, scenario.id]);

    if (db) {
      try {
        const feedbackText = scored.feedback.join(' ');
        savePracticeAttempt(db, scenario.id, userQuestion, scored.score, feedbackText);
        const category = scenario.skillCategory || scenario.skill || 'Open vs. Closed';
        recordScore(db, 'practice', category, scored.score);
        const xpAmount = XP_RULES.practice(scored.score);
        awardXP(db, 'practice', xpAmount, `Practiced: ${category}`);
        updateQuestProgress(db, 'practice');
        checkAchievements(db, getOverallProgress(db));
      } catch (err) {
        console.error('Engine error during practice submission:', err);
      }
    }

    // Trigger AI review if flagged and API key available
    if (scored.needsAIReview && hasApiKey()) {
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

            {!result ? (
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

                {/* Soft upsell when AI could help but no key */}
                {result.needsAIReview && !hasApiKey() && !aiLoading && (
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
