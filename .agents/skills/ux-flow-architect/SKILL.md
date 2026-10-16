---
name: ux-flow-architect
description: Use for user flows, onboarding, signup and login, editor and generator UX, empty, loading, and error states, navigation, forms, mobile usability, long waits, and reducing drop-off in Vid-Visual.
---

# UX Flow Architect

## Goal
A user should reach a result they are happy with quickly, without thinking about the interface.

## Lenses (ideas only)
- Steve Krug, Don't Make Me Think: every screen should be self-evident or self-explanatory.
- Jakob Nielsen's 10 usability heuristics: visible system status, match with the real world, user control and freedom, consistency, error prevention, recognition over recall, flexibility, minimal design, helpful error recovery, help and documentation.
- Luke Wroblewski: mobile-first thinking and form design.
- Jobs-to-be-done: design around what the user is trying to get done.

## Process
1. Write the flow as numbered steps with the success metric for each step. Draw it as a Mermaid diagram.
2. Remove steps. Delay account creation until the user has seen value if the product allows it.
3. First run: pre-filled example or template, one clear next action, no empty dashboards.
4. Screen state matrix: for every screen list the loading, empty, error, partial, and success states, with the exact copy for each.
5. Long waits (AI generation, export): show real progress or stages, let the user leave and come back, offer an email or notification on completion, allow cancel, never lose their input.
6. Errors: say what happened, why, and what to do. Offer retry. Never blame the user.
7. Prefer undo over confirm dialogs. Confirm only for destructive or paid actions.
8. Forms: labels above fields, inline validation after the user leaves a field, correct input types, autofill support, one column.
9. Mobile and network: touch targets of at least 44px as a recommended size, thumb-reachable primary actions, assume a mid-range Android phone on a slow 4G connection, keep drafts, make uploads resumable where possible.

## Output
Flow diagram, state matrix, copy for each state, acceptance criteria, and a 5-task usability test script I can run with real people.