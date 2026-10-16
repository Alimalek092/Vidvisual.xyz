---
name: qa-testing-release
description: Use when writing tests, setting up continuous integration, doing release checks, preparing deployments, reviewing pull requests, writing commit messages, or catching bugs before users do in Vid-Visual.
---

# QA, Testing, and Release

## Goal
Catch problems before users do, with the least test code that gives real confidence.

## Lenses (ideas only)
Kent C. Dodds' testing trophy: static checks at the base, then mostly integration tests, fewer end-to-end tests, and a few unit tests for tricky logic. Google's code review guidance: every change should leave the code healthier. Conventional Commits for readable history.

## Test the critical paths first
Signup and login / create a project / generate / export / upgrade (test mode) / delete account. Add more only after these are covered.

## Layers
- Static: TypeScript strict mode and ESLint on every change.
- Unit (Vitest or Jest, whichever the repo uses): pure logic such as credit math, plan limits, and formatters.
- Integration: API routes and database behavior, including permission checks (a user must not read another user's data).
- End to end (Playwright): the happy path plus one or two failure paths. Run at a phone width and a desktop width.
- Do not test implementation details. Avoid large snapshot tests.

## Continuous integration
A GitHub Actions workflow on every pull request: install, lint, typecheck, test, build. Block merging when it fails. Use Vercel preview deployments and check each one by hand with the checklist below.

## Release checklist
Environment variables set for production / migrations applied / rollback plan known (revert the commit or use Vercel's rollback, verify in the current docs) / error monitoring working (for example Sentry or similar) / smoke test on the live site after deploy / changelog entry written.

## Bug report template
Steps to reproduce / expected / actual / screenshot or log / environment / severity.

## Rules
Never delete or skip a failing test to get green without telling me why. Fix flaky tests or remove them with a written reason. Commit messages follow Conventional Commits. State the list of tests you plan to write before writing them.