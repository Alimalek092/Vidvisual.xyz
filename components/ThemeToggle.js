'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = window.localStorage.getItem('vid-visual-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const nextTheme = savedTheme ? savedTheme === 'dark' : prefersDark;

      setIsDark(nextTheme);
      document.documentElement.dataset.theme = nextTheme ? 'dark' : 'light';
    } catch {
      document.documentElement.dataset.theme = 'light';
    }
  }, []);

  useEffect(() => {
    try {
      document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
      window.localStorage.setItem('vid-visual-theme', isDark ? 'dark' : 'light');
    } catch {
      // Ignore storage errors and keep the UI functional.
    }
  }, [isDark]);

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setIsDark((current) => !current)}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span aria-hidden="true" className="theme-toggle-icon">{isDark ? '☀️' : '🌙'}</span>
    </button>
  );
}
