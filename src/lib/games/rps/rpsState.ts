import { RPSHand } from './rpsHand';

export type RPSPhase = (
  | 'wait'
  | 'pick'
  | 'result'
  | 'end'
)

export interface RPSState {
  phase: RPSPhase;
  score: [number, number];
  winners: number[];
  hands: [RPSHand | null, RPSHand | null];
}

export namespace RPSState {
  export function create(): RPSState {
    return {
      phase: 'wait',
      score: [0, 0],
      winners: [],
      hands: [null, null],
    };
  }
}