import { OPENINGS } from '@/lib/openings';
import OpeningsGrid from '@/components/home/OpeningsGrid';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <header className="home-header">
        <div className="home-logo">
          <span className="home-logo-icon">♟</span>
          <span className="home-logo-text">Chess Openings</span>
        </div>
        <ThemeToggle />
      </header>

      <div className="home-hero">
        <h1>Master <span>Opening Theory</span><br />move by move.</h1>
        <p>Pick an opening, learn every move, then drill until it&apos;s second nature.</p>
      </div>

      <OpeningsGrid openings={OPENINGS} />
    </div>
  );
}
