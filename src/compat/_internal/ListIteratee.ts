import { PartialShallow } from './PartialShallow.ts';

export type ListIteratee<T> =
  | ((value: T, index: number, collection: ArrayLike<T>) => unknown)
  | (PropertyKey | [PropertyKey, any] | PartialShallow<T>);
