# Bisa — Project Identity

**Name:** Bisa ("to ask" in Twi/Akan, Ghana)
**Purpose:** Teaches people how to ask better questions through interactive practice
**Owner:** Derek Asante
**Status:** Live — Phase 2.5 complete (AI features, security, polish, achievement notifications)
**Live URL:** https://bisa-eta.vercel.app
**Repo:** https://github.com/Deeasan21/bisa

## Key Rules
1. This is a SEPARATE project — no code, files, or references shared with any other project on this machine
2. Mobile-first responsive design at all times
3. Each of the 7 modes must have its own visual theme (colors, background, icon)
4. Gamification is core — XP, streaks, progress bars, achievements must feel satisfying
5. The app should feel warm and encouraging, never cold or clinical
6. Phosphor Icons is the icon library — use it consistently

## Tech Stack
- React + Vite
- Phosphor Icons (@phosphor-icons/react)
- sql.js with IndexedDB persistence (client-side database)
- Claude API (Sonnet) via Vercel serverless proxy (`api/claude.js`)
- Vercel for hosting (auto-deploys on push to master)

## AI Features (Phase 2 — Complete)
- **Practice Mode** — AI-powered feedback on rewritten questions (`src/engine/aiFeedback.js`)
- **Learn Mode** — AI reflection coaching with skill-specific prompts (`src/engine/aiReflectionCoaching.js`)
- **Simulate Mode** — Free-response AI conversations with NPC characters (`src/engine/aiSimulation.js`)
- **Daily Challenge** — AI burst coaching on timed question sessions (`src/engine/aiBurstCoaching.js`)
- **Server-side API key** — AI works for everyone (10 free calls/day per user, 500/day global cap)
- **Personal API key** — Users can add their own key in Settings for unlimited access

## Polish & Wiring (Phase 2.5 — Complete)
- **AchievementToast** — Celebratory gold/amber popup when achievements unlock, wired into all 6 modes (`src/components/common/AchievementToast.jsx`)
- **Daily Insight card** — 30 rotating micro-lessons on the Today page, one per day (`src/data/dailyInsights.js`)
- **Recommended for You** — Personalized suggestions based on weak/stale/new skill categories using the recommendations engine
- **Enhanced mascot** — Context-aware greetings based on streak, absence duration, strongest/weakest categories
- **Deep-linking** — Daily Insight card navigates directly to the relevant lesson in Learn mode
- **Code splitting** — Route-level `React.lazy()` for all 5 mode routes to reduce initial bundle
- **Dead code cleanup** — Removed unused XPToast import from TodayPage

## Security
- Prompt input sanitization across all AI engines (`src/engine/sanitize.js`)
- Origin validation on API proxy (only accepts requests from Bisa domains)
- Message structure validation (role + string content only, max 20 messages)
- Rate limiting via `x-real-ip` (Vercel-set, not spoofable)
- Global daily cap as billing safety net
- Sanitized error responses (no Anthropic internals leaked)
- API keys stored in browser localStorage only, never on server

## Design Direction
- Inspired by **Elevate** app — each mode has unique visual identity
- Warm, encouraging tone (like a patient mentor, not a drill sergeant)
- Bold colors with personality
- Micro-animations and transitions that make progress feel rewarding
- Mascot/character that reacts to user behavior
- Light theme for navigation/dashboard, unique themes per mode

## Current Limitation
- **No user accounts** — all data lives in browser localStorage/IndexedDB
- Switching browsers or devices = starting fresh
- Clearing browser data = losing all progress
- No way to track user count or usage analytics
- This is fine for beta but must be solved before B2B

---

## Future Roadmap

### Phase 3: User Accounts & Cloud Sync
The foundation for everything else. Without accounts, users lose data and we can't track anything.
- Supabase Auth (email/password + Google OAuth)
- Migrate from sql.js/IndexedDB to Supabase Postgres
- Cross-device sync — progress follows the user
- User profiles with display name and avatar
- Data export (JSON/CSV) for users who want their data
- Offline-first with sync — app still works without internet, syncs when reconnected

### Phase 4: Analytics & Insights
Understand who's using Bisa and how, so we can improve the product.
- Anonymous usage analytics (PostHog or Mixpanel)
- Admin dashboard — total users, daily actives, retention, popular modes
- User journey tracking — where people drop off, what modes are sticky
- A/B testing infrastructure for onboarding experiments
- Funnel analysis — visitor > first activity > returning user > power user

### Phase 5: B2B / Teams
The revenue engine. Target: new managers, sales teams, leadership development programs, L&D departments.
- Organization accounts with admin roles
- Team dashboards — aggregate progress, leaderboards, completion rates
- Manager view — see which team members are active, what skills they're building
- Custom content — organizations can add their own practice scenarios relevant to their industry
- SSO integration (SAML/OIDC) for enterprise customers
- Usage reports (PDF/CSV export) for L&D departments to prove ROI
- Bulk licensing and billing
- API for LMS integrations (SCORM or xAPI)

### Phase 6: Growth & Marketing
Get the product in front of the right people.
- Landing page (bisa.app) with product demo, pricing, testimonials
- Custom domain setup
- Onboarding flow — guided first-time experience that hooks users immediately
- Social sharing — share achievements, streaks, scores on LinkedIn/Twitter
- Referral system — invite colleagues, earn rewards
- App Store / Play Store via Capacitor or PWA
- SEO content — blog posts about questioning skills for managers, sales teams, interviews, coaching
- Free tier vs. Pro tier pricing model
