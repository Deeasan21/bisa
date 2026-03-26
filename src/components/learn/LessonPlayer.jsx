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

// Convert HTML to speech-friendly text with natural pauses preserved
function htmlToSpeechText(html) {
  if (!html) return '';
  // Replace block elements with pause markers before stripping tags
  let text = html
    .replace(/<\/?(h[1-6])[^>]*>/gi, ' . ')        // headings → pause
    .replace(/<li[^>]*>/gi, ' . ')                   // list items → pause
    .replace(/<\/?(p|div|section)[^>]*>/gi, ' . ')   // paragraphs → pause
    .replace(/<br\s*\/?>/gi, ', ')                    // line breaks → short pause
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '$1')  // bold → just text
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '$1')          // italic → just text
    .replace(/<[^>]+>/g, '')                          // strip remaining tags
    .replace(/&amp;/g, 'and')
    .replace(/&mdash;|—/g, ', ')                      // em-dash → pause
    .replace(/&ldquo;|&rdquo;|[""]/g, '')
    .replace(/\s*\.\s*\.\s*/g, '. ')                  // collapse multiple pauses
    .replace(/\s{2,}/g, ' ')
    .trim();
  return text;
}

// Split into sentence-sized chunks for natural cadence
function toChunks(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 3);
}

function pickVoice() {
  const voices = window.speechSynthesis?.getVoices() || [];
  // Prefer neural/natural voices by name
  const priority = [
    'Google US English',
    'Samantha',          // macOS / iOS
    'Karen',             // iOS Australian
    'Moira',             // iOS Irish
    'Daniel',            // macOS British
    'Fiona',             // macOS Scottish
  ];
  for (const name of priority) {
    const v = voices.find(v => v.name === name);
    if (v) return v;
  }
  return voices.find(v => v.lang === 'en-US') ||
    voices.find(v => v.lang?.startsWith('en')) ||
    null;
}

function useSpeech() {
  const [state, setState] = useState('idle'); // 'idle' | 'speaking' | 'paused'
  const chunksRef = useRef([]);
  const chunkIdxRef = useRef(0);
  const voiceRef = useRef(null);

  // Voices load async — cache after first call
  useEffect(() => {
    const load = () => { voiceRef.current = pickVoice(); };
    load();
    window.speechSynthesis?.addEventListener('voiceschanged', load);
    return () => window.speechSynthesis?.removeEventListener('voiceschanged', load);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    chunksRef.current = [];
    chunkIdxRef.current = 0;
    setState('idle');
  }, []);

  const speakChunk = useCallback((chunks, idx, voice) => {
    if (idx >= chunks.length) { setState('idle'); return; }
    const utt = new SpeechSynthesisUtterance(chunks[idx]);
    utt.rate = 0.82;
    utt.pitch = 1.0;
    if (voice) utt.voice = voice;
    utt.onend = () => {
      chunkIdxRef.current = idx + 1;
      speakChunk(chunks, idx + 1, voice);
    };
    utt.onerror = () => setState('idle');
    window.speechSynthesis.speak(utt);
  }, []);

  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const chunks = toChunks(htmlToSpeechText(text));
    if (!chunks.length) return;
    chunksRef.current = chunks;
    chunkIdxRef.current = 0;
    const voice = voiceRef.current || pickVoice();
    setState('speaking');
    speakChunk(chunks, 0, voice);
  }, [speakChunk]);

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
