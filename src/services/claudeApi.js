/**
 * Client-side Claude API service
 *
 * Manages the user's Anthropic API key (localStorage) and
 * sends requests through the /api/claude proxy.
 *
 * AI features work for everyone via the server-side API key.
 * Users can optionally add their own key for unlimited access.
 */

const STORAGE_KEY = 'bisa_api_key';

export function getApiKey() {
  return localStorage.getItem(STORAGE_KEY) || '';
}

export function setApiKey(key) {
  if (key) {
    localStorage.setItem(STORAGE_KEY, key.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

/**
 * Returns true always — AI is available for everyone via the server key.
 */
export function hasApiKey() {
  return true;
}

/**
 * Returns true only if the user has their own personal API key configured.
 */
export function hasPersonalApiKey() {
  return !!getApiKey();
}

/**
 * Call Claude via the serverless proxy.
 *
 * @param {{ system?: string, messages: Array<{role: string, content: string}>, max_tokens?: number }} opts
 * @returns {Promise<{ content: Array<{type: string, text: string}>, model: string, usage: object }>}
 */
export async function callClaude({ system, messages, max_tokens = 1024 }) {
  const apiKey = getApiKey();

  const body = { system, messages, max_tokens };
  if (apiKey) {
    body.apiKey = apiKey;
  }

  const res = await fetch('/api/claude', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `API error ${res.status}`);
  }

  return data;
}

/**
 * Extract the text from a Claude response.
 */
export function extractText(response) {
  if (!response?.content) return '';
  return response.content
    .filter((c) => c.type === 'text')
    .map((c) => c.text)
    .join('');
}

/**
 * Quick connection test — sends a minimal request to verify the API key.
 */
export async function testConnection() {
  const response = await callClaude({
    messages: [{ role: 'user', content: 'Reply with the single word: connected' }],
    max_tokens: 16,
  });
  return extractText(response).toLowerCase().includes('connected');
}
