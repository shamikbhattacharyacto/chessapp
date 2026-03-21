'use client';
import CoachBox from './CoachBox';
import MoveSequence from './MoveSequence';
import ProgressDots from './ProgressDots';
import ThemePicker from './ThemePicker';
import type { GameMode, BoardTheme } from '@/lib/types';

interface Props {
  name: string; mode: GameMode; freePlayMode: boolean;
  coachMsg: string; moves: string[]; mvIdx: number;
  doneRuns: number; practiceRuns: number; lines: number;
  theme: BoardTheme; onThemeChange: (t: BoardTheme) => void;
  onLearn: () => void; onPractice: () => void;
}

export default function RightPanel({ name, mode, freePlayMode, coachMsg, moves, mvIdx, doneRuns, practiceRuns, lines, theme, onThemeChange, onLearn, onPractice }: Props) {
  const modeBtn = (active: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    width: '100%', padding: '9px 11px', borderRadius: 8,
    border: active ? '1px solid var(--purple)' : '1px solid var(--border)',
    background: active ? 'rgba(124,58,237,.1)' : '#111',
    color: active ? 'var(--purple-light)' : 'var(--text)',
    cursor: 'pointer', fontSize: '.83rem', fontWeight: 500, textAlign: 'left',
  });

  return (
    <aside style={{ width: 270, flexShrink: 0, borderLeft: '1px solid var(--border)', background: 'var(--card-bg)', display: 'flex', flexDirection: 'column', padding: '16px 13px', gap: 13, overflowY: 'auto' }}>
      <div>
        <div style={{ fontSize: '.67rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.09em' }}>
          {freePlayMode ? 'Free Play' : mode === 'learn' ? 'Learn' : 'Practice'}
        </div>
        <div style={{ fontSize: '.98rem', fontWeight: 700, marginTop: 1 }}>{name}</div>
      </div>

      <CoachBox msg={coachMsg} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <button style={modeBtn(mode === 'learn' && !freePlayMode)} onClick={onLearn}>
          <span>📖 Learn</span>
          <span style={{ fontSize: '.67rem', color: mode === 'learn' ? '#a78bfa' : 'var(--muted)' }}>{doneRuns} / {lines} discovered</span>
        </button>
        <button style={modeBtn(mode === 'practice' && !freePlayMode)} onClick={onPractice}>
          <span>🧠 Practice</span>
          <span style={{ fontSize: '.67rem', color: mode === 'practice' ? '#a78bfa' : 'var(--muted)' }}>{practiceRuns} perfected</span>
        </button>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

      <MoveSequence moves={moves} mvIdx={mvIdx} hidden={mode === 'practice' && !freePlayMode} />

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

      <ProgressDots total={lines} done={doneRuns} />

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

      <ThemePicker theme={theme} onChange={onThemeChange} />

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

      {[['🎯 Drill', '🔒'], ['⏱ Timed', '🔒'], ['🧩 Puzzles', '🔒'], ['🏟 Arena', '🔒']].map(([label, icon]) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 11px', borderRadius: 7, border: '1px solid #1e1e1e', background: '#0f0f0f', color: '#383838', fontSize: '.78rem' }}>
          <span>{label}</span><span>{icon}</span>
        </div>
      ))}
    </aside>
  );
}
