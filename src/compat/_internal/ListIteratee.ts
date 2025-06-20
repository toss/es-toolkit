import { PartialShallow } from './PartialShallow';

export type ListIteratee<T> =
  | ((value: T, index: number, collection: ArrayLike<T>) => unknown)
  | (PropertyKey | [PropertyKey, any] | PartialShallow<T>);

export type ListIterateeCustom<T, R> =
  | ((value: T, index: number, collection: ArrayLike<T>) => R)
  | (PropertyKey | [PropertyKey, any] | PartialShallow<T>);

export type ListIteratorTypeGuard<T, S extends T> = (value: T, index: number, collection: ArrayLike<T>) => value is S;
