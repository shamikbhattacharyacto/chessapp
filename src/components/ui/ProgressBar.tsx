interface Props { pct: number; }
export default function ProgressBar({ pct }: Props) {
  return (
    <div style={{ height: 3, background: '#222' }}>
      <div style={{ height: '100%', background: 'var(--purple)', transition: 'width .35s', width: `${Math.min(pct, 100)}%` }} />
    </div>
  );
}
