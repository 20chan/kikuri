export interface Machine<TState, TAction> {
  transit(curr: TState, pid: number, action: TAction): TransitResult<TState>;
};

export type TransitSuccess<TState> = {
  ok: true,
  next: TState,
};

export type TransitError<TState> = {
  ok: false,
  error: string,
};

export type TransitResult<TState> = (
  | TransitSuccess<TState>
  | TransitError<TState>
);