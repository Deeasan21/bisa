/**
 * Pattern Recognition Scoring Engine
 *
 * Rule-based scoring for all 5 sub-modes in the Pattern Recognition Hub.
 * Read & React uses a 3-dimension rubric; MC modes use correctness scoring.
 * Pattern Mirror tracks choices without scoring.
 */

// ===== NEED DETECTION KEYWORDS =====

const NEED_KEYWORDS = {
  acknowledgment: ['hear you', 'sounds', 'must be', 'that sucks', 'sorry', 'rough', 'hard', 'tough', 'understand', 'valid', 'makes sense that', 'of course you'],
  reassurance: ['be okay', 'got this', 'normal', "you're not alone", 'makes sense', 'of course', 'totally understandable', "it's okay", 'natural to feel'],
  solution: ['have you tried', 'what if', 'maybe you could', 'one option', 'suggestion', 'could try', 'how about', 'consider'],
  venting: ['tell me more', 'go on', 'vent', 'let it out', 'what happened', 'keep going', "i'm listening"],
  connection: ['me too', "i've been there", 'same', 'relate', 'i get it', 'miss you', 'thinking of you', 'how are you'],
  celebration: ['amazing', 'proud', 'congrats', 'incredible', 'well done', "that's huge", 'awesome', 'so happy for', 'deserve'],
};

const TONE_MATCH_MARKERS = {
  warm: ['love', 'care', 'here for you', 'heart', 'glad', 'appreciate', 'means a lot'],
  empathetic: ['feel', 'sounds like', 'must be', 'imagine', "that's really", 'can see why'],
  calm: ["it's okay", 'take your time', 'no rush', "whenever you're ready", 'breathe'],
  excited: ['!', 'amazing', 'wow', 'so cool', 'incredible', 'lets go', 'yes'],
};

const ACKNOWLEDGE_FIRST_MARKERS = [
  'i hear you', 'that sounds', 'that must', 'i can see', 'i understand',
  "that's", 'wow', 'oh', 'man', 'sorry to hear', 'damn', 'ugh',
  'i get it', 'that really', 'jeez', 'yikes',
];

// ===== READ & REACT SCORING =====

export function scoreReadReact(userResponse, scenario, selectedNeeds) {
  const input = (userResponse || '').trim();
  const lower = input.toLowerCase();
  // Normalize to array for backwards compat
  const needs = Array.isArray(selectedNeeds) ? selectedNeeds : [selectedNeeds];

  if (!input) {
    return { score: 0, dimensions: { read: 0, tone: 0, ack: 0 }, feedback: ['Write a response first.'], needsAIReview: false, needCorrect: false };
  }

  // Check if they tagged the need correctly
  const allNeeds = scenario.allNeeds || [scenario.senderNeed];
  const correctPicks = needs.filter(n => allNeeds.includes(n));
  const wrongPicks = needs.filter(n => !allNeeds.includes(n));
  const needCorrect = correctPicks.length > 0;

  // Dimension 1: READ — did they identify and respond to the need? (1-5)
  const needKeywords = NEED_KEYWORDS[scenario.senderNeed] || [];
  const needMatches = needKeywords.filter(k => lower.includes(k)).length;
  const wrongNeedMatches = Object.entries(NEED_KEYWORDS)
    .filter(([need]) => !(scenario.allNeeds || [scenario.senderNeed]).includes(need))
    .reduce((sum, [, kws]) => sum + kws.filter(k => lower.includes(k)).length, 0);

  let readScore;
  if (needCorrect && needMatches >= 2) readScore = 5;
  else if (needCorrect && needMatches >= 1) readScore = 4;
  else if (needCorrect) readScore = 3;
  else if (needMatches >= 2) readScore = 3;
  else if (needMatches >= 1) readScore = 2;
  else readScore = 1;
  if (wrongNeedMatches >= 3) readScore = Math.max(1, readScore - 1);
  // Multi-select bonus: all picks correct and matched multiple needs
  if (correctPicks.length >= 2 && wrongPicks.length === 0) readScore = Math.min(5, readScore + 1);
  // Penalty: selected wrong needs alongside correct ones
  if (wrongPicks.length > 0) readScore = Math.max(1, readScore - 1);

  // Dimension 2: TONE MATCH — does the energy match? (1-5)
  const allToneHits = Object.values(TONE_MATCH_MARKERS)
    .flat()
    .filter(m => lower.includes(m)).length;
  let toneScore;
  if (allToneHits >= 3) toneScore = 5;
  else if (allToneHits >= 2) toneScore = 4;
  else if (allToneHits >= 1) toneScore = 3;
  else if (input.includes('?')) toneScore = 2;
  else toneScore = 1;

  // Dimension 3: ACKNOWLEDGE FIRST — validate before action? (1-5)
  const firstSentence = input.split(/[.!?]/)[0].toLowerCase();
  const ackInFirst = ACKNOWLEDGE_FIRST_MARKERS.some(m => firstSentence.includes(m));
  const ackAnywhere = ACKNOWLEDGE_FIRST_MARKERS.some(m => lower.includes(m));
  let ackScore;
  if (ackInFirst && needMatches >= 1) ackScore = 5;
  else if (ackInFirst) ackScore = 4;
  else if (ackAnywhere) ackScore = 3;
  else if (input.length > 40) ackScore = 2;
  else ackScore = 1;

  const rawTotal = readScore + toneScore + ackScore; // 3-15
  const normalizedScore = Math.round(((rawTotal - 3) / 12) * 100);

  const feedback = [];
  if (readScore >= 4) feedback.push('You read the underlying need well.');
  else if (readScore <= 2) feedback.push('Try to identify what the person actually needs before responding.');
  if (ackScore >= 4) feedback.push('Nice job acknowledging their feelings first.');
  else if (ackScore <= 2) feedback.push('Start by acknowledging what they feel before anything else.');
  if (toneScore >= 4) feedback.push('Your tone matched the emotional context.');
  else if (toneScore <= 2) feedback.push('Try to match the emotional temperature of the situation.');
  if (!needCorrect) feedback.push(`The primary need here was ${scenario.senderNeed} — your tags were off, but your response may still be solid.`);
  else if (wrongPicks.length > 0) feedback.push(`You correctly spotted ${correctPicks.join(', ')} but ${wrongPicks.join(', ')} wasn't quite right here.`);

  const needsAIReview = normalizedScore >= 30 && normalizedScore <= 75;

  return {
    score: normalizedScore,
    dimensions: { read: readScore, tone: toneScore, ack: ackScore },
    feedback,
    needsAIReview,
    needCorrect,
  };
}

// ===== MULTIPLE-CHOICE SCORING (Subtext, Micro-Expression, Situational) =====

export function scoreMCQuestion(selectedIndex, scenario) {
  const selected = scenario.options[selectedIndex];
  const isCorrect = !!selected?.correct;
  const correctIndex = scenario.options.findIndex(o => o.correct);

  const score = isCorrect ? 100 : 15;

  return {
    score,
    isCorrect,
    selectedIndex,
    correctIndex,
    explanation: scenario.explanation || '',
    cues: scenario.cues || scenario.cueBreakdown || [],
    tip: scenario.confirmationTip || scenario.followUpSuggestion || scenario.idealStrategy || '',
    factorInterplay: scenario.factorInterplay || '',
  };
}

// ===== PATTERN MIRROR (no scoring, tracking only) =====

export function recordPatternChoice(selectedIndex, scenario) {
  const selected = scenario.options[selectedIndex];
  return {
    score: 0,
    selectedPattern: selected.pattern,
    selectedLabel: selected.label,
    text: selected.text,
    worksWhen: selected.worksWhen,
    backfires: selected.backfires || null,
    isMatcher: !!selected.benchmark,
    matcherOption: scenario.options.find(o => o.benchmark) || null,
    allOptions: scenario.options,
  };
}

// ===== SESSION SUMMARY (PRS) =====

export function calculatePRS(sessionResults) {
  const scoredResults = sessionResults.filter(r => r.subMode !== 'pattern_mirror' && r.score > 0);
  if (scoredResults.length === 0) return { prs: 0, breakdown: {}, totalRounds: sessionResults.length };

  const totalScore = scoredResults.reduce((s, r) => s + r.score, 0);
  const prs = Math.round(totalScore / scoredResults.length);

  const breakdown = {};
  for (const r of sessionResults) {
    if (!breakdown[r.subMode]) breakdown[r.subMode] = { total: 0, count: 0, scores: [] };
    breakdown[r.subMode].total += r.score;
    breakdown[r.subMode].count++;
    breakdown[r.subMode].scores.push(r.score);
  }
  for (const key of Object.keys(breakdown)) {
    breakdown[key].average = breakdown[key].count > 0
      ? Math.round(breakdown[key].total / breakdown[key].count) : 0;
  }

  // Find strongest and weakest
  const scoredModes = Object.entries(breakdown).filter(([k]) => k !== 'pattern_mirror');
  let strongest = null;
  let weakest = null;
  for (const [mode, data] of scoredModes) {
    if (data.count > 0) {
      if (!strongest || data.average > strongest.average) strongest = { mode, ...data };
      if (!weakest || data.average < weakest.average) weakest = { mode, ...data };
    }
  }

  return { prs, breakdown, totalRounds: sessionResults.length, strongest, weakest };
}

// ===== GROUNDING PRINCIPLES =====

const PRINCIPLES = [
  "People don't open up to people who fix. They open up to people who listen.",
  "If you're reading the words but missing the tone, you're only getting half the message.",
  "Your default pattern isn't a flaw — it's a tool. The skill is knowing when to use a different one.",
  "When someone says 'it's fine,' the words are a door. The tone tells you whether it's open or closed.",
  "The best communicators don't react faster. They read faster.",
  "Acknowledging first doesn't slow you down. It speeds up trust.",
  "You can't match someone's energy if you haven't identified it first.",
  "A 'right' response at the wrong time is still wrong.",
  "Hesitation isn't always fear. Sometimes it's your instincts telling you to read the room one more time.",
  "Subtext isn't hidden. It's just quieter than the words.",
  "The gap between what someone says and what they mean is where real listening happens.",
  "Body language doesn't lie — but it does whisper. You have to pay attention to hear it.",
  "Context changes everything. The same words mean different things in different rooms.",
  "Most people respond to what was said. The best respond to what was meant.",
  "Power dynamics shape every conversation. Ignoring them doesn't make them disappear.",
  "Reading the room isn't a talent. It's a practice.",
  "The person who asks 'how are you really doing?' changes the entire conversation.",
  "Patterns repeat until you see them. Then you get to choose.",
  "Sometimes the bravest thing you can do is pause before you speak.",
  "Every conversation is two conversations — the one happening out loud, and the one underneath.",
];

export function getRandomPrinciple() {
  return PRINCIPLES[Math.floor(Math.random() * PRINCIPLES.length)];
}
