import OpeningCard from './OpeningCard';
import type { Opening } from '@/lib/types';

export default function OpeningsGrid({ openings }: { openings: Opening[] }) {
  return (
    <div className="openings-grid">
      {openings.map(o => <OpeningCard key={o.id} opening={o} />)}
    </div>
  );
}
