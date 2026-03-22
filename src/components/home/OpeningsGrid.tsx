'use client';
import { useState } from 'react';
import OpeningCard from './OpeningCard';
import type { Opening, OpeningColor } from '@/lib/types';

type Filter = 'all' | OpeningColor;

export default function OpeningsGrid({ openings }: { openings: Opening[] }) {
  const [filter, setFilter] = useState<Filter>('all');

  const visible = filter === 'all' ? openings : openings.filter(o => o.color === filter);

  return (
    <div>
      {/* Filter tabs */}
      <div className="filter-bar">
        {(['all', 'white', 'black'] as Filter[]).map(f => (
          <button
            key={f}
            className={`filter-btn${filter === f ? ' active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All openings' : f === 'white' ? '♙ White' : '♟ Black'}
            <span className="filter-count">
              {f === 'all' ? openings.length : openings.filter(o => o.color === f).length}
            </span>
          </button>
        ))}
      </div>

      <div className="openings-grid">
        {visible.map(o => <OpeningCard key={o.id} opening={o} />)}
      </div>
    </div>
  );
}
