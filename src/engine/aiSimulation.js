/**
 * AI Simulation Engine — Free-Response Conversations
 *
 * Lets the user type their own responses in Simulate mode.
 * Claude plays the NPC character, staying in-character and
 * rating the user's question quality in hidden metadata.
 */

import { callClaude, extractText } from '../services/claudeApi';
import { sanitizeForPrompt } from './sanitize';

const QUALITY_TAG_REGEX = /<!--BISA:(.*?)-->/s;

/**
 * Build a system prompt for the NPC character.
 */
export function buildSimSystemPrompt(simulation, turnCount, maxTurns) {
  const startNode = simulation.nodes[simulation.startNode || 'start'];
  const speaker = startNode.speaker || 'the other person';
  const isWrappingUp = turnCount >= maxTurns - 2;

  return [
    `You are playing the role of "${speaker}" in a realistic conversation.`,
    `Context: ${simulation.context}`,
    `Skill being practiced: ${simulation.skillCategory || 'Questioning'}`,
    '',
    'Rules:',
    '- Stay in character at all times. Respond as this person would.',
    '- Keep responses to 1-3 sentences. Be natural, not robotic.',
    '- React emotionally to the quality of the user\'s questions:',
    '  - Thoughtful, open-ended questions → open up more, share deeper feelings',
    '  - Closed or dismissive questions → become guarded or give short answers',
    '  - Empathetic questions → show vulnerability and trust',
    '- Do NOT break character or mention you are an AI.',
    '',
    isWrappingUp
      ? 'IMPORTANT: The conversation is nearing its end. Bring the interaction to a natural close in this response. Offer a sense of resolution or summary of where things stand.'
      : '',
    '',
    'After your in-character response, on a NEW LINE, append this EXACT format (the user will not see it):',
    '<!--BISA:{"quality":"great|good|medium|poor"}-->',
    '',
    'Quality ratings:',
    '- "great": User asked an empathetic, open-ended, or deeply thoughtful question',
    '- "good": User asked a reasonable open question showing some thought',
    '- "medium": User asked a somewhat closed or surface-level question',
    '- "poor": User asked a dismissive, judgmental, or very closed question',
  ].filter(Boolean).join('\n');
}

/**
 * Parse a Claude response to extract the visible text and quality metadata.
 */
export function parseSimResponse(rawContent) {
  const match = rawContent.match(QUALITY_TAG_REGEX);
  let quality = 'medium';

  if (match) {
    try {
      const meta = JSON.parse(match[1]);
      quality = meta.quality || 'medium';
    } catch {
      // Keep default
    }
  }

  // Remove the metadata tag from visible text
  const text = rawContent.replace(QUALITY_TAG_REGEX, '').trim();

  return { text, quality };
}

/**
 * Convert Bisa chatHistory to Claude messages format.
 * chatHistory: [{ text, isUser, quality? }]
 */
function buildMessages(chatHistory, userInput) {
  const messages = [];

  for (const msg of chatHistory) {
    messages.push({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.text,
    });
  }

  // Add the new user input (sanitized)
  messages.push({ role: 'user', content: sanitizeForPrompt(userInput) });

  return messages;
}

/**
 * Get an AI-generated NPC response for the simulation.
 *
 * @param {object} simulation - The simulation data
 * @param {Array} chatHistory - The chat history so far
 * @param {string} userInput - The user's free-text response
 * @param {number} turnCount - How many user turns so far
 * @param {number} maxTurns - Max turns before ending (default 8)
 * @returns {Promise<{ text: string, quality: string, isEnding: boolean }>}
 */
export async function getAISimResponse(simulation, chatHistory, userInput, turnCount, maxTurns = 8) {
  const system = buildSimSystemPrompt(simulation, turnCount, maxTurns);
  const messages = buildMessages(chatHistory, userInput);
  const isEnding = turnCount >= maxTurns - 1;

  const response = await callClaude({
    system,
    messages,
    max_tokens: 256,
  });

  const rawContent = extractText(response);
  const parsed = parseSimResponse(rawContent);

  return {
    ...parsed,
    isEnding,
  };
}
