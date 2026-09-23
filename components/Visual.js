'use client';
import { forwardRef } from 'react';

export const THEMES = {
  marker: { name: 'Marker', bg: '#FBFCFB', ink: '#16233B', colors: ['#2B59E0', '#E2483D', '#23996B', '#E59A00', '#7A5AF8'] },
  ocean: { name: 'Ocean', bg: '#F1F8FB', ink: '#0B2B3A', colors: ['#0E7490', '#2563EB', '#0891B2', '#4F46E5', '#0284C7'] },
  forest: { name: 'Forest', bg: '#F5F8F1', ink: '#22301F', colors: ['#2F7D4F', '#8A6D3B', '#C0562F', '#4C7A3A', '#6B5B3E'] },
  sunset: { name: 'Sunset', bg: '#FFF6EF', ink: '#3A1D14', colors: ['#E4572E', '#E59A00', '#D64E8A', '#7A5AF8', '#F26B38'] },
};

const clip = (s, n) => {
  s = String(s || '');
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
};

function wrap(text, max) {
  const words = String(text || '').split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > max) {
      if (line) lines.push(line);
      line = w;
    } else line = (line + ' ' + w).trim();
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function MindMap({ map, colors, ink }) {
  const W = 900, H = 560, cx = W / 2, cy = H / 2;
  const branches = (map?.branches || []).slice(0, 6);
  const n = branches.length || 1;
  const nodes = branches.map((b, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const kids = (b.children || []).slice(0, 3).map((k, j, arr) => {
      const ka = a + (j - (arr.length - 1) / 2) * 0.4;
      return { label: clip(k, 20), x: cx + Math.cos(ka) * 340, y: cy + Math.sin(ka) * 250 };
    });
    return { label: clip(b.label, 18), x: cx + Math.cos(a) * 185, y: cy + Math.sin(a) * 165, kids, color: colors[i % colors.length] };
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="vv-svg" role="img" aria-label="Mind map">
      {nodes.map((b, i) => (
        <g key={i}>
          <line x1={cx} y1={cy} x2={b.x} y2={b.y} stroke={b.color} strokeWidth="4" strokeLinecap="round" />
          {b.kids.map((k, j) => (
            <line key={j} x1={b.x} y1={b.y} x2={k.x} y2={k.y} stroke={b.color} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 7" />
          ))}
        </g>
      ))}
      {nodes.map((b, i) => (
        <g key={'n' + i}>
          {b.kids.map((k, j) => {
            const w = k.label.length * 7.4 + 20;
            return (
              <g key={j}>
                <rect x={k.x - w / 2} y={k.y - 14} width={w} height="28" rx="14" fill="#fff" stroke={b.color} strokeWidth="2" />
                <text x={k.x} y={k.y + 5} textAnchor="middle" fontSize="14" fill={ink}>{k.label}</text>
              </g>
            );
          })}
          <rect x={b.x - (b.label.length * 4.6 + 16)} y={b.y - 19} width={b.label.length * 9.2 + 32} height="38" rx="19" fill={b.color} />
          <text x={b.x} y={b.y + 6} textAnchor="middle" fontSize="17" fontWeight="700" fill="#fff">{b.label}</text>
        </g>
      ))}
      <ellipse cx={cx} cy={cy} rx="92" ry="46" fill={ink} />
      <text x={cx} y={cy + 9} textAnchor="middle" fontSize="28" fill="#fff" className="vv-hand">{clip(map?.center, 14)}</text>
    </svg>
  );
}

function Hub({ concepts, title, colors, ink }) {
  const W = 900, H = 520, cx = W / 2, cy = H / 2;
  const items = (concepts || []).slice(0, 6);
  const n = items.length || 1;
  const lines = wrap(title, 16);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="vv-svg" role="img" aria-label="Knowledge map">
      {items.map((c, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
        const x = cx + Math.cos(a) * 320, y = cy + Math.sin(a) * 195;
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={colors[i % colors.length]} strokeWidth="4" strokeLinecap="round" />;
      })}
      {items.map((c, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
        const x = cx + Math.cos(a) * 320, y = cy + Math.sin(a) * 195;
        const col = colors[i % colors.length];
        const label = clip(c.title, 18);
        const w = label.length * 9 + 64;
        return (
          <g key={i}>
            <rect x={x - w / 2} y={y - 24} width={w} height="48" rx="24" fill="#fff" stroke={col} strokeWidth="3" />
            <text x={x - w / 2 + 26} y={y + 8} fontSize="22" textAnchor="middle">{c.emoji}</text>
            <text x={x - w / 2 + 46} y={y + 6} fontSize="16" fontWeight="700" fill={ink}>{label}</text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r="86" fill={ink} />
      {lines.map((l, i) => (
        <text key={i} x={cx} y={cy + (i - (lines.length - 1) / 2) * 26 + 8} textAnchor="middle" fontSize="24" fill="#fff" className="vv-hand">{l}</text>
      ))}
    </svg>
  );
}

const Visual = forwardRef(function Visual({ data, format = 'whiteboard', theme = 'marker', watermark = false }, ref) {
  const t = THEMES[theme] || THEMES.marker;
  const cols = t.colors;
  return (
    <div ref={ref} className={`vv vv-${format}`} style={{ background: t.bg, color: t.ink }}>
      <header className="vv-head">
        <h2 className="vv-hand vv-title">{data.title}</h2>
        <div className="vv-meta">
          <span style={{ background: cols[2] }}>{data.level}</span>
          {data.minutes ? <span style={{ background: cols[0] }}>{data.minutes} min video</span> : null}
        </div>
        <p className="vv-quote" style={{ borderColor: cols[1] }}>{data.quote}</p>
      </header>

      {format === 'whiteboard' ? (
        <>
          <div className="vv-cards">
            {(data.concepts || []).slice(0, 6).map((c, i) => (
              <div key={i} className="vv-card" style={{ borderColor: cols[i % cols.length] }}>
                <div className="vv-emoji">{c.emoji}</div>
                <h3 style={{ color: cols[i % cols.length] }}>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
          <MindMap map={data.mindmap} colors={cols} ink={t.ink} />
        </>
      ) : (
        <>
          <Hub concepts={data.concepts} title={data.mindmap?.center || data.title} colors={cols} ink={t.ink} />
          <ul className="vv-takeaways">
            {(data.takeaways || []).map((x, i) => (
              <li key={i} style={{ borderColor: cols[i % cols.length] }}>{x}</li>
            ))}
          </ul>
        </>
      )}

      <footer className="vv-foot">
        <span className="vv-hand">Vid Visual</span>
        {watermark ? <span>Made with Vid Visual · vidvisual.app</span> : null}
      </footer>
    </div>
  );
});

export default Visual;
