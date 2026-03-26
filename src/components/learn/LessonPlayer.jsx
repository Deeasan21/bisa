import { useState, useEffect, useRef, useCallback } from 'react';
import { SpeakerHigh, PauseCircle, CircleNotch } from '@phosphor-icons/react';
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

// Convert HTML to speech-friendly plain text with natural pause markers
function htmlToSpeechText(html) {
  if (!html) return '';
  return html
    .replace(/<\/?(h[1-6])[^>]*>/gi, '. ')
    .replace(/<li[^>]*>/gi, '. ')
    .replace(/<\/?(p|div|section)[^>]*>/gi, '. ')
    .replace(/<br\s*\/?>/gi, ', ')
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '$1')
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, 'and')
    .replace(/&mdash;|—/g, ', ')
    .replace(/[""]/g, '')
    .replace(/\s*\.\s*\.\s*/g, '. ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function useSpeech() {
  const [state, setState] = useState('idle'); // 'idle' | 'loading' | 'speaking' | 'paused'
  const audioRef = useRef(null);
  const cacheRef = useRef({}); // text → blob URL

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current = null;
    }
    setState('idle');
  }, []);

  const speak = useCallback(async (rawHtml) => {
    stop();
    const text = htmlToSpeechText(rawHtml);
    if (!text) return;

    setState('loading');
    try {
      let url = cacheRef.current[text];

      if (!url) {
        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });

        if (!res.ok) {
          fallbackBrowserSpeak(text);
          return;
        }

        const blob = await res.blob();
        url = URL.createObjectURL(blob);
        cacheRef.current[text] = url;
      }

      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => setState('idle');
      audio.onerror = () => { setState('idle'); fallbackBrowserSpeak(text); };
      await audio.play();
      setState('speaking');
    } catch {
      fallbackBrowserSpeak(text);
      setState('idle');
    }
  }, [stop]);

  const toggle = useCallback((rawHtml) => {
    if (state === 'idle') {
      speak(rawHtml);
    } else if (state === 'speaking') {
      audioRef.current?.pause();
      setState('paused');
    } else if (state === 'paused') {
      audioRef.current?.play();
      setState('speaking');
    }
  }, [state, speak]);

  useEffect(() => {
    return () => {
      stop();
      Object.values(cacheRef.current).forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  return { state, toggle, stop };
}

// Browser TTS fallback (used when GOOGLE_TTS_API_KEY is not yet set)
function fallbackBrowserSpeak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.length > 3);
  const voices = window.speechSynthesis.getVoices();
  const voice = ['Samantha', 'Google US English', 'Karen'].reduce(
    (found, name) => found || voices.find(v => v.name === name), null
  ) || voices.find(v => v.lang?.startsWith('en')) || null;

  const speakNext = (i) => {
    if (i >= sentences.length) return;
    const utt = new SpeechSynthesisUtterance(sentences[i]);
    utt.rate = 0.82;
    if (voice) utt.voice = voice;
    utt.onend = () => speakNext(i + 1);
    window.speechSynthesis.speak(utt);
  };
  speakNext(0);
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
          {current.content && (
            <button
              className={`lp-speak-btn${speechState === 'speaking' ? ' speaking' : ''}${speechState === 'loading' ? ' loading' : ''}`}
              onClick={() => speechToggle([current.title, current.content].filter(Boolean).join('. '))}
              disabled={speechState === 'loading'}
              aria-label={speechState === 'speaking' ? 'Pause' : speechState === 'paused' ? 'Resume' : speechState === 'loading' ? 'Loading…' : 'Read aloud'}
            >
              {speechState === 'loading' ? (
                <CircleNotch size={18} className="lp-spin" />
              ) : speechState === 'speaking' ? (
                <PauseCircle size={18} weight="fill" />
              ) : (
                <SpeakerHigh size={18} weight={speechState === 'paused' ? 'fill' : 'regular'} />
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
