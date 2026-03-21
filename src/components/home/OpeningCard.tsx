'use client';
import Link from 'next/link';
import MiniBoard from '@/components/board/MiniBoard';
import type { Opening } from '@/lib/types';

// Tag each opening with a style tag for visual variety
const TAGS: Record<string, string> = {
  'fried-liver':   '⚔️ Gambit',
  'kings-gambit':  '⚔️ Gambit',
  'danish-gambit': '⚔️ Gambit',
  'caro-kann':     '🛡️ Solid',
  'queens-gambit': '📖 Classical',
  'sicilian':      '⚡ Dynamic',
  'italian':       '📖 Classical',
  'ruy-lopez':     '👑 Positional',
};

export default function OpeningCard({ opening }: { opening: Opening }) {
  return (
    <Link href={`/opening/${opening.id}`} className="opening-card">
      <div className="card-board">
        <MiniBoard moves={opening.moves} squareSize={22} />
      </div>
      <div className="card-body">
        <div className="card-name">{opening.name}</div>
        <div className="card-desc">{opening.desc}</div>
        <div className="card-badges">
          <span className="badge badge-accent">{opening.lines} lines</span>
          <span className="badge badge-muted">{TAGS[opening.id] ?? '♟ Opening'}</span>
        </div>
      </div>
    </Link>
  );
}
