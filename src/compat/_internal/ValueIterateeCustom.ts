import { IterateeShorthand } from './IterateeShorthand';

export type ValueIterateeCustom<T, TResult> = ((value: T) => TResult) | IterateeShorthand<T>;
