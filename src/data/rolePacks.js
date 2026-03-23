// Professional Role Packs for Simulate Mode
// IDs start at 101 to avoid collision with SIMULATIONS

export const ROLE_PACKS = [

  // ─────────────────────────────────────────
  // PACK 1: Manager 1-on-1s
  // ─────────────────────────────────────────

  {
    id: 101,
    title: "The Tough Performance Review",
    label: "Manager 1-on-1",
    pack: "manager-1on1s",
    skillCategory: "Feedback",
    difficultyTier: "intermediate",
    context: "You're meeting with Marcus, a solid mid-level employee whose performance has slipped noticeably over the past quarter. This is his annual review. He doesn't know it's coming.",
    opening: "Hey, thanks for making time. Am I in trouble?",
    nodes: {
      start: {
        speaker: "Marcus",
        text: "Hey, thanks for making time. Am I in trouble?",
        choices: [
          { text: "Not at all — I just wanted to catch up on how things are going.", next: "deflect", quality: "poor" },
          { text: "I want to have an honest conversation about the past quarter. Can we dig into that together?", next: "direct_open", quality: "great" },
          { text: "We're doing your review today. There are some things I want to walk through.", next: "formal_open", quality: "good" },
          { text: "Let's start with how you feel things have been going before I share my perspective.", next: "self_assess", quality: "great" },
        ]
      },
      deflect: {
        speaker: "Marcus",
        text: "Okay... so what did you want to catch up on?",
        choices: [
          { text: "Well, I have noticed a few things I want to discuss. Your output has been lower lately.", next: "direct_open", quality: "good" },
          { text: "Before I share anything, how do you feel the last quarter went?", next: "self_assess", quality: "great" },
        ]
      },
      self_assess: {
        speaker: "Marcus",
        text: "Honestly? Not my best. I feel like I've been off. Scattered. I'm not sure why.",
        choices: [
          { text: "That matches what I've seen. Tell me more about what 'scattered' feels like.", next: "explore_cause", quality: "great" },
          { text: "Yeah, I've noticed too. What do you think is causing it?", next: "explore_cause", quality: "great" },
          { text: "Good that you're aware. What are you going to do about it?", next: "pressure", quality: "medium" },
          { text: "I'm glad you said that. Let's look at specific examples together.", next: "specific_feedback", quality: "good" },
        ]
      },
      direct_open: {
        speaker: "Marcus",
        text: "Yeah... I figured it might come up. What did you notice?",
        choices: [
          { text: "Three deadlines slipped in Q3, and two clients flagged concerns. I want to understand why.", next: "specific_feedback", quality: "great" },
          { text: "Your output hasn't been at the level we need. I need you to step it up.", next: "pressure", quality: "poor" },
          { text: "Before I get into specifics — how do you see it from your side?", next: "explore_cause", quality: "great" },
          { text: "There have been some missed targets. I want to talk through them one by one.", next: "specific_feedback", quality: "good" },
        ]
      },
      formal_open: {
        speaker: "Marcus",
        text: "A review. Okay. I figured something was up.",
        choices: [
          { text: "Let's start with what's working before we get to the harder stuff.", next: "explore_cause", quality: "good" },
          { text: "How do you feel the quarter went — be honest.", next: "self_assess", quality: "great" },
          { text: "Your numbers are down. I want to understand what's driving it.", next: "specific_feedback", quality: "good" },
        ]
      },
      explore_cause: {
        speaker: "Marcus",
        text: "It's... I've had some personal stuff going on. Nothing I want to get into, but it's affected me.",
        choices: [
          { text: "You don't have to share details. What would help you get back on track?", next: "support", quality: "great" },
          { text: "I understand. But we still need to address the work impact.", next: "specific_feedback", quality: "good" },
          { text: "Personal stuff has to stay separate from work. I need you at 100%.", next: "pressure", quality: "poor" },
          { text: "Thank you for telling me that. I want to support you — what would make this easier?", next: "support", quality: "great" },
        ]
      },
      specific_feedback: {
        speaker: "Marcus",
        text: "Fair. The Hendricks account was on me. And the Delacroix deadline — I underestimated the scope.",
        choices: [
          { text: "I appreciate you owning that. What would you do differently going forward?", next: "forward_plan", quality: "great" },
          { text: "Yes, those were the main ones. What caused the scope issue?", next: "forward_plan", quality: "good" },
          { text: "That's twice in one quarter. This is a pattern I need to see change.", next: "pressure", quality: "medium" },
        ]
      },
      pressure: {
        speaker: "Marcus",
        text: "I hear you. I'll try harder.",
        choices: [
          { text: "'Try harder' isn't specific enough. What exactly will you change?", next: "forward_plan", quality: "good" },
          { text: "I don't want you to just try harder — I want us to make a real plan.", next: "forward_plan", quality: "great" },
        ]
      },
      support: {
        speaker: "Marcus",
        text: "Honestly, just knowing you're not about to fire me helps. I can work with honesty.",
        choices: [
          { text: "You're not going anywhere. Let's build a 30-day plan together.", next: "forward_plan", quality: "great" },
          { text: "Good. Let's be specific about what success looks like next quarter.", next: "forward_plan", quality: "good" },
        ]
      },
      forward_plan: {
        speaker: "Marcus",
        text: "I'd like that. What would you need to see from me?",
        choices: [
          { text: "Let's co-create it. What are two things you think you can commit to this month?", next: "ending_great", quality: "great" },
          { text: "Three things: weekly check-ins, scope sign-offs before starting, and flagging issues early.", next: "ending_medium", quality: "good" },
          { text: "Hit your deadlines. That's the baseline.", next: "ending_poor", quality: "medium" },
        ]
      },
      ending_great: {
        speaker: "Marcus",
        text: "That feels right. I actually feel better going into next quarter now.",
        isEnding: true,
        summary: "You balanced honesty with support, invited self-reflection, and built a plan together. Marcus left the meeting feeling accountable and motivated."
      },
      ending_medium: {
        speaker: "Marcus",
        text: "Got it. I'll make sure those happen.",
        isEnding: true,
        summary: "The feedback landed but felt top-down. Setting expectations collaboratively tends to create more ownership — next time, ask what Marcus would commit to first."
      },
      ending_poor: {
        speaker: "Marcus",
        text: "Sure. I'll do my best.",
        isEnding: true,
        summary: "The conversation stayed surface-level. Without exploring causes or co-creating a plan, Marcus left without clarity or real accountability."
      }
    }
  },

  {
    id: 102,
    title: "Career Development: What's Next?",
    label: "Manager 1-on-1",
    pack: "manager-1on1s",
    skillCategory: "Probing",
    difficultyTier: "beginner",
    context: "Priya, a high-performing analyst on your team, has requested a career conversation. She's been with the company for two years and recently told a colleague she feels 'stuck'. She hasn't said this to you directly.",
    opening: "I've been wanting to have this conversation for a while. I guess I just... want to know where I'm going.",
    nodes: {
      start: {
        speaker: "Priya",
        text: "I've been wanting to have this conversation for a while. I guess I just... want to know where I'm going.",
        choices: [
          { text: "Where do you want to go?", next: "vision_explore", quality: "great" },
          { text: "Well, there are a few paths that could open up in the next year.", next: "paths_first", quality: "poor" },
          { text: "Tell me more — what does 'where you're going' mean to you?", next: "vision_explore", quality: "great" },
          { text: "I'm glad you brought this up. What would feel like progress to you?", next: "vision_explore", quality: "great" },
        ]
      },
      paths_first: {
        speaker: "Priya",
        text: "Yeah, okay... I guess that's helpful. But I'm not sure any of those feel right.",
        choices: [
          { text: "What would feel right? Help me understand what you're looking for.", next: "vision_explore", quality: "great" },
          { text: "What about them doesn't feel right?", next: "vision_explore", quality: "good" },
        ]
      },
      vision_explore: {
        speaker: "Priya",
        text: "Honestly? I've been doing the same work for two years. I love the team. But I feel like I'm not growing.",
        choices: [
          { text: "What does growth feel like to you?", next: "growth_define", quality: "great" },
          { text: "Have you taken on any stretch projects?", next: "stretch_check", quality: "medium" },
          { text: "That's important feedback. What specifically feels like it's missing?", next: "growth_define", quality: "great" },
          { text: "Feeling stagnant after two years is normal. It usually means you're ready for a new challenge.", next: "stretch_check", quality: "medium" },
        ]
      },
      stretch_check: {
        speaker: "Priya",
        text: "I've done what's been asked. But I don't feel like I'm being challenged or trusted with bigger things.",
        choices: [
          { text: "What would 'bigger things' look like to you?", next: "growth_define", quality: "great" },
          { text: "Is there a specific project or type of work you've been eyeing?", next: "growth_define", quality: "good" },
        ]
      },
      growth_define: {
        speaker: "Priya",
        text: "I want to lead something. A project, a team, something. I want people to trust me with responsibility.",
        choices: [
          { text: "What's stopping you from stepping into that now?", next: "blockers", quality: "great" },
          { text: "I can see that in you. What kind of project would be the right one to start with?", next: "blockers", quality: "good" },
          { text: "We might have something coming up. Let me think about what's possible.", next: "vague_promise", quality: "poor" },
          { text: "That's really clear. What would it mean to you personally to lead something?", next: "blockers", quality: "great" },
        ]
      },
      blockers: {
        speaker: "Priya",
        text: "Honestly? I think I haven't been visible enough. I do the work but I don't always speak up in meetings.",
        choices: [
          { text: "That's really self-aware. What would help you be more visible?", next: "action_plan", quality: "great" },
          { text: "What holds you back from speaking up?", next: "action_plan", quality: "great" },
          { text: "I've noticed that too. You should speak up more.", next: "vague_promise", quality: "medium" },
        ]
      },
      vague_promise: {
        speaker: "Priya",
        text: "Okay... I'm not sure what to do with that.",
        choices: [
          { text: "Let me be more specific. What if we created a 90-day plan together?", next: "action_plan", quality: "great" },
          { text: "Let's think about concrete steps. What's one thing you could do differently next week?", next: "action_plan", quality: "good" },
        ]
      },
      action_plan: {
        speaker: "Priya",
        text: "A plan would actually really help. I don't want to feel like this conversation goes nowhere.",
        choices: [
          { text: "Let's make sure it doesn't. What's the one thing that would make the biggest difference?", next: "ending_great", quality: "great" },
          { text: "Agreed. I'll own finding you a stretch opportunity. You own showing up in meetings. Deal?", next: "ending_great", quality: "great" },
          { text: "I'll look at what's available and get back to you.", next: "ending_medium", quality: "medium" },
        ]
      },
      ending_great: {
        speaker: "Priya",
        text: "Yes. This is what I needed. I feel like you actually see me now.",
        isEnding: true,
        summary: "You led with curiosity, helped Priya articulate her own vision, and co-created a plan. She left feeling seen and supported."
      },
      ending_medium: {
        speaker: "Priya",
        text: "Okay. I'll wait to hear from you.",
        isEnding: true,
        summary: "The conversation was helpful but ended without clear commitments. Following up quickly is essential — vague promises erode trust."
      },
      ending_poor: {
        speaker: "Priya",
        text: "Okay. Thanks.",
        isEnding: true,
        summary: "The conversation stayed too high-level. Priya came in with real concerns and left without clarity. Deep questions early would have opened more."
      }
    }
  },

  {
    id: 103,
    title: "The Chronic Underperformer",
    label: "Manager 1-on-1",
    pack: "manager-1on1s",
    skillCategory: "Clarity",
    difficultyTier: "advanced",
    context: "Derek T. has been on your team for 18 months. He's consistently missed targets, deflects feedback, and blames teammates. You've had informal chats but nothing has changed. This conversation needs to be clear and documented.",
    opening: "You wanted to see me? Is this about the Morrison project?",
    nodes: {
      start: {
        speaker: "Derek T.",
        text: "You wanted to see me? Is this about the Morrison project?",
        choices: [
          { text: "It's about a broader pattern I want to discuss. Can we start there?", next: "pattern_intro", quality: "great" },
          { text: "Partially, yes. But it's bigger than that. I want to have a direct conversation.", next: "pattern_intro", quality: "good" },
          { text: "Yes. And a few other things. How do you think Morrison went?", next: "self_assess", quality: "good" },
          { text: "I'll just get to it — I'm concerned about your performance overall.", next: "direct_concern", quality: "good" },
        ]
      },
      self_assess: {
        speaker: "Derek T.",
        text: "Morrison was rough. But honestly, the brief was unclear and Jess kept changing requirements.",
        choices: [
          { text: "I hear you. How much of it was outside your control?", next: "accountability_probe", quality: "good" },
          { text: "I've heard that a few times. Let me share what I observed on my end.", next: "direct_concern", quality: "good" },
          { text: "That's not how Jess describes it. I want to focus on what you can control.", next: "direct_concern", quality: "good" },
          { text: "It's always something external. I want to talk about your ownership of outcomes.", next: "accountability_probe", quality: "great" },
        ]
      },
      accountability_probe: {
        speaker: "Derek T.",
        text: "I mean... I could have pushed back earlier, I guess.",
        choices: [
          { text: "Yes. And there have been similar patterns in other projects. Can we look at those?", next: "pattern_intro", quality: "great" },
          { text: "That's a start. What would that have looked like?", next: "pattern_intro", quality: "good" },
        ]
      },
      pattern_intro: {
        speaker: "Derek T.",
        text: "What kind of pattern? I feel like I'm being singled out here.",
        choices: [
          { text: "I'm not singling you out — I'm giving you specific, documented feedback. Here's what I've observed.", next: "specific_examples", quality: "great" },
          { text: "You're not being singled out. This is about helping you succeed. Let me share what I've tracked.", next: "specific_examples", quality: "great" },
          { text: "It's not about singling out. Three missed targets in six months is a pattern.", next: "specific_examples", quality: "good" },
          { text: "I understand it feels that way. I'd feel defensive too. But we need to address this.", next: "specific_examples", quality: "good" },
        ]
      },
      direct_concern: {
        speaker: "Derek T.",
        text: "Overall performance? I've been dealing with a lot of blockers I haven't been supported on.",
        choices: [
          { text: "Tell me about those blockers. I want to understand what support you needed.", next: "blockers_probe", quality: "good" },
          { text: "Let's separate blockers from ownership. I can own the support piece — but I want to focus on what's in your control.", next: "specific_examples", quality: "great" },
          { text: "What blockers? This is the first I'm hearing of them.", next: "specific_examples", quality: "medium" },
        ]
      },
      blockers_probe: {
        speaker: "Derek T.",
        text: "Things like unclear specs, teammates not delivering, tools that don't work...",
        choices: [
          { text: "Some of those are real issues. But I want to separate them from what you can control. Can we do that?", next: "specific_examples", quality: "great" },
          { text: "I hear that. And I want to address those. But I also need to be honest: the pattern goes beyond blockers.", next: "specific_examples", quality: "good" },
        ]
      },
      specific_examples: {
        speaker: "Derek T.",
        text: "Okay. Fine. What are the specific examples?",
        choices: [
          { text: "Three missed deadlines in Q2–Q3, two instances of incomplete deliverables, and feedback from two cross-functional partners about responsiveness.", next: "reaction", quality: "great" },
          { text: "Your Q2 report was two weeks late, the Q3 analysis had gaps the client flagged, and two partners have raised responsiveness concerns.", next: "reaction", quality: "great" },
          { text: "Your delivery has been late and your collaboration scores are low.", next: "vague_pressure", quality: "medium" },
        ]
      },
      vague_pressure: {
        speaker: "Derek T.",
        text: "Collaboration scores? What does that even mean?",
        choices: [
          { text: "Let me be more specific. Two team members flagged communication issues. Here are the instances.", next: "reaction", quality: "good" },
        ]
      },
      reaction: {
        speaker: "Derek T.",
        text: "That's... I didn't realize it looked that bad from the outside.",
        choices: [
          { text: "I'm sharing this because I want you to succeed here. What's your reaction to seeing it laid out?", next: "path_forward", quality: "great" },
          { text: "I need it to change. What do you think is getting in the way?", next: "path_forward", quality: "good" },
          { text: "It does. And if things don't improve, I have to be honest — this becomes a formal process.", next: "path_forward", quality: "good" },
        ]
      },
      path_forward: {
        speaker: "Derek T.",
        text: "What happens if I can't turn this around?",
        choices: [
          { text: "Then we'd move to a formal performance plan — and potentially further steps. I don't want that. I want to help you succeed.", next: "ending_great", quality: "great" },
          { text: "That's a fair question. I'd rather answer it by building a plan together. Are you open to that?", next: "ending_great", quality: "great" },
          { text: "We'd have to have a harder conversation. But let's focus on what you can do differently.", next: "ending_medium", quality: "good" },
          { text: "That's not where I want to go. Step it up.", next: "ending_poor", quality: "poor" },
        ]
      },
      ending_great: {
        speaker: "Derek T.",
        text: "Okay. I think I needed to hear this clearly. I didn't realize how it was landing.",
        isEnding: true,
        summary: "You delivered hard feedback with specifics, invited accountability without blame, and gave clarity on consequences. Derek has a real shot at turning it around."
      },
      ending_medium: {
        speaker: "Derek T.",
        text: "Alright. I'll see what I can do.",
        isEnding: true,
        summary: "The message landed but felt incomplete. Without co-creating a clear plan, 'I'll see what I can do' is unlikely to lead to change. Specificity is everything here."
      },
      ending_poor: {
        speaker: "Derek T.",
        text: "Got it.",
        isEnding: true,
        summary: "The conversation lacked specifics and felt punitive rather than coaching-oriented. Without clear examples and a plan, Derek has no roadmap to improve."
      }
    }
  },

  // ─────────────────────────────────────────
  // PACK 2: Sales Discovery
  // ─────────────────────────────────────────

  {
    id: 201,
    title: "Qualifying the Lead",
    label: "Sales Discovery",
    pack: "sales-discovery",
    skillCategory: "Probing",
    difficultyTier: "beginner",
    context: "You're on a first discovery call with Rachel Chen, VP of Operations at a mid-size logistics company. She responded to an outbound email but hasn't given much away. You need to understand if there's a real opportunity here.",
    opening: "Thanks for reaching out. I have about 20 minutes. What did you want to cover?",
    nodes: {
      start: {
        speaker: "Rachel",
        text: "Thanks for reaching out. I have about 20 minutes. What did you want to cover?",
        choices: [
          { text: "I appreciate the time. Rather than pitch first, can I ask what caught your eye in our email?", next: "interest_probe", quality: "great" },
          { text: "I'll keep it focused. We help ops teams reduce manual process time — wanted to see if that's relevant for you.", next: "pain_probe", quality: "good" },
          { text: "Great. Let me walk you through what we do — then we can see if it's a fit.", next: "pitch_first", quality: "poor" },
          { text: "I'd love to understand your world first. What's top of mind for you in ops right now?", next: "pain_probe", quality: "great" },
        ]
      },
      pitch_first: {
        speaker: "Rachel",
        text: "Okay... I'll stop you — I've seen a lot of products like this. What makes you different?",
        choices: [
          { text: "Fair point. Before I answer that, can I understand what you're actually trying to solve? That way I can give you a real answer.", next: "pain_probe", quality: "great" },
          { text: "Great question. We're different because we integrate directly with your existing systems and...", next: "pitch_trap", quality: "poor" },
        ]
      },
      pitch_trap: {
        speaker: "Rachel",
        text: "Hmm. We already have a tool for that. I'm not sure this is the right fit.",
        choices: [
          { text: "What does that tool not do well for you?", next: "pain_probe", quality: "great" },
          { text: "I'd love to understand more about your setup before we draw that conclusion.", next: "pain_probe", quality: "good" },
        ]
      },
      interest_probe: {
        speaker: "Rachel",
        text: "Honestly, one line stood out — 'reduce manual reconciliation time.' We lose hours every week to that.",
        choices: [
          { text: "Tell me more — what does that process look like today?", next: "pain_probe", quality: "great" },
          { text: "That's exactly what we solve. How many hours roughly?", next: "quantify", quality: "good" },
          { text: "Interesting. Is that a priority right now or more of a background annoyance?", next: "priority_check", quality: "great" },
        ]
      },
      pain_probe: {
        speaker: "Rachel",
        text: "We're growing fast. Our ops team is stretched thin and a lot of our processes are still manual. It's creating errors and delays.",
        choices: [
          { text: "What's the biggest pain point — the errors, the delays, or the team capacity?", next: "drill_down", quality: "great" },
          { text: "When you say errors — what kind of downstream impact does that have?", next: "impact_probe", quality: "great" },
          { text: "How long has this been a challenge?", next: "timeline", quality: "good" },
          { text: "We can definitely help with that. Let me tell you how.", next: "pitch_trap", quality: "poor" },
        ]
      },
      drill_down: {
        speaker: "Rachel",
        text: "Capacity, honestly. My team is talented but they're doing work a system should be doing.",
        choices: [
          { text: "What would they be doing instead if that time was freed up?", next: "impact_probe", quality: "great" },
          { text: "How many people are on the ops team?", next: "quantify", quality: "good" },
          { text: "Is there budget set aside to solve this?", next: "budget_probe", quality: "medium" },
        ]
      },
      impact_probe: {
        speaker: "Rachel",
        text: "Higher-value work. Strategic stuff. We're planning to scale two more regions this year.",
        choices: [
          { text: "With that expansion coming, when would a solution need to be in place to support it?", next: "timeline", quality: "great" },
          { text: "Who else would need to be involved in a decision like this?", next: "stakeholders", quality: "good" },
          { text: "That's a clear use case. Have you started evaluating solutions?", next: "timeline", quality: "good" },
        ]
      },
      quantify: {
        speaker: "Rachel",
        text: "Probably 8–10 hours a week across the team. In dollars that's meaningful.",
        choices: [
          { text: "Is there a budget set aside to address this, or would this need to go through a new approval?", next: "budget_probe", quality: "great" },
          { text: "Who would be part of the buying decision here?", next: "stakeholders", quality: "good" },
        ]
      },
      priority_check: {
        speaker: "Rachel",
        text: "It's moving up the list. We have a planning cycle in 6 weeks.",
        choices: [
          { text: "If we could show a clear ROI before that cycle, would it be in scope?", next: "budget_probe", quality: "great" },
          { text: "Who's involved in that planning process?", next: "stakeholders", quality: "good" },
        ]
      },
      timeline: {
        speaker: "Rachel",
        text: "We'd want something in place before Q3. That's when the new regions go live.",
        choices: [
          { text: "Is there a budget allocated for this, or would we need to build a business case?", next: "budget_probe", quality: "great" },
          { text: "Who besides you would be part of the decision?", next: "stakeholders", quality: "good" },
        ]
      },
      budget_probe: {
        speaker: "Rachel",
        text: "We have some discretionary budget but anything over $50K needs CFO sign-off.",
        choices: [
          { text: "Good to know. Who would I be working with to make the business case to the CFO?", next: "stakeholders", quality: "great" },
          { text: "Understood. What would a compelling ROI case look like for your CFO?", next: "ending_great", quality: "great" },
        ]
      },
      stakeholders: {
        speaker: "Rachel",
        text: "Me, our CFO on the budget side, and probably our IT lead for implementation.",
        choices: [
          { text: "Perfect. Based on what you've shared, I think there's a real fit here. Can we schedule a deeper session with that group?", next: "ending_great", quality: "great" },
          { text: "Would it make sense to get them all on a call together, or do you prefer to gather input separately?", next: "ending_great", quality: "great" },
          { text: "Let me send over a proposal and you can share it with them.", next: "ending_medium", quality: "medium" },
        ]
      },
      ending_great: {
        speaker: "Rachel",
        text: "Yes, actually — I'd like to move this forward. Let's find a time next week.",
        isEnding: true,
        summary: "You led with curiosity, quantified the pain, mapped the decision process, and earned a next step. Textbook discovery done right."
      },
      ending_medium: {
        speaker: "Rachel",
        text: "Sure, I'll take a look.",
        isEnding: true,
        summary: "You got good information but handed the ball back too passively. A strong close requires a specific ask — 'take a look' rarely leads anywhere."
      },
      ending_poor: {
        speaker: "Rachel",
        text: "I'll think about it.",
        isEnding: true,
        summary: "You pitched before you understood the problem. Leading with product before understanding the customer is the fastest way to lose a qualified lead."
      }
    }
  },

  {
    id: 202,
    title: "Handling Objections",
    label: "Sales Discovery",
    pack: "sales-discovery",
    skillCategory: "Clarity",
    difficultyTier: "intermediate",
    context: "You're in a second call with Tom, Head of Finance at a growing SaaS company. The demo went well but he's now pushing back on cost and timing. You sense this deal could die here.",
    opening: "Look, I liked the demo, but I'll be straight with you — the price is higher than I expected and we're in a budget freeze.",
    nodes: {
      start: {
        speaker: "Tom",
        text: "Look, I liked the demo, but I'll be straight with you — the price is higher than I expected and we're in a budget freeze.",
        choices: [
          { text: "I appreciate the directness. Can I ask — is it that the price doesn't make sense, or that the timing isn't right?", next: "separate_objections", quality: "great" },
          { text: "Totally understand. How long does the freeze last?", next: "timing_probe", quality: "good" },
          { text: "I hear you on both. Let me see what I can do on price.", next: "discount_trap", quality: "poor" },
          { text: "What would the price need to be for this to work?", next: "price_anchor", quality: "medium" },
        ]
      },
      discount_trap: {
        speaker: "Tom",
        text: "So you can do a discount? What's the best you can do?",
        choices: [
          { text: "Before we go there — I want to make sure price is actually the issue. If the freeze lifts, would this move forward?", next: "separate_objections", quality: "great" },
          { text: "I can talk to my manager, but I'd need to understand more about your situation first.", next: "separate_objections", quality: "good" },
        ]
      },
      separate_objections: {
        speaker: "Tom",
        text: "Honestly? Both. The freeze is real but even without it, I'm not sure I can justify it internally.",
        choices: [
          { text: "What would a compelling justification look like to your leadership?", next: "roi_probe", quality: "great" },
          { text: "What's the internal benchmark — is it a specific ROI threshold?", next: "roi_probe", quality: "great" },
          { text: "What if we built the ROI case together? What numbers matter most to your CFO?", next: "roi_probe", quality: "great" },
        ]
      },
      timing_probe: {
        speaker: "Tom",
        text: "End of Q2. But honestly it's more than that — I'd need to make a strong case and I'm not sure I have one.",
        choices: [
          { text: "Let's build that case together. What would make it undeniable for your leadership?", next: "roi_probe", quality: "great" },
          { text: "What's the cost of not solving this in Q2?", next: "cost_of_delay", quality: "great" },
        ]
      },
      price_anchor: {
        speaker: "Tom",
        text: "I had budgeted about 30% less than your quote.",
        choices: [
          { text: "That's useful to know. If I can get close to that number, would the freeze or the ROI concern still be a barrier?", next: "roi_probe", quality: "great" },
          { text: "Before I look at pricing, can I understand what drove the original budget figure?", next: "roi_probe", quality: "good" },
        ]
      },
      roi_probe: {
        speaker: "Tom",
        text: "Our leadership looks at payback period. If I can show it pays for itself in under a year, that's a yes.",
        choices: [
          { text: "Based on what you told me in our last call — 8 hours a week in manual work — let's calculate that together.", next: "roi_build", quality: "great" },
          { text: "Most of our customers hit payback in 6–9 months. Can I share how we typically model that?", next: "roi_build", quality: "good" },
          { text: "That's a reasonable bar. What other criteria matter?", next: "roi_build", quality: "good" },
        ]
      },
      cost_of_delay: {
        speaker: "Tom",
        text: "We're losing time. Our team is stretched and we have a product launch in Q3.",
        choices: [
          { text: "So the cost of waiting isn't zero — there's a real operational risk. What would it mean to start now vs. Q3?", next: "roi_build", quality: "great" },
          { text: "If the delay costs more than the spend, is there a path to get an exception to the freeze?", next: "roi_build", quality: "good" },
        ]
      },
      roi_build: {
        speaker: "Tom",
        text: "Put it in numbers and I can take it to my VP. If the math is right, we might be able to get an exception.",
        choices: [
          { text: "Let's build that doc together — you know your numbers better than I do. Can we do a 30-minute working session?", next: "ending_great", quality: "great" },
          { text: "I'll send over an ROI model tonight. What should I include to make it land with your VP?", next: "ending_great", quality: "great" },
          { text: "I'll send you our standard ROI deck.", next: "ending_medium", quality: "medium" },
        ]
      },
      ending_great: {
        speaker: "Tom",
        text: "Yeah, let's do that. I'd rather go in with our numbers than your assumptions.",
        isEnding: true,
        summary: "You isolated the real objection, shifted to ROI framing, and earned a collaborative next step. Tom is now an internal champion, not a gatekeeper."
      },
      ending_medium: {
        speaker: "Tom",
        text: "Okay, I'll review it and let you know.",
        isEnding: true,
        summary: "Sending generic materials after a custom conversation is a step backward. Build with the customer, not for them — it lands very differently."
      },
      ending_poor: {
        speaker: "Tom",
        text: "I'll see what I can do.",
        isEnding: true,
        summary: "Moving straight to discounts without understanding the real objection signals low confidence and erodes value. The issue wasn't always the price."
      }
    }
  },

  {
    id: 203,
    title: "Uncovering the Real Pain",
    label: "Sales Discovery",
    pack: "sales-discovery",
    skillCategory: "Empathy",
    difficultyTier: "intermediate",
    context: "You're on a discovery call with Kemi, Head of Customer Success at a fast-growing startup. She booked the call but seems guarded. Your goal is to understand what's really going on before she shuts down the conversation.",
    opening: "I'll be honest — we're looking at a lot of tools right now and I'm a bit fatigued by these calls.",
    nodes: {
      start: {
        speaker: "Kemi",
        text: "I'll be honest — we're looking at a lot of tools right now and I'm a bit fatigued by these calls.",
        choices: [
          { text: "That's completely fair. I don't want to add to the fatigue. What would make this 20 minutes actually worth your time?", next: "reframe", quality: "great" },
          { text: "I hear you. Honestly, I hate those calls too. Can I just ask a few questions before pitching anything?", next: "reframe", quality: "great" },
          { text: "I'll be quick. We're different because...", next: "pitch_trap", quality: "poor" },
          { text: "What are you looking for that you haven't found yet?", next: "gap_probe", quality: "great" },
        ]
      },
      pitch_trap: {
        speaker: "Kemi",
        text: "I've heard 'we're different' ten times this week.",
        choices: [
          { text: "Fair. Forget the pitch. What's actually going wrong in your CS org right now?", next: "gap_probe", quality: "great" },
          { text: "Point taken. What would make this conversation useful to you?", next: "reframe", quality: "good" },
        ]
      },
      reframe: {
        speaker: "Kemi",
        text: "Just... don't waste my time. If it's relevant, great. If not, I'd rather know in 10 minutes.",
        choices: [
          { text: "Deal. What's the biggest thing your CS team is struggling with right now?", next: "gap_probe", quality: "great" },
          { text: "Agreed. Let me ask one question: what does your biggest headache look like on a Monday morning?", next: "gap_probe", quality: "great" },
        ]
      },
      gap_probe: {
        speaker: "Kemi",
        text: "Churn. We can't get ahead of it. By the time we know a customer's at risk, it's too late.",
        choices: [
          { text: "How are you currently identifying at-risk customers?", next: "current_state", quality: "great" },
          { text: "When you say 'too late' — what does that look like?", next: "impact_probe", quality: "great" },
          { text: "What would early warning actually look like for you?", next: "ideal_state", quality: "good" },
          { text: "That's exactly the problem we solve. Let me show you how.", next: "pitch_trap", quality: "poor" },
        ]
      },
      current_state: {
        speaker: "Kemi",
        text: "Manually. Health scores in a spreadsheet. My team checks in weekly but it's reactive.",
        choices: [
          { text: "How many customers are you managing across the team?", next: "scale", quality: "good" },
          { text: "What signals are you tracking in that spreadsheet?", next: "signals", quality: "great" },
          { text: "What would the ideal system tell you that the spreadsheet doesn't?", next: "ideal_state", quality: "great" },
        ]
      },
      impact_probe: {
        speaker: "Kemi",
        text: "We lost three accounts last quarter that, in hindsight, had red flags for months. That's real revenue.",
        choices: [
          { text: "Do you have a sense of what those three accounts were worth?", next: "scale", quality: "good" },
          { text: "What red flags were there — and why were they missed?", next: "signals", quality: "great" },
          { text: "That's painful. If you could have caught those three — what would have needed to be true?", next: "ideal_state", quality: "great" },
        ]
      },
      signals: {
        speaker: "Kemi",
        text: "Login frequency, support ticket volume, NPS drops. But we're looking at them in isolation.",
        choices: [
          { text: "What if you could see those signals correlated — as a single risk score?", next: "ideal_state", quality: "great" },
          { text: "Who on your team owns monitoring those? Is it consistent?", next: "scale", quality: "good" },
        ]
      },
      scale: {
        speaker: "Kemi",
        text: "About 200 accounts, three CSMs. Each person is managing 60–70 relationships.",
        choices: [
          { text: "At that ratio, manual tracking is almost impossible to do well. What would a 10x better system look like to you?", next: "ideal_state", quality: "great" },
          { text: "Is this a tooling problem or a headcount problem — or both?", next: "ideal_state", quality: "good" },
        ]
      },
      ideal_state: {
        speaker: "Kemi",
        text: "Something that surfaces risk automatically, so my team isn't guessing. I want to be proactive, not reactive.",
        choices: [
          { text: "That's exactly what we built — can I show you a live example with data like yours?", next: "ending_great", quality: "great" },
          { text: "If we could show you that working with your actual customer data — would that be worth a second call?", next: "ending_great", quality: "great" },
          { text: "We can do that. Let me send you a demo.", next: "ending_medium", quality: "medium" },
        ]
      },
      ending_great: {
        speaker: "Kemi",
        text: "Okay. This is actually relevant. Set up the demo.",
        isEnding: true,
        summary: "You earned trust by listening first, translated their pain into your solution naturally, and got a qualified next step. Kemi is now engaged, not fatigued."
      },
      ending_medium: {
        speaker: "Kemi",
        text: "Sure, send it over.",
        isEnding: true,
        summary: "Sending a generic demo loses the momentum you built. 'I'll send something' delays the relationship — a specific, co-designed next step always wins."
      },
      ending_poor: {
        speaker: "Kemi",
        text: "I'll pass this to my team.",
        isEnding: true,
        summary: "Pitching before building trust with a skeptical buyer shuts the conversation down. Empathy and curiosity had to come first here."
      }
    }
  },

  // ─────────────────────────────────────────
  // PACK 3: Job Interviews
  // ─────────────────────────────────────────

  {
    id: 301,
    title: "The Behavioral Interview",
    label: "Job Interview",
    pack: "job-interviews",
    skillCategory: "Clarity",
    difficultyTier: "beginner",
    context: "You're interviewing with Dana, a hiring manager at a company you really want to work for. She's known for deep behavioral questions. You want to come across as self-aware, specific, and genuine.",
    opening: "Tell me about a time you failed at something significant. Walk me through it.",
    nodes: {
      start: {
        speaker: "Dana",
        text: "Tell me about a time you failed at something significant. Walk me through it.",
        choices: [
          { text: "Sure. About two years ago I led a product launch that missed our target by 40%. I want to walk you through what happened and what I learned.", next: "story_open", quality: "great" },
          { text: "I don't really think of things as failures — I see them as learning opportunities.", next: "deflect", quality: "poor" },
          { text: "There was a project where I underestimated the timeline and we missed the deadline. Can I walk you through that?", next: "story_open", quality: "good" },
          { text: "I've had a few. The most instructive one was when I let a team conflict fester too long. That taught me a lot.", next: "story_open", quality: "good" },
        ]
      },
      deflect: {
        speaker: "Dana",
        text: "I appreciate that framing, but I'm specifically looking for something that went wrong. Can you give me a concrete example?",
        choices: [
          { text: "Of course. Let me think of a real one... There was a product launch where I made a bad call on scope.", next: "story_open", quality: "good" },
          { text: "Absolutely. I led a client project where I misjudged stakeholder alignment and we had to restart a key phase.", next: "story_open", quality: "great" },
        ]
      },
      story_open: {
        speaker: "Dana",
        text: "Okay. So what actually happened — what was your specific role in it?",
        choices: [
          { text: "I was the project lead. I made the call to move forward without getting buy-in from a key stakeholder. That turned out to be the mistake.", next: "accountability", quality: "great" },
          { text: "I was leading the team. We had a tight timeline and I pushed hard to ship early. I underestimated what was still incomplete.", next: "accountability", quality: "good" },
          { text: "The team had communication issues, and the client kept changing requirements. It was complicated.", next: "deflect_again", quality: "poor" },
        ]
      },
      deflect_again: {
        speaker: "Dana",
        text: "What was your specific contribution to the outcome — not the team's or the client's?",
        choices: [
          { text: "Honestly? I didn't push hard enough to clarify requirements early. That's on me.", next: "accountability", quality: "great" },
          { text: "I should have escalated the scope creep sooner rather than trying to absorb it.", next: "accountability", quality: "good" },
        ]
      },
      accountability: {
        speaker: "Dana",
        text: "What was the impact? And what did you do when you realized it was going wrong?",
        choices: [
          { text: "We lost the client's trust and had to rebuild it over three months. When I realized it, I called the client directly, owned it, and proposed a recovery plan.", next: "learning", quality: "great" },
          { text: "The launch was delayed by six weeks and cost us the Q3 revenue target. I escalated to leadership, took ownership, and we worked out a mitigation plan.", next: "learning", quality: "good" },
          { text: "It caused delays. I tried to fix it but it was hard to recover at that point.", next: "vague_close", quality: "medium" },
        ]
      },
      vague_close: {
        speaker: "Dana",
        text: "What specifically did you do to fix it?",
        choices: [
          { text: "I set up daily standups with the affected team, personally took over the at-risk workstream, and communicated proactively with stakeholders.", next: "learning", quality: "great" },
          { text: "I restructured the project timeline and brought in additional resources to close the gaps.", next: "learning", quality: "good" },
        ]
      },
      learning: {
        speaker: "Dana",
        text: "And what did you actually change after that? Not just learn — change.",
        choices: [
          { text: "I built a pre-launch stakeholder alignment step into every project plan I run now. It's non-negotiable for me.", next: "ending_great", quality: "great" },
          { text: "I started asking 'who else needs to be in this room?' before any major decision. It's become a habit.", next: "ending_great", quality: "great" },
          { text: "I learned to communicate more proactively and to ask for help earlier.", next: "ending_medium", quality: "good" },
          { text: "I try to be more careful with timelines.", next: "ending_poor", quality: "poor" },
        ]
      },
      ending_great: {
        speaker: "Dana",
        text: "That's exactly the kind of answer I was looking for. You didn't avoid it, you owned it, and you showed what changed.",
        isEnding: true,
        summary: "You gave a specific, honest, structured answer with clear ownership and a demonstrated behavioral change. That's what separates strong candidates."
      },
      ending_medium: {
        speaker: "Dana",
        text: "Good. I appreciate the honesty. I'd love a bit more specificity on what changed behaviorally.",
        isEnding: true,
        summary: "You told a solid story but the 'what changed' part was soft. Behavioral questions end with evidence of change — make it concrete and permanent."
      },
      ending_poor: {
        speaker: "Dana",
        text: "I see. I'd like to revisit this with a different example if we have time.",
        isEnding: true,
        summary: "Vague answers to behavioral questions signal low self-awareness. Dana needed specifics — situation, ownership, action, and change."
      }
    }
  },

  {
    id: 302,
    title: "The Salary Negotiation",
    label: "Job Interview",
    pack: "job-interviews",
    skillCategory: "Clarity",
    difficultyTier: "advanced",
    context: "You've just received a verbal offer from Alex, a recruiter at a company you're very interested in. The base salary is lower than you expected. This is the negotiation conversation.",
    opening: "So we're excited to move forward. The offer is $112,000 base. What do you think?",
    nodes: {
      start: {
        speaker: "Alex",
        text: "So we're excited to move forward. The offer is $112,000 base. What do you think?",
        choices: [
          { text: "I'm really excited too. Can I have a day to review the full package before responding?", next: "buy_time", quality: "good" },
          { text: "That's great. I'm very interested. I was hoping we could discuss the base — I had $125–130K in mind based on my research.", next: "counter", quality: "great" },
          { text: "That works for me!", next: "accept_early", quality: "poor" },
          { text: "I appreciate the offer. I need to be honest — that's below what I was expecting. Can we talk about it?", next: "counter", quality: "great" },
        ]
      },
      accept_early: {
        speaker: "Alex",
        text: "Wonderful! I'll send the formal offer today.",
        choices: [
          { text: "Actually — before you do, can I ask about the flexibility on the base? I want to be transparent that it's a bit below what I was expecting.", next: "counter", quality: "good" },
        ]
      },
      buy_time: {
        speaker: "Alex",
        text: "Of course. But is there anything that concerns you about the offer?",
        choices: [
          { text: "I want to be transparent — the base is a bit below what I was expecting. I had $125–130K in mind. Is there flexibility there?", next: "counter", quality: "great" },
          { text: "The base is a bit lower than my target. Can we discuss that?", next: "counter", quality: "good" },
        ]
      },
      counter: {
        speaker: "Alex",
        text: "I see. That's on the higher end of our band. Can I ask — where does that number come from?",
        choices: [
          { text: "Based on my research — Glassdoor, LinkedIn, and a few conversations with people in similar roles — $125–130K is the median for this level and market.", next: "justify", quality: "great" },
          { text: "My current comp is $118K plus bonus. Moving for $112K would actually be a step back.", next: "justify", quality: "good" },
          { text: "It just feels right for the role.", next: "weak_justification", quality: "poor" },
        ]
      },
      weak_justification: {
        speaker: "Alex",
        text: "I hear you, but we need to work within our band. I'm not sure I can make a case internally without a stronger rationale.",
        choices: [
          { text: "Fair point. Let me give you something concrete — market data puts this role at $123–128K median in this market.", next: "justify", quality: "great" },
        ]
      },
      justify: {
        speaker: "Alex",
        text: "That's helpful context. I can bring it back to the team, but I want to be honest — we may not get to $130K. Would $118–120K work as a middle ground?",
        choices: [
          { text: "I appreciate you going back for me. $120K is closer — would it be possible to add a signing bonus to bridge the gap?", next: "creative_ask", quality: "great" },
          { text: "I understand the constraints. If base is capped, is there flexibility on equity or start date to offset?", next: "creative_ask", quality: "great" },
          { text: "I can work with $120K if the rest of the package is strong. Can we walk through that?", next: "package_explore", quality: "good" },
          { text: "That works. Let's go with $120K.", next: "ending_medium", quality: "medium" },
        ]
      },
      creative_ask: {
        speaker: "Alex",
        text: "A signing bonus is possible. I'd need to check, but $5–8K might be doable. Would that work?",
        choices: [
          { text: "If you can land $120K base and $8K signing, I'm in. I'd be ready to sign this week.", next: "ending_great", quality: "great" },
          { text: "$8K signing at $118K base gets me to where I need to be. Let's do it.", next: "ending_great", quality: "great" },
          { text: "That works. Thank you for advocating for me.", next: "ending_great", quality: "good" },
        ]
      },
      package_explore: {
        speaker: "Alex",
        text: "We have 15 days PTO, standard benefits, and a 10% annual bonus target.",
        choices: [
          { text: "Is there any flexibility on PTO or the bonus structure? At $120K base, I'd like to feel the total comp is competitive.", next: "ending_great", quality: "good" },
          { text: "If the bonus is guaranteed, $120K total works. Can we lock that in?", next: "ending_medium", quality: "medium" },
        ]
      },
      ending_great: {
        speaker: "Alex",
        text: "I'll get that confirmed and send the revised offer today. Really glad we could make this work.",
        isEnding: true,
        summary: "You negotiated with evidence, stayed collaborative, used creative levers when base was capped, and closed decisively. That's a strong negotiation."
      },
      ending_medium: {
        speaker: "Alex",
        text: "Perfect. I'll send the offer over.",
        isEnding: true,
        summary: "You got a small improvement but left value on the table. When base is 'stuck', signing bonuses, equity, or PTO are often easier wins."
      },
      ending_poor: {
        speaker: "Alex",
        text: "Great! Sending the formal offer now.",
        isEnding: true,
        summary: "Accepting the first offer without negotiating almost always leaves money on the table. Recruiters expect negotiation — it's part of the process."
      }
    }
  },

  {
    id: 303,
    title: "Asking Smart Questions",
    label: "Job Interview",
    pack: "job-interviews",
    skillCategory: "Probing",
    difficultyTier: "beginner",
    context: "You're at the end of an interview with Chris, VP of Product at a company you're excited about. She says 'So — do you have questions for me?' This is your moment to demonstrate curiosity and strategic thinking.",
    opening: "We've covered a lot. I really enjoyed this conversation. Do you have questions for me?",
    nodes: {
      start: {
        speaker: "Chris",
        text: "We've covered a lot. I really enjoyed this conversation. Do you have questions for me?",
        choices: [
          { text: "I do. What does success look like in this role in the first 90 days — specifically?", next: "success_probe", quality: "great" },
          { text: "What's the biggest challenge facing the team right now?", next: "challenge_probe", quality: "great" },
          { text: "Not really — I think you've covered everything.", next: "no_questions", quality: "poor" },
          { text: "What do you personally love about working here?", next: "personal_probe", quality: "good" },
        ]
      },
      no_questions: {
        speaker: "Chris",
        text: "Really? Nothing at all?",
        choices: [
          { text: "Actually, there is one thing I've been wondering — what does success look like in this role in the first 90 days?", next: "success_probe", quality: "good" },
          { text: "Now that I think about it — what's the team's biggest current challenge?", next: "challenge_probe", quality: "good" },
        ]
      },
      success_probe: {
        speaker: "Chris",
        text: "Great question. The first 90 days are really about learning the product, building cross-functional relationships, and shipping one meaningful feature.",
        choices: [
          { text: "When you say 'meaningful' — what's the bar? How does the team define impact?", next: "impact_clarify", quality: "great" },
          { text: "Which cross-functional relationships tend to be the most complex to navigate?", next: "team_dynamics", quality: "great" },
          { text: "That's helpful. What's the biggest reason people struggle in this role in the first quarter?", next: "challenge_probe", quality: "good" },
        ]
      },
      challenge_probe: {
        speaker: "Chris",
        text: "Honestly — alignment. We move fast and not everyone is always on the same page. It creates friction.",
        choices: [
          { text: "How does the team handle that friction when it shows up?", next: "team_dynamics", quality: "great" },
          { text: "Is that more of a process issue, a tooling issue, or a people issue — in your view?", next: "team_dynamics", quality: "great" },
          { text: "What's been tried to address that?", next: "team_dynamics", quality: "good" },
        ]
      },
      personal_probe: {
        speaker: "Chris",
        text: "What I love... honestly, it's the pace. Things get done here. I came from a slower company and this is a different energy.",
        choices: [
          { text: "What does the flip side of that pace look like? What's the cost of moving fast?", next: "challenge_probe", quality: "great" },
          { text: "How do you balance pace with quality?", next: "team_dynamics", quality: "good" },
          { text: "What would you say to someone who's worried about burning out at that pace?", next: "culture_probe", quality: "great" },
        ]
      },
      impact_clarify: {
        speaker: "Chris",
        text: "For us, impact means something users actually use. Not just shipped — adopted. We track engagement closely.",
        choices: [
          { text: "What does the feedback loop look like between the product team and real users?", next: "culture_probe", quality: "great" },
          { text: "What's an example of a feature that shipped and genuinely surprised you in terms of adoption?", next: "culture_probe", quality: "great" },
        ]
      },
      team_dynamics: {
        speaker: "Chris",
        text: "We've gotten better. We do weekly syncs and use shared OKRs. But it still takes intention.",
        choices: [
          { text: "How much of this role is about influencing without authority?", next: "culture_probe", quality: "great" },
          { text: "What's the one thing you wish you'd known joining this team?", next: "culture_probe", quality: "great" },
        ]
      },
      culture_probe: {
        speaker: "Chris",
        text: "That's a great question. I wish I'd known how much internal communication matters here. You have to be intentional about keeping stakeholders informed.",
        choices: [
          { text: "Based on our conversation — do you have any reservations about my fit for this role that I could address?", next: "ending_great", quality: "great" },
          { text: "Thank you — that's really useful context. I'm more excited about this role than when I walked in.", next: "ending_great", quality: "good" },
          { text: "Good to know. What are the next steps from here?", next: "ending_medium", quality: "medium" },
        ]
      },
      ending_great: {
        speaker: "Chris",
        text: "No reservations. You've asked the best questions of anyone we've spoken to. I'll be in touch soon.",
        isEnding: true,
        summary: "Your questions demonstrated strategic thinking, self-awareness, and genuine curiosity. Asking about fit at the end is a power move — it opens the door to handling any hidden objections."
      },
      ending_medium: {
        speaker: "Chris",
        text: "Next steps — we'll debrief as a team and follow up within a week.",
        isEnding: true,
        summary: "You asked decent questions but missed the chance to deepen the relationship and check for concerns. Strong candidates use this moment to stand out."
      },
      ending_poor: {
        speaker: "Chris",
        text: "Okay... well, thank you for coming in.",
        isEnding: true,
        summary: "Not asking questions signals low interest or preparation. This is one of the most impactful moments in an interview — use it."
      }
    }
  },

  // ─────────────────────────────────────────
  // PACK 4: Difficult Conversations
  // ─────────────────────────────────────────

  {
    id: 401,
    title: "The Peer Conflict",
    label: "Difficult Conversation",
    pack: "difficult-conversations",
    skillCategory: "Empathy",
    difficultyTier: "intermediate",
    context: "You and Jamie, a peer on your team, have been working together on a high-stakes project. Jamie publicly contradicted your recommendation in a meeting with senior leadership. It affected the outcome and damaged your credibility. You've asked for a 1:1.",
    opening: "Hey. You wanted to talk?",
    nodes: {
      start: {
        speaker: "Jamie",
        text: "Hey. You wanted to talk?",
        choices: [
          { text: "Yeah. I want to talk about what happened in the leadership meeting yesterday. I felt blindsided.", next: "direct_opener", quality: "great" },
          { text: "Yes. I noticed you contradicted my recommendation in front of leadership. I want to understand what happened.", next: "direct_opener", quality: "good" },
          { text: "What you did in that meeting was not okay.", next: "accusatory", quality: "poor" },
          { text: "I want to clear the air about yesterday. Can we talk honestly?", next: "direct_opener", quality: "great" },
        ]
      },
      accusatory: {
        speaker: "Jamie",
        text: "Excuse me? What exactly did I do?",
        choices: [
          { text: "I want to step back. I came in hot. Can I start over?", next: "direct_opener", quality: "good" },
          { text: "You contradicted me in front of senior leadership without talking to me first. That's what I want to address.", next: "direct_opener", quality: "good" },
        ]
      },
      direct_opener: {
        speaker: "Jamie",
        text: "I hear you. For what it's worth, I wasn't trying to undermine you. I genuinely disagreed with the recommendation.",
        choices: [
          { text: "I can work with disagreement. What I struggled with was not knowing it was coming. What was going through your mind?", next: "understand_intent", quality: "great" },
          { text: "I appreciate that. But disagreeing publicly without flagging it first — that's what hurt. Can we talk about how to handle this differently?", next: "understand_intent", quality: "great" },
          { text: "You could have told me beforehand. Why didn't you?", next: "understand_intent", quality: "good" },
          { text: "That doesn't make it okay.", next: "escalate", quality: "poor" },
        ]
      },
      escalate: {
        speaker: "Jamie",
        text: "I think you're overreacting. I was just being honest.",
        choices: [
          { text: "I'm not overreacting. Public disagreement without a heads-up affects professional relationships. I want us to work this out.", next: "understand_intent", quality: "good" },
          { text: "I don't think I'm overreacting. Can you help me understand why you didn't come to me first?", next: "understand_intent", quality: "great" },
        ]
      },
      understand_intent: {
        speaker: "Jamie",
        text: "Honestly? I didn't realize it would land that way. I thought leadership would appreciate a second perspective.",
        choices: [
          { text: "I can see that. The impact for me was different from what you intended. I want us to find a way to disagree that doesn't put either of us in that position.", next: "impact_share", quality: "great" },
          { text: "I get that. And I want us to be able to disagree — just not for the first time in a room with executives. Can we agree to that?", next: "impact_share", quality: "great" },
          { text: "That makes sense. I just wish I'd known.", next: "impact_share", quality: "good" },
        ]
      },
      impact_share: {
        speaker: "Jamie",
        text: "That's fair. I didn't think about how it would look. I should have come to you first.",
        choices: [
          { text: "I appreciate that. How do we make sure this doesn't happen again — for both of us?", next: "forward_plan", quality: "great" },
          { text: "Thank you for saying that. What would you want from me if the situation was reversed?", next: "forward_plan", quality: "great" },
          { text: "Okay. Let's make sure we're aligned before the next meeting.", next: "forward_plan", quality: "good" },
        ]
      },
      forward_plan: {
        speaker: "Jamie",
        text: "Yeah. Maybe a quick pre-meeting sync? Even 10 minutes before big presentations to align.",
        choices: [
          { text: "I'd really value that. And if either of us has a concern, we bring it to each other first. Deal?", next: "ending_great", quality: "great" },
          { text: "That works for me. And I want to be clear — I value your perspective. I just want to hear it before leadership does.", next: "ending_great", quality: "great" },
          { text: "Good idea. Let's try that next time.", next: "ending_medium", quality: "good" },
        ]
      },
      ending_great: {
        speaker: "Jamie",
        text: "Deal. I'm glad you brought this up. I'd want to know if I'd done something that affected you.",
        isEnding: true,
        summary: "You addressed the conflict directly, separated intent from impact, stayed curious rather than accusatory, and built a concrete norm for the future."
      },
      ending_medium: {
        speaker: "Jamie",
        text: "Yeah, for sure. See you at the next one.",
        isEnding: true,
        summary: "The conversation helped but ended loosely. 'Next time' without a specific agreement tends to fade. A clear, mutual commitment would have solidified this."
      },
      ending_poor: {
        speaker: "Jamie",
        text: "Fine. I'll try to be more careful.",
        isEnding: true,
        summary: "Coming in with accusations put Jamie on the defensive. Peer conflicts need curiosity and shared ownership — not blame — to actually resolve."
      }
    }
  },

  {
    id: 402,
    title: "Delivering Bad News",
    label: "Difficult Conversation",
    pack: "difficult-conversations",
    skillCategory: "Empathy",
    difficultyTier: "advanced",
    context: "You're a team lead. Your company has just cut a major project — one that Sam has been leading for eight months. It's their most important work. You have to tell them the project is cancelled and their role is changing.",
    opening: "Hey! What's up? You have that look.",
    nodes: {
      start: {
        speaker: "Sam",
        text: "Hey! What's up? You have that look.",
        choices: [
          { text: "I do. I have something hard to tell you and I want to be straight with you. Can we sit down?", next: "set_tone", quality: "great" },
          { text: "Yeah. There's been a decision made that I need to share with you. It's about the Atlas project.", next: "deliver_news", quality: "good" },
          { text: "I just wanted to check in, actually. How's Atlas going?", next: "delay_trap", quality: "poor" },
        ]
      },
      delay_trap: {
        speaker: "Sam",
        text: "It's going well! We're almost at the prototype phase. I'm really proud of where we are.",
        choices: [
          { text: "I'm glad to hear that. I need to tell you something that changes things. It's about Atlas.", next: "deliver_news", quality: "good" },
          { text: "That's really hard to hear you say. I have news that's going to be difficult. Can I tell you now?", next: "set_tone", quality: "great" },
        ]
      },
      set_tone: {
        speaker: "Sam",
        text: "Okay... you're scaring me a little. What is it?",
        choices: [
          { text: "Leadership has decided to cancel the Atlas project. Effective immediately.", next: "immediate_reaction", quality: "great" },
          { text: "The Atlas project has been cancelled. I know that's going to be a lot to process.", next: "immediate_reaction", quality: "great" },
        ]
      },
      deliver_news: {
        speaker: "Sam",
        text: "Okay...?",
        choices: [
          { text: "Atlas has been cancelled. I wanted to tell you directly and as soon as I could.", next: "immediate_reaction", quality: "great" },
          { text: "Leadership made the decision to cancel the project. I'm sorry, Sam.", next: "immediate_reaction", quality: "good" },
        ]
      },
      immediate_reaction: {
        speaker: "Sam",
        text: "What? What do you mean cancelled? We're almost done. This doesn't make sense.",
        choices: [
          { text: "I know. And I completely understand that reaction. I want to give you space to process this. What's going through your head right now?", next: "emotional_space", quality: "great" },
          { text: "I know it doesn't feel like it makes sense right now. I'm sorry. Take a moment — I'm here.", next: "emotional_space", quality: "great" },
          { text: "It was a strategic decision. There were budget constraints and a shift in priorities.", next: "explain_first", quality: "medium" },
          { text: "I know, I know. It happened fast. Let me explain.", next: "explain_first", quality: "medium" },
        ]
      },
      explain_first: {
        speaker: "Sam",
        text: "Eight months. Eight months of work. And it's just... gone?",
        choices: [
          { text: "Yes. And that's a real loss. What you built wasn't wasted — it informed decisions going forward. But I know that doesn't make today easier.", next: "emotional_space", quality: "great" },
          { text: "I know how much you've put into this. I'm sorry.", next: "emotional_space", quality: "good" },
        ]
      },
      emotional_space: {
        speaker: "Sam",
        text: "I just... I don't know what to say. Is my job affected?",
        choices: [
          { text: "Your job is safe. Your role will shift — I want to walk you through what that looks like, but only when you're ready.", next: "role_change", quality: "great" },
          { text: "You're not losing your job. There are changes to your role I need to tell you about. Can I walk you through them?", next: "role_change", quality: "good" },
          { text: "You still have a job. Your role is going to change though.", next: "role_change", quality: "medium" },
        ]
      },
      role_change: {
        speaker: "Sam",
        text: "What kind of changes?",
        choices: [
          { text: "You'd move to the Infrastructure team. I know it's not what you were building toward. I want to hear your reaction — and your input on what would make this work for you.", next: "listen_response", quality: "great" },
          { text: "You'd be moving to Infrastructure. It's a strong team. I want your honest reaction.", next: "listen_response", quality: "good" },
          { text: "Infrastructure. It's a good opportunity. I think you'd be great there.", next: "sell_too_hard", quality: "medium" },
        ]
      },
      sell_too_hard: {
        speaker: "Sam",
        text: "Please don't tell me it's a good opportunity right now. I just lost my project.",
        choices: [
          { text: "You're right. I'm sorry. I shouldn't have framed it that way. How are you feeling about it?", next: "listen_response", quality: "great" },
          { text: "Fair. That was tone-deaf of me. What do you need right now?", next: "listen_response", quality: "great" },
        ]
      },
      listen_response: {
        speaker: "Sam",
        text: "I don't know if I want to be in Infrastructure. But I guess I don't have a choice.",
        choices: [
          { text: "You have more input than you think. Can we talk about what would make this feel less like something happening to you?", next: "ending_great", quality: "great" },
          { text: "I want to advocate for you in this. What would make you feel okay about this move?", next: "ending_great", quality: "great" },
          { text: "I understand. Let's take it one step at a time.", next: "ending_medium", quality: "medium" },
        ]
      },
      ending_great: {
        speaker: "Sam",
        text: "...Thank you for telling me yourself. And for not sugarcoating it. I need a day.",
        isEnding: true,
        summary: "You delivered hard news directly, created emotional space before explanations, and gave Sam agency in what comes next. That's how bad news is done with integrity."
      },
      ending_medium: {
        speaker: "Sam",
        text: "Okay. I'll process it.",
        isEnding: true,
        summary: "You were honest but moved too quickly to logistics before Sam had processed the emotional hit. Leading with empathy before explanation is critical in these conversations."
      },
      ending_poor: {
        speaker: "Sam",
        text: "I see. Thanks for letting me know.",
        isEnding: true,
        summary: "Delaying the news or leading with explanations before acknowledgment creates distance. Sam needed to feel heard before they could hear anything else."
      }
    }
  },

  {
    id: 403,
    title: "Setting a Boundary",
    label: "Difficult Conversation",
    pack: "difficult-conversations",
    skillCategory: "Clarity",
    difficultyTier: "intermediate",
    context: "Alex, a well-liked colleague, has been consistently pulling you into their work without asking — forwarding emails for you to handle, CC'ing you on things outside your scope, and expecting you to cover their gaps. You've decided to address it directly.",
    opening: "Oh hey! Perfect timing — I just forwarded you that client report. Can you clean it up before 3?",
    nodes: {
      start: {
        speaker: "Alex",
        text: "Oh hey! Perfect timing — I just forwarded you that client report. Can you clean it up before 3?",
        choices: [
          { text: "Actually — that's exactly what I wanted to talk about. Do you have a few minutes?", next: "request_space", quality: "great" },
          { text: "I can't take that on. I actually wanted to talk about this pattern — do you have a minute?", next: "name_pattern", quality: "great" },
          { text: "Sure, no problem.", next: "avoid", quality: "poor" },
          { text: "I'm going to have to pass on this one. And I'd like to talk about why.", next: "name_pattern", quality: "good" },
        ]
      },
      avoid: {
        speaker: "Alex",
        text: "Amazing, thank you! You're the best.",
        choices: [
          { text: "Actually, before I do — can we talk? I realize I've been saying yes to things I shouldn't be.", next: "name_pattern", quality: "good" },
          { text: "Hey, I want to pause on this actually. I've been meaning to have a conversation with you.", next: "request_space", quality: "good" },
        ]
      },
      request_space: {
        speaker: "Alex",
        text: "Sure, what's up?",
        choices: [
          { text: "I've noticed a pattern over the last few weeks where I'm getting pulled into your work without being asked. I want to talk about that.", next: "name_pattern", quality: "great" },
          { text: "I want to be honest with you about something. I've been absorbing tasks that are outside my scope, and it's affecting my own work.", next: "name_pattern", quality: "great" },
        ]
      },
      name_pattern: {
        speaker: "Alex",
        text: "Wait — what? I didn't realize that was an issue. You've always helped out.",
        choices: [
          { text: "I know — and that's on me for not saying something sooner. I should have spoken up. But it's become a pattern that isn't sustainable for me.", next: "own_part", quality: "great" },
          { text: "I have helped, but I've been doing it at the cost of my own priorities. I want to reset this.", next: "own_part", quality: "good" },
          { text: "I've been saying yes when I should have said no. I need to change that.", next: "own_part", quality: "good" },
        ]
      },
      own_part: {
        speaker: "Alex",
        text: "I didn't know you felt that way. I thought we were just being collaborative.",
        choices: [
          { text: "I want to be collaborative too. What I need is for us to agree on what collaboration actually looks like — what's yours and what's mine.", next: "define_boundary", quality: "great" },
          { text: "I value working together. But being forwarded work without being asked is different from collaboration. Can we talk about where that line is?", next: "define_boundary", quality: "great" },
          { text: "I get that. And I'm not trying to make this a big deal. I just need things to be clearer between us.", next: "define_boundary", quality: "good" },
        ]
      },
      define_boundary: {
        speaker: "Alex",
        text: "Okay, fair. So what are you saying — you won't help anymore?",
        choices: [
          { text: "I'm happy to help when I have capacity and you ask directly. What I need to stop is being put in a position where I either do the work or let something fall through the cracks.", next: "mutual_agreement", quality: "great" },
          { text: "That's not it. I'll help when I can. I just need you to ask, not assume. And I need to be able to say no without it being awkward.", next: "mutual_agreement", quality: "great" },
          { text: "I can still help sometimes. But I can't be the default solution for your workload.", next: "mutual_agreement", quality: "good" },
        ]
      },
      mutual_agreement: {
        speaker: "Alex",
        text: "Okay. That's... actually fair. I think I did start to rely on you without thinking about it.",
        choices: [
          { text: "I appreciate you hearing that. Can we agree that going forward you'll ask before forwarding, and I'll be honest when I can't take it on?", next: "ending_great", quality: "great" },
          { text: "Thank you. And if I slip and say yes when I shouldn't — call me on it too. I want us both to be honest.", next: "ending_great", quality: "great" },
          { text: "Good. Let's try to keep things cleaner going forward.", next: "ending_medium", quality: "good" },
        ]
      },
      ending_great: {
        speaker: "Alex",
        text: "Yeah. Deal. And I'm sorry for putting you in that position. I genuinely didn't realize.",
        isEnding: true,
        summary: "You named the pattern clearly, owned your part, explained the impact without accusation, and agreed on a specific change. This is how boundaries build stronger relationships."
      },
      ending_medium: {
        speaker: "Alex",
        text: "Yeah, for sure.",
        isEnding: true,
        summary: "Good conversation, but the ending was vague. Without a specific agreement, the pattern often returns. Closing with a clear 'ask first, I'll be honest' norm would have made this stick."
      },
      ending_poor: {
        speaker: "Alex",
        text: "Of course! No worries.",
        isEnding: true,
        summary: "Avoiding the conversation keeps the peace short-term and builds resentment long-term. The situation won't change until it's named."
      }
    }
  },
];
