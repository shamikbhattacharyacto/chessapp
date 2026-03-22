'use client';
import Link from 'next/link';
import MiniBoard from '@/components/board/MiniBoard';
import type { Opening } from '@/lib/types';

export default function OpeningCard({ opening }: { opening: Opening }) {
  return (
    <Link
      href={`/opening/${opening.id}`}
      className="opening-card"
      style={{ '--card-color': opening.accent } as React.CSSProperties}
    >
      <div className="card-header">
        <MiniBoard moves={opening.moves} squareSize={22} />
      </div>
      <div className="card-body">
        <div className="card-category">
          <span className="card-tag-dot" />
          {opening.tag}
        </div>
        <div className="card-name">{opening.name}</div>
        <div className="card-desc">{opening.desc}</div>
        <div className="card-badges">
          <span className="badge badge-accent">{opening.lines} lines</span>
          <span className={`badge ${opening.color === 'white' ? 'badge-white' : 'badge-black'}`}>
            {opening.color === 'white' ? '♙ White' : '♟ Black'}
          </span>
        </div>
      </div>
    </Link>
  );
}
