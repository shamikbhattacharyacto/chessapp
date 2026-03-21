import { NextResponse } from 'next/server';
import { OPENINGS } from '@/lib/openings';

export async function GET() {
  const data = OPENINGS.map(({ id, name, desc, lines, moves }) => ({
    id, name, desc, lines, moveCount: moves.length,
  }));
  return NextResponse.json(data);
}
