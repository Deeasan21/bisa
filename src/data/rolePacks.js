/**
 * Professional Role Packs for Simulate Mode
 *
 * TODO: Claude Code — Build out these 4 role packs with 3 full scenarios each.
 * Each scenario must match the SIMULATIONS structure in src/data/simulations.js:
 *
 * {
 *   id: number (start at 16, existing sims use 1-15),
 *   title: string,
 *   label: string (e.g. "Manager Scenario"),
 *   skillCategory: string,
 *   difficultyTier: "beginner" | "intermediate" | "advanced" | "expert",
 *   pack: string (one of: "manager", "sales", "interview", "conversations"),
 *   context: string (1-2 sentence setup),
 *   opening: string (NPC's first line),
 *   nodes: {
 *     start: { speaker, text, choices: [{ text, next, quality }] },
 *     ...intermediate nodes (4-6 per scenario)...,
 *     ending_great: { speaker, text, isEnding: true, summary },
 *     ending_medium: { speaker, text, isEnding: true, summary },
 *     ending_poor: { speaker, text, isEnding: true, summary },
 *   }
 * }
 *
 * PACK 1: Manager 1-on-1s (pack: "manager")
 * - Scenario 16: "The Quiet Performer" — A top performer who's gone silent in meetings.
 *   Speaker: "Alex". Skills: Empathy + Probing. Tier: beginner.
 * - Scenario 17: "The Promotion Ask" — Direct report asks for a promotion they're not ready for.
 *   Speaker: "Morgan". Skills: Framing. Tier: intermediate.
 * - Scenario 18: "The Team Conflict" — Two team members can't work together, you're mediating.
 *   Speaker: "Sam" (then "Riley" referenced). Skills: Clarifying. Tier: advanced.
 *
 * PACK 2: Sales Discovery (pack: "sales")
 * - Scenario 19: "The Budget Blocker" — Prospect loves the product but says budget is locked.
 *   Speaker: "Dana". Skills: Probing. Tier: beginner.
 * - Scenario 20: "The Silent Stakeholder" — Key decision-maker barely talks in the demo.
 *   Speaker: "Pat". Skills: Open vs. Closed. Tier: intermediate.
 * - Scenario 21: "The Competitor Objection" — Prospect says they're happy with current vendor.
 *   Speaker: "Chris". Skills: Framing. Tier: advanced.
 *
 * PACK 3: Job Interviews (pack: "interview")
 * - Scenario 22: "The Panel Interview" — Facing 3 interviewers, need to ask smart questions.
 *   Speaker: "Interviewer". Skills: Probing. Tier: beginner.
 * - Scenario 23: "The Culture Fit" — Interviewer asks vague "tell me about yourself" questions.
 *   Speaker: "Hiring Manager". Skills: Clarifying. Tier: intermediate.
 * - Scenario 24: "The Salary Negotiation" — You got the offer, now negotiate compensation.
 *   Speaker: "HR Director". Skills: Framing. Tier: advanced.
 *
 * PACK 4: Difficult Conversations (pack: "conversations")
 * - Scenario 25: "The Broken Promise" — A friend promised to help you move but bailed last minute.
 *   Speaker: "Jamie". Skills: Empathy. Tier: beginner.
 * - Scenario 26: "The Boundary Setting" — Family member keeps giving unsolicited life advice.
 *   Speaker: "Mom/Dad". Skills: Framing. Tier: intermediate.
 * - Scenario 27: "The Accountability Talk" — Roommate hasn't paid their share of bills for 2 months.
 *   Speaker: "Taylor". Skills: Clarifying. Tier: advanced.
 *
 * WIRING INSTRUCTIONS:
 * After building the scenarios above, wire them into the app:
 *
 * 1. In src/data/simulations.js — import ROLE_PACKS and spread into SIMULATIONS:
 *    import { ROLE_PACKS } from './rolePacks';
 *    // At the end of the array, add: ...ROLE_PACKS
 *
 * 2. In src/components/modes/SimulateMode.jsx — add pack filter tabs above category chips:
 *    - "All Scenarios" (default), "Manager 1-on-1s", "Sales Discovery",
 *      "Job Interviews", "Difficult Conversations"
 *    - Each pack tab filters by sim.pack field
 *    - Style: slightly larger than category chips, with pack-specific colors:
 *      manager: #6366F1 (indigo), sales: #10B981 (emerald),
 *      interview: #F59E0B (amber), conversations: #EC4899 (pink)
 *    - Update the ModeHeader subtitle to show filtered count
 *
 * 3. Each scenario needs 4-6 intermediate nodes with 3-5 choices each.
 *    Choices should have a mix of quality ratings (great, good, medium, poor).
 *    Branching should feel natural — bad questions close people off,
 *    great questions open deeper conversation.
 *
 * 4. Conversation tone guide:
 *    - Manager pack: professional but human, realistic workplace dynamics
 *    - Sales pack: prospect is skeptical but fair, reward curiosity over pitching
 *    - Interview pack: formal but approachable, reward preparation and genuine interest
 *    - Conversations pack: emotionally charged, reward vulnerability and active listening
 */

// Placeholder — replace with full scenario objects following the spec above
export const ROLE_PACKS = [];

export const PACK_META = {
  manager: {
    name: 'Manager 1-on-1s',
    color: '#6366F1',
    icon: 'UsersThree', // Phosphor icon name
    description: 'Practice crucial management conversations',
  },
  sales: {
    name: 'Sales Discovery',
    color: '#10B981',
    icon: 'Handshake',
    description: 'Master the art of discovery calls',
  },
  interview: {
    name: 'Job Interviews',
    color: '#F59E0B',
    icon: 'Briefcase',
    description: 'Ask the questions that land the job',
  },
  conversations: {
    name: 'Difficult Conversations',
    color: '#EC4899',
    icon: 'ChatTeardropDots',
    description: 'Navigate tough personal conversations',
  },
};
