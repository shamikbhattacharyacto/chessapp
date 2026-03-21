interface Props { pct: number; }
export default function ProgressBar({ pct }: Props) {
  return (
    <div className="op-progress">
      <div className="op-progress-fill" style={{ width: `${Math.min(pct, 100)}%` }} />
    </div>
  );
}
