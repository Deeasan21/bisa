/**
 * Question Burst Challenge Scenarios
 *
 * 20 scenarios for the Daily Challenge "Question Burst" mode.
 * Each scenario gives a character + situation that the user asks questions about.
 */

export const BURST_CHALLENGES = [
  // ===== EMPATHY (5) =====
  {
    id: 1,
    character: "Maya",
    role: "Your close friend",
    situation: "Maya just told you she's been passed over for a promotion she worked toward for two years. She seems calm on the surface but you can tell she's hurt.",
    context: "workplace disappointment career growth overlooked unfair promotion emotions frustration",
    skillCategory: "Empathy",
    difficultyTier: "beginner",
    keywords: ['feel', 'promotion', 'disappointed', 'unfair', 'experience', 'frustrating', 'hurt', 'next'],
  },
  {
    id: 2,
    character: "David",
    role: "Your neighbor",
    situation: "David's teenage son was caught shoplifting. He's telling you about it at a neighborhood gathering, clearly embarrassed and unsure what to do as a parent.",
    context: "parenting teenager shoplifting embarrassment discipline trust worried father",
    skillCategory: "Empathy",
    difficultyTier: "intermediate",
    keywords: ['son', 'feel', 'parenting', 'trust', 'worried', 'happened', 'talk', 'discipline'],
  },
  {
    id: 3,
    character: "Priya",
    role: "A colleague",
    situation: "Priya just returned from bereavement leave after losing her mother. She's at her desk trying to work but seems distracted and withdrawn.",
    context: "grief loss bereavement mother work returning struggling emotional support",
    skillCategory: "Empathy",
    difficultyTier: "intermediate",
    keywords: ['feel', 'loss', 'mother', 'support', 'need', 'going through', 'help', 'difficult'],
  },
  {
    id: 4,
    character: "Andre",
    role: "Your team member",
    situation: "Andre confided that he's been having panic attacks before presentations. He's never told anyone at work and seems vulnerable sharing this.",
    context: "anxiety panic attacks presentations vulnerability mental health workplace fear",
    skillCategory: "Empathy",
    difficultyTier: "advanced",
    keywords: ['feel', 'anxiety', 'presentations', 'panic', 'support', 'experience', 'trigger', 'help'],
  },
  {
    id: 5,
    character: "Lin",
    role: "Your friend's partner",
    situation: "Lin mentions over dinner that they've been feeling invisible at work—no one acknowledges their contributions. They laugh it off, but the hurt is clear.",
    context: "feeling invisible unrecognized contributions work self-worth frustration",
    skillCategory: "Empathy",
    difficultyTier: "beginner",
    keywords: ['feel', 'invisible', 'contributions', 'recognized', 'frustrating', 'experience', 'work', 'valued'],
  },

  // ===== PROBING (4) =====
  {
    id: 6,
    character: "Sarah",
    role: "Product manager at your company",
    situation: "Sarah says the new feature isn't working and wants to scrap it. But usage data is mixed—some metrics are up, others down. She seems rushed to a decision.",
    context: "product decision data metrics feature rushed judgment analysis stakeholders",
    skillCategory: "Probing",
    difficultyTier: "intermediate",
    keywords: ['data', 'decision', 'metrics', 'why', 'evidence', 'considered', 'users', 'underlying'],
  },
  {
    id: 7,
    character: "Marcus",
    role: "Your mentee",
    situation: "Marcus says he wants to quit his job and start a business. He's excited but vague on details. He's asking for your blessing more than your advice.",
    context: "career change entrepreneurship risk planning preparation motivation business idea",
    skillCategory: "Probing",
    difficultyTier: "beginner",
    keywords: ['business', 'plan', 'why', 'prepared', 'risk', 'idea', 'income', 'what drives'],
  },
  {
    id: 8,
    character: "Dr. Chen",
    role: "Your doctor",
    situation: "Dr. Chen recommends a surgery but glosses over the alternatives quickly. You want to understand your full range of options before deciding.",
    context: "medical decision surgery alternatives risks options informed consent",
    skillCategory: "Probing",
    difficultyTier: "advanced",
    keywords: ['alternatives', 'risks', 'options', 'why', 'outcomes', 'recovery', 'success rate', 'consider'],
  },
  {
    id: 9,
    character: "Tomas",
    role: "Team lead in another department",
    situation: "Tomas claims his team can't collaborate with yours because of 'process differences.' But you suspect there's an interpersonal conflict underneath.",
    context: "collaboration conflict departments process interpersonal tension underlying issues",
    skillCategory: "Probing",
    difficultyTier: "intermediate",
    keywords: ['process', 'conflict', 'underlying', 'specific', 'happened', 'between', 'root', 'example'],
  },

  // ===== CLARIFYING (3) =====
  {
    id: 10,
    character: "Aisha",
    role: "Client",
    situation: "Aisha says she's 'not happy with the direction of the project.' She hasn't given specifics and the deadline is next week.",
    context: "client feedback vague dissatisfaction project direction specifics expectations",
    skillCategory: "Clarifying",
    difficultyTier: "beginner",
    keywords: ['direction', 'specifically', 'expect', 'mean', 'example', 'vision', 'change', 'happy'],
  },
  {
    id: 11,
    character: "Coach Rivera",
    role: "Your child's soccer coach",
    situation: "Coach Rivera says your child 'needs to work on their attitude.' You're not sure what specific behaviors they're referring to.",
    context: "child behavior attitude sports coaching specifics feedback parenting",
    skillCategory: "Clarifying",
    difficultyTier: "beginner",
    keywords: ['attitude', 'specifically', 'behavior', 'example', 'mean', 'noticed', 'situation', 'improve'],
  },
  {
    id: 12,
    character: "Jordan",
    role: "New hire on your team",
    situation: "Jordan keeps saying they 'get it' when you explain tasks, but their work suggests otherwise. You need to figure out what's being lost in translation.",
    context: "miscommunication onboarding understanding gap training new employee confusion",
    skillCategory: "Clarifying",
    difficultyTier: "intermediate",
    keywords: ['understand', 'explain', 'mean', 'specifically', 'walk me through', 'confusing', 'part', 'example'],
  },

  // ===== OPEN VS. CLOSED (3) =====
  {
    id: 13,
    character: "Elena",
    role: "Your significant other",
    situation: "Elena comes home looking stressed and says 'work was fine' when you ask. You want to have a real conversation about how she's actually doing.",
    context: "relationship communication stress deflecting fine partner emotional opening up",
    skillCategory: "Open vs. Closed",
    difficultyTier: "beginner",
    keywords: ['feel', 'work', 'stressful', 'happened', 'tell me', 'energy', 'experience', 'day'],
  },
  {
    id: 14,
    character: "Kai",
    role: "A high school student you're tutoring",
    situation: "Kai is failing math but says they 'don't care.' You suspect there's more going on—maybe they're frustrated or lost confidence.",
    context: "education motivation struggling student confidence frustration giving up tutoring",
    skillCategory: "Open vs. Closed",
    difficultyTier: "intermediate",
    keywords: ['math', 'feel', 'frustrating', 'happened', 'difficult', 'confidence', 'help', 'experience'],
  },
  {
    id: 15,
    character: "Ravi",
    role: "Your project stakeholder",
    situation: "Ravi approved the budget but keeps adding last-minute requests. You need to understand what's driving the scope creep without being confrontational.",
    context: "scope creep stakeholder budget requests priorities project management expectations",
    skillCategory: "Open vs. Closed",
    difficultyTier: "advanced",
    keywords: ['priorities', 'requests', 'important', 'driving', 'vision', 'expect', 'outcome', 'change'],
  },

  // ===== FOLLOW-UP (3) =====
  {
    id: 16,
    character: "Nadia",
    role: "Your direct report",
    situation: "Nadia mentions she's thinking about going back to school. She brought it up casually, but it could affect your team's staffing.",
    context: "career development education direct report team impact motivation growth",
    skillCategory: "Follow-up",
    difficultyTier: "beginner",
    keywords: ['school', 'thinking', 'motivating', 'timeline', 'program', 'career', 'goals', 'what sparked'],
  },
  {
    id: 17,
    character: "Officer Diaz",
    role: "Community police liaison",
    situation: "Officer Diaz is at a community meeting explaining a new policing policy. Residents seem confused and some are skeptical. You want to understand the details.",
    context: "policy community meeting police public trust transparency accountability",
    skillCategory: "Follow-up",
    difficultyTier: "intermediate",
    keywords: ['policy', 'means', 'impact', 'community', 'specifically', 'implemented', 'accountability', 'concern'],
  },
  {
    id: 18,
    character: "Fatima",
    role: "Co-founder at your startup",
    situation: "Fatima wants to pivot the product strategy based on one conversation with an investor. You think she might be overreacting but want to dig deeper first.",
    context: "startup pivot strategy investor feedback reaction decision co-founder",
    skillCategory: "Follow-up",
    difficultyTier: "advanced",
    keywords: ['investor', 'feedback', 'strategy', 'specifically', 'pivot', 'evidence', 'data', 'concerned'],
  },

  // ===== LEADERSHIP (2) =====
  {
    id: 19,
    character: "Team",
    role: "Your cross-functional team (5 people)",
    situation: "Your team just missed a major deadline and morale is low. In the retrospective meeting, people are blaming each other. You need to turn this around.",
    context: "team conflict deadline missed morale blame retrospective leadership accountability",
    skillCategory: "Leadership",
    difficultyTier: "intermediate",
    keywords: ['happened', 'learn', 'responsibility', 'prevent', 'challenges', 'support', 'improve', 'together'],
  },
  {
    id: 20,
    character: "Alex",
    role: "Senior engineer who's been resistant to change",
    situation: "Alex openly pushes back on a new process you've introduced. Others are watching to see how you handle it. Alex has valid experience but the tone is combative.",
    context: "resistance change management senior engineer leadership authority respect pushback",
    skillCategory: "Leadership",
    difficultyTier: "advanced",
    keywords: ['concern', 'perspective', 'experience', 'specifically', 'process', 'suggest', 'improve', 'better'],
  },
];

/**
 * Get today's burst challenge using day-of-year rotation.
 */
export function getTodaysBurst() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const index = dayOfYear % BURST_CHALLENGES.length;
  return { ...BURST_CHALLENGES[index], index };
}
