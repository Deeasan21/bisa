# Bisa — Session State

## Last Session
- **Date:** 2026-02-18
- **What was done:** Phase 2 — Claude API Integration for AI-powered feedback
- **Current focus:** Phase 2 complete, all core features built

## Phase 1 — Completed
1. ✅ Scaffold React + Vite project with folder structure
2. ✅ Install Phosphor Icons and set up theme system (7 mode themes)
3. ✅ Build common components (Button, Card, ProgressBar, Badge, HexBadge, MascotMessage, ScoreGauge, Toast)
4. ✅ Build AppShell with bottom tab navigation (Today, Modes, Progress, Journal, Me)
5. ✅ Migrate content data (13 lessons, 32 scenarios, 30 challenges, 7 simulations, 12 achievements)
6. ✅ Migrate sql.js + IndexedDB database layer into React hooks (DatabaseProvider, useDatabase)
7. ✅ Migrate SM-2 spaced repetition + scoring algorithms into src/utils/
8. ✅ Create Today page with daily quests, streak, mascot
9. ✅ Create Modes page (5 playable mode cards with unique themes)
10. ✅ Build Learn mode with all 13 lessons + reflection saving
11. ✅ Build Practice mode with 32 scenarios + score gauge + keyword matching
12. ✅ Build Daily Challenge with streak tracking + challenge history
13. ✅ Build Simulate mode with 7 branching conversations + quality tracking
14. ✅ Build Review mode with SM-2 flashcards (seed, review, rate)
15. ✅ Build Journal with full CRUD (add, list, delete)
16. ✅ Profile/Me page with XP, level, league, achievements grid
17. ✅ Gamification hooks (useXP, useStreak, useProgress, useAchievements)
18. ✅ Dashboard components (ProfileCard, SkillBars, AchievementGrid, DailyQuests)

## Phase 1.5 — Completed (Adaptive Algorithms & Engine Systems)
1. ✅ Adaptive Difficulty Engine (src/engine/adaptiveDifficulty.js) — rolling avg per category, auto tier adjustment
2. ✅ BPQ Scoring System (src/engine/bpqScore.js) — 0-1000 proficiency quotient with 7 levels
3. ✅ Smart Recommendations Engine (src/engine/recommendations.js) — weak/stale category detection, mode suggestions
4. ✅ Rule-Based Response Scorer (src/engine/responseScorer.js) — open/closed detection, keyword matching, technique detection, AI flag for ambiguous zone
5. ✅ Daily Quest Generator (src/engine/dailyQuests.js) — 3 quests/day, weakness-weighted, auto-generated
6. ✅ League & Ranking System (src/engine/leagues.js) — Bronze→Master, weekly XP, simulated percentile
7. ✅ XP Award Rules (src/engine/xpSystem.js) — dynamic XP calc per activity, level-ups, league promotions
8. ✅ Achievement Triggers (src/engine/achievements.js) — 25 achievements with condition checks and XP rewards
9. ✅ Feedback Messages (src/data/feedbackMessages.js) — 5+ variations per feedback type
10. ✅ Database schema updated with engine tables (user_scores, bpq_history, daily_quests, difficulty_tiers, user_stats)
11. ✅ All 8 engines wired into existing UI components

## Phase 1.75 — Completed (Content Expansion & UI Upgrades)

### Content Expansion
- ✅ Practice Scenarios: 32 → 80 (all tagged with skillCategory + difficultyTier)
- ✅ Daily Challenges: 30 → 60 (all tagged with id, skillCategory, difficultyTier)
- ✅ Simulations: 7 → 15 (8 new branching conversations with tags)
- ✅ Achievements: 12 → 25 (13 new with condition checks)
- ✅ Flashcards: 211 new review cards (src/data/flashcards.js)
- ✅ Lessons: 13 → 38 (25 new lessons across 5 tiers with full HTML content)
- ✅ Mode theme descriptions updated with new counts

### UI Upgrades
- ✅ New common components: Skeleton, Confetti, XPToast
- ✅ Dark mode system (CSS variables + toggle + localStorage)
- ✅ Enhanced animations (3D flip, typing indicator, confetti, glow, shimmer)
- ✅ Today page: streak calendar, quick practice, context-aware mascot, confetti
- ✅ Profile page: avatar glow, Phosphor achievement icons, frosted glass, weekly summary
- ✅ Modes page: gradient shimmer, recommended badge, progress rings
- ✅ Progress page: BPQ gauge, category skill bars, strongest/weakest callouts
- ✅ Journal page: mood tags, search/filter, empty state, delete animation
- ✅ LearnMode: tier grouping, progress dots, collapsible sections
- ✅ PracticeMode: category filters, difficulty badges, animated score
- ✅ DailyChallenge: countdown timer, type badges, streak calendar, confetti
- ✅ SimulateMode: category/difficulty filters, typing indicator, empathy score
- ✅ ReviewMode: 3D card flip, session progress, streak counter, flashcards wired

## Phase 2 — Completed (Claude API Integration)

### Infrastructure
- ✅ Vercel serverless proxy (api/claude.js) — forwards to Anthropic Messages API
- ✅ Vite dev middleware plugin — handles /api/claude locally during development
- ✅ vercel.json — SPA routing config for Vercel deployment
- ✅ Client AI service layer (src/services/claudeApi.js) — API key management, callClaude wrapper

### AI Features
- ✅ AI Practice Feedback (src/engine/aiFeedback.js):
    - Sends user question + scenario to Claude when responseScorer flags needsAIReview (score 40-75)
    - Returns structured JSON: strengths, improvements, suggested rewrite, techniques
    - System prompt enforces warm Bisa coaching tone
- ✅ AI Simulation Conversations (src/engine/aiSimulation.js):
    - Free-text input alongside pre-written choices in SimulateMode
    - Claude plays the NPC character, staying in-character
    - Hidden quality metadata (<!--BISA:{"quality":"..."}-->) for scoring
    - Turn-limited conversations (8 max) with natural wrap-up
- ✅ API Key Settings (src/components/settings/ApiKeySettings.jsx):
    - Masked key display, test connection, clear key
    - Added to Profile page under Settings section

### Graceful Degradation
- ✅ Everything works without API key (rule-based scoring, tree-based sims)
- ✅ AI features only appear when API key is configured
- ✅ Soft upsell prompts users to add key in Settings when AI could help

### Wiring
- ✅ PracticeMode: async AI feedback after rule-based scoring, loading skeleton, error handling
- ✅ SimulateMode: free-text textarea with send button, AI NPC responses, turn counter
- ✅ ProfilePage: API key settings section with GearSix icon

## Build Stats
- Build: 5,698KB JS (1,256KB gzipped), 52KB CSS (9KB gzipped)
- npm run build: ✅ succeeds with no errors

## Remaining Work
- Phase 3: User accounts via Supabase, real leaderboards, cloud sync
- Code splitting to reduce bundle size
- Vercel deployment

## Architecture Notes
- Engine layer (src/engine/) handles all intelligence/personalization with pure math
- AI layer (src/engine/aiFeedback.js, aiSimulation.js) enhances engines when API key available
- Response scorer flags ambiguous responses (score 40-75) as `needsAIReview: true` for AI review
- Claude calls go through /api/claude proxy (Vercel serverless in prod, Vite middleware in dev)
- API key stored in localStorage, sent per-request (user's own key, not shared)
- Daily quests are auto-generated weighted by weak categories
- BPQ recalculates after every XP award
- Adaptive difficulty adjusts per-category after 3 sessions above/below threshold
- All engines read/write to sql.js database via existing helpers
