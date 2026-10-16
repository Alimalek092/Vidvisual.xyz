---
name: accessibility-wcag-guardian
description: Use when building or reviewing any UI for accessibility, keyboard navigation, screen readers, color contrast, focus states, forms, captions, reduced motion, or WCAG 2.2 AA compliance in Vid-Visual.
---

# Accessibility Guardian (WCAG 2.2 AA)

## Goal
Everyone can use Vid-Visual, including with a keyboard only, a screen reader, zoom, or low vision.

## Checklist
- Contrast: normal text at least 4.5 to 1, large text and UI components at least 3 to 1. Measure it, do not eyeball it.
- Use semantic HTML first (button, a, nav, main, label, headings in order). Add ARIA only when HTML cannot do the job.
- Every input has a visible label. Errors are announced and tied to the field.
- Everything works by keyboard. Focus is always visible and never trapped. Logical tab order. Add a skip link.
- Meaning is never carried by color alone.
- Images have useful alt text, decorative ones have empty alt.
- Respect prefers-reduced-motion. No flashing content.
- Targets are large enough and not hidden under sticky bars (WCAG 2.2 added target size and focus-not-obscured rules).
- Video and generated media: offer captions or a transcript, and do not autoplay with sound.
- Page has a clear title and language attribute.

## How to test
1. Automated: axe-core (or the Playwright axe integration) and Lighthouse accessibility audit.
2. Manual: tab through the whole flow, zoom to 200 percent, try with a screen reader (VoiceOver or NVDA) on one key flow.
3. Record results honestly. Automated tools catch only part of the issues.

## Output
A table: Issue / Where / Severity / Fix. Then apply the fixes and re-test.

## Rules
Never claim "fully accessible". Say "passes the checks listed, with these known gaps".