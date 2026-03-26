import { useState, useEffect, useRef, useCallback } from 'react';
import { SpeakerHigh, SpeakerSlash, PauseCircle } from '@phosphor-icons/react';
import MicroChallenge from './MicroChallenge';
import BeforeAfterReveal from './BeforeAfterReveal';
import InlineReflection from './InlineReflection';
import QuickPoll from './QuickPoll';
import DragReorder from './DragReorder';
import ConsequenceExplorer from './ConsequenceExplorer';
import {
  ConversationFork,
  ToneScale,
  EscalationFlow,
  BodyLanguageCluster,
  ComparisonSplit,
} from '../diagrams';
import './LessonPlayer.css';

function extractText(html) {
  if (!html) return '';
  try {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  } catch {
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }
}

function pickVoice() {
  const voices = window.speechSynthesis?.getVoices() || [];
  const priority = ['Google US English', 'Samantha', 'Karen', 'Moira', 'Victoria'];
  for (const name of priority) {
    const v = voices.find(v => v.name === name);
    if (v) return v;
  }
  return voices.find(v => v.lang?.startsWith('en-US')) ||
    voices.find(v => v.lang?.startsWith('en')) ||
    null;
}

function useSpeech() {
  const [state, setState] = useState('idle'); // 'idle' | 'speaking' | 'paused'
  const uttRef = useRef(null);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    uttRef.current = null;
    setState('idle');
  }, []);

  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.94;
    utt.pitch = 1.02;
    const voice = pickVoice();
    if (voice) utt.voice = voice;
    utt.onstart = () => setState('speaking');
    utt.onpause = () => setState('paused');
    utt.onresume = () => setState('speaking');
    utt.onend = () => setState('idle');
    utt.onerror = () => setState('idle');
    uttRef.current = utt;
    window.speechSynthesis.speak(utt);
    setState('speaking');
  }, []);

  const toggle = useCallback((text) => {
    if (state === 'idle') {
      speak(text);
    } else if (state === 'speaking') {
      window.speechSynthesis.pause();
      setState('paused');
    } else {
      window.speechSynthesis.resume();
      setState('speaking');
    }
  }, [state, speak]);

  return { state, toggle, stop };
}

/**
 * LessonPlayer — section-based progressive lesson renderer.
 *
 * Expects lesson.sections: Array<{
 *   id: string,
 *   title?: string,
 *   content?: string (HTML),
 *   diagram?: { type: string, props: object },
 *   interaction?: {
 *     type: 'micro-challenge' | 'before-after' | 'reflection' | 'poll',
 *     required?: boolean,
 *     ...type-specific props
 *   }
 * }>
 */
export default function LessonPlayer({
  lesson,
  themeColor,
  // Reflection state managed by parent (LearnMode)
  reflection,
  onReflectionChange,
  onSaveReflection,
  onDeleteReflection,
  saved,
  aiReflectionResult,
  aiReflectionLoading,
  onRequestAI,
  hasApiKey,
  // Called when user clicks Done on the last section
  onLessonComplete,
}) {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [interactionDone, setInteractionDone] = useState(false);
  const { state: speechState, toggle: speechToggle, stop: speechStop } = useSpeech();

  const sections = lesson.sections;
  const total = sections.length;
  const current = sections[sectionIndex];
  const isFirst = sectionIndex === 0;
  const isLast = sectionIndex === total - 1;

  // Gate Next when interaction is marked required and hasn't been completed
  const hasRequired = current.interaction?.required === true;
  const canAdvance = !hasRequired || interactionDone;

  // Stop speech when section changes or lesson unmounts
  useEffect(() => {
    speechStop();
    setInteractionDone(false);
  }, [sectionIndex]);

  useEffect(() => () => speechStop(), []);

  const goNext = () => {
    if (!canAdvance) return;
    if (isLast) {
      onLessonComplete?.();
    } else {
      setSectionIndex((i) => i + 1);
    }
  };

  const goPrev = () => {
    if (!isFirst) setSectionIndex((i) => i - 1);
  };

  const handleInteractionComplete = () => {
    setInteractionDone(true);
  };

  return (
    <div className="lesson-player">
      {/* Progress dots */}
      <div className="lp-progress" role="progressbar" aria-valuenow={sectionIndex + 1} aria-valuemax={total}>
        {sections.map((_, i) => (
          <div
            key={i}
            className={`lp-dot ${i === sectionIndex ? 'active' : i < sectionIndex ? 'done' : ''}`}
          />
        ))}
      </div>

      {/* Section content — key triggers animation when section changes */}
      <div className="lp-section animate-fade-in" key={`${lesson.id}-${sectionIndex}`}>
        <div className="lp-section-header">
          {current.title && (
            <p className="lp-section-eyebrow">{current.title}</p>
          )}
          {current.content && window.speechSynthesis && (
            <button
              className={`lp-speak-btn${speechState !== 'idle' ? ' speaking' : ''}`}
              onClick={() => speechToggle(
                [current.title, extractText(current.content)].filter(Boolean).join('. ')
              )}
              aria-label={speechState === 'speaking' ? 'Pause reading' : speechState === 'paused' ? 'Resume reading' : 'Read aloud'}
              title={speechState === 'speaking' ? 'Pause' : speechState === 'paused' ? 'Resume' : 'Read aloud'}
            >
              {speechState === 'speaking' ? (
                <PauseCircle size={18} weight="fill" />
              ) : speechState === 'paused' ? (
                <SpeakerHigh size={18} weight="fill" />
              ) : (
                <SpeakerHigh size={18} />
              )}
            </button>
          )}
        </div>

        {current.content && (
          <div
            className="lp-section-content lesson-content"
            dangerouslySetInnerHTML={{ __html: current.content }}
          />
        )}

        {current.diagram && (
          <DiagramRenderer type={current.diagram.type} props={current.diagram.props} />
        )}

        {current.interaction && (
          <InteractionRenderer
            interaction={current.interaction}
            interactionDone={interactionDone}
            onComplete={handleInteractionComplete}
            reflection={reflection}
            onReflectionChange={onReflectionChange}
            onSaveReflection={onSaveReflection}
            onDeleteReflection={onDeleteReflection}
            saved={saved}
            aiReflectionResult={aiReflectionResult}
            aiReflectionLoading={aiReflectionLoading}
            onRequestAI={onRequestAI}
            hasApiKey={hasApiKey}
            themeColor={themeColor}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="lp-nav">
        <button
          className="lp-btn lp-btn--prev"
          onClick={goPrev}
          disabled={isFirst}
        >
          Previous
        </button>
        <span className="lp-count">{sectionIndex + 1} / {total}</span>
        <button
          className={`lp-btn lp-btn--next${!canAdvance ? ' locked' : ''}`}
          onClick={goNext}
          disabled={!canAdvance && !isLast}
          title={!canAdvance ? 'Complete the activity to continue' : ''}
        >
          {isLast ? 'Done ✓' : 'Next →'}
        </button>
      </div>
    </div>
  );
}

function InteractionRenderer({
  interaction,
  interactionDone,
  onComplete,
  reflection,
  onReflectionChange,
  onSaveReflection,
  onDeleteReflection,
  saved,
  aiReflectionResult,
  aiReflectionLoading,
  onRequestAI,
  hasApiKey,
  themeColor,
}) {
  const { type } = interaction;

  if (type === 'micro-challenge') {
    return (
      <MicroChallenge
        scenario={interaction.scenario}
        options={interaction.options}
        explanation={interaction.explanation}
        onComplete={onComplete}
      />
    );
  }

  if (type === 'before-after') {
    return (
      <BeforeAfterReveal
        context={interaction.context}
        before={interaction.before}
        after={interaction.after}
        explanation={interaction.explanation}
        onComplete={onComplete}
      />
    );
  }

  if (type === 'reflection') {
    return (
      <InlineReflection
        prompt={interaction.prompt}
        value={reflection}
        onChange={onReflectionChange}
        onSave={onSaveReflection}
        onDelete={onDeleteReflection}
        saved={saved}
        aiReflectionResult={aiReflectionResult}
        aiReflectionLoading={aiReflectionLoading}
        onRequestAI={onRequestAI}
        hasApiKey={hasApiKey}
        themeColor={themeColor}
      />
    );
  }

  if (type === 'poll') {
    return (
      <QuickPoll
        question={interaction.question}
        options={interaction.options}
        onComplete={onComplete}
      />
    );
  }

  if (type === 'drag-reorder') {
    return (
      <DragReorder
        instruction={interaction.instruction}
        items={interaction.items}
        correctOrder={interaction.correctOrder}
        explanation={interaction.explanation}
        onComplete={onComplete}
      />
    );
  }

  if (type === 'consequence-explorer') {
    return (
      <ConsequenceExplorer
        scenario={interaction.scenario}
        phrasings={interaction.phrasings}
        takeaway={interaction.takeaway}
        onComplete={onComplete}
      />
    );
  }

  return null;
}

function DiagramRenderer({ type, props }) {
  if (type === 'conversation-fork') return <ConversationFork {...props} />;
  if (type === 'tone-scale') return <ToneScale {...props} />;
  if (type === 'escalation-flow') return <EscalationFlow {...props} />;
  if (type === 'body-language-cluster') return <BodyLanguageCluster {...props} />;
  if (type === 'comparison-split') return <ComparisonSplit {...props} />;
  return null;
}
