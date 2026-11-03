const fs = require('fs');
const path = require('path');

const basePath = 'C:/Users/admin/.gemini/antigravity/scratch/Vidvisual.xyz';

// 1. Update HomeHeroGenerator.js to include quick sample chips
const generatorPath = path.join(basePath, 'components/HomeHeroGenerator.js');
let genContent = fs.readFileSync(generatorPath, 'utf8');

if (!genContent.includes('quick-samples-row')) {
  // Normalize line endings to test find
  const urlBoxRegex = /(<input[\s\S]*?aria-label="YouTube video URL"[\s\S]*?\/>)(\s*<\/div>)/;
  if (urlBoxRegex.test(genContent)) {
    const chipSnippet = `
            {/* Quick Sample Video Chips */}
            <div className="quick-samples-row" aria-label="Quick Sample Videos">
              <span style={{ fontWeight: 600 }}>Try sample:</span>
              <button
                type="button"
                className="quick-sample-chip"
                onClick={() => setUrl('https://www.youtube.com/watch?v=a9yO-K8mwL0')}
                disabled={busy}
              >
                🎙️ Huberman (Focus)
              </button>
              <button
                type="button"
                className="quick-sample-chip"
                onClick={() => setUrl('https://www.youtube.com/watch?v=aircAruvnKk')}
                disabled={busy}
              >
                🧠 3Blue1Brown (Neural Nets)
              </button>
              <button
                type="button"
                className="quick-sample-chip"
                onClick={() => setUrl('https://www.youtube.com/watch?v=zYIER3vGdB8')}
                disabled={busy}
              >
                💻 CS50 (Algorithms)
              </button>
            </div>$2`;
    genContent = genContent.replace(urlBoxRegex, `$1${chipSnippet}`);
    fs.writeFileSync(generatorPath, genContent, 'utf8');
    console.log('[apply-ui] Successfully inserted quick sample chips in HomeHeroGenerator.js');
  } else {
    console.error('[apply-ui] Regex match failed for HomeHeroGenerator.js input box');
  }
} else {
  console.log('[apply-ui] Quick samples already present in HomeHeroGenerator.js');
}

// 2. Add SlidingTopicTicker to app/page.js
const pagePath = path.join(basePath, 'app/page.js');
let pageContent = fs.readFileSync(pagePath, 'utf8');

if (!pageContent.includes('SlidingTopicTicker')) {
  // Add import
  pageContent = `import SlidingTopicTicker from '@/components/SlidingTopicTicker';\n` + pageContent;
  
  // Insert right below stats strip
  const statsStripMarker = '</section>';
  const statsTargetIndex = pageContent.indexOf('{/* Silicon Valley SaaS Stats Strip */}');
  if (statsTargetIndex !== -1) {
    const afterStatsStrip = pageContent.indexOf('</section>', statsTargetIndex);
    if (afterStatsStrip !== -1) {
      const insertPos = afterStatsStrip + '</section>'.length;
      pageContent = pageContent.slice(0, insertPos) + '\n\n      {/* Smooth Sliding Channels & Topics Marquee */}\n      <SlidingTopicTicker />' + pageContent.slice(insertPos);
      fs.writeFileSync(pagePath, pageContent, 'utf8');
      console.log('[apply-ui] Successfully inserted SlidingTopicTicker into app/page.js');
    }
  }
} else {
  console.log('[apply-ui] SlidingTopicTicker already in app/page.js');
}

// 3. Connect motion-enhancements.css to app/layout.js with master switch documentation
const layoutPath = path.join(basePath, 'app/layout.js');
let layoutContent = fs.readFileSync(layoutPath, 'utf8');

if (!layoutContent.includes('motion-enhancements.css')) {
  const switchMarker = `import './globals.css';\n// [SAFETY SWITCH]: Comment out or remove the import below to instantly disable all sliding motion & UI enhancements\nimport './motion-enhancements.css';\n`;
  layoutContent = layoutContent.replace(`import './globals.css';`, switchMarker);
  fs.writeFileSync(layoutPath, layoutContent, 'utf8');
  console.log('[apply-ui] Successfully connected motion-enhancements.css to app/layout.js');
} else {
  console.log('[apply-ui] motion-enhancements.css already imported in app/layout.js');
}
