'use client';
interface Props { canUndo: boolean; canRedo: boolean; onUndo: () => void; onRedo: () => void; }
export default function BoardControls({ canUndo, canRedo, onUndo, onRedo }: Props) {
  return (
    <div className="board-controls">
      <button className="ctrl-btn" disabled={!canUndo} onClick={onUndo}>← Undo</button>
      <button className="ctrl-btn" disabled={!canRedo} onClick={onRedo}>Redo →</button>
    </div>
  );
}
