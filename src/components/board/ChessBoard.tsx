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
  // Observe the OUTER wrapper so we know how much space is available before sizing squares
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [sqSize, setSqSize] = useState(50); // safe default that won't overflow on first render

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const obs = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width;
      // Subtract rank-labels column (20px) so board fits cleanly
      setSqSize(Math.max(36, Math.min(74, Math.floor((w - 20) / 8))));
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const chess = new Chess(fen);
  const squares: JSX.Element[] = [];

  for (let rank = 7; rank >= 0; rank--) {
    for (let file = 0; file < 8; file++) {
      const sq = String.fromCharCode(97 + file) + (rank + 1);
      const isLight = (rank + file) % 2 === 1;
      const piece = chess.get(sq as Square);
      const isSelected = sq === selectedSq;
      const isLastFrom = lastMv?.from === sq;
      const isLastTo = lastMv?.to === sq;
      const isHint = hintSquares.has(sq);
      const isCapture = captureSquares.has(sq);

      let cls = '';
      if (isSelected) cls = 'sq-selected';
      else if (isLastFrom) cls = 'sq-last-from';
      else if (isLastTo) cls = 'sq-last-to';
      if (isHint && !isCapture) cls += ' sq-hint-empty';
      if (isCapture) cls += ' sq-hint-capture';

      squares.push(
        <div key={sq} className={cls}
          onClick={() => onSquareClick(sq)}
          style={{
            width: sqSize, height: sqSize,
            background: isLight ? 'var(--sq-light)' : 'var(--sq-dark)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', userSelect: 'none', position: 'relative',
          }}
        >
          {piece && (
            <span className={piece.color === 'w' ? 'piece-w' : 'piece-b'}
              style={{ fontSize: sqSize * 0.72 }}>
              {SYM[piece.color + piece.type.toUpperCase()]}
            </span>
          )}
        </div>
      );
    }
  }

  const rankLabels = ['8','7','6','5','4','3','2','1'].map(r => (
    <div key={r} style={{ height: sqSize, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.6rem', color: 'var(--muted)', width: 16 }}>{r}</div>
  ));
  const fileLabels = ['a','b','c','d','e','f','g','h'].map(f => (
    <div key={f} style={{ width: sqSize, textAlign: 'center', fontSize: '.6rem', color: 'var(--muted)', paddingTop: 3 }}>{f}</div>
  ));

  return (
    <div ref={wrapperRef} data-theme={theme} style={{ display: 'flex', flexDirection: 'column', gap: 0, width: '100%', maxWidth: 620 }}>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: 16, flexShrink: 0 }}>{rankLabels}</div>
        <div className="board-grid"
          style={{ display: 'grid', gridTemplateColumns: `repeat(8, ${sqSize}px)`, gridTemplateRows: `repeat(8, ${sqSize}px)`, border: `6px solid var(--board-border)`, boxShadow: `0 6px 36px var(--board-glow, rgba(0,0,0,.5))` }}>
          {squares}
        </div>
      </div>
      <div style={{ display: 'flex', marginLeft: 16 }}>{fileLabels}</div>
    </div>
  );
}
