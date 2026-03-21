'use client';
import { useMemo } from 'react';
import { Chess } from 'chess.js';
import { SYM } from '@/constants/pieces';

interface Props { moves: string[]; }

export default function MiniBoard({ moves }: Props) {
  const squares = useMemo(() => {
    const chess = new Chess();
    moves.forEach(m => { try { chess.move(m); } catch {} });
    const result: Array<{ key: string; isLight: boolean; piece: ReturnType<typeof chess.get> }> = [];
    for (let rank = 7; rank >= 0; rank--) {
      for (let file = 0; file < 8; file++) {
        const sq = String.fromCharCode(97 + file) + (rank + 1);
        result.push({ key: sq, isLight: (rank + file) % 2 === 1, piece: chess.get(sq as Parameters<typeof chess.get>[0]) });
      }
    }
    return result;
  }, [moves]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 20px)', gridTemplateRows: 'repeat(8, 20px)', border: '1px solid #3a3a3a' }}>
      {squares.map(({ key, isLight, piece }) => (
        <div key={key} style={{ width: 20, height: 20, background: isLight ? '#f0d9b5' : '#b58863', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, lineHeight: 1 }}>
          {piece && (
            <span style={{ color: piece.color === 'w' ? '#fff' : '#111', textShadow: piece.color === 'w' ? '0 0 3px #000,0 1px 3px #000' : '0 0 2px rgba(255,255,255,.3)' }}>
              {SYM[piece.color + piece.type.toUpperCase()]}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
