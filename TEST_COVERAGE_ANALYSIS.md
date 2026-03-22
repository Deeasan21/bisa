# Test Coverage Analysis — Bisa

**Date:** 2026-03-22
**Current coverage:** 0% — No test framework, no test files, no CI pipeline

---

## Current State

The Bisa codebase has **96 source files (~23,700 lines of code)** deployed to production with **zero automated tests**. There is no test runner installed, no test configuration, and no CI/CD pipeline for testing.

---

## Recommended Test Framework

**Vitest + React Testing Library** — the natural choice for a Vite 7 + React 19 project:
- Vitest integrates natively with Vite (shared config, same transform pipeline)
- Fast, ESM-native, compatible with Jest APIs
- React Testing Library for component tests
- `msw` (Mock Service Worker) for API mocking (Claude API, Supabase)

---

## Priority Areas for Test Coverage

### Tier 1 — Critical Business Logic (Unit Tests)

These are pure-function scoring and gamification engines. They are the highest-value, lowest-effort targets for testing — no mocking or DOM required.

| File | Lines | Why It Needs Tests |
|------|-------|--------------------|
| `src/engine/responseScorer.js` | 203 | 100-point scoring algorithm with 5 weighted dimensions (question marks, length, open/closed detection, keyword matching, technique detection). Bugs here directly affect user scores and XP. |
| `src/engine/patternScorer.js` | 217 | Scoring for Read & React (3 sub-dimensions), MC questions, and Pattern Mirror. Complex multi-mode logic. |
| `src/engine/burstScorer.js` | 199 | Daily Challenge point calculation with time pressure scoring. |
| `src/engine/xpSystem.js` | 167 | XP_RULES for all 6 modes, 12-level progression (0–20,000 XP), league promotion triggers. Core gamification — errors break the reward loop. |
| `src/engine/achievements.js` | 301 | 30+ achievements with conditional unlock logic (streaks, scores, lesson counts, XP milestones). The most complex single file in the project. |
| `src/engine/leagues.js` | 140 | 6 leagues (Bronze→Master) with XP thresholds and percentile rankings. |
| `src/engine/bpqScore.js` | 147 | BPQ Quotient (0–1000) with weighted category scoring (40% avg score, 20% count, 15% consistency, 25% trend). |
| `src/utils/spacedRepetition.js` | 64 | SM-2 spaced repetition algorithm — drives flashcard review intervals. Well-defined algorithm with known edge cases. |
| `src/utils/dateHelpers.js` | 37 | Date boundary logic (today, yesterday, daysAgo). Date bugs are notoriously subtle. |
| `src/utils/scoring.js` | 83 | `scoreQuestion()` open-ended keyword detection, `getTodaysChallenge()` deterministic daily rotation. |
| `src/engine/observationClues.js` | 148 | Context-aware hint generator from scenario data. |
| `src/engine/sanitize.js` | 14 | Input sanitization for AI prompts — security-critical despite being small. |

**Estimated effort:** Low — these are mostly pure functions with clear inputs/outputs.

### Tier 2 — API & Security (Unit + Integration Tests)

| File | Lines | Why It Needs Tests |
|------|-------|--------------------|
| `api/claude.js` | ~200 | **Production API endpoint** handling rate limiting (per-IP + global daily cap), origin validation, message structure validation, and error sanitization. Security-critical: a bug could leak API keys, bypass rate limits, or allow prompt injection. |
| `src/engine/sanitize.js` | 14 | Smart quote replacement, newline normalization, 2000-char cap. Small but security-critical. |
| `src/services/claudeApi.js` | — | Client-side API wrapper — test error handling and retry logic. |

**Recommended tests:**
- Rate limit counter increments and daily resets
- Origin/referer validation accepts only Bisa domains
- Message validation rejects malformed payloads (wrong roles, non-string content, >20 messages)
- Error responses don't leak Anthropic API internals
- Sanitization strips dangerous input

### Tier 3 — React Hooks (Integration Tests)

These hooks manage critical app state. Test with `@testing-library/react` + `renderHook()`.

| File | Why It Needs Tests |
|------|--------------------|
| `src/hooks/useAuth.jsx` | Auth flow: sign-up → OTP verification → sign-in → sign-out. Test session persistence, error states, and the known bug where sign-out doesn't clear `bisa-onboarding-done` from localStorage. |
| `src/hooks/useSupabaseDB.jsx` | Largest hook — wraps all DB operations (XP, streaks, achievements, practice attempts, lessons, simulations, journals, patterns). Mock Supabase client and verify correct query construction and RLS scoping. |
| `src/hooks/useXP.jsx` | XP state derivation: totalXP → level → league. Test boundary transitions. |
| `src/hooks/useStreak.js` | Streak continuation logic: today vs. yesterday vs. gap. Date-sensitive — high regression risk. |
| `src/hooks/useAchievements.js` | Achievement check + unlock flow. Verify toast triggers. |

**Estimated effort:** Medium — requires Supabase client mocking.

### Tier 4 — Components with Known Bugs (Regression Tests)

These components have **documented bugs in CLAUDE.md** that should be captured as failing tests before fixing.

| Component | Known Bug |
|-----------|-----------|
| `src/components/modes/SimulateMode.jsx` | Calls `filterByDifficulty()` which isn't imported; crashes on category filter with async Supabase DB. |
| `src/components/modes/PatternMode.jsx` | Calls `getPatternStats(db)` in a `useMemo`; function doesn't exist as standalone export; should be `db.getPatternStats()` in a `useEffect`. |
| `src/pages/ProfilePage.jsx` | Sign-out doesn't clear `bisa-onboarding-done` from localStorage; next user on same device skips onboarding. |
| `src/components/layout/AppShell.jsx` | Dead `signOut` import from `useAuth` that's never used. |

**Approach:** Write failing tests first (TDD-style), then fix the bugs.

### Tier 5 — Data Integrity (Schema Validation Tests)

Static data files power all practice content. Schema tests catch broken content deployments.

| File | What to Validate |
|------|-----------------|
| `src/data/practiceScenarios.js` | All 80 scenarios have required fields (`id`, `category`, `weak`, `strong`, `context`), no duplicate IDs |
| `src/data/lessons.js` | All 38 lessons have valid tier (1–5), required sections, valid cross-references |
| `src/data/patternScenarios.js` | Sub-mode scenarios (Read & React, Subtext, etc.) have valid structure |
| `src/data/simulations.js` | Branching conversations have valid response trees, no dead-end branches |
| `src/data/achievements.js` | Achievement definitions have valid condition types, no duplicate IDs |
| `src/data/dailyInsights.js` | 30 insights with required fields, valid lesson references for deep-linking |

**Estimated effort:** Low — simple structural assertions.

### Tier 6 — Component Rendering (Snapshot + Interaction Tests)

Lower priority, but valuable for preventing visual regressions as the app grows.

**Start with the 6 mode components** (the core user experience):
- `PracticeMode.jsx` — form submission, score display, AI feedback rendering
- `LearnMode.jsx` — lesson navigation, interactive exercises
- `SimulateMode.jsx` — chat interface, NPC responses
- `PatternMode.jsx` — multi-sub-mode switching
- `ReviewMode.jsx` — flashcard flip, spaced repetition scheduling
- `DailyChallenge.jsx` — timer, burst scoring

**Then dashboard components:**
- `AchievementToast.jsx` — animation triggers
- `SkillBars.jsx` — progress visualization
- `ProfileCard.jsx` — user data display

---

## Suggested Implementation Order

1. **Install Vitest + React Testing Library** — add dev dependencies, create `vitest.config.js`, add `test` script to `package.json`
2. **Engine unit tests** (Tier 1) — start with `responseScorer.js` and `xpSystem.js` as they're the most critical and most testable
3. **API security tests** (Tier 2) — rate limiting and input validation
4. **Bug regression tests** (Tier 4) — capture known bugs as test cases
5. **Hook integration tests** (Tier 3) — mock Supabase, test auth flow
6. **Data validation tests** (Tier 5) — schema checks for content files
7. **Component tests** (Tier 6) — mode components first, then dashboard

---

## Quick Wins (Highest Value, Lowest Effort)

If you can only write 5 test files, make them these:

1. **`responseScorer.test.js`** — Pure functions, clear I/O, directly affects user scores
2. **`xpSystem.test.js`** — XP rules and level boundaries, core reward loop
3. **`achievements.test.js`** — 30+ condition checks, complex unlock logic
4. **`spacedRepetition.test.js`** — Well-defined SM-2 algorithm with known edge cases
5. **`dateHelpers.test.js`** — Date boundary bugs are the most common source of subtle production issues

These 5 files would cover the core gamification loop that makes Bisa engaging.
