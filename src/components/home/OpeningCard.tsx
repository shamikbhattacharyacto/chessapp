'use client';
import Link from 'next/link';
import MiniBoard from '@/components/board/MiniBoard';
import type { Opening } from '@/lib/types';

// Unique accent color + category for each opening
const OPENING_META: Record<string, { color: string; category: string }> = {
  'fried-liver':   { color: '#ef4444', category: '⚔️ Gambit' },
  'kings-gambit':  { color: '#f97316', category: '⚔️ Gambit' },
  'danish-gambit': { color: '#eab308', category: '⚔️ Gambit' },
  'caro-kann':     { color: '#22c55e', category: '🛡️ Solid' },
  'queens-gambit': { color: '#3b82f6', category: '📖 Classical' },
  'sicilian':      { color: '#a855f7', category: '⚡ Dynamic' },
  'italian':       { color: '#ec4899', category: '📖 Classical' },
  'ruy-lopez':     { color: '#14b8a6', category: '👑 Positional' },
};

export default function OpeningCard({ opening }: { opening: Opening }) {
  const meta = OPENING_META[opening.id] ?? { color: '#7c3aed', category: '♟ Opening' };

  return (
    <Link
      href={`/opening/${opening.id}`}
      className="opening-card"
      style={{ '--card-color': meta.color } as React.CSSProperties}
    >
      <div className="card-header">
        <MiniBoard moves={opening.moves} squareSize={22} />
      </div>
      <div className="card-body">
        <div className="card-category">
          <span className="card-tag-dot" />
          {meta.category}
        </div>
        <div className="card-name">{opening.name}</div>
        <div className="card-desc">{opening.desc}</div>
        <div className="card-badges">
          <span className="badge badge-accent">{opening.lines} lines</span>
        </div>
      </div>
    </Link>
  );
}
