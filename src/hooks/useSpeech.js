import { useState, useRef, useCallback, useEffect } from 'react';

export function htmlToSpeechText(html) {
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
    .replace(/"([^"]{1,30})[?!]"/g, '"$1"')
    .replace(/[""]/g, '')
    .replace(/\s*\.\s*\.\s*/g, '. ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function fallbackBrowserSpeak(text, onEnd) {
  if (!window.speechSynthesis) { onEnd?.(); return; }
  window.speechSynthesis.cancel();
  const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.length > 3);
  const voices = window.speechSynthesis.getVoices();
  const voice = ['Samantha', 'Google US English', 'Karen'].reduce(
    (found, name) => found || voices.find(v => v.name === name), null
  ) || voices.find(v => v.lang?.startsWith('en')) || null;

  const speakNext = (i) => {
    if (i >= sentences.length) { onEnd?.(); return; }
    const utt = new SpeechSynthesisUtterance(sentences[i]);
    utt.rate = 0.82;
    if (voice) utt.voice = voice;
    utt.onend = () => speakNext(i + 1);
    window.speechSynthesis.speak(utt);
  };
  speakNext(0);
}

export function useSpeech() {
  const [state, setState] = useState('idle'); // 'idle' | 'loading' | 'speaking'
  const audioRef = useRef(null);
  const cacheRef = useRef({});

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setState('idle');
  }, []);

  const speak = useCallback(async (rawHtml, onEnd) => {
    stop();
    const text = htmlToSpeechText(rawHtml);
    if (!text) { onEnd?.(); return; }

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
          // ElevenLabs failed — use browser TTS but track state properly
          setState('speaking');
          fallbackBrowserSpeak(text, () => { setState('idle'); onEnd?.(); });
          return;
        }

        const blob = await res.blob();
        url = URL.createObjectURL(blob);
        cacheRef.current[text] = url;
      }

      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => { setState('idle'); onEnd?.(); };
      audio.onerror = () => {
        setState('speaking');
        fallbackBrowserSpeak(text, () => { setState('idle'); onEnd?.(); });
      };
      await audio.play();
      setState('speaking');
    } catch {
      setState('speaking');
      fallbackBrowserSpeak(text, () => { setState('idle'); onEnd?.(); });
    }
  }, [stop]);

  const toggle = useCallback((rawHtml) => {
    if (state === 'idle') speak(rawHtml);
    else stop();
  }, [state, speak, stop]);

  useEffect(() => {
    return () => {
      stop();
      Object.values(cacheRef.current).forEach(url => URL.revokeObjectURL(url));
    };
  }, [stop]);

  return { state, speak, toggle, stop };
}
