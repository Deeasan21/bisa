export const SIMULATIONS = [
  {
    id: 1,
    title: "The Struggling Team Member",
    label: "Work Scenario",
    skillCategory: "Empathy",
    difficultyTier: "beginner",
    context: "You're a manager. One of your team members, Jordan, has been missing deadlines and seems disengaged. You've called a one-on-one meeting.",
    opening: "Hey, you wanted to meet?",
    nodes: {
      start: {
        speaker: "Jordan",
        text: "Hey, you wanted to meet?",
        choices: [
          { text: "Yes, I've noticed you've been missing deadlines. What's going on?", next: "direct_open", quality: "good" },
          { text: "Why have you been missing deadlines?", next: "direct_closed", quality: "poor" },
          { text: "How are things going for you lately?", next: "gentle_open", quality: "great" },
          { text: "Yeah, I just wanted to check in. I've noticed things seem different lately and I wanted to hear your side.", next: "direct_open", quality: "good" },
          { text: "Before we get into anything work-related — how are you, really?", next: "gentle_open", quality: "great" }
        ]
      },
      direct_open: {
        speaker: "Jordan",
        text: "I... yeah, I know. Things have been tough. There's a lot happening.",
        choices: [
          { text: "What's been the hardest part?", next: "probing_good", quality: "great" },
          { text: "We all have tough times. You need to figure it out.", next: "dismissive", quality: "poor" },
          { text: "Tell me more about what's happening.", next: "probing_good", quality: "good" },
          { text: "I appreciate you being honest. Take your time — what's been weighing on you the most?", next: "probing_good", quality: "great" },
          { text: "Okay, but the deadlines still need to be met. What's your plan?", next: "dismissive", quality: "medium" }
        ]
      },
      direct_closed: {
        speaker: "Jordan",
        text: "I don't know. Just... stuff.",
        choices: [
          { text: "What kind of stuff? I'm trying to understand.", next: "recover", quality: "good" },
          { text: "That's not an answer. I need specifics.", next: "defensive", quality: "poor" },
          { text: "It sounds like something's weighing on you. What's going on?", next: "probing_good", quality: "great" }
        ]
      },
      gentle_open: {
        speaker: "Jordan",
        text: "Honestly? Not great. I've been struggling. There's stuff at home and I've been distracted.",
        choices: [
          { text: "I'm sorry to hear that. What would help you right now?", next: "supportive", quality: "great" },
          { text: "What's happening at home?", next: "too_personal", quality: "medium" },
          { text: "How is that affecting your work?", next: "work_focus", quality: "good" },
          { text: "Thank you for telling me that. You don't have to share details you're not comfortable with, but I'm here to listen.", next: "supportive", quality: "great" },
          { text: "We all get distracted sometimes. Just try to keep up with the deadlines, okay?", next: "dismissive", quality: "poor" }
        ]
      },
      probing_good: {
        speaker: "Jordan",
        text: "My mom got sick. I've been driving to see her on weekends and it's just... I can't focus. I know I'm dropping balls.",
        choices: [
          { text: "I'm really sorry. That's a lot to carry. What do you need from me right now?", next: "ending_great", quality: "great" },
          { text: "That's hard. Can you still hit your deadlines?", next: "ending_medium", quality: "medium" },
          { text: "Why didn't you tell me sooner?", next: "ending_poor", quality: "poor" }
        ]
      },
      recover: {
        speaker: "Jordan",
        text: "There's family stuff. My mom's been sick and I've been trying to help out.",
        choices: [
          { text: "I'm sorry to hear that. What would help you manage both right now?", next: "ending_great", quality: "great" },
          { text: "That's tough. We need to figure out how to get you back on track though.", next: "ending_medium", quality: "medium" },
          { text: "That's a lot to carry. How long has this been going on?", next: "probing_good", quality: "good" },
          { text: "You should have told me sooner. We could have worked something out.", next: "ending_poor", quality: "poor" }
        ]
      },
      dismissive: {
        speaker: "Jordan",
        text: "Yeah. Sure.",
        choices: [
          { text: "I'm sorry, that came out wrong. What's really going on?", next: "recover", quality: "good" }
        ]
      },
      defensive: {
        speaker: "Jordan",
        text: "Look, I'm trying my best, okay? Not everyone can be perfect all the time.",
        choices: [
          { text: "You're right, I pushed too hard. Let me try again\u2014what's been difficult lately?", next: "recover", quality: "good" }
        ]
      },
      supportive: {
        speaker: "Jordan",
        text: "Honestly, just knowing you're not going to fire me helps. I feel like I've been barely holding on.",
        choices: [
          { text: "You're not going anywhere. Let's talk about what support you need.", next: "ending_great", quality: "great" }
        ]
      },
      too_personal: {
        speaker: "Jordan",
        text: "I... it's personal. My mom is sick.",
        choices: [
          { text: "I'm sorry, I didn't mean to pry. What would be helpful for you right now?", next: "ending_great", quality: "great" }
        ]
      },
      work_focus: {
        speaker: "Jordan",
        text: "I can't concentrate. I'm constantly worried. I know my work is suffering.",
        choices: [
          { text: "What would make this more manageable for you?", next: "ending_great", quality: "great" }
        ]
      },
      ending_great: {
        speaker: "Jordan",
        text: "Thank you. I didn't know how to bring this up. Maybe some flexibility on deadlines? And I'll try to communicate better when I'm struggling.",
        isEnding: true,
        summary: "You created psychological safety through open, empathetic questions. Jordan felt heard and you found a path forward together."
      },
      ending_medium: {
        speaker: "Jordan",
        text: "I'll try harder.",
        isEnding: true,
        summary: "You got some information but shifted to problem-solving before Jordan felt fully heard. The trust-building was incomplete."
      },
      ending_poor: {
        speaker: "Jordan",
        text: "I didn't think you'd care. I'll figure it out.",
        isEnding: true,
        summary: "The conversation created more distance. Questions felt like interrogation rather than curiosity. Jordan is less likely to open up in the future."
      }
    }
  },
  {
    id: 2,
    title: "The Career Crossroads",
    label: "Mentoring Scenario",
    skillCategory: "Probing",
    difficultyTier: "beginner",
    context: "A junior colleague, Sam, has asked to meet with you. They seem unsure about their career direction and are considering leaving the company.",
    opening: "Thanks for making time. I've been doing a lot of thinking lately.",
    nodes: {
      start: {
        speaker: "Sam",
        text: "Thanks for making time. I've been doing a lot of thinking lately.",
        choices: [
          { text: "What's been on your mind?", next: "open_start", quality: "great" },
          { text: "Are you thinking about leaving?", next: "direct_start", quality: "medium" },
          { text: "Thinking about what?", next: "neutral_start", quality: "good" },
          { text: "I'm glad you reached out. Take your time — I'm here to listen.", next: "open_start", quality: "great" },
          { text: "Yeah, you mentioned that. What's going on?", next: "neutral_start", quality: "medium" }
        ]
      },
      open_start: {
        speaker: "Sam",
        text: "I'm not sure if this is the right path for me anymore. I feel like I'm just going through the motions.",
        choices: [
          { text: "What would 'right' look like for you?", next: "values_explore", quality: "great" },
          { text: "When did you start feeling this way?", next: "timeline", quality: "good" },
          { text: "Have you thought about what else you'd do?", next: "alternatives", quality: "medium" },
          { text: "Going through the motions is a tough place to be. What's missing for you right now?", next: "values_explore", quality: "great" },
          { text: "Everyone feels that way sometimes. I'm sure it'll pass.", next: "advice_too_soon", quality: "poor" }
        ]
      },
      direct_start: {
        speaker: "Sam",
        text: "Maybe. I don't know. I feel stuck.",
        choices: [
          { text: "What does 'stuck' feel like for you?", next: "values_explore", quality: "great" },
          { text: "Stuck how?", next: "timeline", quality: "good" },
          { text: "I hear you. When you say stuck, is it the role itself or something bigger?", next: "values_explore", quality: "good" },
          { text: "If you're feeling stuck, maybe you just need a new project to energize you.", next: "advice_too_soon", quality: "poor" }
        ]
      },
      neutral_start: {
        speaker: "Sam",
        text: "My career, I guess. Whether I'm in the right place.",
        choices: [
          { text: "What's making you question it?", next: "values_explore", quality: "great" },
          { text: "Do you like what you're doing day to day?", next: "daily_work", quality: "good" },
          { text: "That's a big question. What would 'the right place' feel like?", next: "values_explore", quality: "great" },
          { text: "You're still early in your career. Give it more time.", next: "advice_too_soon", quality: "poor" }
        ]
      },
      values_explore: {
        speaker: "Sam",
        text: "I wanted to make a difference. But lately I just feel like a cog. I'm doing tasks, but I don't know why they matter.",
        choices: [
          { text: "What would 'making a difference' look like in practice?", next: "vision", quality: "great" },
          { text: "That's common in big companies. Have you talked to your manager?", next: "advice_too_soon", quality: "medium" },
          { text: "When have you felt like you were making a difference?", next: "past_success", quality: "great" },
          { text: "Feeling like a cog is soul-crushing. What part of your work still feels meaningful, even a little?", next: "daily_work", quality: "good" },
          { text: "Have you thought about transferring to a different team or role?", next: "alternatives", quality: "poor" }
        ]
      },
      timeline: {
        speaker: "Sam",
        text: "Probably the last six months. After that reorg, things changed.",
        choices: [
          { text: "What changed for you specifically?", next: "values_explore", quality: "great" },
          { text: "Reorgs are tough. It usually gets better.", next: "advice_too_soon", quality: "poor" },
          { text: "Six months is a long time to sit with that feeling. What kept you from saying something sooner?", next: "values_explore", quality: "good" },
          { text: "Tell me what things were like before the reorg, compared to now.", next: "values_explore", quality: "good" }
        ]
      },
      alternatives: {
        speaker: "Sam",
        text: "Not really. That's part of the problem. I just know this isn't it.",
        choices: [
          { text: "What do you know about what you want, even if it's vague?", next: "values_explore", quality: "great" }
        ]
      },
      daily_work: {
        speaker: "Sam",
        text: "Some of it. The creative parts. But that's like 10% of my job now.",
        choices: [
          { text: "What if you could make that 30%? What would need to change?", next: "vision", quality: "great" }
        ]
      },
      vision: {
        speaker: "Sam",
        text: "I'd want to work on things that matter to real people. See the impact. Have more autonomy over what I work on.",
        choices: [
          { text: "Where could you find that\u2014here or elsewhere?", next: "options", quality: "great" },
          { text: "That sounds like you want to start your own thing.", next: "assumption", quality: "medium" }
        ]
      },
      past_success: {
        speaker: "Sam",
        text: "Two years ago, we launched that community project. I worked directly with users. I could see how our work helped them.",
        choices: [
          { text: "What made that experience different from now?", next: "vision", quality: "great" },
          { text: "Could you find something like that here again?", next: "options", quality: "good" }
        ]
      },
      advice_too_soon: {
        speaker: "Sam",
        text: "Yeah, maybe. I don't know.",
        choices: [
          { text: "Let me back up. What would meaningful work look like for you?", next: "values_explore", quality: "great" }
        ]
      },
      assumption: {
        speaker: "Sam",
        text: "Maybe? I hadn't thought about it that specifically.",
        choices: [
          { text: "What appeals to you about that idea? And what scares you?", next: "ending_great", quality: "great" }
        ]
      },
      options: {
        speaker: "Sam",
        text: "I honestly don't know. I haven't let myself think about it that clearly.",
        choices: [
          { text: "What's stopped you from thinking about it?", next: "ending_great", quality: "great" },
          { text: "Well, you should figure that out.", next: "ending_medium", quality: "poor" }
        ]
      },
      ending_great: {
        speaker: "Sam",
        text: "I think I've been afraid to admit I want something different. This conversation helped me see that more clearly. Thank you.",
        isEnding: true,
        summary: "You helped Sam clarify their own values through questions rather than advice. They left with more clarity and will likely come back to you for future guidance."
      },
      ending_medium: {
        speaker: "Sam",
        text: "Yeah. I'll think about it. Thanks for your time.",
        isEnding: true,
        summary: "The conversation was helpful but you shifted to advice-giving before Sam had fully explored their own thinking. The insight was yours, not theirs."
      }
    }
  },
  {
    id: 3,
    title: "The Difficult Feedback",
    label: "Workplace Scenario",
    skillCategory: "Framing",
    difficultyTier: "intermediate",
    context: "You need to give feedback to Alex, a colleague whose work has been sloppy lately. Alex tends to get defensive when criticized. You've asked to chat.",
    opening: "What's up? You said you wanted to talk?",
    nodes: {
      start: {
        speaker: "Alex",
        text: "What's up? You said you wanted to talk?",
        choices: [
          { text: "I've noticed some issues with the recent deliverables and wanted to understand what's happening.", next: "curious_open", quality: "great" },
          { text: "We need to talk about the quality of your work lately.", next: "direct_critical", quality: "medium" },
          { text: "Your work has been sloppy. What's going on?", next: "accusatory", quality: "poor" },
          { text: "Yeah, thanks for sitting down. I wanted to share some observations and get your take on things.", next: "curious_open", quality: "good" },
          { text: "I've got some concerns about a few recent projects. Can I walk you through what I've seen?", next: "specifics_curious", quality: "great" }
        ]
      },
      curious_open: {
        speaker: "Alex",
        text: "Issues? Like what?",
        choices: [
          { text: "The last two reports had errors that made it to the client. I'm curious what's been different in your process lately.", next: "specifics_curious", quality: "great" },
          { text: "Several errors. You need to be more careful.", next: "vague_critical", quality: "poor" },
          { text: "Can I share some specific examples and get your perspective?", next: "specifics_curious", quality: "great" },
          { text: "Before I get into specifics, what's your own sense of how the recent deliverables have gone?", next: "process_explore", quality: "good" }
        ]
      },
      direct_critical: {
        speaker: "Alex",
        text: "What do you mean? I've been working hard.",
        choices: [
          { text: "I don't doubt that. Help me understand\u2014what's your quality check process before you submit?", next: "process_explore", quality: "great" },
          { text: "Working hard isn't the same as working well.", next: "defensive_trigger", quality: "poor" },
          { text: "I know you have been. That's why I'm confused by the recent errors. What's changed?", next: "specifics_curious", quality: "good" }
        ]
      },
      accusatory: {
        speaker: "Alex",
        text: "Sloppy? That's harsh. I'm doing my best with everything on my plate.",
        choices: [
          { text: "You're right, that was too blunt. Let me try again\u2014what's making things harder right now?", next: "recover", quality: "good" },
          { text: "Everyone's busy. That's not an excuse.", next: "defensive_trigger", quality: "poor" },
          { text: "I'm sorry, that came out wrong. What I meant is I've seen some errors and I want to understand what's behind them.", next: "specifics_curious", quality: "great" },
          { text: "I hear you. Let's set aside how I said it. Can you walk me through what's on your plate right now?", next: "recover", quality: "good" }
        ]
      },
      specifics_curious: {
        speaker: "Alex",
        text: "I... honestly, I've been rushing. We've had so many deadlines back to back. I haven't had time to double-check things.",
        choices: [
          { text: "That makes sense. What would you need to have time to do proper quality checks?", next: "solution_collab", quality: "great" },
          { text: "You need to make time. Quality can't slip.", next: "pushback", quality: "medium" },
          { text: "What's one thing that would help you slow down without missing deadlines?", next: "solution_collab", quality: "great" }
        ]
      },
      process_explore: {
        speaker: "Alex",
        text: "Honestly? I've been skipping my usual review step because there's no time. I know that's not good.",
        choices: [
          { text: "I appreciate you being honest. What would it take to bring that step back?", next: "solution_collab", quality: "great" },
          { text: "So you know it's a problem. Why haven't you fixed it?", next: "pushback", quality: "poor" },
          { text: "That tells me a lot. What does the review step usually look like when you have time for it?", next: "solution_collab", quality: "good" },
          { text: "It sounds like the process isn't the issue \u2014 the workload is. What would need to change?", next: "solution_collab", quality: "great" }
        ]
      },
      vague_critical: {
        speaker: "Alex",
        text: "Can you be more specific? I'm not sure what you're referring to.",
        choices: [
          { text: "Sure. The Henderson report had three calculation errors. What do you remember about putting that together?", next: "specifics_curious", quality: "great" }
        ]
      },
      defensive_trigger: {
        speaker: "Alex",
        text: "Look, I'm trying. Maybe if I had more support instead of more criticism, things would be different.",
        choices: [
          { text: "That's fair. What kind of support would actually help?", next: "recover", quality: "great" },
          { text: "I'm trying to help. But you need to own this.", next: "ending_poor", quality: "poor" }
        ]
      },
      recover: {
        speaker: "Alex",
        text: "I don't know... maybe just some acknowledgment that I'm stretched thin. And maybe help prioritizing when everything is 'urgent.'",
        choices: [
          { text: "That's a reasonable ask. Let's look at your plate together. What feels most overwhelming right now?", next: "solution_collab", quality: "great" }
        ]
      },
      pushback: {
        speaker: "Alex",
        text: "Easy for you to say. You're not the one juggling five projects.",
        choices: [
          { text: "You're right, I don't have full visibility into your workload. Walk me through it?", next: "solution_collab", quality: "great" },
          { text: "Everyone has a lot going on.", next: "ending_medium", quality: "poor" }
        ]
      },
      solution_collab: {
        speaker: "Alex",
        text: "If I could push back one deadline\u2014just one\u2014I could actually do things right. But I feel like I can't say no to anything.",
        choices: [
          { text: "What if we looked at your deadlines together and I helped you have that conversation with the stakeholders?", next: "ending_great", quality: "great" },
          { text: "You can say no. You just have to prioritize.", next: "ending_medium", quality: "medium" }
        ]
      },
      ending_great: {
        speaker: "Alex",
        text: "Really? That would help a lot. I think I've been too afraid to ask for help. Thanks for actually listening instead of just criticizing.",
        isEnding: true,
        summary: "You turned a potentially defensive conversation into a collaborative one. By asking curious questions instead of making accusations, you uncovered the real issue and found a solution together."
      },
      ending_medium: {
        speaker: "Alex",
        text: "Okay. I'll try to manage better.",
        isEnding: true,
        summary: "You addressed the issue but the conversation stayed somewhat adversarial. Alex will try harder, but may not feel supported. The underlying workload issue remains unresolved."
      },
      ending_poor: {
        speaker: "Alex",
        text: "Fine. I hear you.",
        isEnding: true,
        summary: "The conversation damaged your relationship. Alex feels criticized and unsupported. Quality may improve short-term out of fear, but trust has eroded and the real problem wasn't addressed."
      }
    }
  },
  {
    id: 4,
    title: "The First Date",
    label: "Personal Scenario",
    skillCategory: "Open vs. Closed",
    difficultyTier: "beginner",
    context: "You're on a first date with Jamie at a coffee shop. The conversation has been pleasant but surface-level. You want to get to know them better without it feeling like an interview.",
    opening: "So... this place is nice. Do you come here often?",
    nodes: {
      start: {
        speaker: "Jamie",
        text: "So... this place is nice. Do you come here often?",
        choices: [
          { text: "Sometimes. What made you pick this neighborhood to live in?", next: "location_open", quality: "good" },
          { text: "Yeah, it's great. So, what do you do for work?", next: "work_surface", quality: "medium" },
          { text: "I do. There's a story behind why\u2014want to hear it?", next: "share_first", quality: "great" },
          { text: "First time, actually. A friend told me the vibes are good here. What's your go-to coffee order?", next: "positive_explore", quality: "good" },
          { text: "Yeah. Good coffee. So tell me about yourself.", next: "work_surface", quality: "poor" }
        ]
      },
      share_first: {
        speaker: "Jamie",
        text: "Sure, I'd love to hear it!",
        choices: [
          { text: "[Share a brief, genuine story] What about you\u2014do you have a place like that? Somewhere that means something?", next: "meaning_explore", quality: "great" }
        ]
      },
      location_open: {
        speaker: "Jamie",
        text: "Oh, I moved here for work about two years ago. Still figuring out if it's home or just where I live, you know?",
        choices: [
          { text: "That's an interesting distinction. What would make it feel like home?", next: "meaning_explore", quality: "great" },
          { text: "Where did you move from?", next: "facts_only", quality: "medium" },
          { text: "I get that. What's been the best part about being here?", next: "positive_explore", quality: "good" }
        ]
      },
      work_surface: {
        speaker: "Jamie",
        text: "I'm in marketing. It's fine. Pays the bills. What about you?",
        choices: [
          { text: "I'm in [field]. But work aside\u2014what do you actually enjoy spending time on?", next: "passion_explore", quality: "great" },
          { text: "I work in [field]. How'd you get into marketing?", next: "career_path", quality: "medium" },
          { text: "Just 'fine'? What would make it more than that?", next: "meaning_explore", quality: "great" }
        ]
      },
      meaning_explore: {
        speaker: "Jamie",
        text: "Hmm, that's a good question. I think... feeling like I belong. Having people who know me beyond small talk.",
        choices: [
          { text: "What does it feel like when someone really knows you?", next: "deep_connection", quality: "great" },
          { text: "Have you found that here at all?", next: "vulnerability_open", quality: "good" },
          { text: "That's important. Do you find that easy or hard?", next: "vulnerability_open", quality: "great" }
        ]
      },
      facts_only: {
        speaker: "Jamie",
        text: "Portland. It was nice but kind of small. Ready for something new.",
        choices: [
          { text: "What were you hoping to find in something new?", next: "meaning_explore", quality: "great" },
          { text: "I've heard Portland is great. What did you like about it?", next: "positive_explore", quality: "medium" },
          { text: "That's a bold move. What gave you the push to actually do it?", next: "meaning_explore", quality: "great" },
          { text: "Cool. Do you miss it?", next: "positive_explore", quality: "poor" }
        ]
      },
      positive_explore: {
        speaker: "Jamie",
        text: "The food scene, honestly. And I've met some good people through a hiking group.",
        choices: [
          { text: "Hiking group sounds fun. What got you into hiking?", next: "passion_explore", quality: "good" },
          { text: "What do you love about being outdoors?", next: "passion_explore", quality: "great" },
          { text: "Meeting good people through a shared interest \u2014 that's the best way. What do those friendships mean to you?", next: "meaning_explore", quality: "great" },
          { text: "Nice. What's your favorite restaurant so far?", next: "facts_only_2", quality: "medium" }
        ]
      },
      passion_explore: {
        speaker: "Jamie",
        text: "There's something about being in nature that resets my brain. The silence. No notifications. Just... existing.",
        choices: [
          { text: "That sounds like something you need, not just something you like. When did you realize that about yourself?", next: "deep_connection", quality: "great" },
          { text: "Do you go often?", next: "facts_only_2", quality: "medium" },
          { text: "Just existing \u2014 I love how you put that. What does life feel like when you don't have that reset?", next: "deep_connection", quality: "great" },
          { text: "I should try hiking. What trail would you recommend?", next: "story_invite", quality: "good" }
        ]
      },
      career_path: {
        speaker: "Jamie",
        text: "Kind of fell into it. Studied communications, needed a job, here I am. Not exactly a passion.",
        choices: [
          { text: "What would a passion look like for you?", next: "meaning_explore", quality: "great" },
          { text: "What did you want to do originally?", next: "vulnerability_open", quality: "good" }
        ]
      },
      vulnerability_open: {
        speaker: "Jamie",
        text: "Honestly? I wanted to write. Stories, maybe novels. But that felt impractical. So marketing it is.",
        choices: [
          { text: "Do you still write?", next: "deep_connection", quality: "great" },
          { text: "What kind of stories?", next: "deep_connection", quality: "great" },
          { text: "It's not too late, you know.", next: "advice_misstep", quality: "medium" }
        ]
      },
      facts_only_2: {
        speaker: "Jamie",
        text: "When I can. Maybe twice a month. Depends on weather and work.",
        choices: [
          { text: "What's the most memorable hike you've done?", next: "story_invite", quality: "great" }
        ]
      },
      deep_connection: {
        speaker: "Jamie",
        text: "Sometimes, late at night. Short things. It's private\u2014I don't show anyone. But there's something that happens when I write that doesn't happen anywhere else.",
        choices: [
          { text: "What does that feel like\u2014that thing that happens?", next: "ending_great", quality: "great" },
          { text: "I'd love to read something someday if you ever want to share.", next: "ending_great", quality: "good" },
          { text: "You should do more of that.", next: "ending_medium", quality: "medium" }
        ]
      },
      story_invite: {
        speaker: "Jamie",
        text: "There's this spot two hours north. You climb for ages, and at the top there's this lake that's so clear you can see the bottom. I sat there for an hour just... breathing.",
        choices: [
          { text: "That sounds like a moment. What were you thinking about up there?", next: "ending_great", quality: "great" },
          { text: "That sounds beautiful. I'd love to see it sometime.", next: "ending_good", quality: "good" }
        ]
      },
      advice_misstep: {
        speaker: "Jamie",
        text: "Yeah, maybe. Anyway, what about you?",
        choices: [
          { text: "[Redirect] Before I answer\u2014I'm curious. What would you write about if you did?", next: "deep_connection", quality: "great" }
        ]
      },
      ending_great: {
        speaker: "Jamie",
        text: "Wow. I don't usually talk about this stuff on a first date. There's something about the questions you ask... I feel like you actually want to know me. Not just the resume version.",
        isEnding: true,
        summary: "You created genuine connection by going beyond surface questions. By asking about meaning and feelings rather than just facts, you helped Jamie open up. This date will be remembered."
      },
      ending_good: {
        speaker: "Jamie",
        text: "This has been really nice. Different from most first dates. You're easy to talk to.",
        isEnding: true,
        summary: "You had a good conversation with some moments of real connection. You showed interest and warmth. There's a foundation here to build on."
      },
      ending_medium: {
        speaker: "Jamie",
        text: "Yeah, this was nice. Thanks for the coffee.",
        isEnding: true,
        summary: "The conversation was pleasant but stayed somewhat surface. You gathered facts but didn't quite reach the level of genuine curiosity that creates memorable connection."
      }
    }
  },
  {
    id: 5,
    title: "The Customer Discovery",
    label: "Business Scenario",
    skillCategory: "Clarifying",
    difficultyTier: "intermediate",
    context: "You're interviewing a potential customer, Morgan, to understand their problems before building a product. Your goal is to learn, not to sell.",
    opening: "Thanks for taking the time. So what would you like to know about our product?",
    nodes: {
      start: {
        speaker: "Morgan",
        text: "Thanks for taking the time. So what would you like to know about our product?",
        choices: [
          { text: "Actually, I'm here to learn about you. What's your day-to-day like?", next: "redirect_good", quality: "great" },
          { text: "I'd love to tell you about it! We built this tool that...", next: "pitch_mistake", quality: "poor" },
          { text: "Before that\u2014can you walk me through how you currently handle [problem area]?", next: "process_explore", quality: "great" },
          { text: "We'll get to that. But first, I'm curious \u2014 what's the biggest headache in your work right now?", next: "redirect_good", quality: "good" },
          { text: "I'll share all the details. But what would be most useful is if you could tell me what problems you're hoping we solve.", next: "process_explore", quality: "good" }
        ]
      },
      redirect_good: {
        speaker: "Morgan",
        text: "Oh, interesting. Well, I manage a team of 12 and we handle customer support. It's... chaotic, honestly.",
        choices: [
          { text: "Chaotic how? Walk me through a typical day.", next: "pain_explore", quality: "great" },
          { text: "We can help with that chaos.", next: "pitch_mistake", quality: "poor" },
          { text: "What makes it chaotic versus just busy?", next: "pain_explore", quality: "great" }
        ]
      },
      pitch_mistake: {
        speaker: "Morgan",
        text: "Okay... I'm listening.",
        choices: [
          { text: "Actually, wait. Let me back up. I'm more interested in understanding your situation first. What's the biggest challenge you're facing right now?", next: "recover", quality: "great" }
        ]
      },
      process_explore: {
        speaker: "Morgan",
        text: "Right now we use a mix of email, Slack, and spreadsheets. It's held together with duct tape, honestly.",
        choices: [
          { text: "What breaks most often?", next: "pain_explore", quality: "great" },
          { text: "We can replace all that with one tool.", next: "pitch_mistake", quality: "poor" },
          { text: "When did you realize it wasn't working?", next: "history_explore", quality: "great" }
        ]
      },
      pain_explore: {
        speaker: "Morgan",
        text: "Things fall through the cracks. A customer will email, then Slack, then call\u2014and nobody knows who talked to them last. We look incompetent.",
        choices: [
          { text: "What happens when something falls through the cracks? What's the impact?", next: "impact_explore", quality: "great" },
          { text: "How often does that happen?", next: "frequency_explore", quality: "good" },
          { text: "That's exactly what we solve.", next: "premature_solution", quality: "medium" }
        ]
      },
      recover: {
        speaker: "Morgan",
        text: "Honestly? Keeping track of everything. We're growing faster than our systems can handle.",
        choices: [
          { text: "What have you tried so far to fix that?", next: "attempted_solutions", quality: "great" },
          { text: "Tell me more about what 'keeping track' involves day to day.", next: "pain_explore", quality: "great" },
          { text: "Growth outpacing systems is a common pain point. What breaks first when things get busy?", next: "pain_explore", quality: "good" },
          { text: "Got it. We can definitely fix that for you.", next: "premature_solution", quality: "medium" }
        ]
      },
      history_explore: {
        speaker: "Morgan",
        text: "About six months ago. We doubled our customer base and suddenly everything was on fire.",
        choices: [
          { text: "What did you try first to deal with it?", next: "attempted_solutions", quality: "great" },
          { text: "What's the cost of not fixing it?", next: "impact_explore", quality: "great" },
          { text: "Doubling your customer base is exciting but painful. What specifically caught fire first?", next: "pain_explore", quality: "good" },
          { text: "We see that a lot. Our tool handles exactly that kind of scaling.", next: "premature_solution", quality: "poor" }
        ]
      },
      impact_explore: {
        speaker: "Morgan",
        text: "We've lost customers over it. And the team is burnt out. I had two people quit last quarter, and I think this was part of it.",
        choices: [
          { text: "That's significant. When you imagine it fixed, what's different?", next: "vision_explore", quality: "great" },
          { text: "What would solving this be worth to you?", next: "value_explore", quality: "great" },
          { text: "We can definitely help with that.", next: "premature_solution", quality: "medium" }
        ]
      },
      frequency_explore: {
        speaker: "Morgan",
        text: "Multiple times a week. It's become normal, which is the scary part.",
        choices: [
          { text: "What's the impact when it happens?", next: "impact_explore", quality: "great" },
          { text: "What's prevented you from fixing it so far?", next: "attempted_solutions", quality: "great" }
        ]
      },
      premature_solution: {
        speaker: "Morgan",
        text: "How exactly?",
        choices: [
          { text: "Before I explain\u2014what have you already tried? I want to make sure I'm not suggesting something you've ruled out.", next: "attempted_solutions", quality: "great" }
        ]
      },
      attempted_solutions: {
        speaker: "Morgan",
        text: "We tried a CRM but it was too complex. Nobody used it. We tried more meetings but that just ate more time. We're kind of stuck.",
        choices: [
          { text: "What made the CRM too complex? What specifically didn't work?", next: "requirements_emerge", quality: "great" },
          { text: "If you designed the perfect solution, what would it do?", next: "vision_explore", quality: "great" }
        ]
      },
      requirements_emerge: {
        speaker: "Morgan",
        text: "It tried to do everything. We just needed to see who talked to a customer last and what was said. Instead we got 50 fields and a three-month implementation.",
        choices: [
          { text: "So simplicity and speed to deploy are key. What else would be non-negotiable?", next: "vision_explore", quality: "great" }
        ]
      },
      vision_explore: {
        speaker: "Morgan",
        text: "I want my team to open one screen and see everything about a customer. And I want it to take days to set up, not months. Is that possible?",
        choices: [
          { text: "It might be. One more question\u2014who would need to approve a purchase like this? What would they care about?", next: "ending_great", quality: "great" },
          { text: "Absolutely. Let me show you what we built.", next: "ending_good", quality: "good" }
        ]
      },
      value_explore: {
        speaker: "Morgan",
        text: "If I'm being honest? A lot. The churn alone is probably costing us $50K a year. And I can't put a number on the burnout.",
        choices: [
          { text: "That's helpful context. What would need to be true for a solution to be worth investing in?", next: "vision_explore", quality: "great" }
        ]
      },
      ending_great: {
        speaker: "Morgan",
        text: "My CTO would need to sign off. She cares about security and integration with our existing tools. But honestly, if you can do what you're describing, I'll champion it.",
        isEnding: true,
        summary: "Excellent discovery call. You resisted the urge to pitch and instead uncovered real pain, failed solutions, and buying criteria. You know what to build and how to sell it. Morgan feels heard, not sold to."
      },
      ending_good: {
        speaker: "Morgan",
        text: "Okay, show me.",
        isEnding: true,
        summary: "Good discovery call. You learned about the problem and got permission to present. But you transitioned to pitching before fully understanding the buying process. You may miss objections that come up later."
      }
    }
  },
  {
    id: 6,
    title: "The Family Dinner",
    label: "Personal Scenario",
    skillCategory: "Empathy",
    difficultyTier: "intermediate",
    context: "You're having dinner with your parent (Pat) whom you haven't seen in a few months. The relationship is loving but you often stay on the surface. You want to connect more deeply.",
    opening: "It's so good to see you! How's work going?",
    nodes: {
      start: {
        speaker: "Pat",
        text: "It's so good to see you! How's work going?",
        choices: [
          { text: "Work's good. But I'd rather hear about you. What's been on your mind lately?", next: "redirect_to_them", quality: "great" },
          { text: "Same old. Busy. How about you\u2014how's retirement treating you?", next: "surface_exchange", quality: "medium" },
          { text: "Actually, before we do the updates\u2014I've been thinking. I don't think we really talk anymore. Can we try something different tonight?", next: "meta_open", quality: "great" },
          { text: "It's going fine. Hey, I've missed you. How have you really been?", next: "redirect_to_them", quality: "good" },
          { text: "Good, good. What's for dinner? I'm starving.", next: "surface_continue", quality: "poor" }
        ]
      },
      redirect_to_them: {
        speaker: "Pat",
        text: "Me? Oh, you know. Keeping busy. The garden's doing well.",
        choices: [
          { text: "What do you love about the garden? What does it give you?", next: "meaning_explore", quality: "great" },
          { text: "That's nice. What else have you been up to?", next: "surface_continue", quality: "medium" },
          { text: "Can I ask you something I've wondered about? What do you think about when you're out there?", next: "meaning_explore", quality: "great" }
        ]
      },
      surface_exchange: {
        speaker: "Pat",
        text: "Oh, it's fine. A lot of time on my hands. But I stay busy.",
        choices: [
          { text: "Do you like having more time? Or is it hard sometimes?", next: "vulnerability_invite", quality: "great" },
          { text: "That's good. Staying busy is important.", next: "surface_continue", quality: "poor" },
          { text: "What do you fill your time with these days? What gives you energy?", next: "meaning_explore", quality: "good" },
          { text: "A lot of time on your hands \u2014 that sounds like it could be a blessing or a curse. Which is it for you?", next: "vulnerability_invite", quality: "great" }
        ]
      },
      meta_open: {
        speaker: "Pat",
        text: "Different? What do you mean?",
        choices: [
          { text: "I feel like we always talk about what we're doing, but not what we're feeling or thinking. I want to know how you really are.", next: "vulnerability_invite", quality: "great" },
          { text: "Never mind, it's nothing. So how's the house?", next: "surface_continue", quality: "poor" },
          { text: "I just mean \u2014 I realized I don't ask you the real questions enough. Like, what's making you happy these days? What's hard?", next: "vulnerability_invite", quality: "great" },
          { text: "I don't know exactly. I just want tonight to be more than catching up on logistics. Can we talk about something that matters?", next: "permission_ask", quality: "good" }
        ]
      },
      meaning_explore: {
        speaker: "Pat",
        text: "The garden? I don't know... it's peaceful. I can see progress. Plant something, it grows. Feels like I'm doing something that matters, even if it's small.",
        choices: [
          { text: "Do you feel that way in other parts of life? That what you do matters?", next: "deep_territory", quality: "great" },
          { text: "I can see why you love it. What are you growing right now?", next: "retreat_to_facts", quality: "medium" },
          { text: "That's beautiful. I didn't know the garden meant that much to you. What else gives you that feeling?", next: "deep_territory", quality: "great" },
          { text: "That's nice. You always did have a green thumb.", next: "surface_continue", quality: "poor" }
        ]
      },
      surface_continue: {
        speaker: "Pat",
        text: "Same old things. Doctor's appointments. Errands. Saw the neighbors the other day.",
        choices: [
          { text: "Can I ask you something more personal?", next: "permission_ask", quality: "great" },
          { text: "How are the neighbors doing?", next: "surface_ending", quality: "poor" }
        ]
      },
      vulnerability_invite: {
        speaker: "Pat",
        text: "How I really am? Well... honestly? Some days are lonelier than others. But I don't want to burden you with that.",
        choices: [
          { text: "You're not burdening me. Tell me about the lonely days. What are they like?", next: "deep_territory", quality: "great" },
          { text: "You're not a burden. But if you ever need anything, I'm here.", next: "caring_but_closed", quality: "medium" }
        ]
      },
      permission_ask: {
        speaker: "Pat",
        text: "Sure, what is it?",
        choices: [
          { text: "Are you happy? Like, genuinely? I realize I've never actually asked.", next: "deep_territory", quality: "great" },
          { text: "What do you wish we talked about more?", next: "meta_reflection", quality: "great" }
        ]
      },
      deep_territory: {
        speaker: "Pat",
        text: "Happy? That's a big question. I have good days and hard days. I miss your mother. I miss feeling useful. But I have you, and that means everything.",
        choices: [
          { text: "I miss her too. What do you miss most about her?", next: "shared_grief", quality: "great" },
          { text: "What would help you feel more useful?", next: "future_focus", quality: "great" },
          { text: "I'm glad I can be here for you.", next: "caring_but_closed", quality: "medium" }
        ]
      },
      retreat_to_facts: {
        speaker: "Pat",
        text: "Tomatoes, peppers, some herbs. The usual. Might try squash this year.",
        choices: [
          { text: "I'd love to hear more about that. But can I ask\u2014are you doing okay? Really?", next: "vulnerability_invite", quality: "great" }
        ]
      },
      caring_but_closed: {
        speaker: "Pat",
        text: "I know you are. Thank you.",
        choices: [
          { text: "I mean it though. What would actually help? What do you need that you're not getting?", next: "deep_territory", quality: "great" }
        ]
      },
      meta_reflection: {
        speaker: "Pat",
        text: "I wish we talked about... I don't know. The real stuff. How you're really doing. Whether you're happy. What you're scared of. We never did that when you were young, and now I don't know how.",
        choices: [
          { text: "We can start now. What are you scared of?", next: "shared_vulnerability", quality: "great" },
          { text: "I want that too. Let's practice. I'll start\u2014I'm scared of losing you.", next: "shared_vulnerability", quality: "great" }
        ]
      },
      shared_grief: {
        speaker: "Pat",
        text: "Everything. Her laugh. How she knew what I was thinking. Coming home to someone. It's the small things that get you.",
        choices: [
          { text: "Thank you for sharing that with me. I don't think we've ever really talked about losing her.", next: "ending_great", quality: "great" }
        ]
      },
      future_focus: {
        speaker: "Pat",
        text: "I don't know. Feeling like I contribute something. When you were young I had purpose. Now I'm not sure what I'm for.",
        choices: [
          { text: "What if we found something to do together? Not errands\u2014something meaningful?", next: "ending_great", quality: "great" },
          { text: "You're still my parent. That never stops mattering.", next: "ending_good", quality: "good" }
        ]
      },
      shared_vulnerability: {
        speaker: "Pat",
        text: "I'm scared of being forgotten. Of being a burden. Of the day you don't call because you're too busy. I know that's silly.",
        choices: [
          { text: "It's not silly. I'm scared I'll look back and realize I never really knew you. That's why I wanted tonight to be different.", next: "ending_great", quality: "great" }
        ]
      },
      surface_ending: {
        speaker: "Pat",
        text: "They're fine. Same as always. So, what do you want for dinner?",
        isEnding: true,
        summary: "The conversation stayed on the surface. You had a pleasant meal, but no deeper connection was made. The relationship stays where it was."
      },
      ending_great: {
        speaker: "Pat",
        text: "This is the best conversation we've had in years. I forget sometimes that you're not just my kid\u2014you're someone I can actually talk to. Thank you for asking the questions you did.",
        isEnding: true,
        summary: "You broke through the surface and had a real conversation. By asking questions that went beyond updates and into feelings, fears, and meaning, you created genuine connection. This dinner will be remembered."
      },
      ending_good: {
        speaker: "Pat",
        text: "This was nice. Really nice. Let's do this more often.",
        isEnding: true,
        summary: "You had meaningful moments and showed you care. The conversation went deeper than usual. There's an opening now for more conversations like this."
      }
    }
  },
  {
    id: 7,
    title: "The Tense Performance Review",
    label: "Read the Room",
    skillCategory: "Body Language",
    difficultyTier: "advanced",
    context: "You're a team lead having a quarterly check-in with Casey, a talented team member whose performance has dipped in the last month. As you sit down in the conference room, you notice Casey is sitting rigidly, arms crossed, avoiding eye contact, and their jaw is tight. They clearly expect this to go badly.",
    opening: "So... you wanted to talk?",
    nodes: {
      start: {
        speaker: "Casey",
        text: "So... you wanted to talk?",
        bodyLanguage: "Arms crossed, leaning back, jaw tight, avoiding eye contact. Feet angled toward the door.",
        choices: [
          {
            text: "Yes. Before we get into anything, I want to check in. How are you doing\u2014like, really?",
            next: "gentle_open",
            quality: "great",
            mindset: "learner",
            observation: "You noticed Casey's guarded posture and chose to create safety first."
          },
          {
            text: "Yeah. Your numbers have been slipping and I need to understand why.",
            next: "direct_confrontation",
            quality: "poor",
            mindset: "judger",
            observation: "You ignored the defensive body language and went straight to the problem."
          },
          {
            text: "I did. I've noticed some changes lately and I want to understand what's going on. No agenda\u2014just a conversation.",
            next: "honest_framing",
            quality: "great",
            mindset: "learner",
            observation: "You acknowledged the situation while setting a non-threatening tone."
          },
          {
            text: "I did. And you look like you'd rather be anywhere else right now. That's okay. Can we just talk?",
            next: "gentle_open",
            quality: "good",
            mindset: "learner",
            observation: "You named the tension directly but with warmth, showing you're paying attention."
          },
          {
            text: "Yeah, let's get this over with. I've got some performance concerns to go through.",
            next: "direct_confrontation",
            quality: "poor",
            mindset: "judger",
            observation: "Your tone matched Casey's dread and confirmed their worst expectations."
          }
        ]
      },

      gentle_open: {
        speaker: "Casey",
        text: "I'm... fine. Everything's fine.",
        bodyLanguage: "Still crossed arms but eyes flickered up briefly. Voice was flat. One hand moved to touch their neck\u2014a self-soothing gesture.",
        choices: [
          {
            text: "I hear you. And I also notice this might not be the most comfortable conversation. Can I share what I've observed, and then I genuinely want your perspective?",
            next: "permission_bridge",
            quality: "great",
            mindset: "learner",
            observation: "You acknowledged the gap between their words and body language without calling it out directly."
          },
          {
            text: "You don't seem fine. What's really going on?",
            next: "too_direct",
            quality: "medium",
            mindset: "judger",
            observation: "Calling out the mismatch directly can feel confrontational when someone is already guarded."
          },
          {
            text: "Okay great. So let's talk about the quarterly numbers.",
            next: "ignore_signals",
            quality: "poor",
            mindset: "judger",
            observation: "You accepted their surface answer and ignored multiple discomfort signals."
          }
        ]
      },

      honest_framing: {
        speaker: "Casey",
        text: "No agenda? Right. These things always have an agenda.",
        bodyLanguage: "Slight eye roll, but body shifted slightly forward\u2014a micro-sign of engagement despite the cynical words.",
        choices: [
          {
            text: "Fair enough\u2014I get why you'd think that. Here's the truth: your work matters to this team, and when things shift, I want to understand why so I can help. That's the whole agenda.",
            next: "trust_building",
            quality: "great",
            mindset: "learner",
            observation: "You validated their skepticism without getting defensive, and noticed the subtle lean-in."
          },
          {
            text: "I'm being honest with you. The least you can do is be honest with me.",
            next: "defensive_loop",
            quality: "poor",
            mindset: "judger",
            observation: "You shifted into Judger mode\u2014making it about their character rather than the situation."
          },
          {
            text: "You're right, and I can't blame you for being skeptical. So here's my agenda: I've noticed things are off, and I care more about you than the metrics. What's going on?",
            next: "trust_building",
            quality: "great",
            mindset: "learner",
            observation: "You owned the transparency and led with care rather than performance."
          },
          {
            text: "Okay, I hear the sarcasm. Look, I've noticed some things slipping. Can we talk about that?",
            next: "direct_confrontation",
            quality: "medium",
            mindset: "judger",
            observation: "You acknowledged the pushback but moved quickly to the performance topic without building safety."
          }
        ]
      },

      direct_confrontation: {
        speaker: "Casey",
        text: "I know the numbers are down. I'm working on it.",
        bodyLanguage: "Jaw clenched tighter. Arms pulled in closer. Legs crossed away from you. Full defensive posture.",
        choices: [
          {
            text: "I appreciate that. But I realize I came in too hot. Let me restart\u2014what's been the hardest part of work for you lately?",
            next: "recovery_bridge",
            quality: "great",
            mindset: "learner",
            observation: "You recognized your approach triggered a fight response and course-corrected."
          },
          {
            text: "Working on it isn't enough. I need a concrete plan by Friday.",
            next: "wall_up",
            quality: "poor",
            mindset: "judger",
            observation: "The defensive signals intensified and you escalated further."
          },
          {
            text: "I believe you. And I'm not here to pile on. But I can see this conversation is already tense \u2014 what would help make this easier?",
            next: "trust_building",
            quality: "great",
            mindset: "learner",
            observation: "You read the defensive posture and tried to create safety before proceeding."
          },
          {
            text: "Good. What's the plan, specifically?",
            next: "mechanical_exchange",
            quality: "medium",
            mindset: "judger",
            observation: "You kept focus on deliverables while Casey's body language screams discomfort."
          }
        ]
      },

      too_direct: {
        speaker: "Casey",
        text: "I said I'm fine. Can we just get to whatever this is about?",
        bodyLanguage: "Shifted back further. Voice sharper. Hands gripping the armrests.",
        choices: [
          {
            text: "You're right, I pushed. Let me come at this differently. I've seen your work when you're at your best\u2014it's excellent. Something's gotten in the way recently, and I want to help remove that obstacle. What would be most helpful?",
            next: "trust_building",
            quality: "great",
            mindset: "learner",
            observation: "You recovered by leading with genuine appreciation and framing yourself as an ally."
          }
        ]
      },

      ignore_signals: {
        speaker: "Casey",
        text: "Yeah, I know they're not great.",
        bodyLanguage: "Monotone voice. Staring at the table. Body completely disengaged\u2014classic flight response without physically leaving.",
        choices: [
          {
            text: "What happened? You were hitting targets consistently before.",
            next: "mechanical_exchange",
            quality: "medium",
            mindset: "judger",
            observation: "A reasonable question, but Casey is in flight mode. You'll get surface answers."
          },
          {
            text: "Before we look at the numbers\u2014I want to acknowledge that these conversations can feel stressful. I'm not here to pile on. What would make this conversation actually useful for you?",
            next: "trust_building",
            quality: "great",
            mindset: "learner",
            observation: "You paused and addressed the emotional reality before diving into data."
          }
        ]
      },

      permission_bridge: {
        speaker: "Casey",
        text: "...yeah, okay. Go ahead.",
        bodyLanguage: "Arms uncrossed slightly. One hand moved to the table. Still tense, but the wall is lowering. Feet shifted to point more toward you.",
        choices: [
          {
            text: "I've noticed the numbers dipped this month. But what I'm more curious about is what's shifted for you\u2014whether it's workload, motivation, something outside of work. What feels most accurate?",
            next: "opening_up",
            quality: "great",
            mindset: "learner",
            observation: "You noticed the physical softening and matched it with an open, non-accusatory question."
          }
        ]
      },

      trust_building: {
        speaker: "Casey",
        text: "That's... not what I expected you to say. Honestly, I've been dreading this meeting for a week.",
        bodyLanguage: "Shoulders dropped slightly (tension releasing). Made brief eye contact. Hands relaxed to their lap.",
        choices: [
          {
            text: "I can see that. And the fact that you dreaded it tells me something isn't working\u2014whether it's about the work, about us, or about something else entirely. What's been weighing on you?",
            next: "opening_up",
            quality: "great",
            mindset: "learner",
            observation: "You read the tension release as an invitation to go deeper, and responded with warmth."
          },
          {
            text: "Well, there's nothing to dread. Let's just figure this out together. What's going on with the project deliverables?",
            next: "mechanical_exchange",
            quality: "medium",
            mindset: "learner",
            observation: "Good intent, but pivoting to deliverables too quickly after they showed vulnerability."
          }
        ]
      },

      recovery_bridge: {
        speaker: "Casey",
        text: "The hardest part? Honestly... feeling like nothing I do is good enough. I used to love this work.",
        bodyLanguage: "Voice got quieter. Looked down but body softened. Arms loosened to their sides. A vulnerability signal.",
        choices: [
          {
            text: "That's a big shift. What changed? When did it stop feeling good?",
            next: "root_cause",
            quality: "great",
            mindset: "learner",
            observation: "You matched their vulnerability with a gentle probing question."
          },
          {
            text: "I'm sorry you feel that way. But we still need to hit our targets.",
            next: "trust_broken",
            quality: "poor",
            mindset: "judger",
            observation: "They opened up and you shut the door. The body language will close right back up."
          }
        ]
      },

      defensive_loop: {
        speaker: "Casey",
        text: "I am being honest. I don't know what you want from me.",
        bodyLanguage: "Full defensive wall. Leaning as far back as possible. Arms crossed tight. Jaw clenched. Flight-or-fight mode.",
        choices: [
          {
            text: "I'm sorry. I think I'm making this harder than it needs to be. Can we start over? I genuinely want to help, not criticize.",
            next: "recovery_bridge",
            quality: "great",
            mindset: "learner",
            observation: "You caught yourself in Judger mode and used the ABCC switch to reset."
          }
        ]
      },

      wall_up: {
        speaker: "Casey",
        text: "Fine. I'll have a plan by Friday.",
        bodyLanguage: "Completely shut down. Mechanical responses. Eyes dead. Waiting for this to end.",
        choices: [
          {
            text: "Wait. I don't think this went the way either of us wanted. Can I try again? I think I led with pressure when I should've led with support.",
            next: "recovery_bridge",
            quality: "great",
            mindset: "learner",
            observation: "A brave reset. Admitting your own misstep can reopen a closed conversation."
          }
        ]
      },

      opening_up: {
        speaker: "Casey",
        text: "Honestly? My partner and I are going through a rough patch. I haven't been sleeping. And then when I get here, I feel like I'm already behind before the day starts. It's like this spiral.",
        bodyLanguage: "Leaning forward now. Hands open on the table. Making steady eye contact. Full engagement\u2014they feel safe.",
        choices: [
          {
            text: "Thank you for telling me that. That spiral you described\u2014where you start the day already feeling behind\u2014what would break that cycle? Even one small thing?",
            next: "solution_focus",
            quality: "great",
            mindset: "learner",
            observation: "You acknowledged the vulnerability, then used a Learner question to shift toward agency and solutions."
          },
          {
            text: "I'm sorry about your relationship. What can we do about the work side?",
            next: "practical_but_cold",
            quality: "medium",
            mindset: "learner",
            observation: "Decent pivot to solutions, but the quick redirect might feel dismissive after they shared something personal."
          }
        ]
      },

      mechanical_exchange: {
        speaker: "Casey",
        text: "The deliverables have been late because I keep getting pulled into other things. I'll try to prioritize better.",
        bodyLanguage: "Giving you answers but body is still closed. Robotic energy. They're performing, not connecting.",
        choices: [
          {
            text: "I hear you on the prioritization. But I want to go deeper for a second\u2014is there something beyond the task list that's affecting your energy? You don't have to share details, but it would help me support you better.",
            next: "opening_up",
            quality: "great",
            mindset: "learner",
            observation: "You sensed the surface-level exchange and created an invitation for something real."
          }
        ]
      },

      root_cause: {
        speaker: "Casey",
        text: "I think... after the reorg, I stopped feeling like my work mattered. I used to get feedback, good or bad. Now it just goes into a void. And things at home aren't great either, so I don't have that energy to push through.",
        bodyLanguage: "Open posture. Speaking slowly, thoughtfully. Occasional pauses. This is genuine reflection\u2014they feel heard.",
        choices: [
          {
            text: "That makes complete sense. If you could design the ideal situation\u2014where work feels meaningful and you have the support you need\u2014what would that look like?",
            next: "ending_great",
            quality: "great",
            mindset: "learner",
            observation: "You used a variation of the Miracle Question to shift from problem to possibility."
          },
          {
            text: "I didn't realize the reorg affected you that way. What kind of feedback would make the biggest difference?",
            next: "ending_great",
            quality: "great",
            mindset: "learner",
            observation: "You focused on the actionable piece\u2014something you can actually change."
          }
        ]
      },

      trust_broken: {
        speaker: "Casey",
        text: "Right. Targets. Got it.",
        bodyLanguage: "Completely closed off again. All vulnerability retracted. They won't open up again this conversation.",
        choices: [
          {
            text: "I just heard you say you've lost your love for the work, and I responded with targets. That was wrong. What you shared matters. Can we go back to that?",
            next: "root_cause",
            quality: "great",
            mindset: "learner",
            observation: "The hardest recovery\u2014acknowledging you shut down their vulnerability. But it's possible."
          }
        ]
      },

      solution_focus: {
        speaker: "Casey",
        text: "Honestly? If I could start the day without feeling like I'm already failing, that would change everything. Maybe if I could shift my hours, or have one day where I'm not in back-to-back meetings...",
        bodyLanguage: "Animated now. Gesturing with open hands. Sitting up straight. Energy completely different from the start.",
        choices: [
          {
            text: "Let's make that happen. What if we blocked off Monday mornings as your focus time\u2014no meetings? And we check in weekly, not to monitor, but so you have a space to flag anything early. Would that help?",
            next: "ending_great",
            quality: "great",
            mindset: "learner",
            observation: "You turned their insight into a concrete action plan, collaboratively."
          }
        ]
      },

      practical_but_cold: {
        speaker: "Casey",
        text: "I think I just need some flexibility on the schedule. And maybe... less being ambushed with meetings.",
        bodyLanguage: "Moderate engagement. They've pulled back a bit from the personal vulnerability but are cooperating.",
        choices: [
          {
            text: "That's doable. Let's design a schedule that works. And Casey\u2014thank you for being honest with me today. That took courage.",
            next: "ending_good",
            quality: "great",
            mindset: "learner",
            observation: "You addressed the practical need and honored the emotional risk they took."
          }
        ]
      },

      ending_great: {
        speaker: "Casey",
        text: "I came in here expecting to get lectured, and instead I actually feel... hopeful? This is the first real conversation I've had in weeks. Thank you for not just looking at the numbers.",
        bodyLanguage: "Relaxed, open posture. Genuine smile reaching the eyes. Leaning in. Feet pointed toward you.",
        isEnding: true,
        summary: "You read Casey's body language, checked your own mindset, and asked questions from a place of genuine curiosity. By creating safety first and following the signals, you uncovered the real issues\u2014both personal and professional\u2014and built a path forward together. Casey leaves feeling supported, not judged. This is what 'Read the Room' looks like in practice."
      },
      ending_good: {
        speaker: "Casey",
        text: "Thanks. I appreciate you being flexible. I'll get back on track.",
        bodyLanguage: "More relaxed than the start. Moderate eye contact. The wall is down but the connection is professional, not personal.",
        isEnding: true,
        summary: "You navigated the conversation reasonably well and found practical solutions. Casey feels heard enough to cooperate, but the deeper connection wasn't fully realized. You addressed the surface issues but there's more underneath that could be explored in future conversations."
      },
      ending_poor: {
        speaker: "Casey",
        text: "Okay. Are we done?",
        bodyLanguage: "Closed, shut down. Already mentally left the room. Trust has been damaged.",
        isEnding: true,
        summary: "The conversation stayed on the surface or became confrontational. Casey's defensive body language was a signal you missed or overrode, and the questions you asked came more from judgment than curiosity. The performance issues will likely continue because the underlying causes weren't addressed."
      }
    }
  },
  {
    id: 8,
    title: "The First Date",
    label: "Dating Scenario",
    skillCategory: "Open vs. Closed",
    difficultyTier: "intermediate",
    context: "You're on a first date with someone you met through mutual friends. You're at a casual restaurant. Riley seems a bit nervous — fidgeting with their napkin and giving short answers. You want to help them relax and actually get to know each other.",
    opening: "Hey! Sorry, am I late? I could not find parking anywhere.",
    nodes: {
      start: {
        speaker: "Riley",
        text: "Hey! Sorry, am I late? I could not find parking anywhere.",
        choices: [
          { text: "You're right on time. I'm glad you made it. How was your day?", next: "safe_opener", quality: "good" },
          { text: "No worries at all. I almost went to the wrong restaurant, so we're even. What made you pick this place?", next: "share_vulnerability", quality: "great" },
          { text: "Nope, right on time. So, tell me about yourself.", next: "too_broad", quality: "medium" },
          { text: "Parking around here is the worst. I'm just happy you're here. First impressions \u2014 what do you think of the place?", next: "share_vulnerability", quality: "good" },
          { text: "You're fine! I've been looking forward to this. Can I get you something to drink?", next: "safe_opener", quality: "good" }
        ]
      },
      share_vulnerability: {
        speaker: "Riley",
        text: "Ha! Oh no. Um, my friend Sarah actually recommended it. She said the pasta is amazing. I'm kind of a pasta person. That's probably not the most interesting thing about me though.",
        choices: [
          { text: "Hey, pasta loyalty says a lot about a person. What's your go-to order at a place like this?", next: "comfort_zone", quality: "good" },
          { text: "What would you say is the most interesting thing about you?", next: "too_intense_early", quality: "medium" },
          { text: "Sarah has good taste. How do you two know each other?", next: "connection_thread", quality: "great" }
        ]
      },
      safe_opener: {
        speaker: "Riley",
        text: "It was... fine. Long. I work in graphic design so it's a lot of staring at screens. How about yours?",
        choices: [
          { text: "Also screen-heavy. Graphic design sounds creative though — what are you working on right now?", next: "comfort_zone", quality: "good" },
          { text: "Mine was kind of weird actually — [share a brief amusing anecdote]. Does your job ever surprise you like that?", next: "connection_thread", quality: "great" },
          { text: "Do you like your job?", next: "yes_no_trap", quality: "medium" }
        ]
      },
      too_broad: {
        speaker: "Riley",
        text: "Oh, um. I don't know where to start. I'm Riley. I do graphic design. I have a cat named Mochi. This is awkward, isn't it?",
        choices: [
          { text: "A little. But honestly, first dates are supposed to be awkward. Tell me about Mochi — how'd you end up with a cat named after a dessert?", next: "comfort_zone", quality: "great" },
          { text: "It doesn't have to be. Where did you go to school?", next: "yes_no_trap", quality: "poor" },
          { text: "That was actually a perfect intro. Graphic design and a cat named Mochi? I already have follow-up questions. Which do you want to talk about first?", next: "comfort_zone", quality: "good" },
          { text: "Only a little. I think the awkward part is kind of charming. What got you into graphic design?", next: "connection_thread", quality: "great" }
        ]
      },
      too_intense_early: {
        speaker: "Riley",
        text: "Oh wow, going deep right away. Um... I don't know. I run a lot? I'm training for a half marathon. Is that interesting?",
        choices: [
          { text: "That's more than interesting — that's intense. What made you sign up for a half marathon?", next: "connection_thread", quality: "great" },
          { text: "Very. How fast are you?", next: "yes_no_trap", quality: "medium" }
        ]
      },
      yes_no_trap: {
        speaker: "Riley",
        text: "Yeah. I mean, it's fine. It's good.",
        choices: [
          { text: "I notice I keep asking questions that are hard to answer. Let me try a different one — what's something that made you laugh this week?", next: "warmth_shift", quality: "great" },
          { text: "Cool. And where are you from originally?", next: "interview_mode", quality: "poor" }
        ]
      },
      comfort_zone: {
        speaker: "Riley",
        text: "Right now I'm designing the branding for this local bakery. It's actually really fun — the owner is this seventy-year-old woman who has very specific opinions about what shade of pink represents her croissants. I kind of love her.",
        choices: [
          { text: "That sounds amazing. What is it about projects like that — the ones with a character behind them — that makes them different for you?", next: "warmth_shift", quality: "great" },
          { text: "That's cute. Do you do a lot of freelance work?", next: "surface_path", quality: "medium" },
          { text: "I love that. What shade of pink did she pick?", next: "warmth_shift", quality: "good" }
        ]
      },
      connection_thread: {
        speaker: "Riley",
        text: "Sarah and I actually met at a running group. I was terrible and she was worse, so we bonded over being last. That was three years ago. Now she's faster than me and I'll never forgive her.",
        choices: [
          { text: "That's a great origin story. It sounds like you're someone who shows up even when you're not great at something yet. Is that true about other parts of your life too?", next: "going_deeper", quality: "great" },
          { text: "Do you still run together?", next: "surface_path", quality: "medium" },
          { text: "I love friendships that start like that. What's the best thing about having Sarah in your life?", next: "going_deeper", quality: "great" }
        ]
      },
      warmth_shift: {
        speaker: "Riley",
        text: "Okay, you're going to judge me. My cat did this thing where she got her head stuck in a paper bag and then just... accepted her fate. Lay down. Bag on head. I have a video. Want to see it?",
        choices: [
          { text: "Obviously yes. But I'm also noticing something — you light up when you talk about the people and things you care about. It's nice to see.", next: "going_deeper", quality: "great" },
          { text: "Absolutely. Show me immediately.", next: "going_deeper", quality: "good" },
          { text: "Ha, sure. So do you live alone?", next: "surface_path", quality: "poor" }
        ]
      },
      interview_mode: {
        speaker: "Riley",
        text: "Oregon. Then college in Colorado. Then here. Sorry, I feel like I'm on a job interview.",
        choices: [
          { text: "Ugh, you're right — I'm doing the question-question-question thing. Okay, new approach. Ask me something. Anything.", next: "role_reversal", quality: "great" },
          { text: "Sorry about that. What do you actually want to talk about?", next: "warmth_shift", quality: "good" }
        ]
      },
      surface_path: {
        speaker: "Riley",
        text: "Yeah, here and there. It keeps things interesting, I guess.",
        choices: [
          { text: "You 'guess'? That sounds like there's a more complicated answer underneath. What does interesting actually mean for you?", next: "going_deeper", quality: "great" },
          { text: "That's cool. What do you do for fun besides running?", next: "ending_medium", quality: "medium" }
        ]
      },
      role_reversal: {
        speaker: "Riley",
        text: "Okay um... what's something you're bad at that you wish you were better at?",
        choices: [
          { text: "[Answer honestly and vulnerably, then ask] What about you? What's something you're still figuring out?", next: "going_deeper", quality: "great" }
        ]
      },
      going_deeper: {
        speaker: "Riley",
        text: "Honestly? Probably this. Putting myself out there. I'm really good at being alone and really bad at letting people in. Sarah basically forced me to come tonight. I'm glad she did, though.",
        choices: [
          { text: "I'm glad she did too. And for what it's worth, I think you're better at this than you think. What would it look like if you let yourself be a little less careful?", next: "ending_great", quality: "great" },
          { text: "That's really honest. I think a lot of people feel that way and never say it. What makes it hard — the letting people in part?", next: "ending_great", quality: "great" },
          { text: "Well, you're doing great tonight. Want to order dessert?", next: "ending_medium", quality: "medium" }
        ]
      },
      ending_great: {
        speaker: "Riley",
        text: "This is... not what I expected. I usually leave first dates feeling exhausted from performing. But I feel like you were actually curious about me — not just checking boxes. That's rare. Can we do this again?",
        isEnding: true,
        summary: "You built genuine connection by matching Riley's pace, sharing your own vulnerability, and asking questions that went beyond the surface. You noticed when questions weren't landing and adapted. Riley felt seen, not interviewed."
      },
      ending_medium: {
        speaker: "Riley",
        text: "This was nice! Really. You're easy to talk to. Maybe we could hang out again sometime?",
        isEnding: true,
        summary: "The date went well enough. You were friendly and pleasant, but the conversation stayed mostly on the surface. Riley had a good time but didn't feel deeply known. There's potential here, but it would take more intentional curiosity."
      },
      ending_poor: {
        speaker: "Riley",
        text: "This was... yeah. Thanks for dinner. I'll text you, maybe.",
        isEnding: true,
        summary: "The conversation felt like an interview or stayed surface-level throughout. Riley's nervousness never fully eased because the questions didn't create safety or genuine connection. They're unlikely to reach out again."
      }
    }
  },
  {
    id: 9,
    title: "The Tough Feedback",
    label: "Leadership Scenario",
    skillCategory: "Leadership",
    difficultyTier: "advanced",
    context: "You're a team lead. Dana, one of your best performers, has been producing sloppy work for the past three weeks. Two teammates have come to you privately to complain. You've asked Dana to grab coffee with you — casual, off-site.",
    opening: "Hey, what's up? You said you wanted to grab coffee?",
    nodes: {
      start: {
        speaker: "Dana",
        text: "Hey, what's up? You said you wanted to grab coffee?",
        choices: [
          { text: "Yeah. I wanted to check in with you, not as your lead but as someone who respects your work. How are things going?", next: "warm_entry", quality: "great" },
          { text: "I'll be straight with you — I've been hearing some concerns about your recent work. What's happening?", next: "direct_entry", quality: "medium" },
          { text: "People are complaining about your work, Dana. We need to talk about it.", next: "blunt_entry", quality: "poor" },
          { text: "I did. I've noticed some things are different lately and I wanted to understand before jumping to conclusions. Can I share what I'm seeing?", next: "permission_ask", quality: "great" },
          { text: "Yeah. Look, I care about you and the team, and something feels off. I want to talk about it openly.", next: "warm_entry", quality: "good" }
        ]
      },
      warm_entry: {
        speaker: "Dana",
        text: "Things are... fine. Busy. You know how it is. Why, is something wrong?",
        choices: [
          { text: "I want to be honest with you because I think you deserve that. I've noticed a shift in your recent deliverables, and I want to understand what's behind it — not to judge, but because your best work is really good and something seems off.", next: "honest_bridge", quality: "great" },
          { text: "Nothing major. Just checking in. How's the Peterson project going?", next: "avoidance_path", quality: "poor" },
          { text: "There might be. I've noticed some things have slipped lately. Can I share what I'm seeing?", next: "permission_ask", quality: "great" }
        ]
      },
      direct_entry: {
        speaker: "Dana",
        text: "Concerns? From who? What are they saying?",
        choices: [
          { text: "I don't think naming names helps right now. What matters is that I've noticed it too, and I care more about understanding why than pointing fingers. What's been different for you lately?", next: "honest_bridge", quality: "great" },
          { text: "I'm not going to name names. But the quality has dropped and I need it fixed.", next: "defensive_response", quality: "poor" },
          { text: "A couple of people have mentioned errors in the handoffs. Before we get into specifics — is there something going on that I should know about?", next: "permission_ask", quality: "good" }
        ]
      },
      blunt_entry: {
        speaker: "Dana",
        text: "Wow. Okay. Who's complaining?",
        choices: [
          { text: "I'm sorry — that came out harsher than I meant. Let me try again. I've noticed some changes in your work recently and I'm concerned, not angry. What's going on?", next: "recovery_attempt", quality: "great" },
          { text: "That's not the point. The point is the work needs to improve.", next: "defensive_response", quality: "poor" },
          { text: "I shouldn't have led with that. Forget who said what — I want to hear from you. What's been going on?", next: "recovery_attempt", quality: "good" },
          { text: "Names don't matter. What matters is that this isn't like you. Dana, talk to me — what's happening?", next: "honest_bridge", quality: "good" }
        ]
      },
      avoidance_path: {
        speaker: "Dana",
        text: "It's fine. On track. Is that really why we're here?",
        choices: [
          { text: "No, it's not. I was trying to ease into this and I should just be real. Dana, your recent work hasn't been at your usual level, and I want to understand what's happening because I know what you're capable of.", next: "honest_bridge", quality: "great" }
        ]
      },
      permission_ask: {
        speaker: "Dana",
        text: "...yeah. Okay. Go ahead.",
        choices: [
          { text: "The last three deliverables had errors that aren't typical for you. The reports to the client had calculation issues. I'm not bringing this up to punish you — I'm bringing it up because this isn't who you are. What's been going on?", next: "honest_bridge", quality: "great" },
          { text: "Your work has been sloppy. The numbers are wrong, the formatting is off. What happened?", next: "defensive_response", quality: "poor" }
        ]
      },
      recovery_attempt: {
        speaker: "Dana",
        text: "I... okay. I appreciate you walking that back. Yeah, I know things haven't been great.",
        choices: [
          { text: "What does 'haven't been great' mean for you? Walk me through it.", next: "opening_up", quality: "great" },
          { text: "So what's the plan to fix it?", next: "too_fast_to_fix", quality: "medium" }
        ]
      },
      honest_bridge: {
        speaker: "Dana",
        text: "You're right. I know the work hasn't been up to my standard. I've been... look, I don't want to make excuses.",
        choices: [
          { text: "I'm not asking for excuses. I'm asking for context. There's a difference. What's really happening?", next: "opening_up", quality: "great" },
          { text: "Everyone has off weeks. What matters is getting back on track. What do you need?", next: "too_fast_to_fix", quality: "medium" },
          { text: "I appreciate that. But I do need to understand what's going on so we can figure it out together.", next: "opening_up", quality: "good" }
        ]
      },
      defensive_response: {
        speaker: "Dana",
        text: "You know what, I've given this team everything for two years. And the first time I slip, I get hauled into a meeting. Nice.",
        choices: [
          { text: "You're right that you've been incredible for two years. That's exactly why I'm here — because this isn't you. I'm not hauling you in, I'm reaching out. Help me understand what changed.", next: "opening_up", quality: "great" },
          { text: "I'm not saying your past work doesn't matter. But we need to address the present.", next: "grudging_cooperation", quality: "medium" }
        ]
      },
      too_fast_to_fix: {
        speaker: "Dana",
        text: "I just need to... focus more, I guess. I'll double-check things. It won't happen again.",
        choices: [
          { text: "I hear you, and I believe you want that. But 'focus more' is usually a symptom, not a solution. What's been pulling your focus? No judgment — I genuinely want to know.", next: "opening_up", quality: "great" },
          { text: "Good. I'll follow up next week to see how it's going.", next: "ending_medium", quality: "medium" }
        ]
      },
      grudging_cooperation: {
        speaker: "Dana",
        text: "Fine. What do you want to know?",
        choices: [
          { text: "I want to know what you'd tell me if you weren't worried about how it would sound. What's actually going on in your life right now?", next: "opening_up", quality: "great" }
        ]
      },
      opening_up: {
        speaker: "Dana",
        text: "My dad was diagnosed with early-onset Alzheimer's last month. I've been handling all the medical stuff because my siblings live out of state. I'm not sleeping. I come in and I try, but my brain is somewhere else. I know that's not fair to the team.",
        choices: [
          { text: "Dana... thank you for telling me that. That's an enormous thing to carry. And I want you to hear this: it's not about fair or unfair. You're a person first. What would actually help you right now — at work and beyond?", next: "support_path", quality: "great" },
          { text: "I'm so sorry. That's really hard. Do you want to take some time off?", next: "practical_path", quality: "good" },
          { text: "I had no idea. That explains a lot. We need to figure out a plan so the team isn't affected while you deal with this.", next: "team_focus_misstep", quality: "medium" }
        ]
      },
      support_path: {
        speaker: "Dana",
        text: "I honestly don't know. I feel like if I take time off I'll fall further behind and then I'll have two things to worry about. But I can't keep doing this either.",
        choices: [
          { text: "What if we took 'time off versus push through' off the table and designed something in between? What would a workload look like that you could actually handle right now without drowning?", next: "ending_great", quality: "great" },
          { text: "What if I redistributed some of your tasks temporarily? Would that help or would it make you feel worse?", next: "ending_great", quality: "great" }
        ]
      },
      practical_path: {
        speaker: "Dana",
        text: "I don't think I can afford to right now. The projects need me.",
        choices: [
          { text: "The projects need the best version of you, and you need space to breathe. What if we figured out something flexible — not all-or-nothing, but something sustainable? What would that look like?", next: "ending_great", quality: "great" }
        ]
      },
      team_focus_misstep: {
        speaker: "Dana",
        text: "Right. The team. Of course.",
        choices: [
          { text: "That sounded wrong. I care about you, not just the output. Let me rephrase — what do you need? Forget the team for a second. What would make this period survivable?", next: "ending_great", quality: "great" }
        ]
      },
      ending_great: {
        speaker: "Dana",
        text: "I can't tell you how much it means that you asked instead of just... managing me. Nobody at work knows about my dad. I've been terrified someone would think I can't handle my job. This conversation is the first time in weeks I've felt like someone actually sees what I'm going through.",
        isEnding: true,
        summary: "You navigated a difficult feedback conversation by leading with curiosity and respect. Instead of focusing on the problem, you uncovered the person behind the performance dip. Dana now has a leader who knows the full picture and can provide real support. Trust has deepened significantly."
      },
      ending_medium: {
        speaker: "Dana",
        text: "Thanks. I'll tighten things up. Appreciate the heads up.",
        isEnding: true,
        summary: "You addressed the performance issue, but Dana kept the real reason hidden. The work may improve short-term through willpower, but the underlying situation hasn't been addressed. Dana doesn't feel safe enough to be vulnerable with you, which limits your ability to actually help."
      },
      ending_poor: {
        speaker: "Dana",
        text: "Got it. Won't happen again.",
        isEnding: true,
        summary: "The conversation felt punitive rather than supportive. Dana is now managing your perception on top of everything else. The sloppy work might improve out of fear, but trust has been damaged and Dana is likely updating their resume."
      }
    }
  },
  {
    id: 10,
    title: "The Cultural Misunderstanding",
    label: "Cross-Cultural Scenario",
    skillCategory: "Cultural Awareness",
    difficultyTier: "advanced",
    context: "You're working on a global project team. Kenji, a colleague based in Tokyo, has been very quiet in virtual meetings. Another teammate, Brad, pulled you aside and said 'Kenji never contributes — I don't think he's pulling his weight.' You've set up a one-on-one video call with Kenji to connect.",
    opening: "Hello. Thank you for setting up this call. How can I help you?",
    nodes: {
      start: {
        speaker: "Kenji",
        text: "Hello. Thank you for setting up this call. How can I help you?",
        choices: [
          { text: "Thanks for making time, Kenji. I actually wanted to learn from you. I realize we haven't had a chance to connect one-on-one, and I'd love to hear how the project looks from your perspective.", next: "respectful_open", quality: "great" },
          { text: "I wanted to talk about the team meetings. I've noticed you don't speak up much and I wanted to check if everything's okay.", next: "direct_address", quality: "medium" },
          { text: "Some people on the team feel like you're not contributing enough in meetings. I wanted to give you a chance to respond.", next: "confrontational", quality: "poor" },
          { text: "I appreciate you joining, Kenji. I've been wanting to get to know how you prefer to work and collaborate. What's been your experience with the team so far?", next: "respectful_open", quality: "great" },
          { text: "Nothing specific — just wanted to sync up. How are things going on your end with the project?", next: "technical_thread", quality: "good" }
        ]
      },
      respectful_open: {
        speaker: "Kenji",
        text: "I appreciate that. The project is going well from a technical standpoint. I have been reviewing the architecture documents and I have some thoughts. I was not sure if it was the right time to share them.",
        choices: [
          { text: "I'd really value hearing those thoughts. What's made you hesitate about the timing?", next: "cultural_bridge", quality: "great" },
          { text: "You should always share your thoughts! That's what the meetings are for.", next: "well_meaning_miss", quality: "medium" },
          { text: "What concerns do you have about the architecture?", next: "technical_thread", quality: "good" }
        ]
      },
      direct_address: {
        speaker: "Kenji",
        text: "I see. I apologize if my participation has been insufficient. The meetings move very quickly.",
        choices: [
          { text: "You don't need to apologize. I think the meeting format might not be working for everyone. What would make it easier for you to share your ideas?", next: "cultural_bridge", quality: "great" },
          { text: "You just need to jump in. Everyone else does.", next: "well_meaning_miss", quality: "poor" },
          { text: "That's fair — they do move fast. How do meetings typically work in your experience?", next: "cultural_bridge", quality: "great" }
        ]
      },
      confrontational: {
        speaker: "Kenji",
        text: "I am sorry to hear that. I have been contributing to the shared documents and doing code reviews after the meetings. But I understand the concern.",
        choices: [
          { text: "Wait — you've been contributing through documentation and code reviews? I didn't know that. Can you tell me more about what you've been working on?", next: "hidden_contributions", quality: "great" },
          { text: "The work outside meetings is good, but you need to be more vocal in the meetings themselves.", next: "well_meaning_miss", quality: "medium" },
          { text: "I really appreciate you telling me that. It sounds like there's a lot of work happening that the team isn't seeing. What's the best way for you to share those contributions?", next: "hidden_contributions", quality: "good" },
          { text: "Documentation and code reviews are valuable. But people judge contribution by meeting participation here, and I think that's been an issue.", next: "well_meaning_miss", quality: "poor" }
        ]
      },
      cultural_bridge: {
        speaker: "Kenji",
        text: "In my experience, I usually wait until I have fully considered an idea before speaking. In our meetings, the discussion moves to the next topic very quickly. I do not want to slow things down or say something that is not fully formed. In Japan, we often take more time for reflection before responding.",
        choices: [
          { text: "That's really helpful for me to understand. It sounds like our meeting style might actually be losing good ideas by not creating space for that reflection. What if we adapted the format? What would work better for you?", next: "collaboration", quality: "great" },
          { text: "I really appreciate you explaining that. I think our team moves too fast sometimes and we miss the most thoughtful contributions. How can we make sure your perspective gets heard?", next: "collaboration", quality: "great" },
          { text: "I understand. But in this team's culture, you need to speak up or people assume you have nothing to say.", next: "assimilation_pressure", quality: "poor" }
        ]
      },
      well_meaning_miss: {
        speaker: "Kenji",
        text: "I understand. I will try to speak more in meetings.",
        choices: [
          { text: "Actually, let me reconsider that. I'm asking you to adapt to our style, but maybe our style could be better. What would a meeting look like if it worked well for you?", next: "collaboration", quality: "great" },
          { text: "Great. And don't worry about being perfect — just share your thinking.", next: "ending_medium", quality: "medium" }
        ]
      },
      hidden_contributions: {
        speaker: "Kenji",
        text: "Yes. I have been reviewing all pull requests and I found three significant issues that could have caused problems in production. I documented them and tagged the relevant people. I also prepared a detailed risk assessment for the next phase.",
        choices: [
          { text: "Kenji, that's incredibly valuable work, and I had no idea. I think our team has a visibility problem — we're measuring contribution by who talks the most, not by who contributes the most. How can we fix that?", next: "collaboration", quality: "great" },
          { text: "That's great work. You should mention these things in the meetings so people know.", next: "assimilation_pressure", quality: "medium" }
        ]
      },
      technical_thread: {
        speaker: "Kenji",
        text: "I believe the current architecture has a scalability concern. I have been running analysis on it. I prepared a document but I was waiting for the right moment to share it.",
        choices: [
          { text: "I'd love to see that document. But I'm also curious — what makes you feel like there hasn't been a right moment yet?", next: "cultural_bridge", quality: "great" },
          { text: "Send it to the team! That's exactly what we need.", next: "ending_medium", quality: "good" }
        ]
      },
      assimilation_pressure: {
        speaker: "Kenji",
        text: "Yes, I will try. I understand that is how things work here.",
        choices: [
          { text: "Actually, I don't want you to just adapt to us. I think we're losing something by only valuing one communication style. Your approach — thorough, reflective, documented — that's a strength, not a weakness. How can we build a team culture that works for everyone?", next: "collaboration", quality: "great" }
        ]
      },
      collaboration: {
        speaker: "Kenji",
        text: "Perhaps we could share the agenda before meetings so I can prepare my thoughts? And maybe have a shared document where people can add ideas before and after? I contribute best in writing first, then discussion.",
        choices: [
          { text: "Those are excellent ideas. And I want to bring this up with the whole team — not about you specifically, but about how we can be more inclusive in how we collaborate. Would you be comfortable helping me shape that conversation?", next: "ending_great", quality: "great" },
          { text: "Let's try the pre-shared agenda immediately. I think it will help everyone, not just you. What else have you observed about our team dynamic that we could improve?", next: "ending_great", quality: "great" }
        ]
      },
      ending_great: {
        speaker: "Kenji",
        text: "Thank you. This is the first time someone on this team has asked about my perspective rather than just asking me to change. I have many ideas I have been holding back. I am looking forward to sharing them.",
        isEnding: true,
        summary: "You approached a cross-cultural situation with genuine curiosity instead of assumptions. By asking about Kenji's communication style rather than demanding he adopt yours, you discovered hidden contributions and valuable ideas. You're now positioned to build a more inclusive team culture that leverages diverse communication styles."
      },
      ending_medium: {
        speaker: "Kenji",
        text: "Thank you for the conversation. I will try to be more visible in my contributions.",
        isEnding: true,
        summary: "You had a well-intentioned conversation, but the outcome puts the burden of change on Kenji rather than on the team's communication structure. He'll try to speak up more, but the underlying cultural dynamics haven't been addressed. You may continue to miss valuable contributions from team members with different communication styles."
      },
      ending_poor: {
        speaker: "Kenji",
        text: "I understand. I will adjust my approach. Thank you for the feedback.",
        isEnding: true,
        summary: "The conversation reinforced the idea that there's one 'right' way to contribute, and it happens to be the dominant culture's way. Kenji will comply but may disengage emotionally. His best ideas will continue to go unheard, and you've missed an opportunity to make the team genuinely better."
      }
    }
  },
  {
    id: 11,
    title: "The Grieving Friend",
    label: "Empathy Scenario",
    skillCategory: "Empathy",
    difficultyTier: "advanced",
    context: "Your close friend Maya's mother passed away two weeks ago. You attended the funeral but haven't seen Maya since. She finally agreed to meet for coffee. When she arrives, she looks exhausted — dark circles, forced smile.",
    opening: "Hey. Thanks for getting me out of the house. I've been kind of a hermit.",
    nodes: {
      start: {
        speaker: "Maya",
        text: "Hey. Thanks for getting me out of the house. I've been kind of a hermit.",
        choices: [
          { text: "I'm really glad you came. No pressure on how today goes — we can talk, not talk, whatever you need.", next: "space_given", quality: "great" },
          { text: "How are you doing? And I mean really.", next: "gentle_check", quality: "good" },
          { text: "It's good to see you! I ordered you your usual. So, how have you been holding up?", next: "slightly_rushed", quality: "medium" }
        ]
      },
      space_given: {
        speaker: "Maya",
        text: "Thanks. I don't even know what I need right now, honestly. Some days I'm fine and then I'll find one of her sweaters and just... fall apart.",
        choices: [
          { text: "That sounds like grief doing what grief does. You don't have to have it figured out. What was today — a fine day or a sweater day?", next: "present_moment", quality: "great" },
          { text: "That's completely normal. Grief comes in waves.", next: "platitude_trap", quality: "medium" },
          { text: "Tell me about the sweater. What was she like?", next: "memory_path", quality: "great" }
        ]
      },
      gentle_check: {
        speaker: "Maya",
        text: "I'm... here. That's about all I've got. Everyone keeps asking me that and I never know what to say.",
        choices: [
          { text: "Then you don't have to answer it. I'm not going anywhere. We can just sit here if you want.", next: "present_moment", quality: "great" },
          { text: "What would you want people to ask instead?", next: "reframe", quality: "great" },
          { text: "Time heals, Maya. You'll get through this.", next: "platitude_trap", quality: "poor" }
        ]
      },
      slightly_rushed: {
        speaker: "Maya",
        text: "Holding up. You know. One day at a time or whatever people say.",
        choices: [
          { text: "The 'or whatever people say' part — are the things people say actually helping?", next: "reframe", quality: "great" },
          { text: "That's all you can do. One day at a time.", next: "platitude_trap", quality: "poor" },
          { text: "You don't have to give me the polished answer. What's it actually been like?", next: "present_moment", quality: "great" }
        ]
      },
      platitude_trap: {
        speaker: "Maya",
        text: "Yeah. Everyone says that.",
        choices: [
          { text: "I'm sorry. That was one of those things people say when they don't know what to say. I don't know what to say. But I'm here. What do you actually need right now?", next: "present_moment", quality: "great" },
          { text: "Because it's true. You just have to take it one step at a time.", next: "shutting_down", quality: "poor" },
          { text: "You sound tired of hearing it. What do you wish people would say instead?", next: "reframe", quality: "great" },
          { text: "I can hear how exhausting that must be. You don't have to say anything at all right now if you don't want to.", next: "present_moment", quality: "good" }
        ]
      },
      reframe: {
        speaker: "Maya",
        text: "Honestly? No. Everyone says 'she's in a better place' or 'at least she's not suffering.' And I know they mean well. But I want to scream. She's not in a better place. The better place was here, with me.",
        choices: [
          { text: "You're right. She's supposed to be here. There's nothing I can say that fixes that. I just want you to know you don't have to perform being okay with me.", next: "safe_space", quality: "great" },
          { text: "What do you wish someone would say instead?", next: "safe_space", quality: "great" },
          { text: "They really are trying to help though. People just don't know what to say.", next: "defending_others", quality: "poor" }
        ]
      },
      present_moment: {
        speaker: "Maya",
        text: "Today is... medium. I woke up and for about three seconds I forgot. Then I remembered. That three seconds is the worst part of my day, every day.",
        choices: [
          { text: "The remembering. Every morning. That sounds exhausting in a way I probably can't fully understand. What helps you get through the rest of the day after those three seconds?", next: "safe_space", quality: "great" },
          { text: "I can't imagine. I'm so sorry, Maya.", next: "memory_path", quality: "good" }
        ]
      },
      memory_path: {
        speaker: "Maya",
        text: "She used to call me every Sunday morning. She'd pretend she was calling about something else — a recipe, a question about her phone — but really she just wanted to hear my voice. I didn't always pick up. I'd text back 'busy, call you later.' I can't stop thinking about that.",
        choices: [
          { text: "You're carrying a lot of guilt with that. Can I tell you what I hear in that story? I hear a mom who loved you so much she'd make up reasons to call. She knew you loved her back, Maya.", next: "safe_space", quality: "great" },
          { text: "She knew you loved her. Don't beat yourself up about missed calls.", next: "platitude_trap", quality: "medium" },
          { text: "What were the calls like when you did pick up?", next: "safe_space", quality: "great" }
        ]
      },
      defending_others: {
        speaker: "Maya",
        text: "I know. I know they don't. Forget it.",
        choices: [
          { text: "No, don't forget it. Your anger is valid. You lost your mom and people are giving you bumper stickers. Be angry. What else are you feeling that you haven't said out loud?", next: "safe_space", quality: "great" }
        ]
      },
      shutting_down: {
        speaker: "Maya",
        text: "Yeah. Anyway. Tell me about your stuff. I need to think about something else.",
        choices: [
          { text: "We can absolutely talk about other things. But before we do — I want you to know that if you ever want to talk about your mom, I want to listen. Not to fix it. Just to be there.", next: "ending_medium", quality: "good" }
        ]
      },
      safe_space: {
        speaker: "Maya",
        text: "Sometimes I'm angry. Like, furious. At the doctors, at God, at her for getting sick, at myself for every time I was too busy. And then I feel guilty for being angry. It's this awful loop.",
        choices: [
          { text: "Anger, guilt, and grief all tangled together. That loop sounds like love that has nowhere to go right now. You don't have to untangle it today. Is there anything — even something small — that's given you any comfort?", next: "ending_great", quality: "great" },
          { text: "All of those feelings make complete sense. Every single one. What would your mom say to you right now if she could?", next: "ending_great", quality: "great" },
          { text: "Have you thought about talking to a therapist? They could really help with this.", next: "advice_misstep", quality: "medium" }
        ]
      },
      advice_misstep: {
        speaker: "Maya",
        text: "Yeah, maybe. Everyone keeps saying that too.",
        choices: [
          { text: "I'm sorry, that was me trying to fix something instead of just being with you in it. Tell me more about the anger. I can handle it.", next: "ending_great", quality: "great" }
        ]
      },
      ending_great: {
        speaker: "Maya",
        text: "I haven't cried in front of anyone since the funeral. I've been holding it together for everyone. Thank you for not trying to make it better. Thank you for just... sitting in the darkness with me. I forgot what that felt like.",
        isEnding: true,
        summary: "You did the hardest thing in conversation: you stayed present without trying to fix. By asking gentle questions and making space for all of Maya's emotions — grief, anger, guilt — you gave her permission to be real. Sometimes the best question is the one that says 'I'm here, and whatever you're feeling is okay.'"
      },
      ending_medium: {
        speaker: "Maya",
        text: "Thanks for coming today. It was good to get out. I'll call you soon, okay?",
        isEnding: true,
        summary: "You showed up and you cared, which matters. But the conversation stayed mostly on the safe side of grief. Maya performed being okay because the space didn't quite feel safe enough for the messy, real emotions. She'll reach out when she's ready — but she may not come to you with the hard stuff."
      },
      ending_poor: {
        speaker: "Maya",
        text: "Thanks. I should probably get going. I have stuff to do.",
        isEnding: true,
        summary: "The platitudes and advice-giving, however well-intentioned, pushed Maya further into isolation. She needed presence, not solutions. Grief requires someone willing to sit in the uncomfortable silence, and today's conversation felt like another performance she had to give."
      }
    }
  },
  {
    id: 12,
    title: "The Negotiation",
    label: "Workplace Scenario",
    skillCategory: "Framing",
    difficultyTier: "expert",
    context: "You've received a job offer from a company you're excited about. The role is perfect, but the salary is 15% below your target. You're meeting with the hiring manager, Chris, to discuss the offer. You want to negotiate effectively without damaging the relationship.",
    opening: "Thanks for coming in! We're really excited about bringing you on board. Did you have a chance to review the offer?",
    nodes: {
      start: {
        speaker: "Chris",
        text: "Thanks for coming in! We're really excited about bringing you on board. Did you have a chance to review the offer?",
        choices: [
          { text: "I did, and I'm genuinely excited about this role. Before I respond to the specifics, I'd love to understand more about how you structured the offer. What factors went into the compensation package?", next: "curious_open", quality: "great" },
          { text: "I did. The salary is lower than I was expecting. I was hoping for something around [target number].", next: "direct_counter", quality: "medium" },
          { text: "Yes. I need to be honest — the salary is a concern. Can we talk about it?", next: "honest_flag", quality: "good" }
        ]
      },
      curious_open: {
        speaker: "Chris",
        text: "Great question. We based it on the role level, internal equity with the team, and the market data we have. There's a range for this position and we came in around the midpoint.",
        choices: [
          { text: "That's helpful context. I'm curious — what does the full range look like, and what would it take to come in at the higher end?", next: "range_explore", quality: "great" },
          { text: "What does growth in this role typically look like? How do people move within that range over time?", next: "growth_path", quality: "great" },
          { text: "Midpoint feels like there's room above. Can we go higher?", next: "direct_counter", quality: "medium" }
        ]
      },
      direct_counter: {
        speaker: "Chris",
        text: "I understand. I'll be honest — we don't have unlimited flexibility on base salary. What's driving your number?",
        choices: [
          { text: "Fair question. It's based on my current compensation, the market rate for this role, and the cost of transition. But I'm more interested in understanding what the total value of this opportunity looks like. Can we look at the full picture beyond just base?", next: "total_comp", quality: "great" },
          { text: "That's what I'm worth in the market. Other companies are offering in that range.", next: "pressure_play", quality: "medium" },
          { text: "I just need more. Can you match what I'm asking?", next: "blunt_ask", quality: "poor" }
        ]
      },
      honest_flag: {
        speaker: "Chris",
        text: "Of course. What's on your mind?",
        choices: [
          { text: "I want to find a way to make this work because I'm genuinely excited about the role and the team. Help me understand — what's the most important thing for you in making this hire work?", next: "interests_explore", quality: "great" },
          { text: "The base salary is 15% below what I was targeting. Is there room to move on that?", next: "direct_counter", quality: "good" },
          { text: "I love the role. The compensation is lower than I expected, though. Can we talk through the full package together?", next: "total_comp", quality: "good" },
          { text: "Honestly, the money doesn't work for me. I need you to come up or I can't accept.", next: "blunt_ask", quality: "poor" }
        ]
      },
      range_explore: {
        speaker: "Chris",
        text: "The top of the range is reserved for people who've been in the role for a while. But I'll level with you — if you bring the experience you've described, I could probably justify coming up somewhat. What would make this feel right to you?",
        choices: [
          { text: "I appreciate the transparency. Rather than throwing out a number, can I share what I'm weighing? I want to make sure we solve for the right things.", next: "total_comp", quality: "great" },
          { text: "If you could get to [target number], I'd sign today.", next: "anchor_set", quality: "good" },
          { text: "That's helpful. What does the progression look like for people who come in at the higher end — what sets them apart early on?", next: "growth_path", quality: "great" },
          { text: "Midpoint seems low for what I'm bringing. Can you just bump it to the top of the range?", next: "direct_counter", quality: "medium" }
        ]
      },
      growth_path: {
        speaker: "Chris",
        text: "Typically there's a review at six months and annual adjustments. High performers can move up quickly — I've seen 10-15% increases in the first year for people who hit the ground running.",
        choices: [
          { text: "That's encouraging. What if we built that confidence into the offer? Like a six-month review with a guaranteed adjustment if I hit specific milestones? That way the risk is shared.", next: "creative_solution", quality: "great" },
          { text: "That's good to know. But I'd still like to start from a stronger base. Can we discuss the starting number?", next: "direct_counter", quality: "good" }
        ]
      },
      total_comp: {
        speaker: "Chris",
        text: "Sure, I'm listening. What are the pieces you're looking at?",
        choices: [
          { text: "Base is one part. But I'm also thinking about equity, signing bonus, review timing, and honestly — the role itself. What levers do you have flexibility on?", next: "creative_solution", quality: "great" },
          { text: "Honestly, base salary is the main thing. Everything else is secondary.", next: "anchor_set", quality: "medium" }
        ]
      },
      interests_explore: {
        speaker: "Chris",
        text: "Honestly? I need someone who's going to hit the ground running on the product launch in Q2. The last person we offered this to turned it down and we lost two months. I don't want to lose you over a few thousand dollars.",
        choices: [
          { text: "That's really helpful to know. It sounds like speed and commitment matter more than saving on salary. What if I could commit to starting two weeks earlier than planned — would that change what's possible on the compensation side?", next: "creative_solution", quality: "great" },
          { text: "Then let's make sure you don't. If speed matters, I'm ready to go — but I need the compensation to reflect the urgency and what I'm bringing to the table.", next: "anchor_set", quality: "good" }
        ]
      },
      pressure_play: {
        speaker: "Chris",
        text: "I respect that. But I'd caution against making this purely about competing offers. We're offering something specific here. What matters most to you beyond compensation?",
        choices: [
          { text: "You're right — and that's actually why I'm here instead of somewhere else. The role, the team, the mission — that all matters. So let's figure out how to make the numbers work within what you can do. Where do you have flexibility?", next: "creative_solution", quality: "great" }
        ]
      },
      blunt_ask: {
        speaker: "Chris",
        text: "I want to work with you on this, but I also need to be realistic about what I can do. Can you help me understand the full picture of what you're looking for?",
        choices: [
          { text: "Fair enough. Let me step back. What I care most about is feeling valued and having a path to growth. The number is part of that, but it's not the only thing. What can you offer beyond base that might help close the gap?", next: "creative_solution", quality: "great" }
        ]
      },
      anchor_set: {
        speaker: "Chris",
        text: "I hear you. I may not be able to get all the way there on base, but I want to try. Let me see what I can do. Would you be open to a slightly lower base if we could make up the difference in other ways?",
        choices: [
          { text: "Absolutely. I'm flexible on the structure — it's the total value that matters. What options do you have?", next: "creative_solution", quality: "great" },
          { text: "It depends on what those other ways are. What are you thinking?", next: "creative_solution", quality: "good" }
        ]
      },
      creative_solution: {
        speaker: "Chris",
        text: "What if we did this: bump the base by 8%, add a $10K signing bonus, and do a guaranteed six-month review with a target raise if you hit your milestones? I can also look at extra PTO. Would something like that work?",
        choices: [
          { text: "That's a creative package and I appreciate you working with me on it. Can I ask one more thing — what would the milestones look like? I want to make sure we're aligned on what success means so that six-month conversation is a formality, not a negotiation.", next: "ending_great", quality: "great" },
          { text: "That's getting closer. Can you push the base a little more — even 10% — and I'll take the rest as-is?", next: "ending_good", quality: "good" },
          { text: "I'll take it. When do I start?", next: "ending_medium", quality: "medium" }
        ]
      },
      ending_great: {
        speaker: "Chris",
        text: "I love that question. Let me draft something specific and we can agree on it together. Honestly, this is the best negotiation conversation I've had in years. Most people either cave or play hardball. You actually tried to understand what we could do. I'm even more excited to have you on the team.",
        isEnding: true,
        summary: "You negotiated with questions instead of demands. By uncovering interests (the Q2 urgency, the flexibility on structure, the range boundaries), you found creative solutions that worked for both sides. Chris feels respected, not squeezed, and you start the job with a strong relationship with your manager."
      },
      ending_good: {
        speaker: "Chris",
        text: "Let me see what I can do. I think we can find something that works. I'm glad we had this conversation — you clearly know your value and I respect that.",
        isEnding: true,
        summary: "You negotiated effectively and got a better offer. The conversation was direct but respectful. Chris sees you as someone who advocates for yourself, which is positive. You got most of what you wanted, though there might have been creative options left on the table."
      },
      ending_medium: {
        speaker: "Chris",
        text: "Great! Welcome aboard. HR will send the paperwork.",
        isEnding: true,
        summary: "You accepted without fully exploring what was possible. The offer improved from the original, but you missed opportunities to ask about structure, milestones, and growth. In negotiation, the questions you don't ask are the ones that cost you the most."
      }
    }
  },
  {
    id: 13,
    title: "The Family Dinner",
    label: "Social Scenario",
    skillCategory: "Cultural Awareness",
    difficultyTier: "intermediate",
    context: "You're at a holiday dinner with extended family. Your Uncle Ray has just made a politically charged statement about immigration. Your cousin Aisha, whose partner is an immigrant, looks uncomfortable. The table has gone quiet. Everyone's looking at their plates.",
    opening: "I'm just saying what everyone's thinking. Somebody has to say it.",
    nodes: {
      start: {
        speaker: "Uncle Ray",
        text: "I'm just saying what everyone's thinking. Somebody has to say it.",
        choices: [
          { text: "Uncle Ray, I'm curious what made you start thinking about this. What happened?", next: "curiosity_approach", quality: "great" },
          { text: "Actually, I don't think everyone's thinking that. Can we not do this at dinner?", next: "direct_pushback", quality: "medium" },
          { text: "That's a pretty broad statement. Not everyone sees it the same way, right?", next: "gentle_challenge", quality: "good" },
          { text: "You're clearly feeling strongly about this. What's been going on that brought this up?", next: "curiosity_approach", quality: "great" },
          { text: "Come on, Uncle Ray. That's not cool.", next: "direct_pushback", quality: "poor" }
        ]
      },
      curiosity_approach: {
        speaker: "Uncle Ray",
        text: "What happened? I'll tell you what happened. Bill down at the shop lost his job to someone who's been here two years. Two years! Bill's been there for twenty. It's not right.",
        choices: [
          { text: "That sounds really frustrating for Bill. What happened to him — did the company give a reason?", next: "story_thread", quality: "great" },
          { text: "That's one person's story, Uncle Ray. You can't generalize from that.", next: "logic_battle", quality: "poor" },
          { text: "I can see why that would make you angry. Is Bill doing okay?", next: "empathy_redirect", quality: "great" }
        ]
      },
      direct_pushback: {
        speaker: "Uncle Ray",
        text: "See, this is the problem. You can't even have a conversation anymore without someone shutting you down.",
        choices: [
          { text: "You're right, I didn't mean to shut you down. I just noticed Aisha got quiet and I got protective. But I do want to understand where you're coming from. What's behind this for you?", next: "story_thread", quality: "great" },
          { text: "I'm not shutting you down. I just think there are people at this table it affects, and maybe a holiday dinner isn't the place.", next: "boundary_set", quality: "good" },
          { text: "Fair point. I don't want to shut you down. I just want to make sure everyone at this table feels included. What's been on your mind about this?", next: "curiosity_approach", quality: "good" },
          { text: "You're right, that's not what I want. I actually am curious. Something is clearly bothering you. What's really going on?", next: "story_thread", quality: "great" }
        ]
      },
      gentle_challenge: {
        speaker: "Uncle Ray",
        text: "Well, everyone I talk to thinks so. Regular people. Not the people on TV.",
        choices: [
          { text: "Who are the people you're talking to? What are they experiencing that's making them feel this way?", next: "story_thread", quality: "great" },
          { text: "Aisha, you've been quiet. You okay?", next: "check_on_aisha", quality: "good" },
          { text: "Regular people like who? I want to understand what they're going through.", next: "empathy_redirect", quality: "good" },
          { text: "That's just your echo chamber, Uncle Ray. The world is more complicated than that.", next: "logic_battle", quality: "poor" }
        ]
      },
      story_thread: {
        speaker: "Uncle Ray",
        text: "Bill, Mike from the VFW, my neighbor Pete — they're all seeing the same thing. Good jobs going away, costs going up. People feel like nobody's listening to them.",
        choices: [
          { text: "That feeling of not being listened to — I think that's real. And I think a lot of people share it for different reasons. What do you think would actually help Bill and your friends?", next: "deeper_values", quality: "great" },
          { text: "Those are real economic problems. But blaming immigrants for them might be misdirecting the frustration, don't you think?", next: "logic_battle", quality: "medium" },
          { text: "Uncle Ray, I hear you. Can I share something I've been thinking about too?", next: "bridge_moment", quality: "great" }
        ]
      },
      empathy_redirect: {
        speaker: "Uncle Ray",
        text: "Bill's not great, honestly. He's sixty-two. Who's going to hire him now? His wife's scared. I'm scared for them.",
        choices: [
          { text: "That's real fear for people you care about. I understand that. When you see Bill hurting, what do you think would actually make things better for him?", next: "deeper_values", quality: "great" },
          { text: "That is really hard. But is it fair to blame immigrants for a company's decision to cut costs?", next: "logic_battle", quality: "medium" }
        ]
      },
      logic_battle: {
        speaker: "Uncle Ray",
        text: "I knew you'd turn this into a debate. You always do this.",
        choices: [
          { text: "You're right, I went to argument mode. I'm sorry. I actually want to understand, not win. What would good look like for Bill? What would it look like for him to feel secure again?", next: "deeper_values", quality: "great" },
          { text: "I'm not debating. I'm just saying there are people at this table who are affected by statements like that. Aisha's partner, Marcus — he's an immigrant.", next: "check_on_aisha", quality: "good" }
        ]
      },
      boundary_set: {
        speaker: "Uncle Ray",
        text: "Fine. I'll keep my opinions to myself.",
        choices: [
          { text: "I don't want you to keep your opinions to yourself. I want us to actually hear each other. Ray, what's really going on? Why does this feel so urgent to you?", next: "story_thread", quality: "great" },
          { text: "It's not about keeping quiet. But maybe we can talk about it in a way that doesn't make anyone at this table feel unwelcome?", next: "bridge_moment", quality: "good" }
        ]
      },
      check_on_aisha: {
        speaker: "Aisha",
        text: "I'm fine. I just... Marcus works fourteen-hour days. He pays taxes. He coaches Little League. I don't know what to do with these conversations anymore.",
        choices: [
          { text: "Uncle Ray, I don't think you and Aisha are actually on different sides here. You both care about people being treated fairly. Ray, what would you think if Bill and Marcus were both in the room? What would you say?", next: "bridge_moment", quality: "great" },
          { text: "Aisha has a point, Uncle Ray. Marcus is exactly the kind of person you're talking about and he's family.", next: "deeper_values", quality: "good" }
        ]
      },
      deeper_values: {
        speaker: "Uncle Ray",
        text: "I want... I want people to be taken care of. I want a guy like Bill to not be thrown away after thirty years. Is that so wrong?",
        choices: [
          { text: "It's not wrong at all. That's actually a value I think everyone at this table shares. What if the problem isn't about who gets the jobs but about how companies treat all their workers?", next: "bridge_moment", quality: "great" },
          { text: "No, it's not wrong. I think we all want that. Even for Marcus, right?", next: "bridge_moment", quality: "great" }
        ]
      },
      bridge_moment: {
        speaker: "Uncle Ray",
        text: "Look, I don't have anything against Marcus. He's a good kid. I just... I see my friends hurting and I don't know where to put it.",
        choices: [
          { text: "I get it. Anger needs a target, and the real target — the system, the economy, the companies — is hard to fight. Can we agree that we all want the same thing? That people like Bill and Marcus both deserve dignity?", next: "ending_great", quality: "great" },
          { text: "That's honest, Uncle Ray. Thank you for saying that. Aisha, do you hear that?", next: "ending_great", quality: "great" }
        ]
      },
      ending_great: {
        speaker: "Uncle Ray",
        text: "Yeah. Yeah, I can agree with that. I shouldn't have said it the way I said it. Aisha — I'm sorry, honey. I just get worked up.",
        isEnding: true,
        summary: "You de-escalated a volatile family moment by using questions to find the person behind the political statement. Instead of debating positions, you uncovered values — fear for friends, a need for dignity, pain without a target. By the end, Uncle Ray and Aisha found common ground. The family dinner was saved."
      },
      ending_medium: {
        speaker: "Uncle Ray",
        text: "Alright, alright. Let's eat. Someone pass the potatoes.",
        isEnding: true,
        summary: "The conversation cooled down, but the underlying tension wasn't resolved. The topic was dropped rather than transformed. Aisha is still uncomfortable. Uncle Ray still holds his views. The family survived dinner, but the conversation will come back."
      },
      ending_poor: {
        speaker: "Uncle Ray",
        text: "You know what, forget it. Nobody wants to hear what I have to say anyway.",
        isEnding: true,
        summary: "The conversation became a debate, and everyone lost. Uncle Ray feels dismissed, Aisha feels unprotected, and the family tension increased. Debates rarely change minds at dinner tables — questions that uncover shared values do."
      }
    }
  },
  {
    id: 14,
    title: "The Exit Interview",
    label: "Leadership Scenario",
    skillCategory: "Leadership",
    difficultyTier: "expert",
    context: "Your star employee Priya has resigned after four years. She's been a top performer and informal leader. You're shocked but trying not to show it. This isn't a formal exit interview — you've asked her to have an honest conversation, off the record, at a coffee shop near the office.",
    opening: "So. This is weird, right?",
    nodes: {
      start: {
        speaker: "Priya",
        text: "So. This is weird, right?",
        choices: [
          { text: "It is. I'm not going to pretend I'm not disappointed. But more than anything, I want to understand. What got you to this point?", next: "honest_open", quality: "great" },
          { text: "It doesn't have to be. I just want to make sure you're leaving for the right reasons. Is there anything we can do to change your mind?", next: "retention_attempt", quality: "medium" },
          { text: "A little. But I'd rather have an honest conversation than a comfortable one. Can I ask you some tough questions?", next: "permission_bridge", quality: "great" }
        ]
      },
      honest_open: {
        speaker: "Priya",
        text: "Honestly? It wasn't one thing. It was a hundred small things that added up to a feeling. The feeling that I'd stopped growing.",
        choices: [
          { text: "A hundred small things. Can you give me two or three that were the loudest?", next: "specifics_emerge", quality: "great" },
          { text: "When did that feeling start? Was there a moment?", next: "timeline_explore", quality: "great" },
          { text: "We could have worked on that. Why didn't you say anything?", next: "defensive_misstep", quality: "poor" }
        ]
      },
      retention_attempt: {
        speaker: "Priya",
        text: "I appreciate that, but my mind is made up. I don't want this to be a negotiation.",
        choices: [
          { text: "Understood. It's not. But I do want to learn from this — for the team and for myself as a leader. Would you be willing to be really honest with me about what we got wrong?", next: "permission_bridge", quality: "great" },
          { text: "Is it the money? Because I can talk to HR about a raise.", next: "missing_the_point", quality: "poor" },
          { text: "I respect that. Then help me understand what happened so I don't make the same mistakes with the rest of the team.", next: "permission_bridge", quality: "good" },
          { text: "I hear you. I'm not trying to change your mind. But I owe it to myself and the team to ask: what did we miss?", next: "floodgate_opens", quality: "great" }
        ]
      },
      permission_bridge: {
        speaker: "Priya",
        text: "Tough questions? Sure. I think I owe you that. And honestly, I've wanted to say some of this for a while.",
        choices: [
          { text: "Then let me shut up and listen. What's the thing you've wanted to say but haven't?", next: "floodgate_opens", quality: "great" },
          { text: "What held you back from saying it before?", next: "systemic_issue", quality: "great" },
          { text: "I want to hear all of it. Start wherever feels right.", next: "floodgate_opens", quality: "good" },
          { text: "That's on me that you didn't feel you could say it sooner. What would have made it safe to bring this up?", next: "systemic_issue", quality: "great" }
        ]
      },
      defensive_misstep: {
        speaker: "Priya",
        text: "That's kind of the problem right there. Do you know how many times I brought up growth opportunities and got 'let's circle back on that'?",
        choices: [
          { text: "Ouch. That's fair. How many times?", next: "specifics_emerge", quality: "great" },
          { text: "I didn't realize it felt that way. Can you help me see what I missed?", next: "specifics_emerge", quality: "great" }
        ]
      },
      missing_the_point: {
        speaker: "Priya",
        text: "See, that's the thing. It's not about money. Everyone always thinks it's about money. Has anyone ever left and you actually asked them what was really going on?",
        choices: [
          { text: "Honestly? Probably not well enough. I'm asking now. What was really going on?", next: "floodgate_opens", quality: "great" }
        ]
      },
      timeline_explore: {
        speaker: "Priya",
        text: "I think it started about a year ago. When the team expanded and I went from doing interesting work to managing spreadsheets and status meetings. I became a project tracker instead of a problem solver.",
        choices: [
          { text: "That's a big shift. Did anyone ask you if that's what you wanted?", next: "systemic_issue", quality: "great" },
          { text: "We needed someone reliable in that role. You were the best person for it.", next: "defensive_misstep", quality: "poor" },
          { text: "What did you want to be doing instead? What lights you up?", next: "vision_explore", quality: "great" }
        ]
      },
      specifics_emerge: {
        speaker: "Priya",
        text: "Three times. Three times I asked about a senior role or a new challenge. Each time it was 'the timing isn't right' or 'we need you where you are.' I stopped asking because I figured the answer would always be no.",
        choices: [
          { text: "I dropped the ball three times with someone who was telling me exactly what they needed. I need to sit with that. What would the right response have been — what should I have said?", next: "learning_moment", quality: "great" },
          { text: "That's on me. What did you need that you weren't getting?", next: "vision_explore", quality: "great" },
          { text: "To be fair, those were tough budget cycles.", next: "defensive_misstep", quality: "poor" }
        ]
      },
      floodgate_opens: {
        speaker: "Priya",
        text: "You promote people who are loud, not people who are effective. You reward firefighting, not fire prevention. And when someone does quiet, excellent work, they get more quiet, excellent work piled on them instead of recognition. I was your most reliable person, and my reward was invisibility.",
        choices: [
          { text: "That's a devastating thing to hear. And I need to hear it. The invisibility part — can you tell me more? When did you feel most invisible?", next: "learning_moment", quality: "great" },
          { text: "I hear you. Is this about the team, or is this about me specifically?", next: "brave_question", quality: "great" },
          { text: "I think that's a bit unfair. I've always valued your work.", next: "challenge_response", quality: "poor" }
        ]
      },
      systemic_issue: {
        speaker: "Priya",
        text: "No one asked. It was just assumed. And I think that's the pattern here — the company rewards loyalty by giving you more of what you already do instead of asking what you want to become.",
        choices: [
          { text: "That's a systemic problem you're describing, not just your experience. Do you think other people on the team feel this way?", next: "bigger_picture", quality: "great" },
          { text: "What did you want to become?", next: "vision_explore", quality: "great" }
        ]
      },
      vision_explore: {
        speaker: "Priya",
        text: "I wanted to lead a product. Not manage tasks — lead a vision. I wanted to be in the room when decisions were made, not just executing them afterward.",
        choices: [
          { text: "And you would have been great at that. The fact that we never created that path... what does that tell you about our leadership?", next: "learning_moment", quality: "great" },
          { text: "Where are you going next? Did you find that somewhere else?", next: "bigger_picture", quality: "good" }
        ]
      },
      challenge_response: {
        speaker: "Priya",
        text: "Valued it how? By giving me more of it? By passing me over for the senior role last quarter and giving it to Tyler, who's been here half the time I have?",
        choices: [
          { text: "I don't have a good answer for that. The Tyler decision — was that the breaking point?", next: "learning_moment", quality: "great" }
        ]
      },
      brave_question: {
        speaker: "Priya",
        text: "Both. You're a good person and I respect you. But as a leader... you avoid hard conversations. You keep things smooth instead of making them right. And the people who suffer for that are the ones who don't make noise.",
        choices: [
          { text: "That might be the most important thing anyone's said to me as a leader. I need to think about that. What would 'making it right' have looked like — for you, specifically?", next: "learning_moment", quality: "great" }
        ]
      },
      learning_moment: {
        speaker: "Priya",
        text: "Honestly? Just being seen. Having someone say 'I notice what you're doing and it matters.' And then backing that up with a real opportunity, not just words. I didn't need a parade. I needed a path.",
        choices: [
          { text: "A path, not a parade. I'm going to remember that. Priya, I know I can't undo this. But I can make sure it doesn't happen to the next you. What would you build if you were redesigning how we develop people here?", next: "ending_great", quality: "great" },
          { text: "I failed you on that. I'm sorry. Before you go — who else on the team do you think is feeling what you felt? I don't want to lose another you.", next: "ending_great", quality: "great" }
        ]
      },
      bigger_picture: {
        speaker: "Priya",
        text: "I think Marcus is next, honestly. He's showing the same signs I did — doing great work, getting no recognition, starting to disengage. If you don't ask him what he wants soon, you'll be having this conversation again in six months.",
        choices: [
          { text: "That's a gift you're giving me right now, and I don't take it lightly. What question should I ask Marcus that nobody asked you?", next: "ending_great", quality: "great" },
          { text: "I'll talk to him. Is there anything else about the team or the culture that I need to see that I'm not seeing?", next: "ending_great", quality: "good" }
        ]
      },
      ending_great: {
        speaker: "Priya",
        text: "This conversation right here — the questions you asked today — this is the manager I needed a year ago. I mean that as a compliment, not a criticism. You're going to be better because of this. And I'm going to be better for leaving. Sometimes both things can be true.",
        isEnding: true,
        summary: "You turned a loss into learning. By asking questions from genuine humility — not defensiveness — you uncovered systemic issues, personal blind spots, and specific warnings about other team members. Priya is still leaving, but she leaves respecting you and you leave with actionable insight that could transform your leadership."
      },
      ending_medium: {
        speaker: "Priya",
        text: "I appreciate you trying to understand. I hope things get better for the team. They're good people.",
        isEnding: true,
        summary: "You showed that you care, but the conversation stayed somewhat surface-level. Priya shared some truths but held back the sharpest ones because the space didn't feel quite safe enough. You got useful feedback, but the deeper systemic insights remained hidden."
      },
      ending_poor: {
        speaker: "Priya",
        text: "Thanks for the coffee. I wish you the best, honestly.",
        isEnding: true,
        summary: "The conversation became defensive rather than curious. Priya gave polished, safe answers because she didn't feel she could be honest. The real reasons for her departure — and the warnings about others — stayed unspoken. The same pattern will repeat."
      }
    }
  },
  {
    id: 15,
    title: "The Self-Coaching Session",
    label: "Self-Reflection Scenario",
    skillCategory: "Self-Reflection",
    difficultyTier: "expert",
    context: "It's Friday night. You've been offered a big opportunity — a role in another city that would double your salary but mean leaving your community, your aging parents nearby, and the life you've built. The deadline to decide is Monday. You're sitting with your journal, trying to think clearly.",
    opening: "You keep going in circles. The same arguments, the same fears. Maybe it's time to ask yourself better questions.",
    nodes: {
      start: {
        speaker: "Your Thoughts",
        text: "You keep going in circles. The same arguments, the same fears. Maybe it's time to ask yourself better questions.",
        choices: [
          { text: "What am I actually afraid of? Not the practical stuff — the real fear underneath.", next: "fear_explore", quality: "great" },
          { text: "Let me make a pros and cons list. Money, career growth, location, family...", next: "logic_trap", quality: "medium" },
          { text: "If I take fear completely out of it, what do I want?", next: "desire_explore", quality: "great" },
          { text: "Who do I want to be five years from now? Let me start there.", next: "values_fork", quality: "great" },
          { text: "Maybe I should call someone and ask for advice.", next: "external_validation", quality: "poor" }
        ]
      },
      fear_explore: {
        speaker: "Your Thoughts",
        text: "There it is. You're afraid that if you take this, you'll become someone you don't recognize. Someone who chose ambition over the people who matter. But you're also afraid that if you don't take it, you'll spend the rest of your life wondering 'what if.'",
        choices: [
          { text: "Which fear is bigger? The fear of becoming someone I don't want to be, or the fear of staying small?", next: "values_fork", quality: "great" },
          { text: "When have I made a decision from fear before, and how did that turn out?", next: "pattern_recognition", quality: "great" },
          { text: "I should just take the safe option and stay.", next: "avoidance_path", quality: "poor" }
        ]
      },
      logic_trap: {
        speaker: "Your Thoughts",
        text: "You've already made the list. Three times. The pros and cons are exactly balanced, which means the answer isn't in logic. The real question is: what does your gut say that your spreadsheet can't capture?",
        choices: [
          { text: "My gut says... I want to go. But my heart says I'll miss everything I'm leaving.", next: "desire_explore", quality: "great" },
          { text: "Maybe I should ask someone else for advice.", next: "external_validation", quality: "medium" },
          { text: "My gut says this opportunity scares me — and the things that scare me are usually the things I need to face.", next: "fear_explore", quality: "great" },
          { text: "I keep coming back to my parents. I can't leave them. That's my answer.", next: "avoidance_path", quality: "poor" }
        ]
      },
      desire_explore: {
        speaker: "Your Thoughts",
        text: "Interesting. You want to go. Sit with that for a second. What is it about this opportunity that pulls you? Not the salary. Deeper than that.",
        choices: [
          { text: "It's the chance to prove to myself that I can do hard things. That I'm not limited by where I started.", next: "values_fork", quality: "great" },
          { text: "I think I need to be honest — part of me feels like I've outgrown this place. And I feel guilty about that.", next: "guilt_thread", quality: "great" },
          { text: "The money would solve a lot of problems. My parents' medical bills, my student loans...", next: "practical_values", quality: "good" }
        ]
      },
      avoidance_path: {
        speaker: "Your Thoughts",
        text: "Is that a decision, or is that fear wearing a mask that looks like wisdom? There's a difference between choosing to stay because you love your life, and staying because you're afraid to change it.",
        choices: [
          { text: "Okay. Hard question: do I love my life here, or am I just comfortable?", next: "values_fork", quality: "great" },
          { text: "Maybe comfort is underrated. What's wrong with a life that fits?", next: "comfort_examine", quality: "great" }
        ]
      },
      external_validation: {
        speaker: "Your Thoughts",
        text: "You already know what everyone will say. Your parents will say stay. Your ambitious friends will say go. Your best friend will say 'what do you want?' And you'll be right back here. The question isn't what other people think. It's: what do you value most?",
        choices: [
          { text: "What do I value most? Let me actually answer that instead of avoiding it.", next: "values_fork", quality: "great" }
        ]
      },
      values_fork: {
        speaker: "Your Thoughts",
        text: "Here's the real question. Close your eyes. Imagine yourself at seventy, looking back. In one version, you stayed — you were present for your parents, rooted in your community, built a smaller but deeply connected life. In the other, you went — you stretched yourself, saw new things, became someone bigger, but the roots are thinner. Which seventy-year-old has more regret?",
        choices: [
          { text: "The one who stayed... no. The one who went... no. I keep switching. Maybe the answer isn't either/or.", next: "integration_path", quality: "great" },
          { text: "The one who stayed without choosing to stay. The one who defaulted into it. The regret isn't about where you end up — it's about whether you chose it.", next: "agency_insight", quality: "great" },
          { text: "I think... the one who stayed. I'd always wonder.", next: "leaning_go", quality: "good" }
        ]
      },
      pattern_recognition: {
        speaker: "Your Thoughts",
        text: "Last time you made a decision from fear, you turned down that project because you didn't think you were ready. You were ready. You regretted it for a year. But the time before that, you stayed in a relationship out of fear of being alone, and leaving was the best thing you ever did. So fear isn't always wrong or right. The question is: what is this fear protecting you from, and is that protection still needed?",
        choices: [
          { text: "This fear is protecting me from loss — losing proximity to people I love. That's not irrational. But is it the whole story?", next: "integration_path", quality: "great" },
          { text: "Maybe I need to separate the fear of losing people from the fear of change. They're not the same thing.", next: "values_fork", quality: "great" }
        ]
      },
      guilt_thread: {
        speaker: "Your Thoughts",
        text: "There's the guilt. You think outgrowing a place means betraying it. But does it? Did the seed betray the soil by becoming a tree? Or does your growth honor the people and place that raised you?",
        choices: [
          { text: "But my parents need me. They're getting older. If something happens and I'm not here...", next: "practical_values", quality: "good" },
          { text: "Can I grow and still stay connected? Is there a version of this where I don't have to choose between expansion and belonging?", next: "integration_path", quality: "great" }
        ]
      },
      practical_values: {
        speaker: "Your Thoughts",
        text: "The practical stuff is real. But notice what you're doing — you're building a case with logistics because the emotional answer is harder. If money and logistics were identical in both options, which would you choose?",
        choices: [
          { text: "If everything else were equal... I'd go. And that terrifies me. Because it means the practical reasons for staying are partly an excuse.", next: "agency_insight", quality: "great" },
          { text: "If everything else were equal, I'd stay. Because what I have here — the relationships, the roots — that's what I actually value.", next: "leaning_stay", quality: "great" }
        ]
      },
      comfort_examine: {
        speaker: "Your Thoughts",
        text: "Nothing is wrong with comfort. Unless it's comfort as a cage instead of comfort as a choice. You can choose a quiet life and that can be brave. The question is: are you choosing it, or are you settling for it because the alternative is scary?",
        choices: [
          { text: "I need to be really honest right now. I think... it's both. Part of me genuinely loves this life. And part of me is using that love as a shield against the unknown.", next: "integration_path", quality: "great" }
        ]
      },
      integration_path: {
        speaker: "Your Thoughts",
        text: "What if this isn't about choosing between two lives? What if it's about choosing who you want to be, and then building the life that fits? Not 'stay or go' — but 'what kind of person do I want to become, and what does that person need?'",
        choices: [
          { text: "The person I want to become is someone who takes big swings but never loses their center. Someone who's brave but stays connected. Is that possible?", next: "synthesis", quality: "great" },
          { text: "The person I want to become is already here — in this community, in these relationships. I just need to commit to growing inside of this life instead of looking for growth somewhere else.", next: "synthesis", quality: "great" }
        ]
      },
      agency_insight: {
        speaker: "Your Thoughts",
        text: "So the decision isn't about the job. It's about agency. It's about whether you're the kind of person who drives their life or rides along with it. That's what's really at stake here.",
        choices: [
          { text: "Then the question becomes: how do I make this decision actively, rather than letting the deadline make it for me?", next: "synthesis", quality: "great" },
          { text: "What if I called them and asked for more time? Not to delay — but to make sure I'm deciding, not reacting.", next: "synthesis", quality: "great" }
        ]
      },
      leaning_go: {
        speaker: "Your Thoughts",
        text: "You're leaning toward going. Before you commit to that — what would you need to put in place so that going doesn't mean abandoning? What would 'going with an anchor' look like?",
        choices: [
          { text: "Monthly visits home. Weekly calls. Bringing my parents out to visit. Building new roots without ripping out old ones. Maybe going doesn't have to mean gone.", next: "synthesis", quality: "great" }
        ]
      },
      leaning_stay: {
        speaker: "Your Thoughts",
        text: "You're leaning toward staying. Before you commit to that — what would you need to put in place so that staying doesn't mean stagnating? What would 'staying with fire' look like?",
        choices: [
          { text: "Finding growth here. Asking for more at work. Starting that project I've been putting off. Choosing this life fully instead of treating it as a default.", next: "synthesis", quality: "great" }
        ]
      },
      synthesis: {
        speaker: "Your Thoughts",
        text: "Look at that. You didn't need someone to tell you what to do. You needed better questions. The answer was always in you — it just needed the right question to unlock it.",
        choices: [
          { text: "Write it down. Not the decision — the values. What I learned about myself tonight. The decision will come from there.", next: "ending_great", quality: "great" },
          { text: "I think I know what I'm going to do. But more importantly, I know why. And for the first time this week, I feel clear.", next: "ending_great", quality: "great" }
        ]
      },
      ending_great: {
        speaker: "Your Thoughts",
        text: "The journal is full now. Not with answers — with the right questions. You asked yourself what you value, what you fear, what kind of person you want to become. Whatever you decide on Monday, it will be a decision you made — not one that happened to you. That's the power of asking yourself better questions.",
        isEnding: true,
        summary: "You practiced the most advanced questioning skill: self-inquiry. By sitting with discomfort instead of rushing to decide, you uncovered your real values, separated fear from wisdom, and found clarity through honest self-questioning. The decision itself matters less than the process — you now have a framework for every big decision that follows."
      },
      ending_medium: {
        speaker: "Your Thoughts",
        text: "You've thought about it. The lists are made. You have more information than when you started. But something still feels unresolved — like you're closer to the answer but haven't quite gotten to the truth underneath.",
        isEnding: true,
        summary: "You engaged with the decision intellectually but pulled back from the hardest emotional questions. The pros-and-cons approach has limits — the most important life decisions require us to go beyond logic and ask 'who do I want to be?' That question is still waiting."
      }
    }
  }
];
