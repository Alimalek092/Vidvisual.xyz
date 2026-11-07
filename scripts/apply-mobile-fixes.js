const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'app', 'premium-ui.css');
let css = fs.readFileSync(cssPath, 'utf8');

const targetSection = `/* --- 19. Mobile Scroll Performance Optimization --- */
@media (max-width: 768px) {
  body {
    background-attachment: scroll !important;
  }
}`;

const replacementSection = `/* --- 19. Comprehensive Mobile Responsiveness Suite (ui-ux-pro-max standard) --- */
/* Global horizontal overflow prevention */
html, body {
  overflow-x: clip;
  max-width: 100%;
}

@supports not (overflow: clip) {
  html, body {
    overflow-x: hidden;
  }
}

@media (max-width: 768px) {
  /* Mobile background performance */
  body {
    background-attachment: scroll !important;
  }

  /* Nav: Streamlined 1-row header */
  .nav {
    padding: 10px 16px !important;
    gap: 10px !important;
  }
  .nav-links {
    gap: 12px !important;
  }
  /* Hide section jump anchors on mobile to prevent 3-line wrap */
  .nav-links a[href="#formats"],
  .nav-links a[href="#how-it-works"],
  .nav-links a[href="#faq"],
  .nav-links a[href="#support"] {
    display: none !important;
  }
  .nav-links a:not(.btn) {
    font-size: 0.88rem !important;
  }
  .nav .btn-sm {
    padding: 6px 12px !important;
    font-size: 0.82rem !important;
  }

  /* Hero Section: Containment & Proportions */
  .hero {
    padding: 24px 16px 32px !important;
    gap: 24px !important;
    overflow: clip !important;
  }
  .hero::before {
    display: none !important;
  }
  .hero h1 {
    font-size: clamp(2rem, 7.5vw, 2.7rem) !important;
    line-height: 1.08 !important;
    margin-bottom: 14px !important;
  }
  .hero p {
    font-size: 1.02rem !important;
    line-height: 1.48 !important;
  }

  /* Hero Pill Badge */
  .hero-pill {
    font-size: 0.78rem !important;
    padding: 4px 10px !important;
    gap: 6px !important;
    border-radius: 12px !important;
    justify-content: center !important;
  }

  /* Hero Demo Whiteboard Preview */
  .hero-demo {
    max-width: 100% !important;
    overflow: hidden !important;
    margin-top: 8px !important;
    transform: none !important;
  }
  .hero-demo .vv {
    box-shadow: 0 10px 25px -8px rgba(15, 23, 42, 0.2), 4px 4px 0 var(--ink) !important;
    padding: 16px 14px !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }
  .vv-cards {
    grid-template-columns: 1fr !important;
    gap: 10px !important;
  }
  .vv-title {
    font-size: 1.35rem !important;
  }

  /* Floating Badges (Hidden on mobile to avoid layout clipping) */
  .hero-floating-badge {
    display: none !important;
  }

  /* Quick Sample Chips Touch Carousel */
  .quick-samples-row {
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch !important;
    gap: 6px !important;
    padding: 4px 0 6px !important;
    margin-top: 8px !important;
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
  }
  .quick-samples-row::-webkit-scrollbar {
    display: none !important;
  }
  .quick-samples-row span {
    white-space: nowrap !important;
    flex-shrink: 0 !important;
    font-size: 0.76rem !important;
  }
  .quick-sample-chip {
    white-space: nowrap !important;
    flex-shrink: 0 !important;
    padding: 4px 8px !important;
    font-size: 0.76rem !important;
  }

  /* Stats Strip: Neat 2x2 Grid */
  .stats-strip {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 10px !important;
    padding: 0 16px !important;
    margin-bottom: 28px !important;
  }
  .stat-pill {
    padding: 12px 10px !important;
    border-radius: 12px !important;
    box-shadow: 3px 3px 0 var(--ink) !important;
  }
  .stat-pill-num {
    font-size: 1.25rem !important;
  }
  .stat-pill-label {
    font-size: 0.74rem !important;
    line-height: 1.25 !important;
  }

  /* Podcast & Lecture Compression Showcase */
  .podcast-showcase {
    padding: 20px 16px !important;
    margin: 24px 0 !important;
    border-radius: 16px !important;
    box-shadow: 4px 4px 0 var(--ink) !important;
  }
  .podcast-showcase::after {
    display: none !important;
  }
  .podcast-showcase-copy h2 {
    font-size: 1.7rem !important;
  }
  .podcast-timeline-item {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 8px !important;
    padding: 12px 14px !important;
  }
  .podcast-timeline-speed {
    align-self: flex-start !important;
  }

  /* Pricing Trust Pills */
  .pricing-trust {
    gap: 8px !important;
  }
  .pricing-trust-item {
    font-size: 0.78rem !important;
    padding: 5px 12px !important;
  }

  /* Floating Theme Toggle */
  .top-bar {
    bottom: 16px !important;
    right: 16px !important;
  }
}

@media (max-width: 400px) {
  .hero-pill {
    font-size: 0.72rem !important;
    padding: 4px 8px !important;
  }
  .hero h1 {
    font-size: 1.85rem !important;
  }
  .stats-strip {
    grid-template-columns: 1fr !important;
  }
}`;

// Normalize line endings for replacement
const normalizedCss = css.replace(/\r\n/g, '\n');
const normalizedTarget = targetSection.replace(/\r\n/g, '\n');

if (normalizedCss.includes(normalizedTarget)) {
  const updatedCss = normalizedCss.replace(normalizedTarget, replacementSection);
  fs.writeFileSync(cssPath, updatedCss, 'utf8');
  console.log('[Mobile Fixes] Successfully applied to premium-ui.css');
} else {
  // If exact match fails, append to file
  fs.appendFileSync(cssPath, '\n\n' + replacementSection, 'utf8');
  console.log('[Mobile Fixes] Appended to premium-ui.css');
}
