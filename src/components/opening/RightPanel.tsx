'use client';
import CoachBox from './CoachBox';
import MoveSequence from './MoveSequence';
import ProgressDots from './ProgressDots';
import ThemePicker from './ThemePicker';
import ThemeToggle from '@/components/ui/ThemeToggle';
import type { GameMode, BoardTheme } from '@/lib/types';

interface Props {
  name: string; mode: GameMode; freePlayMode: boolean;
  coachMsg: string; moves: string[]; mvIdx: number;
  doneRuns: number; practiceRuns: number; lines: number;
  theme: BoardTheme; onThemeChange: (t: BoardTheme) => void;
  onLearn: () => void; onPractice: () => void;
}

export default function RightPanel({ name, mode, freePlayMode, coachMsg, moves, mvIdx, doneRuns, practiceRuns, lines, theme, onThemeChange, onLearn, onPractice }: Props) {
  return (
    <aside className="side-panel">
      {/* Title */}
      <div className="panel-section">
        <div className="panel-label">{freePlayMode ? 'Free Play' : mode === 'learn' ? 'Learn Mode' : 'Practice Mode'}</div>
        <div className="panel-title">{name}</div>
      </div>

      {/* Coach */}
      <div className="panel-section">
        <div className="panel-label">Coach</div>
        <CoachBox msg={coachMsg} />
      </div>

      {/* Mode buttons */}
      <div className="panel-section" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button className={`mode-btn ${mode === 'learn' && !freePlayMode ? 'active' : ''}`} onClick={onLearn}>
          <span>📖 Learn</span>
          <span className="mode-sub">{doneRuns} / {lines}</span>
        </button>
        <button className={`mode-btn ${mode === 'practice' && !freePlayMode ? 'active' : ''}`} onClick={onPractice}>
          <span>🧠 Practice</span>
          <span className="mode-sub">{practiceRuns} perfected</span>
        </button>
      </div>

      {/* Move sequence */}
      <div className="panel-section">
        <MoveSequence moves={moves} mvIdx={mvIdx} hidden={mode === 'practice' && !freePlayMode} />
      </div>

      {/* Progress */}
      <div className="panel-section">
        <ProgressDots total={lines} done={doneRuns} />
      </div>

      {/* Theme */}
      <div className="panel-section">
        <ThemePicker theme={theme} onChange={onThemeChange} />
      </div>

      {/* Appearance */}
      <div className="panel-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="panel-label" style={{ margin: 0 }}>Light / Dark</div>
        <ThemeToggle />
      </div>

      {/* Locked features */}
      <div className="panel-section" style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
        {[['🎯 Drill','🔒'],['⏱ Timed','🔒'],['🧩 Puzzles','🔒'],['🏟 Arena','🔒']].map(([l,i]) => (
          <div key={l} className="locked-item"><span>{l}</span><span>{i}</span></div>
        ))}
      </div>
    </aside>
  );
}
