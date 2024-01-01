export interface Machine<TState, TAction, TEvent> {
  transit(curr: TState, pid: number, action: TAction): TransitResult<TState, TEvent>;
};

export type TransitSuccess<TState, TEvent> = {
  ok: true,
  next: TState,
  events: TEvent[],
};

export type TransitError<TState, TEvent> = {
  ok: false,
  error: string,
};

export type TransitResult<TState, TEvent> = (
  | TransitSuccess<TState, TEvent>
  | TransitError<TState, TEvent>
);