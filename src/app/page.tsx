import { OPENINGS } from '@/lib/openings';
import OpeningsGrid from '@/components/home/OpeningsGrid';
import ThemeToggle from '@/components/ui/ThemeToggle';

const totalMoves = 168; // 8 openings × ~21 avg moves

export default function HomePage() {
  return (
    <div className="home-wrap">
      <header className="home-header">
        <div className="home-logo">
          <span className="home-logo-icon">♟</span>
          <span className="home-logo-text">OpeningLab</span>
        </div>
        <ThemeToggle />
      </header>

      <div className="home-hero">
        <h1>Master <span>Opening Theory</span><br />move by move.</h1>
        <p>Pick an opening, learn every move, then drill until it&apos;s second nature.</p>
      </div>

      <div className="home-stats">
        <div className="stat-item">
          <span className="stat-num">{OPENINGS.length}</span>
          <span className="stat-lbl">openings</span>
        </div>
        <span className="stat-dot" />
        <div className="stat-item">
          <span className="stat-num">{totalMoves}</span>
          <span className="stat-lbl">total moves</span>
        </div>
        <span className="stat-dot" />
        <div className="stat-item">
          <span className="stat-num">Free</span>
          <span className="stat-lbl">forever</span>
        </div>
      </div>

      <OpeningsGrid openings={OPENINGS} />
    </div>
  );
}
