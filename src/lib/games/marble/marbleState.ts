import { board, cards, startMoney } from './marbleRule';

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

export namespace MarbleState {
  export function create(playerCount: number): MarbleState {
    const pids = [...Array(playerCount)].map((_, i) => i);

    const players = pids.map(pid => ({
      alive: true,
      position: pid,
      money: startMoney,
      cards: [],
    }));

    const cells = [...new Array(32)].map((_, i) => {
      const cellInfo = board[i % 4][Math.floor(i / 4)];
      if (cellInfo.type === 'city') {
        return {
          owner: null,
          buildings: cellInfo.fees.map(() => false),
        };
      }
      return {
        owner: null,
        buildings: [],
      };
    });

    return {
      playerCount,

      phase: 'wait',
      turn: 0,
      dices: [0, 0],

      needToPay: 0,
      needToMove: false,
      needToTravel: false,

      players,

      cards: cards.map((_, i) => i),
      cells,
      fund: 0,
    };
  }
}