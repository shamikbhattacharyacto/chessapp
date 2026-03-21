interface Props { moves: string[]; mvIdx: number; hidden: boolean; }
export default function MoveSequence({ moves, mvIdx, hidden }: Props) {
  if (hidden) return null;
  return (
    <div>
      <div className="panel-label">Move Sequence</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {moves.map((mv, i) => {
          const n = Math.floor(i / 2) + 1;
          const label = i % 2 === 0 ? `${n}. ${mv}` : mv;
          return (
            <span key={i} className={`mv-chip ${i < mvIdx ? 'done' : i === mvIdx ? 'current' : ''}`}>{label}</span>
          );
        })}
      </div>
    </div>
  );
}
