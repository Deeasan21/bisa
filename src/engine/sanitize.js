/**
 * Input sanitization for AI prompts.
 *
 * Strips characters that could break out of quoted prompt context
 * and caps input length to prevent abuse.
 */

export function sanitizeForPrompt(text) {
  if (!text) return '';
  return text
    .replace(/["""\u201C\u201D]/g, "'")   // neutralize smart/straight double quotes
    .replace(/\n{3,}/g, '\n\n')            // collapse excessive newlines
    .slice(0, 2000);                        // hard length cap
}
