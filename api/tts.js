/**
 * Vercel Serverless Function — ElevenLabs TTS Proxy
 *
 * Converts text to speech using ElevenLabs eleven_multilingual_v2.
 * Voice and pronunciation dictionary are configured via env vars.
 * Returns a raw MP3 audio stream.
 *
 * Persistent cache: generated MP3s are stored in Vercel Blob (keyed by
 * SHA-256 hash of text + voice ID). Subsequent requests for the same text
 * are served from Blob CDN — no ElevenLabs call needed.
 *
 * Required env vars:
 *   ELEVENLABS_API_KEY            — from elevenlabs.io → Profile → API Keys
 *   ELEVENLABS_VOICE_ID           — Voice ID from the Voice Library detail page
 *   BLOB_READ_WRITE_TOKEN         — from Vercel → Storage → Blob → Connect
 *
 * Optional env var:
 *   ELEVENLABS_PRONUNCIATION_DICT_ID — from uploading twi-pronunciation.pls
 *
 * Security:
 * - Origin validation (Bisa domains only)
 * - Text length cap (4000 chars)
 * - Per-IP daily limit (50 calls/day) — only applies to cache misses
 * - Global daily cap (3000 calls/day) — only applies to cache misses
 */

import crypto from 'crypto';
import { put, head } from '@vercel/blob';

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
  if (origin.includes('deeasan21s-projects.vercel.app') || referer.includes('deeasan21s-projects.vercel.app')) return true;
  return ALLOWED_ORIGINS.some(o => origin.startsWith(o) || referer.startsWith(o));
}

// --- Blob cache ---

// Bump this when voice settings change — invalidates all old cached audio
const CACHE_VERSION = 'v2';

function getCacheKey(text, voiceId) {
  const hash = crypto.createHash('sha256').update(text + voiceId + CACHE_VERSION).digest('hex').slice(0, 24);
  return `tts/${CACHE_VERSION}/${hash}.mp3`;
}

async function getFromCache(key, token) {
  if (!token) return null;
  try {
    const blob = await head(key, { token });
    const res = await fetch(blob.url);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

async function saveToCache(key, audioBuffer, token) {
  if (!token) return;
  try {
    await put(key, Buffer.from(audioBuffer), {
      access: 'public',
      token,
      contentType: 'audio/mpeg',
      addRandomSuffix: false,
    });
  } catch (e) {
    console.warn('Blob cache write failed:', e.message);
  }
}

// --- ElevenLabs synthesis ---

async function synthesize(text, apiKey, voiceId, dictId) {
  const body = {
    text,
    model_id: 'eleven_multilingual_v2',
    voice_settings: {
      stability: 0.35,
      similarity_boost: 0.80,
      style: 0.55,
      use_speaker_boost: true,
    },
  };

  if (dictId) {
    body.pronunciation_dictionary_locators = [
      { pronunciation_dictionary_id: dictId, version_id: 'yN6x9FAFtaMnvlgCkL32' },
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
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN || null;

  if (!apiKey || !voiceId) {
    return res.status(503).json({ error: 'TTS not configured' });
  }

  const cleanText = text.trim();
  const cacheKey = getCacheKey(cleanText, voiceId);

  // Serve from cache if available (no rate limit needed)
  const cached = await getFromCache(cacheKey, blobToken);
  if (cached) {
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.setHeader('X-Cache', 'HIT');
    return res.send(Buffer.from(cached));
  }

  // Cache miss — apply rate limits before calling ElevenLabs
  if (!checkGlobalLimit()) {
    return res.status(429).json({ error: 'TTS service temporarily unavailable' });
  }

  const rateLimitKey = getRateLimitKey(req);
  if (!checkRateLimit(rateLimitKey)) {
    return res.status(429).json({ error: 'Daily TTS limit reached' });
  }

  try {
    const audioBuffer = await synthesize(cleanText, apiKey, voiceId, dictId);
    await saveToCache(cacheKey, audioBuffer, blobToken);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.setHeader('X-Cache', 'MISS');
    return res.send(Buffer.from(audioBuffer));
  } catch (err) {
    console.error('TTS error:', err.message);
    return res.status(500).json({ error: 'Failed to generate audio' });
  }
}
