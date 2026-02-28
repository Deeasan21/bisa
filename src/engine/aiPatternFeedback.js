/**
 * AI Feedback Engine — Pattern Recognition (Read & React)
 *
 * Sends the user's response + message context to Claude for
 * detailed coaching on read accuracy, tone matching, and acknowledgment.
 * Only called when rule-based scorer flags needsAIReview (score 30-75).
 */

import { callClaude, extractText } from '../services/claudeApi';
import { sanitizeForPrompt } from './sanitize';

const SYSTEM_PROMPT = `You are Bisa, a warm and encouraging communication coach. Your name means "to ask" in Twi/Akan.

A learner received a set of messages from another person, identified the sender's primary need, and wrote a response. Evaluate their response on three dimensions:

1. READ — Did they correctly identify and address the sender's underlying need?
2. TONE MATCH — Does their energy and emotional temperature match the situation?
3. ACKNOWLEDGE FIRST — Did they validate the sender's feelings before moving to action, advice, or solutions?

IMPORTANT: Respond with ONLY valid JSON (no markdown, no code fences). Use this exact format:
{
  "readScore": 1-5,
  "toneScore": 1-5,
  "ackScore": 1-5,
  "overallFeedback": "One warm sentence about what they did well, and one constructive suggestion",
  "suggestedResponse": "A model response that nails all three dimensions",
  "senderNeedExplanation": "Why the sender needs this specific thing in this moment"
}

Guidelines:
- Be warm and encouraging, like a coach who believes in them
- Be specific — "You jumped straight to solving" is better than "Try to be more empathetic"
- The suggested response should feel natural, not scripted
- Keep overallFeedback to 2-3 sentences max`;

/**
 * Get AI-powered feedback on a Read & React response.
 *
 * @param {string} userResponse - The user's written response
 * @param {object} scenario - The Read & React scenario
 * @returns {Promise<{ readScore, toneScore, ackScore, overallFeedback, suggestedResponse, senderNeedExplanation }>}
 */
export async function getAIPatternFeedback(userResponse, scenario) {
  const messagesText = scenario.messages
    .map(m => `${m.sender}: "${m.text}"`)
    .join('\n');

  const userMessage = [
    `Incoming messages:\n${messagesText}`,
    `Sender's primary need: ${scenario.senderNeed}`,
    `Context: ${scenario.context}`,
    `Difficulty: ${scenario.difficultyTier}`,
    '',
    `Learner's response: "${sanitizeForPrompt(userResponse)}"`,
  ].join('\n');

  const response = await callClaude({
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userMessage }],
    max_tokens: 512,
  });

  const text = extractText(response);

  try {
    return JSON.parse(text);
  } catch {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Could not parse AI pattern feedback');
  }
}
