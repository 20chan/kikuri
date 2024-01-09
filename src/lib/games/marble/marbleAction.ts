export interface StartAction {
  type: 'start';
}

export interface RollAction {
  type: 'roll';
}

export interface BuyAction {
  type: 'buy';
}

export interface TakeOverAction {
  type: 'takeOver';
}

export interface PayAction {
  type: 'pay';
}

export interface CellAction {
  type: 'cell';
  position: number;
}

export interface NextAction {
  type: 'next';
}

export type MarbleAction = (
  | StartAction
  | RollAction
  | BuyAction
  | TakeOverAction
  | PayAction
  | CellAction
  | NextAction
) & {
  card?: number;
};
