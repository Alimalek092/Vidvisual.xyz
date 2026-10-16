# vidvisual Agent Rules & Permanent Directives

## Project Facts (verified from repo)
- Product: vidvisual, freemium SaaS for YouTube video-to-whiteboard visual summaries and interactive mind maps.
- Live URL: https://www.vidvisual.xyz (also deployed at https://vidvisual-tau.vercel.app/)
- Framework & Version: Next.js 14.2.35 (App Router), React 18.3.1
- Language & Styling: JavaScript (ES6+), Vanilla CSS (globals.css), Google Fonts (Caveat Brush, Figtree)
- Database & Auth Provider: Supabase (@supabase/supabase-js 2.45.0)
- Payments: Polar.sh (checkout: /api/billing/checkout, webhook: /api/billing/polar-webhook)
- AI & Ingestion Engine: Google Gemini API (2.5 Flash), Native InnerTube Android Caption Scraper (lib/youtube-transcript-innertube.js)
- Hosting: Vercel. Repo: GitHub (https://github.com/Alimalek092/Vidvisual.xyz.git).
- Commands: dev: `npm run dev` / build: `npm run build` / start: `npm run start`

## Core Permanent Directives & Memory (NON-NEGOTIABLE)
1. **Absolute Truth & Authenticity (Zero Flattery, No Fake Numbers)**:
   - Describe only what is genuinely true. Never promote flattery, false claims, or fake metrics.
   - Strictly NO fake user counts (e.g. claiming "5,000 users", "10,000 summaries") and NO artificial review ratings (AggregateRating in JSON-LD).
2. **Brand Name Formatting**:
   - The brand name is ALWAYS written in all-lowercase letters: `vidvisual`. Never write Vidvisual, VidVisual, or VIDVISUAL.
3. **Permanently Locked Homepage Title & Heading**:
   - Homepage Title (NEVER alter): `Free AI YouTube Video Summarizer in Any Language (16+) · vidvisual`
   - Hero Main Heading (NEVER alter): `Turn Any YouTube Video into Visual Notes in Under 20s — in Any Language`
4. **Mindset & Standards**:
   - Think and act as the world's best software designer, full-stack engineer, and SaaS developer.
   - Work with high speed, deep empathy, kindness, and immediate concrete execution.

## Working Rules
1. Read before you write. Open the files you will change and their neighbours first.
2. For any task touching more than 3 files, or anything about money, auth, or deleting data, write a plan of at most 8 bullets and wait for approval. Otherwise proceed.
3. Smallest change that solves the problem. No drive-by refactors.
4. Never say something works unless you ran it (build, lint, tests, dev server, browser) and saw the result. Say "verified by <command>" or "not verified because <reason>".
5. Never invent library APIs, env vars, prices, limits, or facts. Check official docs or say "unverified".
6. Never change pricing, plan limits, auth rules, or payment settings without explicit approval.
7. Secrets stay out of the repo and out of client code. New env vars go in .env.example.
8. Every screen needs loading, empty, error, and success states. Mobile-first (390px), dark mode must match light mode quality.
9. Use Conventional Commits (feat, fix, chore, docs, refactor, test, perf).
10. If you are stuck after two attempts, stop and state what you tried, what you think, and what you need.

## Skills & Routing
Skills live in `.agents/skills/`. For any non-trivial task, start with `vidvisual-playbook-router`. Before saying done, apply `verify-before-done`.

## Report Format After Each Task (Max 10 Lines)
- **Changed**: Files touched and why.
- **Verified**: Command and exact output.
- **Risks**: Any edge cases or dependencies.
- **Skills Applied**: Which skills were activated.
- **Next Best Step**: Concrete recommendation.
