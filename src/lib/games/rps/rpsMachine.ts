import { TransitResult, Machine } from '../machine';
import { RPSAction } from './rpsAction';
import { RPSEvent } from './rpsEvent';
import { RPSHand } from './rpsHand';
import { RPSState } from './rpsState';

export class RPSMachine implements Machine<RPSState, RPSAction, RPSEvent> {
  public transit(curr: RPSState, pid: number, action: RPSAction): TransitResult<RPSState, RPSEvent> {
    const { phase } = curr;

    if (phase === 'wait') {
      if (action.type === 'start') {
        if (pid === 0) {
          return {
            ok: true,
            next: {
              ...curr,
              phase: 'pick',
            },
            events: [],
          };
        } else {
          return {
            ok: false,
            error: 'You are not the host',
          }
        }
      } else {
        return {
          ok: false,
          error: 'Game has not started',
        }
      }
    } else if (phase === 'pick') {
      if (action.type !== 'pick') {
        return {
          ok: false,
          error: 'only pick allowed',
        }
      }
      const { hand } = action.payload;

      if (curr.hands[pid] !== null) {
        return {
          ok: false,
          error: 'You have already picked',
        }
      }

      const hands: typeof curr.hands = [...curr.hands];
      hands[pid] = hand;

      if (hands[0] !== null && hands[1] !== null) {
        const winner = RPSHand.compare(hands[0], hands[1]);
        const score: typeof curr.score = [...curr.score];
        if (winner !== -1) {
          score[winner] += 1;
        }
        const winners = [...curr.winners, winner];

        return {
          ok: true,
          next: {
            ...curr,
            phase: 'result',
            score,
            winners,
            hands,
          },
          events: [],
        }
      }

      return {
        ok: true,
        next: {
          ...curr,
          hands,
        },
        events: [],
      };
    } else if (phase === 'result') {
      if (action.type === 'next') {
        if (curr.score[0] >= 3 || curr.score[1] >= 3) {
          return {
            ok: true,
            next: {
              ...curr,
              phase: 'end',
            },
            events: [],
          };
        }

        return {
          ok: true,
          next: {
            ...curr,
            phase: 'pick',
            hands: [null, null],
          },
          events: [],
        };
      } else {
        return {
          ok: false,
          error: 'only next allowed',
        }
      }
    } else if (phase === 'end') {
      return {
        ok: false,
        error: 'Game has ended',
      }
    }

    return {
      ok: true,
      next: curr,
      events: [],
    };
  }
};