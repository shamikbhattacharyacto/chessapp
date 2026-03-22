import type { Opening } from './types';

export const OPENINGS: Opening[] = [
  // ── WHITE OPENINGS (16) ──────────────────────────────────────────────
  {
    id: 'fried-liver', name: 'Fried Liver Attack', color: 'white', tag: '⚔️ Gambit', accent: '#ef4444', lines: 15,
    desc: 'White sacrifices a knight on f7 to violently expose the Black king.',
    moves: ['e4','e5','Nf3','Nc6','Bc4','Nf6','Ng5','d5','exd5','Nxd5','Nxf7','Kxf7','Qf3+','Ke6','Nc3'],
  },
  {
    id: 'kings-gambit', name: "King's Gambit", color: 'white', tag: '⚔️ Gambit', accent: '#f97316', lines: 15,
    desc: 'White offers the f-pawn for rapid development and a fierce kingside attack.',
    moves: ['e4','e5','f4','exf4','Nf3','g5','h4','g4','Ne5','d6','Nxg4','Nf6','Nxf6+','Qxf6','Nc3'],
  },
  {
    id: 'danish-gambit', name: 'Danish Gambit', color: 'white', tag: '⚔️ Gambit', accent: '#eab308', lines: 15,
    desc: 'White sacrifices two pawns for a devastating bishop battery and open files.',
    moves: ['e4','e5','d4','exd4','c3','dxc3','Bc4','cxb2','Bxb2','d5','Bxd5','Nf6','Bxf7+','Kxf7','Qb3+'],
  },
  {
    id: 'queens-gambit-accepted', name: "Queen's Gambit Accepted", color: 'white', tag: '📖 Classical', accent: '#22c55e', lines: 15,
    desc: 'Black accepts the c4 pawn, and White seizes the center with rapid piece development.',
    moves: ['d4','d5','c4','dxc4','Nf3','Nf6','e3','e6','Bxc4','c5','O-O','a6','Qe2','b5','Bb3'],
  },
  {
    id: 'queens-gambit-declined', name: "Queen's Gambit Declined", color: 'white', tag: '📖 Classical', accent: '#3b82f6', lines: 15,
    desc: 'Black builds a classical central fortress — a rich positional struggle follows.',
    moves: ['d4','d5','c4','e6','Nc3','Nf6','Bg5','Be7','e3','O-O','Nf3','Nbd7','Rc1','c6','Bd3'],
  },
  {
    id: 'london', name: 'London System', color: 'white', tag: '👑 Positional', accent: '#8b5cf6', lines: 15,
    desc: 'A solid system-based opening — deploy your pieces to ideal squares every game.',
    moves: ['d4','d5','Nf3','Nf6','Bf4','e6','e3','Bd6','Bg3','O-O','Bd3','Nbd7','Nbd2','c5','c3'],
  },
  {
    id: 'ruy-lopez', name: 'Ruy Lopez', color: 'white', tag: '👑 Positional', accent: '#14b8a6', lines: 15,
    desc: "The ancient 'Spanish Torture' — immediately pressuring Black's e5 pawn for a long strategic fight.",
    moves: ['e4','e5','Nf3','Nc6','Bb5','a6','Ba4','Nf6','O-O','Be7','Re1','b5','Bb3','d6','c3'],
  },
  {
    id: 'vienna-gambit', name: 'Vienna Gambit', color: 'white', tag: '⚔️ Gambit', accent: '#f43f5e', lines: 15,
    desc: 'White combines the Vienna with an f4 gambit pawn for wild attacking chess.',
    moves: ['e4','e5','Nc3','Nc6','f4','exf4','Nf3','g5','h4','g4','Ng5','h6','Nxf7','Kxf7','d4'],
  },
  {
    id: 'italian', name: 'Italian Game', color: 'white', tag: '📖 Classical', accent: '#ec4899', lines: 15,
    desc: 'Classical piece development with Bc4 — the foundation of the Giuoco Piano.',
    moves: ['e4','e5','Nf3','Nc6','Bc4','Bc5','c3','Nf6','d4','exd4','cxd4','Bb4+','Nc3','Nxe4','O-O'],
  },
  {
    id: 'scotch', name: 'Scotch Game', color: 'white', tag: '⚡ Dynamic', accent: '#f59e0b', lines: 15,
    desc: 'White immediately challenges the center with d4 for a direct, open battle.',
    moves: ['e4','e5','Nf3','Nc6','d4','exd4','Nxd4','Nf6','Nxc6','bxc6','e5','Qe7','Qe2','Nd5','c4'],
  },
  {
    id: 'vienna-game', name: 'Vienna Game', color: 'white', tag: '⚡ Dynamic', accent: '#a78bfa', lines: 15,
    desc: 'White plays Nc3 before Nf3 — flexible and tricky, setting up the fork on f7.',
    moves: ['e4','e5','Nc3','Nf6','Bc4','Nxe4','Qh5','Nd6','Bb3','Nc6','Nb5','g6','Qf3','f5','Qd5'],
  },
  {
    id: 'ponziani', name: 'Ponziani Opening', color: 'white', tag: '⚡ Dynamic', accent: '#0ea5e9', lines: 15,
    desc: 'A rare but venomous c3 opening — White launches a prepared d4 break with sharp consequences.',
    moves: ['e4','e5','Nf3','Nc6','c3','Nf6','d4','exd4','e5','Ne4','Bd3','Nxc3','bxc3','d5','exd6'],
  },
  {
    id: 'alapin', name: 'Alapin Sicilian', color: 'white', tag: '👑 Positional', accent: '#06b6d4', lines: 15,
    desc: 'White sidesteps Sicilian theory with c3, aiming for a strong pawn center.',
    moves: ['e4','c5','c3','Nf6','e5','Nd5','d4','cxd4','cxd4','d6','Nf3','Nc6','Bc4','Nb6','Bb3'],
  },
  {
    id: 'english', name: 'English Opening', color: 'white', tag: '👑 Positional', accent: '#84cc16', lines: 15,
    desc: 'A hypermodern opening — control the center with pieces, then strike with pawns.',
    moves: ['c4','e5','Nc3','Nf6','g3','d5','cxd5','Nxd5','Bg2','Nb6','Nf3','Nc6','O-O','Be7','d3'],
  },
  {
    id: 'bishops-opening', name: "Bishop's Opening", color: 'white', tag: '📖 Classical', accent: '#fb7185', lines: 15,
    desc: 'White deploys Bc4 early for flexible, attacking chess without committing the knight.',
    moves: ['e4','e5','Bc4','Nf6','d3','Nc6','Nf3','Bc5','O-O','d6','c3','a6','Bb3','Ba7','Nbd2'],
  },
  {
    id: 'three-knights', name: 'Three Knights Game', color: 'white', tag: '⚡ Dynamic', accent: '#34d399', lines: 15,
    desc: 'White develops naturally with two knights before committing to a pawn structure.',
    moves: ['e4','e5','Nf3','Nc6','Nc3','g6','d4','exd4','Nxd4','Bg7','Be3','Nge7','Bc4','O-O','Bb3'],
  },

  // ── BLACK OPENINGS (12) ──────────────────────────────────────────────
  {
    id: 'caro-kann', name: 'Caro-Kann Defense', color: 'black', tag: '🛡️ Solid', accent: '#6366f1', lines: 15,
    desc: 'Black builds a rock-solid pawn structure with c6 and d5, planning active counterplay.',
    moves: ['e4','c6','d4','d5','Nc3','dxe4','Nxe4','Bf5','Ng3','Bg6','h4','h6','Nf3','Nd7','h5'],
  },
  {
    id: 'kings-indian', name: "King's Indian Defense", color: 'black', tag: '⚡ Dynamic', accent: '#7c3aed', lines: 15,
    desc: 'Black allows White a big center, then dynamically attacks it from the kingside.',
    moves: ['d4','Nf6','c4','g6','Nc3','Bg7','e4','d6','Nf3','O-O','Be2','e5','O-O','Nc6','d5'],
  },
  {
    id: 'sicilian', name: 'Sicilian Defense (Najdorf)', color: 'black', tag: '⚡ Dynamic', accent: '#a855f7', lines: 15,
    desc: 'The sharpest defense — Black fights for the initiative with asymmetric counterplay from move one.',
    moves: ['e4','c5','Nf3','d6','d4','cxd4','Nxd4','Nf6','Nc3','a6','Be3','e5','Nb3','Be6','f3'],
  },
  {
    id: 'albin', name: 'Albin Countergambit', color: 'black', tag: '⚔️ Gambit', accent: '#d97706', lines: 15,
    desc: 'Black sacrifices a pawn to create an aggressive passed d-pawn and wild complications.',
    moves: ['d4','d5','c4','e5','dxe5','d4','Nf3','Nc6','g3','Bg4','Bg2','Qd7','O-O','O-O-O','Nbd2'],
  },
  {
    id: 'traxler', name: 'Traxler Counterattack', color: 'black', tag: '⚔️ Gambit', accent: '#dc2626', lines: 15,
    desc: "Don't defend f7 — counterattack with Bc5 and lead White into a tactical minefield.",
    moves: ['e4','e5','Nf3','Nc6','Bc4','Nf6','Ng5','Bc5','Nxf7','Bxf2+','Ke2','Nd4+','Kd3','b5','Bb3'],
  },
  {
    id: 'rousseau', name: 'Rousseau Gambit', color: 'black', tag: '⚔️ Gambit', accent: '#059669', lines: 15,
    desc: 'Black plays an early f5 to seize kingside space and launch an immediate attack.',
    moves: ['e4','e5','Nf3','Nc6','Bc4','f5','d3','Nf6','Nc3','Bc5','O-O','d6','Ng5','Na5','Bb3'],
  },
  {
    id: 'scandinavian', name: 'Scandinavian Gambit', color: 'black', tag: '⚔️ Gambit', accent: '#0284c7', lines: 15,
    desc: 'Black gambits a pawn after 1...d5 2...Nf6 for rapid development and central pressure.',
    moves: ['e4','d5','exd5','Nf6','c4','e6','dxe6','Bxe6','Nf3','Nc6','Be2','Bc5','O-O','O-O','Nc3'],
  },
  {
    id: 'stafford', name: 'Stafford Gambit', color: 'black', tag: '⚔️ Gambit', accent: '#b91c1c', lines: 15,
    desc: 'An unorthodox gambit setting deadly traps — Black sacrifices a piece to attack the king.',
    moves: ['e4','e5','Nf3','Nf6','Nxe5','Nc6','Nxc6','dxc6','d3','Bc5','h3','Ng4','hxg4','Bxf2+','Ke2'],
  },
  {
    id: 'englund', name: 'Englund Gambit', color: 'black', tag: '⚔️ Gambit', accent: '#b45309', lines: 15,
    desc: "Black's surprising e5 gambit disrupts White's d4 plans from the very first move.",
    moves: ['d4','e5','dxe5','Nc6','Nf3','Qe7','Qd5','f6','exf6','Nxf6','g3','Bc5','Bg2','d5','O-O'],
  },
  {
    id: 'french', name: 'French Defense', color: 'black', tag: '🛡️ Solid', accent: '#0891b2', lines: 15,
    desc: 'A solid, strategic defense — Black counterattacks in the center after careful preparation.',
    moves: ['e4','e6','d4','d5','Nc3','Nf6','Bg5','Be7','e5','Nfd7','Bxe7','Qxe7','f4','O-O','Nf3'],
  },
  {
    id: 'petrov', name: 'Petrov Defense', color: 'black', tag: '🛡️ Solid', accent: '#4f46e5', lines: 15,
    desc: "Black mirrors White's knight — a principled defense that leads to symmetrical but fighting positions.",
    moves: ['e4','e5','Nf3','Nf6','Nxe5','d6','Nf3','Nxe4','d4','d5','Bd3','Nc6','O-O','Be7','Re1'],
  },
  {
    id: 'counter-vienna', name: 'Counter the Vienna Gambit', color: 'black', tag: '⚡ Dynamic', accent: '#7c3aed', lines: 15,
    desc: 'Black meets the Vienna Gambit with d5 — seizing the initiative and fighting for equality.',
    moves: ['e4','e5','Nc3','Nf6','f4','d5','fxe5','Nxe4','Nf3','Bc5','d4','Nxc3','bxc3','Bb6','Bd3'],
  },
];
