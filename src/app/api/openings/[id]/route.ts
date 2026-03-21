import { NextResponse } from 'next/server';
import { OPENINGS } from '@/lib/openings';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const opening = OPENINGS.find(o => o.id === params.id);
  if (!opening) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(opening);
}
