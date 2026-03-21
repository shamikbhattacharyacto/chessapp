import type { FeedbackType } from '@/lib/types';

interface Props { type: FeedbackType; msg: string; }

const styles: Record<FeedbackType, React.CSSProperties> = {
  success: { background: 'rgba(22,163,74,.14)', color: '#4ade80', border: '1px solid rgba(22,163,74,.3)' },
  error:   { background: 'rgba(220,38,38,.14)',  color: '#f87171', border: '1px solid rgba(220,38,38,.3)' },
  info:    { background: 'rgba(124,58,237,.12)', color: 'var(--purple-light)', border: '1px solid rgba(124,58,237,.3)' },
  empty:   { border: '1px solid transparent' },
};

export default function FeedbackBar({ type, msg }: Props) {
  return (
    <div style={{ height: 34, width: '100%', maxWidth: 560, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.84rem', fontWeight: 500, borderRadius: 7, padding: '0 14px', transition: 'all .2s', ...styles[type] }}>
      {msg}
    </div>
  );
}
