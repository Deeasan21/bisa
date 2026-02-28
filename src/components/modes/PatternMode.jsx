import { useState, useMemo } from 'react';
import { ChatCircleText, MagnifyingGlass, UserFocus, Eye, Binoculars, Sparkle, Robot, CheckCircle, XCircle, ArrowRight, Lightning } from '@phosphor-icons/react';
import { MODE_THEMES } from '../../themes/modeThemes';
import {
  READ_REACT_SCENARIOS,
  SUBTEXT_SCENARIOS,
  PATTERN_MIRROR_SCENARIOS,
  MICRO_EXPRESSION_SCENARIOS,
  SITUATIONAL_SCENARIOS,
} from '../../data/patternScenarios';
import { useDatabase } from '../../hooks/useDatabase';
import { savePatternAttempt, getPatternStats, getOverallProgress } from '../../utils/database';
import { getRandomScenario } from '../../utils/scoring';
import { scoreReadReact, scoreMCQuestion, recordPatternChoice, calculatePRS, getRandomPrinciple } from '../../engine/patternScorer';
import { recordScore } from '../../engine/adaptiveDifficulty';
import { awardXP, XP_RULES } from '../../engine/xpSystem';
import { updateQuestProgress } from '../../engine/dailyQuests';
import { checkAchievements } from '../../engine/achievements';
import { hasApiKey } from '../../services/claudeApi';
import { getAIPatternFeedback } from '../../engine/aiPatternFeedback';
import ModeHeader from '../layout/ModeHeader';
import ScoreGauge from '../common/ScoreGauge';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Skeleton from '../common/Skeleton';
import AchievementToast from '../common/AchievementToast';
import ProgressBar from '../common/ProgressBar';
import './PatternMode.css';

const theme = MODE_THEMES.pattern;

const SUB_MODES = [
  { key: 'read_react', name: 'Read & React', icon: ChatCircleText, desc: 'Read messages, tag the need, write a response', color: '#EC4899', scenarios: READ_REACT_SCENARIOS },
  { key: 'subtext', name: 'Subtext Scanner', icon: MagnifyingGlass, desc: 'Spot the real meaning behind the words', color: '#DB2777', scenarios: SUBTEXT_SCENARIOS },
  { key: 'pattern_mirror', name: 'Pattern Mirror', icon: UserFocus, desc: 'Discover your default communication patterns', color: '#A855F7', scenarios: PATTERN_MIRROR_SCENARIOS },
  { key: 'micro_expression', name: 'Micro-Expression Read', icon: Eye, desc: 'Read body language and behavioral cues', color: '#E11D48', scenarios: MICRO_EXPRESSION_SCENARIOS },
  { key: 'situational', name: 'Situational Drill', icon: Binoculars, desc: 'Read context, stakes, timing, and power', color: '#BE185D', scenarios: SITUATIONAL_SCENARIOS },
];

const NEED_TAGS = ['acknowledgment', 'reassurance', 'solution', 'venting', 'connection', 'celebration'];
const ROUND_OPTIONS = [3, 5, 7, 10];
const LETTERS = ['A', 'B', 'C', 'D'];

const SUB_MODE_NAMES = {
  read_react: 'Read & React',
  subtext: 'Subtext Scanner',
  pattern_mirror: 'Pattern Mirror',
  micro_expression: 'Micro-Expression',
  situational: 'Situational Drill',
};

export default function PatternMode() {
  const { db } = useDatabase();

  // Phase: hub | round | feedback | summary
  const [phase, setPhase] = useState('hub');
  const [activeSubMode, setActiveSubMode] = useState(null);
  const [roundsConfig, setRoundsConfig] = useState(5);
  const [sessionId, setSessionId] = useState(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [sessionResults, setSessionResults] = useState([]);
  const [sessionXP, setSessionXP] = useState(0);
  const [completedIds, setCompletedIds] = useState([]);

  // Current round state
  const [currentScenario, setCurrentScenario] = useState(null);
  const [currentResult, setCurrentResult] = useState(null);
  const [principle, setPrinciple] = useState('');

  // Read & React specific
  const [selectedNeeds, setSelectedNeeds] = useState([]);
  const [userResponse, setUserResponse] = useState('');

  // MC specific
  const [selectedOption, setSelectedOption] = useState(null);

  // AI state
  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [showAiButton, setShowAiButton] = useState(false);

  // Gamification
  const [newAchievement, setNewAchievement] = useState(null);

  // Stats for hub display
  const stats = useMemo(() => {
    if (!db) return { total: 0 };
    try { return getPatternStats(db); } catch { return { total: 0 }; }
  }, [db, phase]);

  // ===== SESSION MANAGEMENT =====

  const startSession = (subModeKey) => {
    const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
    setSessionId(id);
    setActiveSubMode(subModeKey);
    setCurrentRound(0);
    setSessionResults([]);
    setSessionXP(0);
    setCompletedIds([]);
    loadNextRound(subModeKey, []);
  };

  const loadNextRound = (subModeKey, excluded) => {
    const subMode = SUB_MODES.find(s => s.key === subModeKey);
    if (!subMode) return;

    const scenario = getRandomScenario(subMode.scenarios, excluded);
    if (!scenario) {
      // All scenarios exhausted, wrap up
      setPhase('summary');
      return;
    }

    setCurrentScenario(scenario);
    setCurrentResult(null);
    setSelectedNeeds([]);
    setUserResponse('');
    setSelectedOption(null);
    setAiResult(null);
    setAiLoading(false);
    setShowAiButton(false);
    setPrinciple('');
    setPhase('round');
  };

  // ===== SUBMIT HANDLERS =====

  const handleSubmit = async () => {
    if (!currentScenario) return;
    let result;

    if (activeSubMode === 'read_react') {
      if (selectedNeeds.length === 0 || !userResponse.trim()) return;
      result = scoreReadReact(userResponse, currentScenario, selectedNeeds);
      result.subMode = 'read_react';
    } else if (activeSubMode === 'pattern_mirror') {
      if (selectedOption === null) return;
      result = recordPatternChoice(selectedOption, currentScenario);
      result.subMode = 'pattern_mirror';
    } else {
      // MC modes: subtext, micro_expression, situational
      if (selectedOption === null) return;
      result = scoreMCQuestion(selectedOption, currentScenario);
      result.subMode = activeSubMode;
    }

    setCurrentResult(result);
    setPrinciple(getRandomPrinciple());

    const newRound = currentRound + 1;
    setCurrentRound(newRound);
    setCompletedIds(prev => [...prev, currentScenario.id]);

    const roundResult = { subMode: activeSubMode, score: result.score, scenarioId: currentScenario.id, round: newRound };
    setSessionResults(prev => [...prev, roundResult]);

    // Calculate XP (always, even if DB save fails)
    let xpAmount;
    if (activeSubMode === 'pattern_mirror') {
      xpAmount = XP_RULES.patternMirror();
    } else {
      xpAmount = XP_RULES.pattern(result.score);
    }
    setSessionXP(prev => prev + xpAmount);

    // Database + gamification
    if (db) {
      try {
        savePatternAttempt(
          db, activeSubMode, currentScenario.id,
          activeSubMode === 'read_react' ? userResponse : null,
          selectedOption,
          result.score,
          result.dimensions || null,
          result.feedback || null,
          currentScenario.difficultyTier,
          sessionId,
          newRound
        );

        const category = currentScenario.category || 'Empathy';
        if (result.score > 0) {
          recordScore(db, 'pattern', category, result.score);
        }

        awardXP(db, 'pattern', xpAmount, `Pattern: ${SUB_MODE_NAMES[activeSubMode]}`);

        updateQuestProgress(db, 'pattern');

        const { newlyUnlocked } = checkAchievements(db, getOverallProgress(db));
        if (newlyUnlocked.length > 0) setNewAchievement(newlyUnlocked[0]);
      } catch (err) {
        console.error('Engine error during pattern submission:', err);
      }
    }

    // AI for Read & React
    if (activeSubMode === 'read_react' && result.needsAIReview && hasApiKey()) {
      setAiLoading(true);
      try {
        const ai = await getAIPatternFeedback(userResponse, currentScenario);
        setAiResult(ai);
      } catch { /* silently fail */ }
      finally { setAiLoading(false); }
    } else if (activeSubMode === 'read_react' && hasApiKey() && result.score > 0) {
      setShowAiButton(true);
    }

    setPhase('feedback');
  };

  const handleRequestAI = async () => {
    if (!currentScenario || !userResponse.trim()) return;
    setShowAiButton(false);
    setAiLoading(true);
    try {
      const ai = await getAIPatternFeedback(userResponse, currentScenario);
      setAiResult(ai);
    } catch { /* silently fail */ }
    finally { setAiLoading(false); }
  };

  const handleNextRound = () => {
    if (currentRound >= roundsConfig) {
      setPhase('summary');
    } else {
      loadNextRound(activeSubMode, completedIds);
    }
  };

  const handleBackToHub = () => {
    setPhase('hub');
    setActiveSubMode(null);
    setSessionResults([]);
    setCurrentScenario(null);
    setCurrentResult(null);
  };

  // ===== RENDER HELPERS =====

  const renderHub = () => (
    <div className="pattern-hub animate-fade-in">
      <div className="pattern-hub-intro">
        <h2>Pattern Recognition</h2>
        <p>Sharpen your ability to read people, situations, and communication patterns</p>
      </div>

      <div className="submode-grid">
        {SUB_MODES.map(sm => {
          const smStats = stats[sm.key];
          const Icon = sm.icon;
          return (
            <button
              key={sm.key}
              className={`submode-card${activeSubMode === sm.key ? ' selected' : ''}`}
              onClick={() => setActiveSubMode(sm.key)}
            >
              <div className="submode-icon" style={{ background: `${sm.color}18` }}>
                <Icon size={22} weight="duotone" color={sm.color} />
              </div>
              <div className="submode-info">
                <h3>{sm.name}</h3>
                <p>{sm.desc}</p>
              </div>
              {smStats && smStats.count > 0 && (
                <span className="submode-count">{smStats.count} done</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="round-config">
        <span>Rounds:</span>
        {ROUND_OPTIONS.map(n => (
          <button
            key={n}
            className={`round-btn${roundsConfig === n ? ' active' : ''}`}
            onClick={() => setRoundsConfig(n)}
          >
            {n}
          </button>
        ))}
      </div>

      <Button
        variant="mode"
        modeColor={theme.primary}
        onClick={() => activeSubMode && startSession(activeSubMode)}
        disabled={!activeSubMode}
        className="start-session-btn"
      >
        {activeSubMode ? `Start ${SUB_MODE_NAMES[activeSubMode]}` : 'Select a mode above'}
      </Button>
    </div>
  );

  const renderRoundHeader = () => (
    <div className="round-header">
      <span className="round-counter">{currentRound + 1} / {roundsConfig}</span>
      <div className="round-progress">
        <div className="round-progress-fill" style={{ width: `${(currentRound / roundsConfig) * 100}%` }} />
      </div>
      <span className="round-submode-label">{SUB_MODE_NAMES[activeSubMode]}</span>
    </div>
  );

  const renderReadReactRound = () => (
    <div className="animate-fade-in">
      <div className="message-bubbles">
        {currentScenario.messages.map((msg, i) => (
          <div key={i} className="message-bubble them">
            {i === 0 && <span className="message-sender">{msg.sender}</span>}
            {msg.text}
          </div>
        ))}
      </div>

      <div className="need-selector">
        <span className="need-selector-label">What does this person need?</span>
        <div className="need-tags">
          {NEED_TAGS.map(need => (
            <button
              key={need}
              className={`need-tag${selectedNeeds.includes(need) ? ' selected' : ''}`}
              onClick={() => setSelectedNeeds(prev =>
                prev.includes(need) ? prev.filter(n => n !== need) : [...prev, need]
              )}
            >
              {need}
            </button>
          ))}
        </div>
      </div>

      <div className="response-input">
        <label>Write your response:</label>
        <textarea
          value={userResponse}
          onChange={e => setUserResponse(e.target.value)}
          placeholder="Type your response..."
          rows={3}
        />
        <p className="response-hint">Respond naturally — how would you actually reply?</p>
      </div>

      <Button
        variant="mode"
        modeColor={theme.primary}
        onClick={handleSubmit}
        disabled={selectedNeeds.length === 0 || !userResponse.trim()}
      >
        Submit Response
      </Button>
    </div>
  );

  const renderMCRound = () => {
    const isSubtext = activeSubMode === 'subtext';
    const isMicro = activeSubMode === 'micro_expression';
    const isSituational = activeSubMode === 'situational';

    return (
      <div className="animate-fade-in">
        {/* Context display */}
        {isSubtext && (
          <div className="exchange-display">
            <div className="exchange-format">{currentScenario.format}</div>
            {currentScenario.exchange.map((msg, i) => (
              <div key={i} className="exchange-message">
                <span className="exchange-sender">{msg.speaker}: </span>
                <span className="exchange-text">{msg.text}</span>
              </div>
            ))}
          </div>
        )}

        {isMicro && (
          <div className="scene-narrative">{currentScenario.scene}</div>
        )}

        {isSituational && (
          <div className="rich-context">
            <div className="context-setting">{currentScenario.setting}</div>
            <div className="context-details">
              <div className="context-detail">
                <div className="context-detail-label">Who</div>
                <div className="context-detail-value">{currentScenario.who}</div>
              </div>
              <div className="context-detail">
                <div className="context-detail-label">Where</div>
                <div className="context-detail-value">{currentScenario.where}</div>
              </div>
              <div className="context-detail">
                <div className="context-detail-label">What Happened</div>
                <div className="context-detail-value">{currentScenario.whatHappened}</div>
              </div>
              <div className="context-detail">
                <div className="context-detail-label">Stakes</div>
                <div className="context-detail-value">{currentScenario.stakes}</div>
              </div>
            </div>
          </div>
        )}

        <p className="question-prompt">{currentScenario.question}</p>

        <div className="option-cards">
          {currentScenario.options.map((opt, i) => (
            <button
              key={i}
              className={`option-card${selectedOption === i ? ' selected' : ''}`}
              onClick={() => setSelectedOption(i)}
            >
              <span className="option-letter">{LETTERS[i]}</span>
              <span className="option-text">
                {isSituational && <strong>{opt.factor} — </strong>}
                {opt.text}
              </span>
            </button>
          ))}
        </div>

        <Button
          variant="mode"
          modeColor={theme.primary}
          onClick={handleSubmit}
          disabled={selectedOption === null}
        >
          Submit Answer
        </Button>
      </div>
    );
  };

  const renderPatternMirrorRound = () => (
    <div className="animate-fade-in">
      <div className="situation-display">{currentScenario.situation}</div>

      <p className="question-prompt">Which response is closest to what you would naturally do?</p>

      <div className="option-cards">
        {currentScenario.options.map((opt, i) => (
          <button
            key={i}
            className={`pattern-card${selectedOption === i ? ' selected' : ''}`}
            onClick={() => setSelectedOption(i)}
          >
            <span className="pattern-label">{opt.label}</span>
            <span className="pattern-response-text">"{opt.text}"</span>
          </button>
        ))}
      </div>

      <Button
        variant="mode"
        modeColor="#A855F7"
        onClick={handleSubmit}
        disabled={selectedOption === null}
      >
        That's My Response
      </Button>
    </div>
  );

  const renderRound = () => (
    <div className="round-view">
      {renderRoundHeader()}

      {activeSubMode === 'read_react' && renderReadReactRound()}
      {activeSubMode === 'pattern_mirror' && renderPatternMirrorRound()}
      {(activeSubMode === 'subtext' || activeSubMode === 'micro_expression' || activeSubMode === 'situational') && renderMCRound()}
    </div>
  );

  const renderFeedback = () => {
    if (!currentResult) return null;
    const isReadReact = activeSubMode === 'read_react';
    const isMirror = activeSubMode === 'pattern_mirror';
    const isMC = !isReadReact && !isMirror;

    return (
      <div className="feedback-section">
        {renderRoundHeader()}

        {/* Score display for scored modes */}
        {!isMirror && (
          <div className="score-reveal animate-scale-in">
            <ScoreGauge score={currentResult.score} />
          </div>
        )}

        {/* Read & React dimensions */}
        {isReadReact && currentResult.dimensions && (
          <div className="dimension-scores">
            <div className="dimension-score">
              <span className="dimension-value">{currentResult.dimensions.read}/5</span>
              <span className="dimension-label">Read</span>
            </div>
            <div className="dimension-score">
              <span className="dimension-value">{currentResult.dimensions.tone}/5</span>
              <span className="dimension-label">Tone</span>
            </div>
            <div className="dimension-score">
              <span className="dimension-value">{currentResult.dimensions.ack}/5</span>
              <span className="dimension-label">Ack First</span>
            </div>
          </div>
        )}

        {/* Need tag reveal for Read & React */}
        {isReadReact && (
          <div className="need-selector" style={{ marginBottom: 16 }}>
            <span className="need-selector-label">Need identification:</span>
            <div className="need-tags">
              {NEED_TAGS.map(need => {
                const isSelected = selectedNeeds.includes(need);
                const isCorrect = (currentScenario.allNeeds || [currentScenario.senderNeed]).includes(need);
                let cls = 'need-tag';
                if (isSelected && isCorrect) cls += ' correct';
                else if (isSelected && !isCorrect) cls += ' incorrect';
                else if (isCorrect) cls += ' actual-correct';
                return <span key={need} className={cls}>{need}</span>;
              })}
            </div>
          </div>
        )}

        {/* Example response (always shown for Read & React) */}
        {isReadReact && currentScenario.exampleResponse && (
          <div className="example-response-block animate-fade-in" style={{
            background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 12,
            padding: '14px 16px', marginBottom: 16,
          }}>
            <div style={{ fontWeight: 600, fontSize: '0.82rem', color: '#15803D', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
              <ChatCircleText size={16} weight="duotone" color="#15803D" />
              Example Response
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#166534', lineHeight: 1.5, fontStyle: 'italic' }}>
              "{currentScenario.exampleResponse}"
            </p>
          </div>
        )}

        {/* Feedback messages */}
        {currentResult.feedback && currentResult.feedback.length > 0 && (
          <div className="feedback-messages">
            {currentResult.feedback.map((msg, i) => (
              <div key={i} className="feedback-message">
                <span className="feedback-message-icon">
                  {msg.includes('Nice') || msg.includes('well') || msg.includes('Great') || msg.includes('read')
                    ? <CheckCircle size={16} weight="fill" color="#10B981" />
                    : <ArrowRight size={16} weight="bold" color="#F59E0B" />
                  }
                </span>
                {msg}
              </div>
            ))}
          </div>
        )}

        {/* MC explanation */}
        {isMC && (
          <>
            {/* Show correct/incorrect on options */}
            <div className="option-cards" style={{ marginBottom: 16 }}>
              {currentScenario.options.map((opt, i) => {
                const isCorrectOpt = !!opt.correct;
                const wasSelected = i === currentResult.selectedIndex;
                let cls = 'option-card revealed';
                if (isCorrectOpt) cls += ' correct';
                else if (wasSelected) cls += ' incorrect selected';
                return (
                  <div key={i} className={cls}>
                    <span className="option-letter">{LETTERS[i]}</span>
                    <span className="option-text">
                      {activeSubMode === 'situational' && <strong>{opt.factor} — </strong>}
                      {opt.text}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="feedback-explanation">
              <h4>Why?</h4>
              <p>{currentResult.explanation}</p>

              {currentResult.cues && currentResult.cues.length > 0 && (
                <div className="feedback-cues">
                  <h5>Key Cues</h5>
                  {currentResult.cues.map((cue, i) => (
                    <div key={i} className="feedback-cue">{cue}</div>
                  ))}
                </div>
              )}
            </div>

            {currentResult.factorInterplay && (
              <div className="feedback-explanation">
                <h4>How the factors interact</h4>
                <p>{currentResult.factorInterplay}</p>
              </div>
            )}

            {currentResult.tip && (
              <div className="feedback-tip">
                <div className="feedback-tip-label">Try this in real life</div>
                <p>{currentResult.tip}</p>
              </div>
            )}
          </>
        )}

        {/* Pattern Mirror insight */}
        {isMirror && currentResult && (
          <>
            {/* Show all options with selected and benchmark highlighted */}
            <div className="option-cards" style={{ marginBottom: 16 }}>
              {currentScenario.options.map((opt, i) => {
                const wasSelected = i === selectedOption;
                const isBenchmark = !!opt.benchmark;
                let cls = 'pattern-card revealed';
                if (wasSelected) cls += ' selected';
                if (isBenchmark) cls += ' benchmark';
                return (
                  <div key={i} className={cls}>
                    <span className="pattern-label">{opt.label}</span>
                    <span className="pattern-response-text">"{opt.text}"</span>
                  </div>
                );
              })}
            </div>

            <div className="pattern-insight">
              <h4>Your Pattern: {currentResult.selectedLabel}</h4>

              <div className="pattern-insight-section">
                <h5 className="works">When this works</h5>
                <p>{currentResult.worksWhen}</p>
              </div>

              {currentResult.backfires && (
                <div className="pattern-insight-section">
                  <h5 className="backfires">When it backfires</h5>
                  <p>{currentResult.backfires}</p>
                </div>
              )}

              {!currentResult.isMatcher && currentResult.matcherOption && (
                <div className="benchmark-response">
                  <div className="benchmark-label">The Matcher Benchmark</div>
                  <p>"{currentResult.matcherOption.text}"</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* AI Feedback (Read & React only) */}
        {isReadReact && aiLoading && (
          <div className="ai-pattern-section animate-fade-in">
            <div className="ai-pattern-header">
              <Robot size={16} weight="duotone" />
              <span>AI Coach is reviewing...</span>
            </div>
            <Skeleton height={16} width="90%" />
            <Skeleton height={16} width="75%" />
            <Skeleton height={16} width="60%" />
          </div>
        )}

        {isReadReact && aiResult && (
          <div className="ai-pattern-section animate-fade-in">
            <div className="ai-pattern-header">
              <Sparkle size={16} weight="fill" color="#8B5CF6" />
              <span>AI Coach Feedback</span>
            </div>
            <div className="ai-pattern-feedback">
              <p>{aiResult.overallFeedback}</p>
              {aiResult.senderNeedExplanation && (
                <p style={{ fontStyle: 'italic', color: 'var(--text-tertiary)' }}>{aiResult.senderNeedExplanation}</p>
              )}
            </div>
            {aiResult.suggestedResponse && (
              <div className="ai-suggested-response">
                <div className="ai-suggested-label">Model response</div>
                <p>"{aiResult.suggestedResponse}"</p>
              </div>
            )}
          </div>
        )}

        {isReadReact && showAiButton && !aiLoading && !aiResult && (
          <button className="ai-coaching-btn animate-fade-in" onClick={handleRequestAI} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px',
            borderRadius: 10, border: '1px solid #DDD6FE', background: '#F5F3FF',
            color: '#7C3AED', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
            width: '100%', justifyContent: 'center', marginBottom: 16,
          }}>
            <Sparkle size={16} weight="fill" color="#8B5CF6" />
            Get AI Coaching
          </button>
        )}

        {/* Grounding principle */}
        {principle && (
          <div className="grounding-principle animate-fade-in">
            <p>"{principle}"</p>
          </div>
        )}

        <Button
          variant="mode"
          modeColor={theme.primary}
          onClick={handleNextRound}
        >
          {currentRound >= roundsConfig ? 'View Results' : 'Next Round'}
        </Button>
      </div>
    );
  };

  const renderSummary = () => {
    const prsData = calculatePRS(sessionResults);

    return (
      <div className="summary-section animate-fade-in">
        <div className="summary-header">
          <h2>Session Complete</h2>
          <p>{sessionResults.length} rounds completed</p>
        </div>

        {prsData.prs > 0 && (
          <div className="score-reveal animate-scale-in">
            <ScoreGauge score={prsData.prs} />
          </div>
        )}

        <div className="summary-xp">
          <Lightning size={18} weight="fill" /> +{sessionXP} XP earned
        </div>

        {/* Strongest / Weakest insight */}
        {prsData.strongest && prsData.weakest && prsData.strongest.mode !== prsData.weakest.mode && (
          <div className="summary-insight">
            <h4>Session Insights</h4>
            <p>
              <strong>Strongest:</strong> {SUB_MODE_NAMES[prsData.strongest.mode] || prsData.strongest.mode} (avg {prsData.strongest.average}%)
              {' • '}
              <strong>Focus on:</strong> {SUB_MODE_NAMES[prsData.weakest.mode] || prsData.weakest.mode} (avg {prsData.weakest.average}%)
            </p>
          </div>
        )}

        {/* Round-by-round results */}
        <div className="summary-rounds">
          <h3>Round Breakdown</h3>
          {sessionResults.map((r, i) => {
            const isMirror = r.subMode === 'pattern_mirror';
            let scoreClass = 'mid';
            if (isMirror) scoreClass = 'mirror';
            else if (r.score >= 80) scoreClass = 'high';
            else if (r.score < 50) scoreClass = 'low';

            return (
              <div key={i} className="summary-round-item">
                <span className="summary-round-num">{i + 1}</span>
                <span className="summary-round-mode">{SUB_MODE_NAMES[r.subMode]}</span>
                <span className={`summary-round-score ${scoreClass}`}>
                  {isMirror ? 'Awareness' : `${r.score}%`}
                </span>
              </div>
            );
          })}
        </div>

        <div className="grounding-principle">
          <p>"{getRandomPrinciple()}"</p>
        </div>

        <div className="summary-actions">
          <Button variant="secondary" onClick={handleBackToHub}>Back to Hub</Button>
          <Button variant="mode" modeColor={theme.primary} onClick={() => startSession(activeSubMode)}>Play Again</Button>
        </div>
      </div>
    );
  };

  return (
    <div className="pattern-mode">
      <AchievementToast achievementId={newAchievement} visible={!!newAchievement} onDone={() => setNewAchievement(null)} />
      <ModeHeader theme={theme} subtitle="Pattern Recognition" />

      <div className="pattern-content">
        {phase === 'hub' && renderHub()}
        {phase === 'round' && renderRound()}
        {phase === 'feedback' && renderFeedback()}
        {phase === 'summary' && renderSummary()}
      </div>
    </div>
  );
}
