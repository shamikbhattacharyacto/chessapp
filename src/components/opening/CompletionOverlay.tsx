'use client';
interface Props { show: boolean; opening: { name: string }; mvIdx: number; mode: string; onContinue: () => void; onRelearn: () => void; onPractice: () => void; }

export default function CompletionOverlay({ show, opening, mvIdx, mode, onContinue, onRelearn, onPractice }: Props) {
  if (!show) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.92)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, zIndex: 20, padding: 20 }}>
      <h3 style={{ fontSize: '1.5rem', color: '#4ade80', fontWeight: 700 }}>Well done! ✓</h3>
      <p style={{ fontSize: '.83rem', color: 'var(--muted)', textAlign: 'center', maxWidth: 340, lineHeight: 1.5 }}>
        {opening.name} — all {mvIdx} moves completed. {mode === 'learn' ? "You've learned this line!" : 'Perfect recall!'}
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginTop: 4 }}>
        <button onClick={onContinue} style={{ padding: '9px 18px', borderRadius: 7, fontSize: '.84rem', cursor: 'pointer', border: 'none', fontWeight: 500, background: '#16a34a', color: '#fff' }}>▶ Continue vs Human</button>
        <button onClick={onRelearn} style={{ padding: '9px 18px', borderRadius: 7, fontSize: '.84rem', cursor: 'pointer', border: 'none', fontWeight: 500, background: 'var(--purple)', color: '#fff' }}>Re-learn</button>
        <button onClick={onPractice} style={{ padding: '9px 18px', borderRadius: 7, fontSize: '.84rem', cursor: 'pointer', border: '1px solid #444', fontWeight: 500, background: '#282828', color: 'var(--text)' }}>Practice</button>
      </div>
    </div>
  );
}
