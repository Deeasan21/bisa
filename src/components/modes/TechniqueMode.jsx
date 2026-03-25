import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart, ArrowsClockwise, MagnifyingGlass, ArrowBendUpLeft,
  ArrowLeft, ArrowRight, CheckCircle, XCircle, Eye, EyeSlash,
  Lightbulb, Star, Lightning,
} from '@phosphor-icons/react';
import { MODE_THEMES } from '../../themes/modeThemes';
import { TECHNIQUE_DRILLS } from '../../data/techniqueDrills';
import { useSupabaseDB } from '../../hooks/useSupabaseDB';
import { XP_RULES } from '../../engine/xpSystem';
import ModeHeader from '../layout/ModeHeader';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import XPToast from '../common/XPToast';
import AchievementToast from '../common/AchievementToast';
import './TechniqueMode.css';

const theme = MODE_THEMES.technique;

const TECHNIQUE_ICONS = {
  empathy: Heart,
  reframing: ArrowsClockwise,
  probing: MagnifyingGlass,
  followup: ArrowBendUpLeft,
};

const ROUNDS_PER_TECHNIQUE = 3;
const XP_PER_HIT = 10;
const XP_PER_MISS = 3;

// Detect if a user's answer uses the technique, and whether it's strong or shallow.
// Returns { hit, quality: 'strong' | 'basic', matchedWord, shallowReason }
function detectTechnique(techniqueId, answer) {
  const lower = answer.toLowerCase();
  const wordCount = answer.trim().split(/\s+/).length;

  if (techniqueId === 'empathy') {
    const markers = ['feel', 'feeling', 'experience', 'going through', 'must be', 'sounds like', 'seems like', 'worried', 'difficult', 'challenging', 'concerned'];
    const found = markers.find(m => lower.includes(m));
    if (!found) return { hit: false, matchedWord: null, quality: null };
    // Shallow: ≤6 words (e.g. "What are you going through?") or question is just the trigger phrase
    const isShallow = wordCount <= 6;
    return {
      hit: true,
      matchedWord: found,
      quality: isShallow ? 'basic' : 'strong',
      shallowReason: isShallow ? 'Your question is very short — try grounding it in their specific situation rather than asking generically.' : null,
    };
  }

  if (techniqueId === 'reframing') {
    const markers = ['what if', 'another way', 'from their perspective', 'consider', 'suppose', 'imagine if', 'how else could', 'looking at it differently', 'what would happen if'];
    const found = markers.find(m => lower.includes(m));
    if (!found) return { hit: false, matchedWord: null, quality: null };
    const isShallow = wordCount <= 7;
    return {
      hit: true,
      matchedWord: found,
      quality: isShallow ? 'basic' : 'strong',
      shallowReason: isShallow ? 'Good start — now add a specific angle. What perspective or alternative are you inviting them to consider?' : null,
    };
  }

  if (techniqueId === 'probing') {
    const markers = ['why do you think', 'what caused', 'what led to', 'underlying', 'root', 'behind', 'beneath', 'at the core', 'fundamentally', 'what drives'];
    const found = markers.find(m => lower.includes(m));
    if (!found) return { hit: false, matchedWord: null, quality: null };
    const isShallow = wordCount <= 6;
    return {
      hit: true,
      matchedWord: found,
      quality: isShallow ? 'basic' : 'strong',
      shallowReason: isShallow ? 'The trigger is there — now make it specific to the scenario. What exactly are you probing into?' : null,
    };
  }

  if (techniqueId === 'followup') {
    const markers = ['you mentioned', 'you said', 'earlier you', 'going back to', 'that thing about', 'you brought up', 'when you said'];
    const found = markers.find(m => lower.includes(m));
    if (!found) return { hit: false, matchedWord: null, quality: null };
    const isShallow = wordCount <= 7;
    return {
      hit: true,
      matchedWord: found,
      quality: isShallow ? 'basic' : 'strong',
      shallowReason: isShallow ? 'Good — but what did they actually say that you\'re following up on? Make the reference specific.' : null,
    };
  }

  return { hit: false, matchedWord: null, quality: null };
}

export default function TechniqueMode() {
  const navigate = useNavigate();
  const { db } = useSupabaseDB();

  // phase: hub | teach | drill | feedback | summary
  const [phase, setPhase] = useState('hub');
  const [activeTechnique, setActiveTechnique] = useState(null);
  const [roundIndex, setRoundIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [lastResult, setLastResult] = useState(null); // { hit, matchedWord, answer }
  const [roundResults, setRoundResults] = useState([]); // array of {hit} per round
  const [showWords, setShowWords] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [sessionXP, setSessionXP] = useState(0);
  const [showXPToast, setShowXPToast] = useState(false);
  const [xpAmount, setXpAmount] = useState(0);
  const [newAchievement, setNewAchievement] = useState(null);
  // Track mastery per technique (hits across all visits)
  const [masteredCount, setMasteredCount] = useState({});

  const startTechnique = (technique) => {
    setActiveTechnique(technique);
    setRoundIndex(0);
    setRoundResults([]);
    setAnswer('');
    setLastResult(null);
    setShowWords(false);
    setShowExample(false);
    setPhase('teach');
  };

  const startDrilling = () => {
    setPhase('drill');
  };

  const handleSubmit = async () => {
    if (!answer.trim() || answer.trim().split(/\s+/).length < 3) return;

    const { hit, matchedWord, quality, shallowReason } = detectTechnique(activeTechnique.id, answer.trim());
    // Basic (shallow) counts as partial — awards half XP and doesn't count as a mastery hit
    const xp = !hit ? XP_PER_MISS : quality === 'strong' ? XP_PER_HIT : Math.round(XP_PER_HIT / 2);
    const countAsHit = hit && quality === 'strong';

    const result = { hit, matchedWord, quality, shallowReason, answer: answer.trim() };
    setLastResult(result);
    setRoundResults(prev => [...prev, { hit: countAsHit }]);
    setPhase('feedback');

    // Award XP
    try {
      if (db) {
        await db.awardXP('technique_drill', xp, `Technique: ${activeTechnique.name} round ${roundIndex + 1}`);
        await db.savePracticeAttempt(
          `technique:${activeTechnique.id}:${roundIndex + 1}`,
          answer.trim(),
          hit ? 80 : 30,
          hit ? `${activeTechnique.name} detected` : 'Technique not detected',
        );
        const { newlyUnlocked } = await db.checkAchievements();
        if (newlyUnlocked?.length > 0) setNewAchievement(newlyUnlocked[0]);
      }
    } catch (e) { console.error('TechniqueMode save error:', e); }

    setSessionXP(prev => prev + xp);
    setXpAmount(xp);
    setShowXPToast(true);
  };

  const handleNext = () => {
    const nextRound = roundIndex + 1;
    if (nextRound >= ROUNDS_PER_TECHNIQUE) {
      // Count hits and update mastery
      const hits = [...roundResults, { hit: lastResult?.hit }].filter(r => r.hit).length;
      if (hits >= 2) {
        setMasteredCount(prev => ({ ...prev, [activeTechnique.id]: (prev[activeTechnique.id] || 0) + 1 }));
      }
      setPhase('summary');
    } else {
      setRoundIndex(nextRound);
      setAnswer('');
      setLastResult(null);
      setPhase('drill');
    }
  };

  const handleBackToHub = () => {
    setPhase('hub');
    setActiveTechnique(null);
    setRoundIndex(0);
    setRoundResults([]);
    setAnswer('');
    setLastResult(null);
    setShowWords(false);
    setShowExample(false);
  };

  // ── Renders ────────────────────────────────────────────────────────────────

  const renderHub = () => (
    <div className="technique-hub animate-fade-in">
      <div className="technique-hub-intro">
        <Lightbulb size={24} weight="fill" color={theme.primary} />
        <p>Each drill teaches you a technique, then gives you 3 real scenarios to practice it. The scorer tells you exactly which words triggered the detection.</p>
      </div>

      <div className="technique-hub-grid">
        {TECHNIQUE_DRILLS.map((t) => {
          const Icon = TECHNIQUE_ICONS[t.id];
          const isMastered = (masteredCount[t.id] || 0) > 0;
          return (
            <button
              key={t.id}
              className={`technique-hub-card${isMastered ? ' mastered' : ''}`}
              style={{ '--technique-color': t.color }}
              onClick={() => startTechnique(t)}
            >
              <div className="technique-hub-card-header" style={{ background: t.bgGradient }}>
                <div className="technique-hub-icon" style={{ background: t.color + '22', border: `2px solid ${t.color}33` }}>
                  <Icon size={26} weight="duotone" color={t.color} />
                </div>
                {isMastered && (
                  <div className="technique-mastered-badge">
                    <Star size={11} weight="fill" color={t.color} />
                  </div>
                )}
              </div>
              <div className="technique-hub-card-body">
                <h3 style={{ color: t.color }}>{t.name}</h3>
                <p>{t.tagline}</p>
              </div>
            </button>
          );
        })}
      </div>

      {sessionXP > 0 && (
        <div className="technique-session-xp">
          <Lightning size={14} weight="fill" color="#F59E0B" />
          <span>+{sessionXP} XP this session</span>
        </div>
      )}
    </div>
  );

  const renderTeach = () => {
    const Icon = TECHNIQUE_ICONS[activeTechnique.id];
    return (
      <div className="technique-teach animate-fade-in">
        {/* Technique header */}
        <div className="technique-teach-header" style={{ background: activeTechnique.bgGradient }}>
          <div className="technique-teach-icon" style={{ background: activeTechnique.color + '22' }}>
            <Icon size={32} weight="duotone" color={activeTechnique.color} />
          </div>
          <h2 style={{ color: activeTechnique.color }}>{activeTechnique.name}</h2>
          <p className="technique-teach-tagline">"{activeTechnique.tagline}"</p>
        </div>

        {/* What is it */}
        <Card padding="md" className="technique-teach-card">
          <h4 className="technique-teach-section-label">What is it?</h4>
          <p>{activeTechnique.what}</p>
        </Card>

        {/* Why use it */}
        <Card padding="md" className="technique-teach-card">
          <h4 className="technique-teach-section-label" style={{ color: activeTechnique.color }}>Why use it?</h4>
          <p>{activeTechnique.why}</p>
        </Card>

        {/* When NOT */}
        <Card padding="md" className="technique-teach-card technique-teach-card--warning">
          <h4 className="technique-teach-section-label technique-teach-section-label--warning">When NOT to use it</h4>
          <p>{activeTechnique.whenNot}</p>
        </Card>

        {/* Key phrases — tap to reveal */}
        <Card padding="md" className="technique-teach-card">
          <div className="technique-reveal-header">
            <h4 className="technique-teach-section-label">Key phrases the scorer detects</h4>
            <button
              className="technique-reveal-btn"
              style={{ color: activeTechnique.color }}
              onClick={() => setShowWords(v => !v)}
            >
              {showWords ? <EyeSlash size={16} /> : <Eye size={16} />}
              {showWords ? 'Hide' : 'Reveal'}
            </button>
          </div>
          {showWords ? (
            <div className="technique-trigger-words">
              {activeTechnique.triggerWords.map(w => (
                <span key={w} className="technique-trigger-chip" style={{ background: activeTechnique.color + '18', color: activeTechnique.color, border: `1px solid ${activeTechnique.color}33` }}>
                  {w}
                </span>
              ))}
            </div>
          ) : (
            <p className="technique-reveal-hint">Tap reveal to see the exact phrases — then try to use one in your questions.</p>
          )}
        </Card>

        {/* Example — tap to reveal */}
        <Card padding="md" className="technique-teach-card">
          <div className="technique-reveal-header">
            <h4 className="technique-teach-section-label">Example question</h4>
            <button
              className="technique-reveal-btn"
              style={{ color: activeTechnique.color }}
              onClick={() => setShowExample(v => !v)}
            >
              {showExample ? <EyeSlash size={16} /> : <Eye size={16} />}
              {showExample ? 'Hide' : 'Show'}
            </button>
          </div>
          {showExample ? (
            <div className="technique-example">
              <p className="technique-example-q">"{activeTechnique.example.question}"</p>
              <div className="technique-example-note">
                <span className="technique-example-chip" style={{ background: activeTechnique.color + '22', color: activeTechnique.color }}>
                  "{activeTechnique.example.highlight}"
                </span>
                <span>{activeTechnique.example.note}</span>
              </div>
            </div>
          ) : (
            <p className="technique-reveal-hint">Try writing your own example first, then check this one.</p>
          )}
        </Card>

        <Button variant="mode" modeColor={activeTechnique.color} onClick={startDrilling}>
          Start Drilling (3 rounds)
        </Button>

        <button className="technique-back-link" onClick={handleBackToHub}>
          <ArrowLeft size={14} /> Back to techniques
        </button>
      </div>
    );
  };

  const renderDrill = () => {
    const scenario = activeTechnique.scenarios[roundIndex];
    const Icon = TECHNIQUE_ICONS[activeTechnique.id];
    return (
      <div className="technique-drill animate-fade-in">
        {/* Progress */}
        <div className="technique-drill-progress">
          {activeTechnique.scenarios.map((_, i) => (
            <div
              key={i}
              className={`technique-drill-pip${i < roundIndex ? ' done' : i === roundIndex ? ' active' : ''}`}
              style={{ '--color': activeTechnique.color }}
            />
          ))}
        </div>

        {/* Technique reminder */}
        <div className="technique-drill-badge" style={{ background: activeTechnique.color + '14', border: `1px solid ${activeTechnique.color}33` }}>
          <Icon size={14} weight="duotone" color={activeTechnique.color} />
          <span style={{ color: activeTechnique.color }}>Using: <strong>{activeTechnique.name}</strong></span>
        </div>

        {/* Scenario */}
        <Card padding="md" className="technique-scenario-card">
          <p className="technique-scenario-text">{scenario.context}</p>
        </Card>

        {/* Hint — key words collapsed */}
        <button
          className="technique-hint-toggle"
          style={{ color: activeTechnique.color }}
          onClick={() => setShowWords(v => !v)}
        >
          <Lightbulb size={14} weight={showWords ? 'fill' : 'regular'} />
          {showWords ? 'Hide key phrases' : 'Show key phrases'}
        </button>
        {showWords && (
          <div className="technique-trigger-words technique-trigger-words--compact">
            {activeTechnique.triggerWords.map(w => (
              <span key={w} className="technique-trigger-chip" style={{ background: activeTechnique.color + '18', color: activeTechnique.color, border: `1px solid ${activeTechnique.color}33` }}>
                {w}
              </span>
            ))}
          </div>
        )}

        {/* Answer input */}
        <div className="technique-input-area">
          <label className="technique-input-label">{scenario.prompt}</label>
          <textarea
            className="technique-input"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            placeholder={`Write a ${activeTechnique.name.toLowerCase()} question...`}
            rows={3}
            autoFocus
          />
        </div>

        <Button
          variant="mode"
          modeColor={activeTechnique.color}
          onClick={handleSubmit}
          disabled={!answer.trim() || answer.trim().split(/\s+/).length < 3}
        >
          Submit
        </Button>
      </div>
    );
  };

  const renderFeedback = () => {
    if (!lastResult) return null;
    const Icon = TECHNIQUE_ICONS[activeTechnique.id];
    const isLast = roundIndex >= ROUNDS_PER_TECHNIQUE - 1;

    return (
      <div className="technique-feedback animate-fade-in">
        {/* Result banner — 3 states: strong hit / basic / miss */}
        {lastResult.hit && lastResult.quality === 'strong' && (
          <div className="technique-result-banner hit">
            <CheckCircle size={28} weight="fill" color="#10B981" />
            <div>
              <p className="technique-result-title">Strong {activeTechnique.name} question!</p>
              <p className="technique-result-sub">
                The phrase <strong>"{lastResult.matchedWord}"</strong> triggered it — and the question had real depth.
              </p>
            </div>
          </div>
        )}

        {lastResult.hit && lastResult.quality === 'basic' && (
          <div className="technique-result-banner basic">
            <CheckCircle size={28} weight="fill" color="#F59E0B" />
            <div>
              <p className="technique-result-title">Technique detected — but too shallow</p>
              <p className="technique-result-sub">{lastResult.shallowReason}</p>
            </div>
          </div>
        )}

        {!lastResult.hit && (
          <div className="technique-result-banner miss">
            <XCircle size={28} weight="fill" color="#EF4444" />
            <div>
              <p className="technique-result-title">Technique not detected</p>
              <p className="technique-result-sub">Try including one of these phrases next time:</p>
            </div>
          </div>
        )}

        {/* Their answer */}
        <Card padding="md" className="technique-answer-review">
          <p className="technique-answer-label">Your question:</p>
          <p className="technique-answer-text">"{lastResult.answer}"</p>
        </Card>

        {/* Key phrases if miss or basic */}
        {(!lastResult.hit || lastResult.quality === 'basic') && (
          <div className="technique-trigger-words">
            {activeTechnique.triggerWords.slice(0, 5).map(w => (
              <span key={w} className="technique-trigger-chip" style={{ background: activeTechnique.color + '18', color: activeTechnique.color, border: `1px solid ${activeTechnique.color}33` }}>
                {w}
              </span>
            ))}
          </div>
        )}

        {/* Technique reminder */}
        <Card padding="md" className="technique-teach-card" style={{ borderLeft: `3px solid ${activeTechnique.color}` }}>
          <div className="technique-mini-reminder">
            <Icon size={16} weight="duotone" color={activeTechnique.color} />
            <span style={{ color: activeTechnique.color, fontWeight: 600 }}>{activeTechnique.name}:</span>
          </div>
          <p className="technique-mini-reminder-text">{activeTechnique.why}</p>
        </Card>

        <Button variant="mode" modeColor={activeTechnique.color} onClick={handleNext}>
          {isLast ? 'See results' : 'Next scenario'}
          <ArrowRight size={15} weight="bold" />
        </Button>
      </div>
    );
  };

  const renderSummary = () => {
    const allResults = roundResults;
    const hits = allResults.filter(r => r.hit).length;
    const total = allResults.length;
    const mastered = hits >= 2;
    const Icon = TECHNIQUE_ICONS[activeTechnique.id];

    return (
      <div className="technique-summary animate-fade-in">
        <div className="technique-summary-icon" style={{ background: activeTechnique.color + '18' }}>
          <Icon size={40} weight="duotone" color={activeTechnique.color} />
        </div>

        <h2 className="technique-summary-title" style={{ color: activeTechnique.color }}>
          {activeTechnique.name} complete
        </h2>

        <div className="technique-summary-score">
          <span className="technique-summary-hits" style={{ color: activeTechnique.color }}>{hits}</span>
          <span className="technique-summary-total">/ {total} detected</span>
        </div>

        {mastered ? (
          <div className="technique-mastery-msg">
            <Star size={20} weight="fill" color="#F59E0B" />
            <p>Mastered! You consistently used {activeTechnique.name.toLowerCase()} questioning.</p>
          </div>
        ) : (
          <div className="technique-try-again-msg">
            <p>Keep practicing — try to include the key phrases naturally in your questions.</p>
          </div>
        )}

        {/* Round breakdown */}
        <div className="technique-round-breakdown">
          {allResults.map((r, i) => (
            <div key={i} className={`technique-round-dot${r.hit ? ' hit' : ' miss'}`}>
              {r.hit
                ? <CheckCircle size={18} weight="fill" color="#10B981" />
                : <XCircle size={18} weight="fill" color="#F59E0B" />
              }
              <span>Round {i + 1}</span>
            </div>
          ))}
        </div>

        {/* Key phrases recap */}
        <Card padding="md" className="technique-teach-card">
          <h4 className="technique-teach-section-label" style={{ color: activeTechnique.color }}>Phrases to remember</h4>
          <div className="technique-trigger-words">
            {activeTechnique.triggerWords.slice(0, 6).map(w => (
              <span key={w} className="technique-trigger-chip" style={{ background: activeTechnique.color + '18', color: activeTechnique.color, border: `1px solid ${activeTechnique.color}33` }}>
                {w}
              </span>
            ))}
          </div>
        </Card>

        <div className="technique-summary-actions">
          <Button variant="mode" modeColor={activeTechnique.color} onClick={() => startTechnique(activeTechnique)}>
            Drill again
          </Button>
          <button className="technique-back-link" onClick={handleBackToHub}>
            <ArrowLeft size={14} /> All techniques
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="technique-mode">
      <ModeHeader theme={theme} title="Technique Drill" subtitle="Learn · Practice · Master" onBack={() => phase === 'hub' ? navigate('/modes') : handleBackToHub()} />
      <XPToast amount={xpAmount} visible={showXPToast} onDone={() => setShowXPToast(false)} />
      <AchievementToast achievementId={newAchievement} visible={!!newAchievement} onDone={() => setNewAchievement(null)} />

      <div className="technique-content">
        {phase === 'hub' && renderHub()}
        {phase === 'teach' && activeTechnique && renderTeach()}
        {phase === 'drill' && activeTechnique && renderDrill()}
        {phase === 'feedback' && activeTechnique && renderFeedback()}
        {phase === 'summary' && activeTechnique && renderSummary()}
      </div>
    </div>
  );
}
