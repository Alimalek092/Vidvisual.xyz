# Vid Visual

Turn any YouTube video (with captions) into a whiteboard visual or infographic with a mind map.
Freemium SaaS: Free, Pro, Unlimited, Team.

**Stack:** Next.js 14 (App Router), Supabase (auth + Postgres), Gemini (summaries), Razorpay (subscriptions), Vercel (hosting).

## 1. Run locally
```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev
```

## 2. Set up services
1. **Supabase**: create a project, open SQL Editor, run `supabase/schema.sql`. Copy the URL, anon key and service role key into `.env.local`.
   To allow "Continue with Google", enable the Google provider under Authentication > Providers.
2. **Gemini**: create a key at https://aistudio.google.com/apikey and set `GEMINI_API_KEY`.
3. **Razorpay**: create 3 monthly plans (Pro $9, Unlimited $19, Team $49) under Subscriptions > Plans. Put their IDs in `RAZORPAY_PLAN_*`.
   Add a webhook to `https://YOUR-DOMAIN/api/billing/webhook` with events `subscription.activated`, `subscription.charged`, `subscription.cancelled`, `subscription.halted`, `subscription.completed`, and set its secret as `RAZORPAY_WEBHOOK_SECRET`.
   Charging in USD requires international payments to be enabled on your Razorpay account.

## 3. Push to GitHub and deploy on Vercel
```bash
git init && git add . && git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USER/vid-visual.git
git push -u origin main
```
Then on vercel.com: **Add New > Project**, import the repo, paste every variable from `.env.example` into Environment Variables, and deploy.

## Known limits of this first version
- YouTube sometimes blocks caption requests from cloud servers. If some videos fail on Vercel, move `getTranscript` in `lib/youtube.js` to a transcript API service.
- Watermarks are added in the browser when exporting. Fine for launch; move exports server-side later if you want them tamper-proof.
- Team plan is purchasable and has the Unlimited features and limits. The shared workspace, member invites and admin dashboard are the next stage.
- Guides, About and Contact pages are not built yet.
