import { SpeakerHigh, PauseCircle, CircleNotch } from '@phosphor-icons/react';
import { useSpeech } from '../../hooks/useSpeech';
import './SpeakButton.css';

/**
 * SpeakButton — standalone Enya speaker button for interaction boxes.
 * Pass `text` as a plain string (not HTML).
 */
export default function SpeakButton({ text }) {
  const { state, toggle } = useSpeech();

  if (!text) return null;

  return (
    <button
      className={`speak-btn${state === 'speaking' ? ' speaking' : ''}${state === 'loading' ? ' loading' : ''}`}
      onClick={() => toggle(text)}
      disabled={state === 'loading'}
      aria-label={state === 'speaking' ? 'Pause' : state === 'paused' ? 'Resume' : state === 'loading' ? 'Loading…' : 'Read aloud'}
    >
      {state === 'loading' ? (
        <CircleNotch size={15} className="speak-btn-spin" />
      ) : state === 'speaking' ? (
        <PauseCircle size={15} weight="fill" />
      ) : (
        <SpeakerHigh size={15} weight={state === 'paused' ? 'fill' : 'regular'} />
      )}
    </button>
  );
}
