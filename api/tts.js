/**
 * Vercel Serverless Function — OpenAI TTS Proxy
 *
 * Converts text to speech using OpenAI's tts-1 model (nova voice).
 * Returns an mp3 audio stream cached for 24 hours.
 *
 * Security:
 * - Origin validation (Bisa domains only)
 * - Text length cap (2000 chars max)
 * - Per-IP daily rate limit (30 TTS calls/day)
 * - Global daily cap (2000 calls/day) as billing safety net
 */

// --- Rate limiting ---

const rateLimitMap = new Map();
const DAILY_LIMIT = 30;
const GLOBAL_DAILY_LIMIT = 2000;
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
  if (today !== globalDate) {
    globalDate = today;
    globalCount = 0;
  }
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

  if (text.length > 2000) {
    return res.status(400).json({ error: 'Text too long' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'TTS not configured' });
  }

  if (!checkGlobalLimit()) {
    return res.status(429).json({ error: 'TTS service temporarily unavailable' });
  }

  const key = getRateLimitKey(req);
  if (!checkRateLimit(key)) {
    return res.status(429).json({ error: 'Daily TTS limit reached' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1',
        input: text.trim(),
        voice: 'nova',
        response_format: 'mp3',
        speed: 0.92,
      }),
    });

    if (!response.ok) {
      return res.status(500).json({ error: 'TTS service error' });
    }

    const buffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.send(Buffer.from(buffer));
  } catch {
    return res.status(500).json({ error: 'Failed to generate audio' });
  }
}
