interface Props { moves: string[]; mvIdx: number; hidden: boolean; }

export default function MoveSequence({ moves, mvIdx, hidden }: Props) {
  if (hidden) return null;
  return (
    <div>
      <div style={{ fontSize: '.67rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.09em', marginBottom: 6 }}>Move Sequence</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {moves.map((mv, i) => {
          const n = Math.floor(i / 2) + 1;
          const label = i % 2 === 0 ? `${n}. ${mv}` : mv;
          const isDone = i < mvIdx;
          const isCurrent = i === mvIdx;
          return (
            <span key={i} style={{
              fontSize: '.71rem', padding: '2px 6px', borderRadius: 4, whiteSpace: 'nowrap',
              border: isCurrent ? '1px solid var(--purple)' : '1px solid var(--border)',
              background: isCurrent ? 'rgba(124,58,237,.12)' : isDone ? '#1d1d1d' : '#0f0f0f',
              color: isCurrent ? 'var(--purple-light)' : isDone ? 'var(--text)' : 'var(--muted)',
            }}>
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
