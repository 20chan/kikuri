import { RPSHand } from './rpsHand';

export interface StartAction {
  type: 'start';
}

export interface PickAction {
  type: 'pick';
  payload: {
    hand: RPSHand;
  }
}

export interface NextAction {
  type: 'next';
}

export type RPSAction = (
  | StartAction
  | PickAction
  | NextAction
);