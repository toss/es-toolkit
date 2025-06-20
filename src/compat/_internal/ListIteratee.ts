import { PartialShallow } from './PartialShallow';

export type ListIteratee<T> =
  | ((value: T, index: number, collection: ArrayLike<T>) => unknown)
  | (PropertyKey | [PropertyKey, any] | PartialShallow<T>);

export type ListIterateeCustom<T, R> =
  | ((value: T, index: number, collection: ArrayLike<T>) => R)
  | (PropertyKey | [PropertyKey, any] | PartialShallow<T>);
