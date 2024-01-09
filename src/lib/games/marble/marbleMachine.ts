import * as R from 'remeda';
import { Machine, TransitResult } from '../machine';
import { MarbleAction } from './marbleAction';
import { MarbleCell, board, cards, salary } from './marbleRule';
import { MarbleCellState, MarbleState } from './marbleState';

export class MarbleMachine {
  public transit(curr: MarbleState, pid: number, action: MarbleAction): TransitResult<MarbleState> {
    const {
      phase,
      turn,
      dices,
      players,
      cards,
      cells,
    } = curr;

    if (phase === 'wait') {
      if (action.type !== 'roll') {
        return {
          ok: false,
          error: 'only roll allowed',
        };
      }

      if (pid !== turn) {
        return {
          ok: false,
          error: 'not your turn',
        };
      }

      const [dice1, dice2] = this.dice();
      const diceSum = dice1 + dice2;

      return {
        ok: true,
        next: this.moveInner({
          ...curr,
          dices: [dice1, dice2],
        }, pid),
      }
    } else if (phase === 'rolled') {
    }

    return {
      ok: false,
      error: 'not implemented',
    };
  }

  moveInner(curr: MarbleState, pid: number): MarbleState {
    const {
      turn,
      players,
      cells,
    } = curr;

    const player = players[pid];
    const nextPosition = (player.position + curr.dices[0] + curr.dices[1]) % cells.length;

    if (nextPosition < player.position) {
      player.money += salary;
    }

    const nextPlayers = [...players];
    nextPlayers[pid].position = nextPosition;

    const nextState: MarbleState = {
      ...curr,
      phase: 'rolled',
      needToPay: 0,
      needToMove: false,
      needToTravel: false,
    };

    const nextTurnShouldBe = (turn + 1) % players.length;

    const cell = cells[nextPosition];
    const cellInfo = this.getCell(nextPosition);
    if (cellInfo.type === 'city') {
      if (cell.owner !== null && cell.owner !== pid) {
        const fee = this.getCellFee(cell, cellInfo);
        nextState.needToPay += fee;
      }
    } else if (cellInfo.type === 'space') {
      nextState.needToTravel = true;
    } else if (cellInfo.type === 'tax') {
      nextState.needToPay += cellInfo.fee;
    } else if (cellInfo.type === 'start') {
      nextState.phase = 'wait';
      nextState.turn = nextTurnShouldBe;
    } else if (cellInfo.type === 'fund') {
      nextState.phase = 'wait';
      nextPlayers[pid].money += nextState.fund;
      nextState.fund = 0;
      nextState.turn = nextTurnShouldBe;
    } else if (cellInfo.type === 'card') {
      return this.popCard(nextState, pid);
    } else if (cellInfo.type === 'island') {
      nextState.phase = 'wait';
      nextPlayers[pid].money += nextState.fund;
    }

    return {
      ...nextState,
      players: nextPlayers,
    };
  }

  popCard(curr: MarbleState, pid: number): MarbleState {
    if (curr.cards.length === 0) {
      return curr;
    }

    const nextState = { ...curr };

    const cardIndex = Math.floor(Math.random() * nextState.cards.length);
    const card = nextState.cards.splice(cardIndex, 1)[0];
    nextState.players[pid].cards.push(card);

    const cardInfo = cards[card];
    // todo: handle card
    return nextState;
  }

  dice(): [number, number] {
    return [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
  }

  getCell(position: number): MarbleCell {
    const y = position % 8;
    const x = Math.floor(position / 8);

    return board[y][x];
  }

  getCellFee(cell: MarbleCellState, cellInfo: MarbleCell): number {
    if (cellInfo.type === 'city') {
      const fee = R.sumBy(cell.buildings.map((b, i) => b ? cellInfo.fees[i] : 0), x => x);
      return fee;
    } else {
      return 0;
    }
  }
}