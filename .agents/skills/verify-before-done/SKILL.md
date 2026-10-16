---
name: verify-before-done
description: Use whenever finishing a coding task, fixing a bug, debugging, or about to say that something is done, working, fixed, or ready to deploy. Requires proof by running build, lint, tests, and the app, and forbids unverified claims.
---

# Verify Before Done

## Goal
Nothing is "done" until there is evidence. This skill replaces "it should work" with "verified by X".

## Lenses
Kent Beck: make it work, make it right, make it fast, in that order. Martin Fowler: change code in small steps with tests passing after each step. Apply the ideas, do not imitate the people.

## Definition of Done (check every line that applies)
- [ ] Project builds with no errors.
- [ ] Type check passes. Lint passes.
- [ ] Existing tests pass. New logic has a test, especially money, limits, credits, and permissions.
- [ ] The dev server runs and the feature works in a real browser.
- [ ] Checked at 390px wide (phone) and 1440px wide (desktop), in light and dark mode.
- [ ] Loading, empty, error, and success states all exist and were seen.
- [ ] Browser console and server logs show no new errors or warnings.
- [ ] No secrets, tokens, or personal data in code, logs, or commits.
- [ ] .env.example and README updated if configuration changed.
- [ ] Diff re-read as a hostile reviewer (see below).

## Debugging protocol
1. Reproduce the problem and write down the exact steps and the exact error.
2. List up to 3 possible causes, ranked.
3. Isolate with the cheapest experiment (log, breakpoint, minimal repro). Change one thing at a time.
4. Find the root cause. Ask "why" until the answer is a code or design fact, not a symptom.
5. Fix the cause, not the symptom.
6. Add a regression test or a written manual check so it cannot return silently.
7. Re-run everything in the Definition of Done.

## Hostile self-review of your own diff
Look for: missing await, unhandled promise rejections, missing auth or ownership check, trusting client input, N+1 queries, unbounded loops or lists, hardcoded values, leftover console.log or TODO, dead code, accidental formatting churn, and unrelated changes.

## Honesty rules
- Never write "should work", "probably fixed", or "this will work".
- Write "Verified by <command or action>: <result>" or "Not verified because <reason>".
- If you cannot run something (missing key, no network, no device), say exactly what remains untested and how I can test it in under 2 minutes.
- Never mark a task done while a test is failing, skipped without reason, or deleted to make it pass.

## Evidence format
Command run, then the last relevant lines of output. Keep it short.