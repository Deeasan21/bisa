/**
 * Vercel Serverless Function — Google Cloud TTS Proxy
 *
 * Converts text to speech using Google Cloud Text-to-Speech Neural2.
 * Voice: en-US-Neural2-C (warm, natural female)
 * Returns an array of base64-encoded MP3 chunks (Google Neural2 has a
 * ~450-char request limit, so long text is split at sentence boundaries).
 *
 * Security:
 * - Origin validation (Bisa domains only)
 * - Text length cap (4000 chars max)
 * - Per-IP daily rate limit (50 calls/day)
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

// --- Text chunking ---
// Google Neural2 errors above ~450 chars — split at sentence boundaries

function splitIntoChunks(text, maxChars = 400) {
  const sentences = text.match(/[^.!?]+[.!?]+[\s]*/g) || [text];
  const chunks = [];
  let current = '';

  for (const sentence of sentences) {
    if ((current + sentence).length > maxChars && current.length > 0) {
      chunks.push(current.trim());
      current = sentence;
    } else {
      current += sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks.filter(c => c.length > 0);
}

// --- Google TTS request ---

async function synthesize(text, apiKey) {
  const response = await fetch(
    'https://texttospeech.googleapis.com/v1/text:synthesize',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
      },
      body: JSON.stringify({
        input: { text },
        voice: {
          languageCode: 'en-US',
          name: 'en-US-Neural2-C',
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: 0.9,
          pitch: 1.0,
          effectsProfileId: ['headphone-class-device'],
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Google TTS error ${response.status}: ${err}`);
  }

  const data = await response.json();
  return data.audioContent; // base64-encoded MP3
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

  const apiKey = process.env.GOOGLE_TTS_API_KEY;
  if (!apiKey) {
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
    const chunks = splitIntoChunks(text.trim());
    const audioChunks = await Promise.all(chunks.map(chunk => synthesize(chunk, apiKey)));
    return res.status(200).json({ chunks: audioChunks });
  } catch (err) {
    console.error('TTS error:', err.message);
    return res.status(500).json({ error: 'Failed to generate audio' });
  }
}
