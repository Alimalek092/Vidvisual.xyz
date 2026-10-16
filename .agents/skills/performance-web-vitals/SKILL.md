---
name: performance-web-vitals
description: Use when pages feel slow, Lighthouse scores are low, the JavaScript bundle grows, images or video load slowly, Core Web Vitals fail, or before shipping any landing page or heavy interactive editor in Vid-Visual.
---

# Performance and Core Web Vitals

## Targets (Google's published "good" thresholds, at the 75th percentile of real users)
- LCP (Largest Contentful Paint): 2.5 seconds or less.
- INP (Interaction to Next Paint): 200 milliseconds or less.
- CLS (Cumulative Layout Shift): 0.1 or less.
Confirm these against the current web.dev documentation before quoting them.

## Measure first
Lighthouse and PageSpeed Insights, the Performance panel in Chrome DevTools, the bundle size report from the build, a bundle analyzer, and real-user data (Vercel Speed Insights or similar, if enabled). Test with Slow 4G and 4x CPU slowdown, because many of my users are on mid-range Android phones. Record the numbers before changing anything.

## Fix in this order
1. LCP: make the hero render on the server, set width and height on images, use next/image with priority for the hero image, serve modern formats, use next/font with swap.
2. JavaScript: prefer server components, dynamically import heavy editors and media libraries, remove unused dependencies, avoid barrel imports.
3. INP: split long tasks, debounce inputs, use transitions for non-urgent updates, virtualize long lists.
4. CLS: reserve space for images, embeds, and late-loading content.
5. Video and media: poster images, lazy loading, no preload of big files, right-sized resolutions, a CDN, and sensible codecs.
6. Third-party scripts: load late, and remove any that do not earn their cost.
7. Caching: correct cache headers, and static or incremental rendering for public pages.

## Budget
Set a budget as a target, for example landing page JavaScript under 150 KB gzipped, and record it in docs/performance.md. Adjust with data.

## Rules
Always report Before / After for each change with the same test setup. If a change gives no measurable gain, revert it.