'use client';
import type { BoardTheme } from '@/lib/types';

interface Props { theme: BoardTheme; onChange: (t: BoardTheme) => void; }

const THEMES: { id: BoardTheme; label: string; icon: string }[] = [
  { id: 'wood',    label: 'Wooden',    icon: '🪵' },
  { id: 'classic', label: 'Classic',   icon: '♟' },
  { id: 'glass',   label: 'Glass',     icon: '💎' },
  { id: 'marble',  label: 'Marble',    icon: '🌿' },
];

export default function ThemePicker({ theme, onChange }: Props) {
  return (
    <div>
      <div style={{ fontSize: '.67rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.09em', marginBottom: 6 }}>Board Theme</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {THEMES.map(t => (
          <button key={t.id} title={t.label} onClick={() => onChange(t.id)}
            style={{ width: 36, height: 36, borderRadius: 7, border: theme === t.id ? '2px solid var(--purple-light)' : '2px solid transparent', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', transition: 'border-color .14s, transform .14s' }}>
            {t.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
