import { PartialShallow } from './PartialShallow.ts';

export type ValueIteratee<T> = ((value: T) => unknown) | (PropertyKey | [PropertyKey, any] | PartialShallow<T>);
