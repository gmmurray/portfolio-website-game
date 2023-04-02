import { RootState } from '../redux/store';

export type StateSelector<T> = (state: RootState) => T;
export type ParameterizedStateSelector<T, P> = (
  state: RootState,
  params: P,
) => T;
