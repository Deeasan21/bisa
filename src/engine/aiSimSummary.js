/**
 * AI Simulation Summary Engine
 *
 * Generates a personalized conversation summary when a simulation ends.
 * Only called when API key is available. Rule-based ending works without this.
 */

import { callClaude, extractText } from '../services/claudeApi';

const SYSTEM_PROMPT = `You are Bisa, a warm and encouraging questioning coach. Your name means "to ask" in Twi/Akan.

A learner just completed a simulated conversation practicing their questioning skills. Analyze their conversation and provide a brief, personalized summary.

IMPORTANT: Respond with ONLY valid JSON (no markdown, no code fences). Use this exact format:
{
  "summary": "2-3 sentence overall assessment, warm and specific",
  "bestMoment": "Quote or describe their strongest moment in the conversation",
  "pattern": "One pattern you noticed in their questioning style",
  "nextChallenge": "One specific thing to try in their next conversation"
}

Guidelines:
- Be warm, specific, and encouraging
- Reference actual things they said, not generic advice
- Keep each field to 1-2 sentences maximum
- The summary should feel like a coach who was watching the conversation`;

/**
 * Get an AI-generated conversation summary.
 *
 * @param {object} simulation - The simulation data
 * @param {Array} chatHistory - The full chat history [{text, isUser, quality}]
 * @param {string[]} qualityScores - Array of quality ratings
 * @param {number} empathyScore - Computed empathy score (0-100)
 * @returns {Promise<{ summary: string, bestMoment: string, pattern: string, nextChallenge: string }>}
 */
export async function getAISimSummary(simulation, chatHistory, qualityScores, empathyScore) {
  const conversationText = chatHistory
    .map(msg => `${msg.isUser ? 'LEARNER' : 'NPC'}: ${msg.text}`)
    .join('\n');

  const userMessage = [
    `Simulation: ${simulation.title}`,
    `Context: ${simulation.context}`,
    `Skill practiced: ${simulation.skillCategory || 'Questioning'}`,
    `Empathy score: ${empathyScore}/100`,
    `Quality ratings per turn: ${qualityScores.join(', ')}`,
    '',
    'Full conversation:',
    conversationText,
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
    throw new Error('Could not parse AI summary');
  }
}
