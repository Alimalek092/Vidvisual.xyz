'use client';
import { useState } from 'react';
import Visual, { THEMES } from '@/components/Visual';
import { SAMPLE } from '@/lib/sample';

export default function HeroInteractivePreview() {
  const [format, setFormat] = useState('whiteboard');
  const [theme, setTheme] = useState('marker');

  const themesList = [
    { id: 'marker', name: 'Marker', color: '#2B59E0' },
    { id: 'ocean', name: 'Ocean', color: '#0E7490' },
    { id: 'forest', name: 'Forest', color: '#2F7D4F' },
    { id: 'sunset', name: 'Sunset', color: '#E4572E' },
  ];

  return (
    <div className="hero-interactive-frame">
      {/* Top Window Bar */}
      <div className="hero-frame-topbar">
        <div className="hero-frame-dots">
          <span className="hero-frame-dot red" />
          <span className="hero-frame-dot yellow" />
          <span className="hero-frame-dot green" />
          <span className="hero-frame-badge" style={{ marginLeft: '8px' }}>
            <span className="hero-frame-live-dot" />
            Interactive Canvas
          </span>
        </div>

        {/* Format Selector */}
        <div className="hero-frame-controls">
          <button
            type="button"
            className={`hero-frame-tab-btn ${format === 'whiteboard' ? 'active' : ''}`}
            onClick={() => setFormat('whiteboard')}
          >
            ✏️ Whiteboard
          </button>
          <button
            type="button"
            className={`hero-frame-tab-btn ${format === 'infographic' ? 'active' : ''}`}
            onClick={() => setFormat('infographic')}
          >
            📊 Infographic
          </button>
        </div>

        {/* Theme Picker */}
        <div className="hero-frame-theme-picker" title="Switch palette">
          {themesList.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`hero-theme-dot ${theme === t.id ? 'selected' : ''}`}
              style={{ background: t.color }}
              onClick={() => setTheme(t.id)}
              aria-label={`Theme ${t.name}`}
            />
          ))}
        </div>
      </div>

      {/* Visual Canvas Display */}
      <div style={{ padding: '4px', overflowX: 'auto' }}>
        <Visual data={SAMPLE} format={format} theme={theme} />
      </div>
    </div>
  );
}
