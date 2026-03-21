'use client';
import { useMemo } from 'react';
import { Chess, type Square } from 'chess.js';
import { SYM } from '@/constants/pieces';

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
        <div key={key} style={{ width: sz, height: sz, background: isLight ? '#f0d9b5' : '#b58863', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: sz * 0.7, lineHeight: 1 }}>
          {piece && (
            <span style={{ color: piece.color === 'w' ? '#fff' : '#18180e', textShadow: piece.color === 'w' ? '0 0 3px #000,0 1px 3px #000' : '0 0 2px rgba(255,255,255,.2)', lineHeight: 1, display: 'block' }}>
              {SYM[piece.color + piece.type.toUpperCase()]}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
