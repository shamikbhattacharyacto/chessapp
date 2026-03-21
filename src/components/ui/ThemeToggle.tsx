'use client';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle} title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        width: 38, height: 38, borderRadius: 10,
        border: '1px solid var(--border)', background: 'var(--bg-elevated)',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 17, transition: 'background .2s, border-color .2s', flexShrink: 0,
      }}>
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
