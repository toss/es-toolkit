import { PartialShallow } from './PartialShallow';

export type ListIterateeCustom<T, R> =
  | ((value: T, index: number, collection: ArrayLike<T>) => R)
  | (PropertyKey | [PropertyKey, any] | PartialShallow<T>);
