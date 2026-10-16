---
name: ai-generation-pipeline
description: Use when building or changing anything that calls AI models to generate images, visuals, scripts, or video in Vid-Visual, including prompts, model providers, queues, costs, output quality, moderation, retries, and credits.
---

# AI Generation Pipeline

## First, always
Read the current implementation. List which providers and models are used, where prompts live, how errors are handled, and how cost is tracked today. Do not assume. Provider features, model names, limits, and prices change often, so verify them in the provider's current official docs and cite the page, or write "unverified".

## Architecture principles
1. Provider abstraction: one internal interface such as generate(request) returning a result, so a model or provider can be swapped without touching the rest of the app.
2. Prompt templates are versioned code with names, inputs, and tests. They are not strings scattered across components.
3. Use structured output (a JSON schema) whenever the model plans scenes, scripts, or layouts, and validate the result before using it.
4. Async jobs: create job, queue it, worker runs the model call, store the result, notify the user. Never hold a browser request open for a long generation.
5. Reliability: timeouts, retries with exponential backoff and jitter, a fallback model for outages, idempotency keys so retries do not double charge.
6. Cost control: record tokens, image counts, or seconds per job in the usage ledger. Add per-user and per-day caps. Cache identical requests when it is valid to do so. Show me cost per generation and gross margin per plan.
7. Safety: moderate inputs and outputs using the provider's tools plus our own rules. Treat user text as data, not as instructions. Refuse requests that copy real people's likeness or other brands' characters, according to our policy. Never put secrets or other users' data into prompts. Keep all keys server-side.
8. Transparency: free-tier outputs carry a visible mark. Keep provenance metadata if the provider supports it.

## Quality
Build a small evaluation set of 20 representative prompts with a simple rubric (relevance, polish, text legibility, brand safety, consistency). Run it whenever a prompt template or model changes. Save results in docs/evals so we can compare. Never claim an improvement without a before and after comparison.

## Making outputs look professional
Templates beat a blank prompt. Offer style presets, fixed aspect ratios (16:9, 9:16, 1:1), safe margins, consistent color palettes, and typography layouts, and let the user edit the prompt and regenerate a single scene.

## User experience
Show progress by stage, allow cancel, keep history, offer regenerate and variations, explain failures in plain words, and refund credits automatically for failed jobs.

## Output
A Mermaid diagram of the pipeline, the data model, a cost table (per generation, per plan), and the smallest first slice to build.