'use client';
interface Props { show: boolean; openingName: string; mvIdx: number; mode: string; onContinue: () => void; onRelearn: () => void; onPractice: () => void; }
export default function CompletionOverlay({ show, openingName, mvIdx, mode, onContinue, onRelearn, onPractice }: Props) {
  if (!show) return null;
  return (
    <div className="overlay">
      <h3>Opening Complete ✓</h3>
      <p>{openingName} — {mvIdx} moves mastered. {mode === 'learn' ? "You've learned this line!" : 'Perfect recall!'}</p>
      <div className="overlay-btns">
        <button className="ov-btn ov-btn-continue" onClick={onContinue}>▶ Continue vs Human</button>
        <button className="ov-btn ov-btn-learn"    onClick={onRelearn}>↺ Re-learn</button>
        <button className="ov-btn ov-btn-practice" onClick={onPractice}>🧠 Practice</button>
      </div>
    </div>
  );
}
