import OpeningCard from './OpeningCard';
import type { Opening } from '@/lib/types';

interface Props { openings: Opening[]; }

export default function OpeningsGrid({ openings }: Props) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 14, padding: '16px 28px 48px' }}>
      {openings.map(o => <OpeningCard key={o.id} opening={o} />)}
    </div>
  );
}
