/**
 * Vercel Serverless Function — Claude API Proxy
 *
 * Forwards requests to Anthropic's Messages API.
 * Uses the caller's own API key if provided, otherwise falls back
 * to the server-side ANTHROPIC_API_KEY environment variable.
 *
 * Security:
 * - Origin validation (only accepts requests from Bisa domains)
 * - Message structure validation (role + string content only)
 * - Per-IP daily rate limit (10/day) for server-key usage
 * - Global daily cap (500/day) as billing safety net
 * - Sanitized error responses (no Anthropic error leaking)
 */

// --- Rate limiting ---

const rateLimitMap = new Map();
const DAILY_LIMIT = 10;
const GLOBAL_DAILY_LIMIT = 500;
let globalCount = 0;
let globalDate = new Date().toISOString().split('T')[0];

function getRateLimitKey(req) {
  // x-real-ip is set by Vercel and cannot be spoofed by the client
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
  'https://bisa-eta.vercel.app',
  'http://localhost:5173',
  'http://localhost:4173',
];

function isAllowedOrigin(req) {
  const origin = req.headers.origin || '';
  const referer = req.headers.referer || '';
  return ALLOWED_ORIGINS.some(o => origin.startsWith(o) || referer.startsWith(o));
}

// --- Message validation ---

const VALID_ROLES = new Set(['user', 'assistant']);

function validateMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 20) {
    return false;
  }
  for (const msg of messages) {
    if (!VALID_ROLES.has(msg.role) || typeof msg.content !== 'string') {
      return false;
    }
  }
  return true;
}

// --- Handler ---

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Origin check — block requests not from Bisa
  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { messages, system, apiKey, max_tokens = 1024 } = req.body || {};

  // Validate message structure
  if (!validateMessages(messages)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  // Determine which API key to use
  const userKey = apiKey || null;
  const serverKey = process.env.ANTHROPIC_API_KEY || null;
  const effectiveKey = userKey || serverKey;

  if (!effectiveKey) {
    return res.status(400).json({ error: 'No API key available' });
  }

  // Rate limit only when using the server key
  if (!userKey && serverKey) {
    // Global safety cap
    if (!checkGlobalLimit()) {
      return res.status(429).json({
        error: 'Service temporarily unavailable. Please try again tomorrow.',
      });
    }
    // Per-IP limit
    const key = getRateLimitKey(req);
    if (!checkRateLimit(key)) {
      return res.status(429).json({
        error: 'Daily limit reached. Bisa allows 10 AI calls per day for free. Add your own API key in Settings for unlimited access.',
      });
    }
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': effectiveKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: Math.min(Number(max_tokens) || 1024, 1024),
        ...(system ? { system } : {}),
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Sanitized errors — don't leak Anthropic internals
      if (response.status === 401) {
        return res.status(401).json({ error: 'Invalid API key' });
      }
      if (response.status === 429) {
        return res.status(429).json({ error: 'AI service rate limit. Please wait a moment and try again.' });
      }
      return res.status(response.status).json({ error: 'AI service error' });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to reach AI service' });
  }
}
