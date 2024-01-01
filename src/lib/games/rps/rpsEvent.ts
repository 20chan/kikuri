import { RPSHand } from './rpsHand';

export interface StartEvent {
  type: 'start';
}

export interface PickEvent {
  type: 'pick';
  payload: {
    hand: RPSHand;
  }
}

export type RPSEvent = (
  | StartEvent
)