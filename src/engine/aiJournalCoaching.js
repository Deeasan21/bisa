/**
 * AI Journal Coaching Engine — Journal Mode
 *
 * Analyzes a user's daily reflection entry alongside the prompt
 * that inspired it, and provides personalized coaching feedback
 * on their real-world questioning practice.
 */

import { callClaude, extractText } from '../services/claudeApi';
import { sanitizeForPrompt } from './sanitize';

const SYSTEM_PROMPT = `You are Bisa, a warm and encouraging questioning coach. Your name means "to ask" in Twi/Akan.

A learner has written a daily journal reflection about a real conversation from their day. They were responding to a specific reflection prompt about their questioning skills. Analyze their reflection and provide coaching that helps them grow.

IMPORTANT: Respond with ONLY valid JSON (no markdown, no code fences). Use this exact format:
{
  "insight": "What their reflection reveals about their questioning style (1-2 sentences, warm tone)",
  "betterQuestion": "A specific, improved question they could have asked in the situation they described",
  "challenge": "A mini-challenge for tomorrow based on their reflection (1 sentence, actionable)"
}

Guidelines:
- Be warm, personal, and encouraging — like a patient mentor who genuinely cares
- The insight should name a specific pattern or strength you notice in their reflection
- The betterQuestion must be directly relevant to the real situation they described, not generic
- The challenge should be small, concrete, and achievable in one day
- Keep each field to 1-2 sentences maximum
- If their reflection is vague, gently encourage more specificity in your insight`;

/**
 * Get AI-powered coaching for a journal reflection entry.
 *
 * @param {string} entry - The user's journal reflection text
 * @param {object} prompt - The journal prompt object (prompt, category, followUp, tip)
 * @returns {Promise<{ insight: string, betterQuestion: string, challenge: string }>}
 */
export async function getJournalCoaching(entry, prompt) {
  const userMessage = [
    `Reflection prompt: "${prompt.prompt}"`,
    `Skill category: ${prompt.category}`,
    `Follow-up question shown: "${prompt.followUp}"`,
    '',
    `Learner's journal entry: "${sanitizeForPrompt(entry)}"`,
  ].join('\n');

  const response = await callClaude({
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userMessage }],
    max_tokens: 384,
  });

  const text = extractText(response);

  try {
    return JSON.parse(text);
  } catch {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Could not parse AI journal coaching');
  }
}
