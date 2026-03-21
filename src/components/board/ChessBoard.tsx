'use client';
import { useRef, useEffect, useState } from 'react';
import { Chess, type Square } from 'chess.js';
import { SYM } from '@/constants/pieces';
import type { BoardTheme } from '@/lib/types';

interface Props {
  fen: string;
  selectedSq: string | null;
  lastMv: { from: string; to: string } | null;
  hintSquares: Set<string>;
  captureSquares: Set<string>;
  theme: BoardTheme;
  onSquareClick: (sq: string) => void;
}

export default function ChessBoard({ fen, selectedSq, lastMv, hintSquares, captureSquares, theme, onSquareClick }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [sqSize, setSqSize] = useState(52);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const obs = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width;
      setSqSize(Math.max(36, Math.min(74, Math.floor((w - 20) / 8))));
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const chess = new Chess(fen);
  const squares: React.JSX.Element[] = [];

  for (let rank = 7; rank >= 0; rank--) {
    for (let file = 0; file < 8; file++) {
      const sq = (String.fromCharCode(97 + file) + (rank + 1)) as Square;
      const isLight = (rank + file) % 2 === 1;
      const piece = chess.get(sq);

      let cls = '';
      if (sq === selectedSq) cls = 'sq-selected';
      else if (lastMv?.from === sq) cls = 'sq-last-from';
      else if (lastMv?.to === sq) cls = 'sq-last-to';
      if (hintSquares.has(sq) && !captureSquares.has(sq)) cls += ' sq-hint';
      if (captureSquares.has(sq)) cls += ' sq-capture';

      squares.push(
        <div key={sq} className={cls} onClick={() => onSquareClick(sq)}
          style={{ width: sqSize, height: sqSize, background: isLight ? 'var(--sq-l)' : 'var(--sq-d)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', userSelect: 'none', position: 'relative' }}>
          {piece && (
            <span className={piece.color === 'w' ? 'piece-w' : 'piece-b'} style={{ fontSize: sqSize * 0.72 }}>
              {SYM[piece.color + piece.type.toUpperCase()]}
            </span>
          )}
        </div>
      );
    }
  }

  const ranks = ['8','7','6','5','4','3','2','1'];
  const files = ['a','b','c','d','e','f','g','h'];

  return (
    <div ref={wrapperRef} data-board={theme} style={{ width: '100%', maxWidth: 620, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex' }}>
        {/* Rank labels */}
        <div style={{ display: 'flex', flexDirection: 'column', width: 16, flexShrink: 0 }}>
          {ranks.map(r => (
            <div key={r} style={{ height: sqSize, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', color: 'var(--text-subtle)', fontWeight: 500 }}>{r}</div>
          ))}
        </div>
        {/* Board */}
        <div className="board-inner"
          style={{ display: 'grid', gridTemplateColumns: `repeat(8,${sqSize}px)`, gridTemplateRows: `repeat(8,${sqSize}px)`, border: `5px solid var(--bb, #7a4c20)`, borderRadius: 4, overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
          {squares}
        </div>
      </div>
      {/* File labels */}
      <div style={{ display: 'flex', marginLeft: 16 }}>
        {files.map(f => (
          <div key={f} style={{ width: sqSize, textAlign: 'center', fontSize: '0.55rem', color: 'var(--text-subtle)', fontWeight: 500, paddingTop: 3 }}>{f}</div>
        ))}
      </div>
    </div>
  );
}
