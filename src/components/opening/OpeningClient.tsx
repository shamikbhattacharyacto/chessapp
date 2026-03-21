'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useChessGame } from '@/hooks/useChessGame';
import ChessBoard from '@/components/board/ChessBoard';
import RightPanel from './RightPanel';
import BoardControls from './BoardControls';
import CompletionOverlay from './CompletionOverlay';
import ProgressBar from '@/components/ui/ProgressBar';
import FeedbackBar from '@/components/ui/FeedbackBar';
import type { Opening } from '@/lib/types';
import type { BoardTheme } from '@/lib/types';

interface Props { opening: Opening; }

export default function OpeningClient({ opening }: Props) {
  const [theme, setTheme] = useState<BoardTheme>('wood');
  const game = useChessGame(opening);

  const handleSquareClick = useCallback((sq: string) => {
    game.clickSquare(sq, {
      mvIdx: game.mvIdx,
      lineOver: game.lineOver,
      freePlayMode: game.freePlayMode,
      blackWaiting: game.blackWaiting,
      selectedSq: game.selectedSq,
      lastMv: game.lastMv,
      mode: game.mode,
    });
  }, [game]);

  const pct = opening.moves.length > 0 ? Math.round((game.mvIdx / opening.moves.length) * 100) : 0;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 18px', borderBottom: '1px solid var(--border)', background: 'var(--card-bg)', position: 'sticky', top: 0, zIndex: 10 }}>
        <Link href="/" style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--muted)', padding: '5px 11px', borderRadius: 6, cursor: 'pointer', fontSize: '.8rem', textDecoration: 'none' }}>← Back</Link>
        <h2 style={{ fontSize: '.98rem', fontWeight: 600 }}>{opening.name}</h2>
      </div>

      <ProgressBar pct={pct} />

      {/* Body */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Board area */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '18px 14px', gap: 8, position: 'relative' }}>
          <CompletionOverlay
            show={game.showOverlay}
            opening={opening}
            mvIdx={game.mvIdx}
            mode={game.mode}
            onContinue={game.startFreePlay}
            onRelearn={() => game.setMode('learn')}
            onPractice={() => game.setMode('practice')}
          />

          <ChessBoard
            fen={game.fen}
            selectedSq={game.selectedSq}
            lastMv={game.lastMv}
            hintSquares={game.hintSquares}
            captureSquares={game.captureSquares}
            theme={theme}
            onSquareClick={handleSquareClick}
          />

          <FeedbackBar type={game.feedback.type} msg={game.feedback.msg} />
          <BoardControls canUndo={game.canUndo} canRedo={game.canRedo} onUndo={game.doUndo} onRedo={game.doRedo} />
          <div style={{ fontSize: '.72rem', color: 'var(--muted)' }}>
            {(() => {
              const chess = game.chess;
              const vals: Record<string, number> = { p:1, n:3, b:3, r:5, q:9 };
              let w = 0, b = 0;
              chess.board().forEach(row => row?.forEach(p => {
                if (!p || p.type === 'k') return;
                if (p.color === 'w') w += vals[p.type] ?? 0;
                else b += vals[p.type] ?? 0;
              }));
              const d = w - b;
              return d > 0 ? `White +${d}` : d < 0 ? `Black +${-d}` : 'Equal material';
            })()}
          </div>
        </div>

        <RightPanel
          name={opening.name}
          mode={game.mode}
          freePlayMode={game.freePlayMode}
          coachMsg={game.coachMsg}
          moves={opening.moves}
          mvIdx={game.mvIdx}
          doneRuns={game.doneRuns}
          practiceRuns={game.practiceRuns}
          lines={opening.lines}
          theme={theme}
          onThemeChange={setTheme}
          onLearn={() => game.setMode('learn')}
          onPractice={() => game.setMode('practice')}
        />
      </div>
    </div>
  );
}
