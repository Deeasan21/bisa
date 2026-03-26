/**
 * Vercel Serverless Function — ElevenLabs TTS Proxy
 *
 * Converts text to speech using ElevenLabs eleven_multilingual_v2.
 * Voice and pronunciation dictionary are configured via env vars.
 * Returns a raw MP3 audio stream.
 *
 * Required env vars (Vercel → Settings → Environment Variables):
 *   ELEVENLABS_API_KEY            — from elevenlabs.io → Profile → API Keys
 *   ELEVENLABS_VOICE_ID           — Voice ID from the Voice Library detail page
 *
 * Optional env var:
 *   ELEVENLABS_PRONUNCIATION_DICT_ID — from uploading twi-pronunciation.pls
 *                                      (see api/twi-pronunciation.pls + README)
 *
 * Voice settings (tune these to adjust how Enya sounds):
 *   stability:        0.6  — lower = more expressive, higher = more consistent
 *   similarity_boost: 0.75 — how closely to match the base voice
 *   style:            0.4  — stylistic range; 0.4 is warm but not theatrical
 *   use_speaker_boost: true — improves clarity for educational content
 *
 * Security:
 * - Origin validation (Bisa domains only)
 * - Text length cap (4000 chars)
 * - Per-IP daily limit (50 calls/day)
 * - Global daily cap (3000 calls/day)
 */

// --- Rate limiting ---

const rateLimitMap = new Map();
const DAILY_LIMIT = 50;
const GLOBAL_DAILY_LIMIT = 3000;
let globalCount = 0;
let globalDate = new Date().toISOString().split('T')[0];

function getRateLimitKey(req) {
  const ip = req.headers['x-real-ip']
    || (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
    || 'unknown';
  const date = new Date().toISOString().split('T')[0];
  return `${ip}:${date}`;
}

function checkRateLimit(key) {
  const count = rateLimitMap.get(key) || 0;
  if (count >= DAILY_LIMIT) return false;
  rateLimitMap.set(key, count + 1);
  return true;
}

function checkGlobalLimit() {
  const today = new Date().toISOString().split('T')[0];
  if (today !== globalDate) { globalDate = today; globalCount = 0; }
  if (globalCount >= GLOBAL_DAILY_LIMIT) return false;
  globalCount++;
  return true;
}

// --- Origin validation ---

const ALLOWED_ORIGINS = [
  'https://neaobisa.com',
  'https://www.neaobisa.com',
  'https://bisa-eta.vercel.app',
  'http://localhost:5173',
  'http://localhost:4173',
];

function isAllowedOrigin(req) {
  const origin = req.headers.origin || '';
  const referer = req.headers.referer || '';
  return ALLOWED_ORIGINS.some(o => origin.startsWith(o) || referer.startsWith(o));
}

// --- ElevenLabs synthesis ---

async function synthesize(text, apiKey, voiceId, dictId) {
  const body = {
    text,
    model_id: 'eleven_multilingual_v2',
    voice_settings: {
      stability: 0.6,
      similarity_boost: 0.75,
      style: 0.4,
      use_speaker_boost: true,
    },
  };

  if (dictId) {
    body.pronunciation_dictionary_locators = [
      { pronunciation_dictionary_id: dictId, version_id: 'latest' },
    ];
  }

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`ElevenLabs error ${response.status}: ${err}`);
  }

  return response.arrayBuffer();
}

// --- Handler ---

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { text } = req.body || {};

  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ error: 'Text is required' });
  }

  if (text.length > 4000) {
    return res.status(400).json({ error: 'Text too long' });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;
  const dictId = process.env.ELEVENLABS_PRONUNCIATION_DICT_ID || null;

  if (!apiKey || !voiceId) {
    // Not configured — tell the frontend to fall back to browser TTS
    return res.status(503).json({ error: 'TTS not configured' });
  }

  if (!checkGlobalLimit()) {
    return res.status(429).json({ error: 'TTS service temporarily unavailable' });
  }

  const rateLimitKey = getRateLimitKey(req);
  if (!checkRateLimit(rateLimitKey)) {
    return res.status(429).json({ error: 'Daily TTS limit reached' });
  }

  try {
    const audioBuffer = await synthesize(text.trim(), apiKey, voiceId, dictId);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.send(Buffer.from(audioBuffer));
  } catch (err) {
    console.error('TTS error:', err.message);
    return res.status(500).json({ error: 'Failed to generate audio' });
  }
}
