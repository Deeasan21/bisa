/**
 * AI Feedback Engine — Practice Mode
 *
 * Sends the user's question + scenario context to Claude for
 * detailed coaching feedback. Only called when the rule-based
 * scorer flags needsAIReview (score 40-75) and an API key is set.
 */

import { callClaude, extractText } from '../services/claudeApi';
import { sanitizeForPrompt } from './sanitize';

const SYSTEM_PROMPT = `You are Bisa, a warm and encouraging questioning coach. Your name means "to ask" in Twi/Akan.

A learner has just rewritten a weak question for a real-world scenario. Evaluate their question and provide structured coaching feedback.

IMPORTANT: Respond with ONLY valid JSON (no markdown, no code fences). Use this exact format:
{
  "strengths": ["1-3 specific things they did well, warm tone"],
  "improvements": ["1-3 constructive suggestions, encouraging tone"],
  "suggestedRewrite": "One improved version of their question",
  "techniques": ["list of techniques used, from: empathy, probing, reframing, clarifying, follow-up, open-ended"]
}

Guidelines:
- Be warm and encouraging, like a patient mentor
- Praise what they did right before suggesting improvements
- Keep each strength/improvement to one sentence
- The suggested rewrite should be noticeably better but achievable
- Only list techniques actually demonstrated in their question`;

/**
 * Get AI-powered feedback on a practice response.
 *
 * @param {string} userQuestion - The user's rewritten question
 * @param {object} scenario - The practice scenario
 * @returns {Promise<{ strengths: string[], improvements: string[], suggestedRewrite: string, techniques: string[] }>}
 */
export async function getAIFeedback(userQuestion, scenario) {
  const userMessage = [
    `Scenario: ${scenario.context}`,
    `Weak question: "${scenario.weakQuestion}"`,
    `Skill category: ${scenario.skillCategory || 'General'}`,
    `Difficulty: ${scenario.difficultyTier || 'intermediate'}`,
    '',
    `Learner's rewritten question: "${sanitizeForPrompt(userQuestion)}"`,
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
    // If Claude didn't return clean JSON, extract what we can
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Could not parse AI feedback');
  }
}
