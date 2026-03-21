import { OPENINGS } from '@/lib/openings';
import { notFound } from 'next/navigation';
import OpeningClient from '@/components/opening/OpeningClient';

export function generateStaticParams() {
  return OPENINGS.map(o => ({ id: o.id }));
}

export default function OpeningPage({ params }: { params: { id: string } }) {
  const opening = OPENINGS.find(o => o.id === params.id);
  if (!opening) notFound();
  return <OpeningClient opening={opening!} />;
}
