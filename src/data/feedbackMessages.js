/**
 * Feedback message variations for the rule-based response scorer.
 * Multiple variations per category to avoid repetitive feedback.
 */

export const FEEDBACK_MESSAGES = {
  noQuestion: [
    'Try turning that into a question.',
    "Remember, you're practicing asking — phrase it as a question!",
    'Good thought, but how would you say that as a question?',
    'That reads more like a statement. Can you rephrase it with a question mark?',
    'Almost there — try framing your response as something you\'d actually ask.',
  ],

  tooShort: [
    "That's very brief. Try adding more context or specificity to your question.",
    'Can you expand on that? A great question usually needs a bit more detail.',
    'Try making your question more specific — what exactly do you want to learn?',
    'Short questions can work, but this one might benefit from more context.',
    'Think about what you really want to know, and add a bit more depth.',
  ],

  closedQuestion: [
    "That's a yes/no question. What if you started with 'How' or 'What' instead?",
    'Closed questions get short answers. Try opening it up.',
    'Good instinct — now try making it open-ended so they\'ll share more.',
    "This will likely get a one-word answer. Try starting with 'What' or 'How' to invite a fuller response.",
    'That question could be answered with just yes or no. How could you reshape it to spark a real conversation?',
  ],

  goodRelevance: [
    'Your question connects well to the situation.',
    "Nice — you're addressing the core of what's happening here.",
    'Good contextual awareness — your question is relevant to the scenario.',
  ],

  lowRelevance: [
    'Try connecting your question more directly to the specific situation described.',
    'Your question is valid, but could be more targeted to this scenario.',
    'Think about the key details in this context — how can your question address them?',
  ],

  techniqueUsed: [
    'Great use of questioning techniques: {techniques}.',
    "You're applying what you've learned! Detected: {techniques}.",
    'Nice technique usage — I noticed {techniques} in your question.',
  ],

  excellent: [
    'Excellent! Your question is open, inviting, and would spark a meaningful conversation.',
    'Outstanding question! This shows real skill in asking.',
    'This is a powerful question — open-ended, empathetic, and specific.',
    "Wow — that's the kind of question that changes conversations.",
    'Beautifully crafted question. This would make anyone feel heard and understood.',
  ],

  good: [
    'Good effort! Your question shows growth. Consider making it even more open-ended.',
    "Solid question! You're on the right track. A small tweak could make it great.",
    "Nice work — you're improving! Think about what would make this question even more powerful.",
    'Good question with room to grow. What would make someone really want to answer this?',
  ],

  decent: [
    "You're on the right track. Try starting with 'What' or 'How' to make it more exploratory.",
    'Getting there! Focus on asking something that invites a story, not just a fact.',
    "Not bad — now think about what you're really curious about and dig deeper.",
    'This is a start. What if you asked about their feelings or experience instead?',
  ],

  needsWork: [
    'Keep practicing! The goal is to transform closed questions into open ones that invite deeper responses.',
    "Don't give up — asking great questions is a skill that improves with practice.",
    'Try approaching this differently. What are you genuinely curious about in this situation?',
    'Think about what would make the other person want to open up and share.',
  ],
};
