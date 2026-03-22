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
      freePlayMode: game.freePlayMode, opponentWaiting: game.opponentWaiting,
      selectedSq: game.selectedSq, lastMv: game.lastMv, mode: game.mode,
    });
  }, [game]);

  const pct = opening.moves.length > 0 ? Math.round(game.mvIdx / opening.moves.length * 100) : 0;

  const modeLabel = game.freePlayMode ? 'Free Play' : game.mode === 'learn' ? 'Learn' : 'Practice';

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
      <header className="op-header">
        <Link href="/" className="back-btn">← Back</Link>
        <span className="op-header-title">{opening.name}</span>
        <span className="op-mode-badge">{modeLabel}</span>
        <ThemeToggle />
      </header>

      <ProgressBar pct={pct} />

      <div className="op-body">
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
            theme={boardTheme} flipped={opening.color === 'black'}
            onSquareClick={handleClick}
          />

          <FeedbackBar type={game.feedback.type} msg={game.feedback.msg} />
          <BoardControls canUndo={game.canUndo} canRedo={game.canRedo} onUndo={game.doUndo} onRedo={game.doRedo} />
          <div className="material-label">{material}</div>
        </section>

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
