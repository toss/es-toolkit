import { PartialShallow } from './PartialShallow';

export type ValueIteratee<T> = ((value: T) => unknown) | (PropertyKey | [PropertyKey, any] | PartialShallow<T>);
