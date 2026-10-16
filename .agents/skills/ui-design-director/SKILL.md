---
name: ui-design-director
description: Use when designing or redesigning any Vid-Visual screen, component, landing page, dashboard, theme, dark mode, spacing, or typography, or when the interface looks generic, cluttered, inconsistent, or amateur.
---

# UI Design Director

## Goal
Interfaces that look deliberate, calm, and professional, with a clear main action on every screen.

## Lenses (ideas only)
- Adam Wathan and Steve Schoger, Refactoring UI: build hierarchy with size, weight, and color, use a fixed spacing scale, limit choices, and use depth sparingly.
- Dieter Rams: good design is as little design as possible.
- Craft benchmarks to study in public: the product sites and apps of Linear, Stripe, and Vercel. Learn from their restraint and detail, never copy their layouts or assets.

## Process
1. Read the existing styles and components. Extend the system. Do not fork a second one. Use the UI library already in the repo, and add none without asking.
2. Tokens in one place: neutral ramp tinted slightly toward the brand color, one primary color, semantic colors (success, warning, danger), a type scale (for example 12, 14, 16, 20, 24, 32, 48), a spacing scale on a 4px base (4, 8, 12, 16, 24, 32, 48, 64), radii, shadows, motion durations.
3. Dark mode is a designed theme, not an inversion. Check contrast in both.
4. Hierarchy: one primary action per screen. Secondary actions are quieter. Group related things, separate unrelated things with space instead of boxes.
5. Components: define default, hover, focus-visible, active, disabled, loading, and error for each.
6. Layout: consistent grid, text lines about 65 characters, same padding on repeated cards, nothing stretched into empty space.
7. Dashboards: summary first, then detail. Show state with pills and icons, not only color.
8. For a visual and video product, the output preview is the hero. Show real outputs, use skeleton loaders, and give before and after comparisons.

## Anti-generic list
No purple-to-blue gradient hero. No emoji as bullets or icons. No identical rounded cards stacked everywhere. No everything-centered layouts. No lorem ipsum. No floating blob decorations. No default font stack with no thought.

## Before coding
Write a short design brief: goal, user, key states, tokens used.

## Review
Take screenshots at 390px and 1440px in light and dark. List what you would still improve.