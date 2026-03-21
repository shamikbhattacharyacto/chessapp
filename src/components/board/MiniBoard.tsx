'use client';
import { useMemo } from 'react';
import { Chess, type Square } from 'chess.js';

interface Props { moves: string[]; squareSize?: number; }

export default function MiniBoard({ moves, squareSize = 20 }: Props) {
  const squares = useMemo(() => {
    const chess = new Chess();
    moves.forEach(m => { try { chess.move(m); } catch {} });
    const out: Array<{ key: string; isLight: boolean; piece: ReturnType<typeof chess.get> }> = [];
    for (let rank = 7; rank >= 0; rank--) {
      for (let file = 0; file < 8; file++) {
        const sq = (String.fromCharCode(97 + file) + (rank + 1)) as Square;
        out.push({ key: sq, isLight: (rank + file) % 2 === 1, piece: chess.get(sq) });
      }
    }
    return out;
  }, [moves]);

  const sz = squareSize;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(8,${sz}px)`, gridTemplateRows: `repeat(8,${sz}px)`, border: '1px solid rgba(0,0,0,.2)', borderRadius: 4, overflow: 'hidden', flexShrink: 0 }}>
      {squares.map(({ key, isLight, piece }) => (
        <div key={key} style={{ width: sz, height: sz, background: isLight ? '#f0d9b5' : '#b58863', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {piece && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`/pieces/cburnett/${piece.color}${piece.type.toUpperCase()}.svg`}
              alt={`${piece.color}${piece.type}`}
              width={sz * 0.85}
              height={sz * 0.85}
              style={{ display: 'block', pointerEvents: 'none' }}
              draggable={false}
            />
          )}
        </div>
      ))}
    </div>
  );
}
