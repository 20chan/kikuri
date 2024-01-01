export type RPSHand = 'r' | 'p' | 's';

export namespace RPSHand {
  export function compare(a: RPSHand, b: RPSHand): number {
    if (a === b) {
      return -1;
    }
    if (a === 'r') {
      return b === 's' ? 0 : 1;
    }
    if (a === 'p') {
      return b === 'r' ? 0 : 1;
    }
    if (a === 's') {
      return b === 'p' ? 0 : 1;
    }
    throw new Error(`Invalid hand: ${a}`);
  }
}