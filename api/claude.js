/**
 * Vercel Serverless Function — Claude API Proxy
 *
 * Forwards requests to Anthropic's Messages API.
 * Uses the caller's own API key if provided, otherwise falls back
 * to the server-side ANTHROPIC_API_KEY environment variable.
 * Rate limits server-key usage to 10 calls per IP per day.
 */

// In-memory rate limit store (resets on cold start — acceptable soft limit)
const rateLimitMap = new Map();
const DAILY_LIMIT = 10;

function getRateLimitKey(req) {
  const ip = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  const date = new Date().toISOString().split('T')[0];
  return `${ip}:${date}`;
}

function checkRateLimit(key) {
  const count = rateLimitMap.get(key) || 0;
  if (count >= DAILY_LIMIT) return false;
  rateLimitMap.set(key, count + 1);
  return true;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, system, apiKey, max_tokens = 1024 } = req.body || {};

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages array is required' });
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
      return res.status(response.status).json({
        error: data.error?.message || data.error || `Anthropic API error ${response.status}`,
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to reach Anthropic API' });
  }
}
