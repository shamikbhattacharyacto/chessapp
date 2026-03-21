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
import ThemeToggle from '@/components/ui/ThemeToggle';
import type { Opening, BoardTheme } from '@/lib/types';

export default function OpeningClient({ opening }: { opening: Opening }) {
  const [boardTheme, setBoardTheme] = useState<BoardTheme>('wood');
  const game = useChessGame(opening);

  const handleClick = useCallback((sq: string) => {
    game.clickSquare(sq, {
      mvIdx: game.mvIdx, lineOver: game.lineOver,
      freePlayMode: game.freePlayMode, blackWaiting: game.blackWaiting,
      selectedSq: game.selectedSq, lastMv: game.lastMv, mode: game.mode,
    });
  }, [game]);

  const pct = opening.moves.length > 0 ? Math.round(game.mvIdx / opening.moves.length * 100) : 0;

  // Material count
  const material = (() => {
    const vals: Record<string,number> = { p:1,n:3,b:3,r:5,q:9 };
    let w = 0, b = 0;
    game.chess.board().forEach(row => row?.forEach(p => {
      if (!p || p.type === 'k') return;
      if (p.color === 'w') w += vals[p.type] ?? 0; else b += vals[p.type] ?? 0;
    }));
    const d = w - b;
    return d > 0 ? `White +${d}` : d < 0 ? `Black +${-d}` : 'Equal material';
  })();

  return (
    <div className="op-page">
      {/* Header */}
      <header className="op-header">
        <Link href="/" className="back-btn">← Back</Link>
        <span className="op-header-title">{opening.name}</span>
        {/* Theme toggle visible on mobile (panel hidden below) */}
        <div style={{ display: 'none' }} id="mobile-theme-toggle">
          <ThemeToggle />
        </div>
        <style>{`@media(max-width:768px){#mobile-theme-toggle{display:block}}`}</style>
      </header>

      <ProgressBar pct={pct} />

      <div className="op-body">
        {/* Board */}
        <section className="board-section">
          <CompletionOverlay
            show={game.showOverlay} openingName={opening.name}
            mvIdx={game.mvIdx} mode={game.mode}
            onContinue={game.startFreePlay}
            onRelearn={() => game.setMode('learn')}
            onPractice={() => game.setMode('practice')}
          />

          {game.freePlayMode && (
            <div className="freeplay-banner">
              Free Play — {game.chess.turn() === 'w' ? 'White' : 'Black'} to move
            </div>
          )}

          <ChessBoard
            fen={game.fen} selectedSq={game.selectedSq}
            lastMv={game.lastMv} hintSquares={game.hintSquares}
            captureSquares={game.captureSquares}
            theme={boardTheme} onSquareClick={handleClick}
          />

          <FeedbackBar type={game.feedback.type} msg={game.feedback.msg} />
          <BoardControls canUndo={game.canUndo} canRedo={game.canRedo} onUndo={game.doUndo} onRedo={game.doRedo} />
          <div className="material-label">{material}</div>
        </section>

        {/* Right panel (hidden on mobile via CSS — content shown in side-panel below) */}
        <RightPanel
          name={opening.name} mode={game.mode} freePlayMode={game.freePlayMode}
          coachMsg={game.coachMsg} moves={opening.moves} mvIdx={game.mvIdx}
          doneRuns={game.doneRuns} practiceRuns={game.practiceRuns} lines={opening.lines}
          theme={boardTheme} onThemeChange={setBoardTheme}
          onLearn={() => game.setMode('learn')} onPractice={() => game.setMode('practice')}
        />
      </div>
    </div>
  );
}
