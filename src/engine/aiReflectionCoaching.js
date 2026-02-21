/**
 * AI Reflection Coaching — Learn Mode
 *
 * Sends the user's reflection + lesson context to Claude for
 * thoughtful coaching feedback on their reflection quality.
 */

import { callClaude, extractText } from '../services/claudeApi';
import { sanitizeForPrompt } from './sanitize';

const SYSTEM_PROMPT = `You are Bisa, a warm and encouraging questioning coach. Your name means "to ask" in Twi/Akan.

A learner has just written a reflection on a lesson about asking better questions. Evaluate their reflection and provide thoughtful coaching feedback.

IMPORTANT: Respond with ONLY valid JSON (no markdown, no code fences). Use this exact format:
{
  "insight": "What this reflection reveals about their understanding (1-2 sentences, warm tone)",
  "deeperQuestion": "A follow-up question to push their thinking further",
  "connection": "How this connects to their questioning practice (1-2 sentences)"
}

Guidelines:
- Be warm and encouraging, like a patient mentor
- The insight should affirm what they understand while noting depth
- The deeper question should be specific to what they wrote, not generic
- The connection should tie their reflection back to practical questioning skills
- Keep each field to 1-2 sentences maximum`;

/**
 * Get AI-powered feedback on a lesson reflection.
 *
 * @param {string} reflection - The user's reflection text
 * @param {object} lesson - The lesson object (title, skillCategory)
 * @returns {Promise<{ insight: string, deeperQuestion: string, connection: string }>}
 */
export async function getAIReflectionFeedback(reflection, lesson) {
  const userMessage = [
    `Lesson: "${lesson.title}"`,
    `Skill category: ${lesson.skillCategory || 'General'}`,
    '',
    `Learner's reflection: "${sanitizeForPrompt(reflection)}"`,
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
    throw new Error('Could not parse AI reflection feedback');
  }
}
