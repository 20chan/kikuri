export type MarblePhase = (
  | 'wait'
  | 'rolled'
  | 'finished'
)

export interface MarblePlayerState {
  alive: boolean;
  position: number;
  money: number;
  cards: number[];
}

export interface MarbleCellState {
  owner: number | null;
  buildings: boolean[];
}

export interface MarbleState {
  playerCount: number;

  phase: MarblePhase;
  turn: number;
  dices: [number, number];

  needToPay: number;
  needToMove: boolean;
  needToTravel: boolean;

  players: MarblePlayerState[];

  cards: number[];
  cells: MarbleCellState[];
  fund: number;
}