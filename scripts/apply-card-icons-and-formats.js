const fs = require('fs');

const pagePath = 'C:/Users/admin/.gemini/antigravity/scratch/Vidvisual.xyz/app/page.js';
let content = fs.readFileSync(pagePath, 'utf8');

// Replace VALUE_PROPS render
content = content.replace(
  `          {VALUE_PROPS.map((v) => (
            <div key={v.title} className={\`info-card accent-\${v.accent}\`}>
              <span className="card-emoji">{v.emoji}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}`,
  `          {VALUE_PROPS.map((v) => (
            <div key={v.title} className={\`info-card accent-\${v.accent}\`}>
              <div className="card-icon-wrap" aria-hidden="true">
                {getCardIcon(v.icon) || <span className="card-emoji">{v.emoji}</span>}
              </div>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}`
);

// Replace AUDIENCES render
content = content.replace(
  `          {AUDIENCES.map((a) => (
            <div key={a.title} className={\`info-card accent-\${a.accent}\`}>
              <span className="card-emoji">{a.emoji}</span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </div>
          ))}`,
  `          {AUDIENCES.map((a) => (
            <div key={a.title} className={\`info-card accent-\${a.accent}\`}>
              <div className="card-icon-wrap" aria-hidden="true">
                {getCardIcon(a.icon) || <span className="card-emoji">{a.emoji}</span>}
              </div>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </div>
          ))}`
);

// Replace USES render
content = content.replace(
  `          {USES.map((u) => (
            <div key={u.title} className={\`info-card accent-\${u.accent}\`}>
              <span className="card-emoji">{u.emoji}</span>
              <h3>{u.title}</h3>
              <p>{u.text}</p>
            </div>
          ))}`,
  `          {USES.map((u) => (
            <div key={u.title} className={\`info-card accent-\${u.accent}\`}>
              <div className="card-icon-wrap" aria-hidden="true">
                {getCardIcon(u.icon) || <span className="card-emoji">{u.emoji}</span>}
              </div>
              <h3>{u.title}</h3>
              <p>{u.text}</p>
            </div>
          ))}`
);

// Enhance formats section
const oldFormats = `        <div className="formats">
          <div>
            <h3>Whiteboard</h3>
            <p>Concept cards for each big idea, plus a mind map that shows how they connect. Best for studying a topic in depth.</p>
          </div>
          <div>
            <h3>Infographic</h3>
            <p>A single knowledge map with the key takeaways underneath. Best for a quick review before an exam or a meeting.</p>
          </div>
        </div>`;

const newFormats = `        <div className="formats">
          <div className="format-card" style={{ background: 'var(--paper)', border: '2px solid var(--ink)', borderRadius: '16px', padding: '20px 24px', boxShadow: '3px 3px 0 var(--ink)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.4rem' }}>✏️</span>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Whiteboard Notes</h3>
            </div>
            <p style={{ margin: 0, color: 'var(--ink-soft)', lineHeight: 1.55 }}>Concept cards for each big idea, plus an interconnected mind map that shows how arguments connect. Best for studying complex lectures and podcasts in depth.</p>
          </div>
          <div className="format-card" style={{ background: 'var(--paper)', border: '2px solid var(--ink)', borderRadius: '16px', padding: '20px 24px', boxShadow: '3px 3px 0 var(--ink)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.4rem' }}>📊</span>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Visual Infographic</h3>
            </div>
            <p style={{ margin: 0, color: 'var(--ink-soft)', lineHeight: 1.55 }}>A single scannable knowledge infographic with core key takeaways neatly bulleted underneath. Best for high-speed review before an exam or team briefing.</p>
          </div>
        </div>`;

if (content.includes(oldFormats)) {
  content = content.replace(oldFormats, newFormats);
}

fs.writeFileSync(pagePath, content, 'utf8');
console.log('Successfully updated cards with SVG icon containers and enhanced formats section!');
