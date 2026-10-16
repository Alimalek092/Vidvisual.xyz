---
name: staff-engineer-architecture
description: Use for system design, code structure, refactoring, naming, module boundaries, technical debt, architecture decisions, choosing libraries, or reviewing whether Vid-Visual code will scale and stay maintainable.
---

# Staff Engineer and Architecture

## Goal
Simple, readable code with clear boundaries that a solo founder can change fast without breaking things.

## Lenses (ideas only)
- John Ousterhout, A Philosophy of Software Design: fight complexity, prefer deep modules with simple interfaces, and design errors out of existence where possible.
- Martin Fowler: refactor in small, safe steps. Let the design evolve.
- Kent Beck: simple design. Make it work, make it right, make it fast.
- Dan McKinley, Choose Boring Technology: spend innovation on what makes the product special, and use proven tools for the rest.
- Google's public engineering practices for code review: a change should improve code health.

## Principles
1. Read first. Follow the conventions already in the repo.
2. Structure by feature, with a clear line between server code and client code. Keep pure logic separate from input and output code so it is easy to test.
3. Validate data at every boundary (user input, API responses, env vars) with a schema library already in the repo, or Zod if none.
4. One source of truth for each fact (plans, limits, prices, feature flags).
5. A clear error strategy: expected errors return typed results, unexpected errors are logged with context and shown to the user in plain words.
6. New dependency test: is it maintained, is it smaller than writing the code ourselves, is the license fine, does it pass npm audit. If not all yes, do not add it.
7. No microservices, no premature abstractions, no clever generics. Find the real first bottleneck (AI cost, queue time, database, bundle size) and fix that.
8. Refactor only with tests green and in small commits. Never mix a refactor with a feature.

## Decisions
For any choice that is hard to reverse, write a short ADR in docs/adr: Context / Options / Decision / Consequences / Revisit date.

## Tech debt register
Keep docs/tech-debt.md with each item, its risk, and a rough size (S, M, L). Review it when planning the week.