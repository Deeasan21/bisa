# Bisa — Project Identity

**Name:** Bisa ("to ask" in Twi/Akan, Ghana)
**Purpose:** Teaches people how to ask better questions through interactive practice
**Owner:** Derek Asante
**Status:** Live — Phase 2 complete (AI features, deployment, security hardening)
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

## Future Considerations
- Custom domain (bisa.app)
- Supabase for user accounts and cloud sync
- B2B features (team dashboards, admin panels, usage reports)
- Landing page for marketing
