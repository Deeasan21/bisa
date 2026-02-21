import { useState, useEffect, useRef, useMemo } from 'react';
import { PencilSimple, Sparkle, Robot } from '@phosphor-icons/react';
import { MODE_THEMES } from '../../themes/modeThemes';
import { SIMULATIONS } from '../../data/simulations';
import { useDatabase } from '../../hooks/useDatabase';
import { saveSimulationAttempt, getOverallProgress } from '../../utils/database';
import { awardXP, XP_RULES } from '../../engine/xpSystem';
import { updateQuestProgress } from '../../engine/dailyQuests';
import { checkAchievements } from '../../engine/achievements';
import { hasApiKey } from '../../services/claudeApi';
import { getAISimResponse } from '../../engine/aiSimulation';
import { getAISimSummary } from '../../engine/aiSimSummary';
import { scoreSimResponse } from '../../engine/simResponseScorer';
import { getRuleBasedResponse } from '../../engine/simRuleFeedback';
import ModeHeader from '../layout/ModeHeader';
import Button from '../common/Button';
import Card from '../common/Card';
import Badge from '../common/Badge';
import ProgressBar from '../common/ProgressBar';
import Skeleton from '../common/Skeleton';
import AchievementToast from '../common/AchievementToast';
import './SimulateMode.css';

const theme = MODE_THEMES.simulate;
const MAX_AI_TURNS = 8;
const MAX_RULE_TURNS = 6;

const DIFFICULTY_COLORS = {
  beginner: '#10B981',
  intermediate: '#3B82F6',
  advanced: '#8B5CF6',
  expert: '#F59E0B',
  master: '#EF4444',
};

export default function SimulateMode() {
  const { db } = useDatabase();
  const [activeSim, setActiveSim] = useState(null);
  const [currentNode, setCurrentNode] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [choicesMade, setChoicesMade] = useState([]);
  const [qualityScores, setQualityScores] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  const chatRef = useRef(null);

  // AI free-text state
  const [userInput, setUserInput] = useState('');
  const [aiTurnCount, setAiTurnCount] = useState(0);
  const [aiEnded, setAiEnded] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [ruleFeedback, setRuleFeedback] = useState(null);
  const [aiSummary, setAiSummary] = useState(null);
  const [aiSummaryLoading, setAiSummaryLoading] = useState(false);
  const [newAchievement, setNewAchievement] = useState(null);
  const aiAvailable = hasApiKey();

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set();
    SIMULATIONS.forEach(s => {
      if (s.skillCategory) cats.add(s.skillCategory);
    });
    return Array.from(cats).sort();
  }, []);

  const filteredSims = useMemo(() => {
    if (!categoryFilter) return SIMULATIONS;
    return SIMULATIONS.filter(s => s.skillCategory === categoryFilter);
  }, [categoryFilter]);

  const startSimulation = (sim) => {
    setActiveSim(sim);
    const firstNode = sim.nodes[sim.startNode || 'start'];
    setCurrentNode(firstNode);
    setChatHistory([{ text: firstNode.text, isUser: false }]);
    setChoicesMade([]);
    setQualityScores([]);
    setAiTurnCount(0);
    setAiEnded(false);
    setAiError(null);
    setRuleFeedback(null);
    setUserInput('');
  };

  const makeChoice = (choice) => {
    if (!activeSim || !currentNode) return;

    setChatHistory(prev => [...prev, { text: choice.text, isUser: true, quality: choice.quality }]);
    setChoicesMade(prev => [...prev, choice.text]);
    setQualityScores(prev => [...prev, choice.quality || 'medium']);

    const nextNode = activeSim.nodes[choice.next];
    if (nextNode) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setChatHistory(prev => [...prev, { text: nextNode.text, isUser: false }]);
        setCurrentNode(nextNode);

        if (nextNode.isEnding) {
          handleEnding(nextNode, [...qualityScores, choice.quality || 'medium']);
        }
      }, 800 + Math.random() * 600);
    }
  };

  const handleFreeTextSubmit = async () => {
    if (!activeSim || !userInput.trim() || isTyping) return;

    const text = userInput.trim();
    setUserInput('');
    setAiError(null);
    setRuleFeedback(null);

    // Add user message to chat
    setChatHistory(prev => [...prev, { text, isUser: true }]);
    setChoicesMade(prev => [...prev, text]);

    const newTurnCount = aiTurnCount + 1;
    setAiTurnCount(newTurnCount);

    // ALWAYS run rule-based scoring first (instant, free)
    const scoreResult = scoreSimResponse(text, activeSim, currentNode);

    // Show typing indicator
    setIsTyping(true);

    if (aiAvailable) {
      // HYBRID PATH: rule-based scoring + AI NPC response
      try {
        const aiResponse = await getAISimResponse(
          activeSim,
          chatHistory,
          text,
          newTurnCount,
          MAX_AI_TURNS
        );

        // Use AI quality rating (more nuanced) but keep rule-based techniques
        setQualityScores(prev => [...prev, aiResponse.quality]);

        // Update the user message with AI quality
        setChatHistory(prev => {
          const updated = [...prev];
          const lastUserIdx = updated.length - 1;
          if (updated[lastUserIdx]?.isUser) {
            updated[lastUserIdx] = { ...updated[lastUserIdx], quality: aiResponse.quality };
          }
          return updated;
        });

        // Show rule-based technique badges alongside AI response
        setRuleFeedback({
          techniques: scoreResult.techniques,
          feedback: scoreResult.feedback[0] || null,
        });

        setIsTyping(false);

        if (aiResponse.isEnding) {
          setChatHistory(prev => [...prev, { text: aiResponse.text, isUser: false }]);
          setAiEnded(true);
          const allScores = [...qualityScores, aiResponse.quality];
          handleEnding(
            { isEnding: true, summary: 'Great conversation practice!' },
            allScores
          );
        } else {
          setChatHistory(prev => [...prev, { text: aiResponse.text, isUser: false }]);
        }
      } catch (err) {
        // FALLBACK: use rule-based response if AI fails
        setQualityScores(prev => [...prev, scoreResult.quality]);

        setChatHistory(prev => {
          const updated = [...prev];
          const lastUserIdx = updated.length - 1;
          if (updated[lastUserIdx]?.isUser) {
            updated[lastUserIdx] = { ...updated[lastUserIdx], quality: scoreResult.quality };
          }
          return updated;
        });

        const npcResponse = getRuleBasedResponse(scoreResult.quality, currentNode, newTurnCount, MAX_RULE_TURNS);

        setIsTyping(false);
        setChatHistory(prev => [...prev, { text: npcResponse.text, isUser: false }]);
        setRuleFeedback({
          techniques: scoreResult.techniques,
          feedback: scoreResult.feedback[0] || null,
        });
        setAiError('AI response failed. Using practice mode.');

        if (npcResponse.isEnding) {
          setAiEnded(true);
          handleEnding(
            { isEnding: true, summary: 'Great conversation practice!' },
            [...qualityScores, scoreResult.quality]
          );
        }
      }
    } else {
      // RULE-BASED ONLY PATH (no API key)
      setQualityScores(prev => [...prev, scoreResult.quality]);

      // Update user message with quality
      setChatHistory(prev => {
        const updated = [...prev];
        const lastUserIdx = updated.length - 1;
        if (updated[lastUserIdx]?.isUser) {
          updated[lastUserIdx] = { ...updated[lastUserIdx], quality: scoreResult.quality };
        }
        return updated;
      });

      // Simulate typing delay
      setTimeout(() => {
        const npcResponse = getRuleBasedResponse(scoreResult.quality, currentNode, newTurnCount, MAX_RULE_TURNS);

        setIsTyping(false);
        setChatHistory(prev => [...prev, { text: npcResponse.text, isUser: false }]);

        // Show feedback card
        setRuleFeedback({
          techniques: scoreResult.techniques,
          feedback: scoreResult.feedback[0] || null,
        });

        if (npcResponse.isEnding) {
          setAiEnded(true);
          const allScores = [...qualityScores, scoreResult.quality];
          handleEnding(
            { isEnding: true, summary: 'Great conversation practice!' },
            allScores
          );
        }
      }, 600 + Math.random() * 400);
    }
  };

  const handleFreeTextKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleFreeTextSubmit();
    }
  };

  const handleEnding = (endingNode, scores) => {
    if (!db) return;
    const greatCount = scores.filter(q => q === 'great' || q === 'high').length;

    try {
      saveSimulationAttempt(db, activeSim.id, choicesMade, scores, endingNode.id || 'ending');
      const qualityPercent = Math.round((greatCount / Math.max(1, scores.length)) * 100);
      awardXP(db, 'simulation', XP_RULES.simulation(qualityPercent), `Simulation: ${activeSim.title}`);
      updateQuestProgress(db, 'simulation');
      const { newlyUnlocked } = checkAchievements(db, getOverallProgress(db));
      if (newlyUnlocked.length > 0) setNewAchievement(newlyUnlocked[0]);
    } catch (err) {
      console.error('Engine error during simulation ending:', err);
    }

    // Trigger AI summary if available
    if (aiAvailable) {
      setAiSummaryLoading(true);
      getAISimSummary(activeSim, chatHistory, scores, getEmpathyScore())
        .then(summary => setAiSummary(summary))
        .catch(() => {}) // Silent fail — rule-based ending is sufficient
        .finally(() => setAiSummaryLoading(false));
    }
  };

  const resetSimulation = () => {
    setActiveSim(null);
    setCurrentNode(null);
    setChatHistory([]);
    setChoicesMade([]);
    setQualityScores([]);
    setIsTyping(false);
    setAiTurnCount(0);
    setAiEnded(false);
    setAiError(null);
    setRuleFeedback(null);
    setUserInput('');
    setAiSummary(null);
    setAiSummaryLoading(false);
  };

  const getQualityColor = (quality) => {
    switch (quality) {
      case 'great': case 'high': return '#10B981';
      case 'good': case 'medium': return '#F59E0B';
      case 'poor': case 'low': return '#EF4444';
      default: return '#6B7280';
    }
  };

  // Calculate empathy score
  const getEmpathyScore = () => {
    if (qualityScores.length === 0) return 0;
    const scoreMap = { great: 100, high: 100, good: 70, medium: 50, poor: 20, low: 20 };
    const total = qualityScores.reduce((sum, q) => sum + (scoreMap[q] || 50), 0);
    return Math.round(total / qualityScores.length);
  };

  const isConversationEnded = (currentNode && currentNode.isEnding) || aiEnded;
  const showChoices = currentNode && !currentNode.isEnding && currentNode.choices && !isTyping && !aiEnded;

  if (!activeSim) {
    return (
      <div className="simulate-mode">
        <AchievementToast achievementId={newAchievement} visible={!!newAchievement} onDone={() => setNewAchievement(null)} />
        <ModeHeader theme={theme} subtitle={`${SIMULATIONS.length} conversations`} />
        <div className="sim-content">
          {/* Category/Difficulty Filters */}
          {categories.length > 0 && (
            <div className="sim-filters">
              <button
                className={`sim-filter-chip${!categoryFilter ? ' active' : ''}`}
                onClick={() => setCategoryFilter('')}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`sim-filter-chip${categoryFilter === cat ? ' active' : ''}`}
                  onClick={() => setCategoryFilter(categoryFilter === cat ? '' : cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
          <div className="sim-grid">
            {filteredSims.map((sim) => (
              <Card key={sim.id} padding="md" onClick={() => startSimulation(sim)}>
                <h3 className="sim-card-title">{sim.title}</h3>
                <p className="sim-card-context">{sim.context}</p>
                <div className="sim-card-badges">
                  <Badge text={sim.skillCategory || sim.category || 'Conversation'} color={theme.primary} variant="soft" />
                  {sim.difficultyTier && (
                    <Badge
                      text={sim.difficultyTier}
                      color={DIFFICULTY_COLORS[sim.difficultyTier] || '#6B7280'}
                      variant="outlined"
                      size="sm"
                    />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="simulate-mode">
      <ModeHeader theme={theme} title={activeSim.title} />

      <div className="chat-container" ref={chatRef}>
        {chatHistory.map((msg, i) => (
          <div
            key={i}
            className={`chat-msg ${msg.isUser ? 'chat-user' : 'chat-npc'} animate-fade-in`}
          >
            {msg.isUser && msg.quality && (
              <span className="quality-dot" style={{ background: getQualityColor(msg.quality) }} />
            )}
            <p>{msg.text}</p>
          </div>
        ))}
        {isTyping && (
          <div className="chat-msg chat-npc animate-fade-in">
            <div className="typing-indicator">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}
      </div>

      {/* Choice buttons (tree-based path) */}
      {showChoices && (
        <div className="choice-buttons">
          {currentNode.choices.map((choice, i) => (
            <button
              key={i}
              className="choice-btn"
              onClick={() => makeChoice(choice)}
            >
              {choice.text}
            </button>
          ))}
        </div>
      )}

      {/* Rule-based feedback card */}
      {ruleFeedback && !isTyping && !isConversationEnded && (
        <div className="sim-rule-feedback animate-fade-in">
          {ruleFeedback.techniques.length > 0 && (
            <div className="sim-techniques">
              {ruleFeedback.techniques.map(t => (
                <Badge key={t} text={t} color="#8B5CF6" variant="soft" size="sm" />
              ))}
            </div>
          )}
          {ruleFeedback.feedback && (
            <p className="sim-rule-feedback-text">{ruleFeedback.feedback}</p>
          )}
        </div>
      )}

      {/* Free-text input — visible for ALL users */}
      {!isConversationEnded && !isTyping && (
        <div className="sim-free-text">
          {showChoices && (
            <div className="sim-free-text-divider">
              {aiAvailable ? (
                <>
                  <span>or write your own</span>
                  <Sparkle size={12} weight="fill" color="#8B5CF6" />
                </>
              ) : (
                <span>or type your own response</span>
              )}
            </div>
          )}
          <div className="sim-free-text-row">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleFreeTextKeyDown}
              placeholder="Type your own response..."
              rows={2}
              className="sim-free-input"
            />
            <button
              className="sim-free-send"
              onClick={handleFreeTextSubmit}
              disabled={!userInput.trim()}
            >
              <PencilSimple size={18} weight="bold" />
            </button>
          </div>
          {aiError && <p className="sim-ai-error">{aiError}</p>}
          {aiTurnCount > 0 && (
            <span className="sim-turn-counter">
              Turn {aiTurnCount}/{aiAvailable ? MAX_AI_TURNS : MAX_RULE_TURNS}
            </span>
          )}
        </div>
      )}

      {/* Ending screen */}
      {isConversationEnded && (
        <div className="sim-ending animate-fade-in">
          <div className="ending-summary">
            <h3>Conversation Complete</h3>

            {/* Empathy Score Bar */}
            <div className="empathy-score-section">
              <span className="empathy-label">Empathy Score</span>
              <ProgressBar
                value={getEmpathyScore()}
                max={100}
                color={getQualityColor(getEmpathyScore() >= 70 ? 'great' : getEmpathyScore() >= 40 ? 'good' : 'poor')}
                size="sm"
                showPercent
              />
            </div>

            {/* Quality summary as progress bar */}
            <div className="quality-summary">
              {qualityScores.map((q, i) => (
                <span key={i} className="quality-pip" style={{ background: getQualityColor(q) }} />
              ))}
            </div>

            <p className="ending-text">{currentNode?.summary || 'Great conversation practice!'}</p>

            {/* AI Conversation Summary */}
            {aiSummaryLoading && (
              <div className="sim-ai-summary animate-fade-in">
                <div className="sim-ai-summary-header">
                  <Robot size={16} weight="duotone" />
                  <span>AI Coach is summarizing...</span>
                </div>
                <Skeleton height={14} width="90%" />
                <Skeleton height={14} width="70%" />
                <Skeleton height={14} width="55%" />
              </div>
            )}

            {aiSummary && (
              <div className="sim-ai-summary animate-fade-in">
                <div className="sim-ai-summary-header">
                  <Sparkle size={16} weight="fill" color="#8B5CF6" />
                  <span>AI Coach Summary</span>
                </div>
                <p className="sim-ai-summary-text">{aiSummary.summary}</p>

                {aiSummary.bestMoment && (
                  <div className="sim-ai-highlight">
                    <span className="sim-ai-label">Best Moment</span>
                    <p>{aiSummary.bestMoment}</p>
                  </div>
                )}

                {aiSummary.pattern && (
                  <div className="sim-ai-highlight">
                    <span className="sim-ai-label">Pattern Noticed</span>
                    <p>{aiSummary.pattern}</p>
                  </div>
                )}

                {aiSummary.nextChallenge && (
                  <div className="sim-ai-highlight">
                    <span className="sim-ai-label">Try Next Time</span>
                    <p>{aiSummary.nextChallenge}</p>
                  </div>
                )}
              </div>
            )}
          </div>
          <Button variant="mode" modeColor={theme.primary} onClick={resetSimulation}>
            Try Another Scenario
          </Button>
        </div>
      )}
    </div>
  );
}
