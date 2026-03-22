export type GameMode = 'learn' | 'practice';
export type BoardTheme = 'wood' | 'classic' | 'glass' | 'marble';
export type FeedbackType = 'success' | 'error' | 'info' | 'empty';
export type OpeningColor = 'white' | 'black';

export interface Opening {
  id: string;
  name: string;
  desc: string;
  lines: number;
  moves: string[];
  color: OpeningColor;
  tag: string;
  accent: string;
}

export interface HistoryEntry {
  fen: string;
  mvIdx: number;
  lastMv: { from: string; to: string } | null;
  lineOver: boolean;
}
