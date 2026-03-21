import { OPENINGS } from '@/lib/openings';
import OpeningsGrid from '@/components/home/OpeningsGrid';

export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <header style={{ padding: '18px 28px 14px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: '1.5rem' }}>♟</span>
        <h1 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--purple-light)' }}>Chess Openings</h1>
      </header>
      <p style={{ padding: '20px 28px 4px', color: 'var(--muted)', fontSize: '0.9rem' }}>
        Master chess openings — move by move.
      </p>
      <OpeningsGrid openings={OPENINGS} />
    </main>
  );
}
