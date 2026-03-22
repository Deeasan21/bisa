/**
 * AI Defend Question Engine — Practice Mode (Socratic Pushback)
 *
 * After a user rewrites a question and receives AI feedback, they can
 * opt into a "Defend Your Question" challenge. The AI plays a warm
 * Socratic coach, pushing back on their rewrite to encourage deeper
 * metacognition about why their question works.
 */

import { callClaude, extractText } from '../services/claudeApi';
import { sanitizeForPrompt } from './sanitize';

const SYSTEM_PROMPT = `You are Bisa, a warm and thoughtful Socratic questioning coach. Your name means "to ask" in Twi/Akan.

A learner has just rewritten a weak question and received feedback. Now they've opted into the "Defend Your Question" challenge. Your job is to push back gently — not to tear down their work, but to help them think more deeply about WHY their rewrite is effective.

IMPORTANT: Respond with ONLY valid JSON (no markdown, no code fences). Use this exact format:
{
  "challenge": "A Socratic pushback question that asks the learner to explain WHY their rewrite is better than the original, or probes whether their question might have unintended effects. 1-2 sentences, warm but thought-provoking.",
  "followUp": "A deeper probing question to use if they respond well — pushes them to consider edge cases, alternative perspectives, or what the question reveals about their assumptions.",
  "hint": "A one-line hint about what angle to think about when defending their question."
}

Guidelines:
- Stay warm and encouraging — you're a curious mentor, not an adversary
- Challenge them to explain WHY their rewrite is better, not just WHAT they changed
- Ask what would happen if they used the original weak question instead
- Probe whether their question might have unintended effects on the listener
- Consider the scenario context and skill category in your pushback
- Keep the challenge grounded in the specific question they wrote, not generic
- The hint should nudge without giving the answer away`;

/**
 * Get a Socratic pushback challenge for the user's rewritten question.
 *
 * @param {string} userQuestion - The user's rewritten question
 * @param {object} scenario - { context, weakQuestion, skillCategory, difficultyTier }
 * @param {object} aiResult - The existing AI feedback { strengths, improvements, suggestedRewrite }
 * @returns {Promise<{ challenge: string, followUp: string, hint: string }>}
 */
export async function getDefendChallenge(userQuestion, scenario, aiResult) {
  const userMessage = [
    `Scenario: ${sanitizeForPrompt(scenario.context)}`,
    `Original weak question: "${sanitizeForPrompt(scenario.weakQuestion)}"`,
    `Skill category: ${scenario.skillCategory || 'General'}`,
    `Difficulty: ${scenario.difficultyTier || 'intermediate'}`,
    '',
    `Learner's rewritten question: "${sanitizeForPrompt(userQuestion)}"`,
    '',
    `Previous feedback strengths: ${(aiResult.strengths || []).join('; ')}`,
    `Previous feedback improvements: ${(aiResult.improvements || []).join('; ')}`,
    `Suggested rewrite from feedback: "${sanitizeForPrompt(aiResult.suggestedRewrite || '')}"`,
    '',
    'Now challenge the learner to DEFEND why their rewrite is effective. Be Socratic — make them think.',
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
    // If Claude didn't return clean JSON, extract what we can
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Could not parse AI defend challenge response');
  }
}
