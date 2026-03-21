'use client';
import type { BoardTheme } from '@/lib/types';
const THEMES: { id: BoardTheme; icon: string; label: string }[] = [
  { id:'wood',    icon:'🪵', label:'Wooden' },
  { id:'classic', icon:'♟', label:'Classic' },
  { id:'glass',   icon:'💎', label:'Glass' },
  { id:'marble',  icon:'🌿', label:'Marble' },
];
export default function ThemePicker({ theme, onChange }: { theme: BoardTheme; onChange: (t: BoardTheme) => void }) {
  return (
    <div>
      <div className="panel-label">Board Theme</div>
      <div style={{ display: 'flex', gap: 6 }}>
        {THEMES.map(t => (
          <button key={t.id} title={t.label} onClick={() => onChange(t.id)} className={`swatch-btn ${theme === t.id ? 'active' : ''}`}>{t.icon}</button>
        ))}
      </div>
    </div>
  );
}
