import { OPENINGS } from '@/lib/openings';
import OpeningsGrid from '@/components/home/OpeningsGrid';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function HomePage() {
  const totalMoves = OPENINGS.reduce((sum, o) => sum + o.moves.length, 0);
  const whiteCount = OPENINGS.filter(o => o.color === 'white').length;
  const blackCount = OPENINGS.filter(o => o.color === 'black').length;

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
          <span className="stat-num">{whiteCount}</span>
          <span className="stat-lbl">white</span>
        </div>
        <span className="stat-dot" />
        <div className="stat-item">
          <span className="stat-num">{blackCount}</span>
          <span className="stat-lbl">black</span>
        </div>
        <span className="stat-dot" />
        <div className="stat-item">
          <span className="stat-num">{totalMoves}</span>
          <span className="stat-lbl">total moves</span>
        </div>
      </div>

      <OpeningsGrid openings={OPENINGS} />
    </div>
  );
}
