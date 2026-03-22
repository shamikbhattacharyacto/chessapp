'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { Chess, type Square } from 'chess.js';
import type { Opening, GameMode, FeedbackType, HistoryEntry } from '@/lib/types';
import { HINTS } from '@/lib/hints';

function sanEq(a: string, b: string) {
  return a.replace(/[+#!?]/g, '') === b.replace(/[+#!?]/g, '');
}

export function useChessGame(opening: Opening) {
  // playerColor: 'w' for white openings (user plays White), 'b' for black openings (user plays Black)
  const playerColor = opening.color === 'white' ? 'w' : 'b';
  const opponentColor = playerColor === 'w' ? 'b' : 'w';
  const opponentName = playerColor === 'w' ? 'Black' : 'White';

  const chessRef = useRef<Chess>(new Chess());
  const historyRef = useRef<HistoryEntry[]>([]);
  const redoRef = useRef<HistoryEntry[]>([]);
  const opponentTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const modeRef = useRef<GameMode>('learn');

  const initialFeedbackMsg = playerColor === 'w'
    ? 'Click a white piece to start the opening.'
    : 'White will play first — then it\'s your turn as Black.';
  const initialCoachMsg = playerColor === 'w'
    ? 'Click a white piece to begin.'
    : 'White is preparing their first move…';

  const [fen, setFen] = useState(() => new Chess().fen());
  const [mvIdx, setMvIdx] = useState(0);
  const [selectedSq, setSelectedSq] = useState<string | null>(null);
  const [lastMv, setLastMv] = useState<{ from: string; to: string } | null>(null);
  const [mode, setModeState] = useState<GameMode>('learn');
  const [lineOver, setLineOver] = useState(false);
  const [freePlayMode, setFreePlayMode] = useState(false);
  const [opponentWaiting, setOpponentWaiting] = useState(false);
  const [doneRuns, setDoneRuns] = useState(0);
  const [practiceRuns, setPracticeRuns] = useState(0);
  const [feedback, setFeedback] = useState<{ type: FeedbackType; msg: string }>({
    type: 'info', msg: initialFeedbackMsg,
  });
  const [coachMsg, setCoachMsg] = useState(initialCoachMsg);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const updateUndoRedo = useCallback(() => {
    setCanUndo(historyRef.current.length > 0);
    setCanRedo(redoRef.current.length > 0);
  }, []);

  const getHint = useCallback((idx: number): string => {
    if (idx >= opening.moves.length) return 'Opening complete!';
    return HINTS[opening.moves[idx]] ?? `Your move: ${opening.moves[idx]}`;
  }, [opening.moves]);

  const pushHistory = useCallback((currentMvIdx: number, currentLastMv: { from: string; to: string } | null, currentLineOver: boolean) => {
    historyRef.current.push({
      fen: chessRef.current.fen(),
      mvIdx: currentMvIdx,
      lastMv: currentLastMv ? { ...currentLastMv } : null,
      lineOver: currentLineOver,
    });
    redoRef.current = [];
    updateUndoRedo();
  }, [updateUndoRedo]);

  const finishLine = useCallback((currentMode: GameMode) => {
    setLineOver(true);
    if (currentMode === 'learn') setDoneRuns(r => r + 1);
    else setPracticeRuns(r => r + 1);
    setTimeout(() => { setFeedback({ type: 'empty', msg: '' }); setShowOverlay(true); }, 300);
    updateUndoRedo();
  }, [updateUndoRedo]);

  // Plays the OPPONENT's move automatically (White for black openings, Black for white openings)
  const playOpponent = useCallback((afterIdx: number, currentMode: GameMode, mv: { from: string; to: string } | null) => {
    opponentTimerRef.current = setTimeout(() => {
      opponentTimerRef.current = null;
      if (afterIdx >= opening.moves.length) { setOpponentWaiting(false); finishLine(currentMode); return; }

      historyRef.current.push({ fen: chessRef.current.fen(), mvIdx: afterIdx, lastMv: mv ? { ...mv } : null, lineOver: false });
      redoRef.current = [];

      const result = chessRef.current.move(opening.moves[afterIdx]);
      if (!result) { setOpponentWaiting(false); return; }
      const newMv = { from: result.from, to: result.to };
      const newIdx = afterIdx + 1;
      setLastMv(newMv);
      setMvIdx(newIdx);
      setFen(chessRef.current.fen());
      setOpponentWaiting(false);
      updateUndoRedo();
      if (newIdx >= opening.moves.length) { finishLine(currentMode); return; }
      const hint = HINTS[opening.moves[newIdx]] ?? `Your move: ${opening.moves[newIdx]}`;
      setFeedback({ type: 'info', msg: hint });
      setCoachMsg(hint);
    }, 800);
  }, [opening.moves, finishLine, updateUndoRedo]);

  // For black openings: auto-play White's first move on mount
  useEffect(() => {
    if (playerColor === 'b') {
      setOpponentWaiting(true);
      setFeedback({ type: 'info', msg: 'White is making the first move…' });
      setCoachMsg('White is making the first move…');
      playOpponent(0, 'learn', null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty — only run once on mount

  const clickSquare = useCallback((
    sqName: string,
    snap: {
      mvIdx: number; lineOver: boolean; freePlayMode: boolean;
      opponentWaiting: boolean; selectedSq: string | null;
      lastMv: { from: string; to: string } | null; mode: GameMode;
    }
  ) => {
    if (snap.opponentWaiting) return;
    const chess = chessRef.current;

    // ── FREE PLAY ──
    if (snap.freePlayMode) {
      const p = chess.get(sqName as Square);
      if (!snap.selectedSq) {
        if (p && p.color === chess.turn()) setSelectedSq(sqName);
        return;
      }
      if (sqName === snap.selectedSq) { setSelectedSq(null); return; }
      if (p && p.color === chess.turn()) { setSelectedSq(sqName); return; }
      const result = chess.move({ from: snap.selectedSq, to: sqName, promotion: 'q' });
      setSelectedSq(null);
      if (!result) { setFeedback({ type: 'error', msg: 'Illegal move.' }); setFen(chess.fen()); return; }
      setLastMv({ from: result.from, to: result.to });
      setFen(chess.fen());
      if (chess.isCheckmate()) {
        const w = chess.turn() === 'w' ? 'Black' : 'White';
        setFeedback({ type: 'success', msg: `Checkmate! ${w} wins.` });
        setCoachMsg(`Checkmate! ${w} wins.`);
      } else if (chess.isStalemate() || chess.isDraw()) {
        setFeedback({ type: 'info', msg: 'Draw!' });
      } else {
        const t = chess.turn() === 'w' ? 'White' : 'Black';
        setFeedback({ type: 'info', msg: `${t} to move` });
        setCoachMsg(`${t} to move`);
      }
      return;
    }

    // ── OPENING PRACTICE ──
    if (snap.lineOver) return;
    // Only allow interaction when it's the user's turn
    if (chess.turn() !== playerColor) return;

    const p = chess.get(sqName as Square);
    if (!snap.selectedSq) {
      if (p && p.color === playerColor) setSelectedSq(sqName);
      return;
    }
    if (sqName === snap.selectedSq) { setSelectedSq(null); return; }
    if (p && p.color === playerColor) { setSelectedSq(sqName); return; }

    const expected = opening.moves[snap.mvIdx];
    let result: ReturnType<typeof chess.move> | null = null;
    for (const promo of [undefined, 'q'] as const) {
      const tmp = new Chess(chess.fen());
      const r = tmp.move({ from: snap.selectedSq, to: sqName, promotion: promo });
      if (r && sanEq(r.san, expected)) {
        pushHistory(snap.mvIdx, snap.lastMv, snap.lineOver);
        result = chess.move({ from: snap.selectedSq, to: sqName, promotion: promo });
        break;
      }
    }
    setSelectedSq(null);
    if (!result) {
      setFeedback({ type: 'error', msg: "That's not the right move — try again!" });
      setFen(chess.fen());
      return;
    }
    const mv = { from: result.from, to: result.to };
    const newIdx = snap.mvIdx + 1;
    setLastMv(mv); setMvIdx(newIdx); setFen(chess.fen());
    if (newIdx >= opening.moves.length) { finishLine(snap.mode); return; }

    // If it's now the opponent's turn, auto-play their response
    if (chess.turn() === opponentColor) {
      setOpponentWaiting(true);
      setFeedback({ type: 'success', msg: `✓ Correct! ${opponentName} is responding…` });
      playOpponent(newIdx, snap.mode, mv);
    } else {
      setFeedback({ type: 'success', msg: '✓ Good move!' });
      const hint = HINTS[opening.moves[newIdx]] ?? opening.moves[newIdx];
      setCoachMsg(hint);
    }
    updateUndoRedo();
  }, [opening.moves, playerColor, opponentColor, opponentName, pushHistory, finishLine, playOpponent, updateUndoRedo]);

  const doUndo = useCallback(() => {
    if (opponentTimerRef.current) { clearTimeout(opponentTimerRef.current); opponentTimerRef.current = null; setOpponentWaiting(false); }
    if (!historyRef.current.length) return;

    redoRef.current.push({ fen: chessRef.current.fen(), mvIdx, lastMv: lastMv ? { ...lastMv } : null, lineOver });
    let state = historyRef.current.pop()!;

    // For black openings: if we land on an opponent's turn position (even mvIdx = White's turn),
    // pop one more entry to skip back to the user's previous Black-to-move position.
    // Exception: if we've reached the very start (mvIdx=0), stop — White will auto-play again.
    if (playerColor === 'b' && state.mvIdx % 2 === 0 && state.mvIdx > 0 && historyRef.current.length > 0) {
      redoRef.current.push({ ...state });
      state = historyRef.current.pop()!;
    }
    // Symmetric for white openings: if we land on opponent's turn (odd mvIdx = Black's turn)
    if (playerColor === 'w' && state.mvIdx % 2 === 1 && historyRef.current.length > 0) {
      redoRef.current.push({ ...state });
      state = historyRef.current.pop()!;
    }

    chessRef.current = new Chess(state.fen);
    setMvIdx(state.mvIdx); setLastMv(state.lastMv); setLineOver(false);
    setShowOverlay(false); setSelectedSq(null); setFen(state.fen);
    setFeedback({ type: 'info', msg: 'Move undone. Try again.' });
    const hint = HINTS[opening.moves[state.mvIdx]] ?? (state.mvIdx < opening.moves.length ? opening.moves[state.mvIdx] : 'Opening complete!');
    setCoachMsg(hint);
    updateUndoRedo();

    // Black opening: if we undid all the way back to start, re-trigger White's first move
    if (playerColor === 'b' && state.mvIdx === 0 && historyRef.current.length === 0) {
      setOpponentWaiting(true);
      setFeedback({ type: 'info', msg: 'White is making the first move…' });
      setCoachMsg('White is making the first move…');
      playOpponent(0, modeRef.current, null);
    }
  }, [mvIdx, lastMv, lineOver, opening.moves, playerColor, playOpponent, updateUndoRedo]);

  const doRedo = useCallback(() => {
    if (!redoRef.current.length) return;
    historyRef.current.push({ fen: chessRef.current.fen(), mvIdx, lastMv: lastMv ? { ...lastMv } : null, lineOver });
    const state = redoRef.current.pop()!;
    chessRef.current = new Chess(state.fen);
    setMvIdx(state.mvIdx); setLastMv(state.lastMv); setLineOver(state.lineOver);
    if (state.lineOver) setTimeout(() => setShowOverlay(true), 100);
    setSelectedSq(null); setFen(state.fen);
    const hint = state.mvIdx < opening.moves.length ? (HINTS[opening.moves[state.mvIdx]] ?? opening.moves[state.mvIdx]) : 'Opening complete!';
    setFeedback({ type: 'info', msg: hint });
    updateUndoRedo();
  }, [mvIdx, lastMv, lineOver, opening.moves, updateUndoRedo]);

  const resetGame = useCallback(() => {
    if (opponentTimerRef.current) { clearTimeout(opponentTimerRef.current); opponentTimerRef.current = null; }
    chessRef.current = new Chess();
    historyRef.current = []; redoRef.current = [];
    setMvIdx(0); setSelectedSq(null); setLastMv(null);
    setLineOver(false); setFreePlayMode(false); setOpponentWaiting(false);
    setShowOverlay(false); setFen(new Chess().fen());
    updateUndoRedo();

    // For black openings, re-trigger White's first move after reset
    if (playerColor === 'b') {
      setTimeout(() => {
        setOpponentWaiting(true);
        setFeedback({ type: 'info', msg: 'White is making the first move…' });
        setCoachMsg('White is making the first move…');
        playOpponent(0, modeRef.current, null);
      }, 50);
    }
  }, [playerColor, playOpponent, updateUndoRedo]);

  const setMode = useCallback((m: GameMode) => {
    modeRef.current = m;
    setModeState(m);
    resetGame();
    if (playerColor === 'w') {
      const msg = m === 'learn' ? 'Click a white piece to learn the opening.' : 'Recall the moves from memory!';
      setFeedback({ type: 'info', msg });
      setCoachMsg(m === 'learn' ? 'Click a white piece to begin.' : 'Recall the opening from memory!');
    } else {
      const msg = m === 'learn' ? 'White will play first — follow the opening as Black.' : 'Recall the Black moves from memory!';
      setFeedback({ type: 'info', msg });
      setCoachMsg(m === 'learn' ? 'White is preparing the first move…' : 'Recall the opening from memory!');
    }
  }, [resetGame, playerColor]);

  const startFreePlay = useCallback(() => {
    setShowOverlay(false); setLineOver(false); setFreePlayMode(true); setSelectedSq(null);
    const t = chessRef.current.turn() === 'w' ? 'White' : 'Black';
    setFeedback({ type: 'info', msg: `${t} to move` }); setCoachMsg(`${t} to move`);
  }, []);

  // Compute valid hint squares for the selected square
  const chess = chessRef.current;
  const validMoves = selectedSq
    ? chess.moves({ square: selectedSq as Square, verbose: true })
    : [];
  const hintSquares = new Set((validMoves as Array<{ to: string; flags: string }>).map(m => m.to));
  const captureSquares = new Set((validMoves as Array<{ to: string; flags: string }>).filter(m => m.flags.includes('c') || m.flags.includes('e')).map(m => m.to));

  return {
    chess,
    fen,
    mvIdx,
    selectedSq,
    lastMv,
    mode,
    lineOver,
    freePlayMode,
    opponentWaiting,
    // keep blackWaiting as alias for backward compat with any stray references
    blackWaiting: opponentWaiting,
    doneRuns,
    practiceRuns,
    feedback,
    coachMsg,
    canUndo,
    canRedo,
    showOverlay,
    hintSquares,
    captureSquares,
    clickSquare,
    doUndo,
    doRedo,
    resetGame,
    setMode,
    startFreePlay,
    getHint,
    playerColor,
  };
}
