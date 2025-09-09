import { PartialShallow } from './PartialShallow.ts';

export type IterateeShorthand<T> = PropertyKey | [PropertyKey, any] | PartialShallow<T>;
