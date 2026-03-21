interface Props { total: number; done: number; }
export default function ProgressDots({ total, done }: Props) {
  const count = Math.min(total, 20);
  return (
    <div>
      <div style={{ fontSize: '.67rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.09em', marginBottom: 6 }}>Progress</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {Array.from({ length: count }, (_, i) => (
          <div key={i} style={{
            width: 9, height: 9, borderRadius: '50%',
            background: i < done ? 'var(--purple)' : i === done ? 'rgba(124,58,237,.4)' : 'transparent',
            border: i < done ? '1.5px solid var(--purple)' : i === done ? '1.5px solid var(--purple-light)' : '1.5px solid #333',
          }} />
        ))}
      </div>
    </div>
  );
}
