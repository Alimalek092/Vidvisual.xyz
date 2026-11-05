const fs = require('fs');
const path = require('path');

const pagePath = 'C:/Users/admin/.gemini/antigravity/scratch/Vidvisual.xyz/app/page.js';
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Add status indicator dot in hero pill
if (!content.includes('status-indicator-dot')) {
  content = content.replace(
    '<span>⚡ Under 20 Seconds</span>',
    '<span><span className="status-indicator-dot" />⚡ Under 20 Seconds</span>'
  );
}

// 2. Add floating badges to hero-demo
if (!content.includes('hero-floating-badge')) {
  const oldDemo = `<div className="hero-demo">
          <Visual data={SAMPLE} format="whiteboard" />
        </div>`;
  const newDemo = `<div className="hero-demo" style={{ position: 'relative' }}>
          <div className="hero-floating-badge hero-floating-badge-top">
            <span>🧠</span> Dual-Coding: <strong>+65% Higher Recall</strong>
          </div>
          <Visual data={SAMPLE} format="whiteboard" />
          <div className="hero-floating-badge hero-floating-badge-bottom">
            <span>⚡</span> Gemini 2.5 Flash: <strong>Under 20s Distillation</strong>
          </div>
        </div>`;
  if (content.includes(oldDemo)) {
    content = content.replace(oldDemo, newDemo);
  }
}

fs.writeFileSync(pagePath, content, 'utf8');
console.log('Successfully enhanced hero visuals in page.js');
