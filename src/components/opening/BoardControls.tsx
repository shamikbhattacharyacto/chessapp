'use client';
interface Props { canUndo: boolean; canRedo: boolean; onUndo: () => void; onRedo: () => void; }

const btn: React.CSSProperties = { background: '#1a1a1a', border: '1px solid var(--border)', color: 'var(--muted)', padding: '5px 12px', borderRadius: 6, cursor: 'pointer', fontSize: '.78rem' };
const dis: React.CSSProperties = { ...btn, opacity: .35, cursor: 'not-allowed' };

export default function BoardControls({ canUndo, canRedo, onUndo, onRedo }: Props) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      <button style={canUndo ? btn : dis} disabled={!canUndo} onClick={onUndo}>← Undo</button>
      <button style={canRedo ? btn : dis} disabled={!canRedo} onClick={onRedo}>Redo →</button>
    </div>
  );
}
