interface Props { total: number; done: number; }
export default function ProgressDots({ total, done }: Props) {
  return (
    <div>
      <div className="panel-label">Progress — {done} / {total}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {Array.from({ length: Math.min(total, 20) }, (_, i) => (
          <div key={i} className={`dot ${i < done ? 'done' : i === done ? 'current' : ''}`} />
        ))}
      </div>
    </div>
  );
}
