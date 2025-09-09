import { IterateeShorthand } from './IterateeShorthand.ts';

export type ValueIterateeCustom<T, TResult> = ((value: T) => TResult) | IterateeShorthand<T>;
