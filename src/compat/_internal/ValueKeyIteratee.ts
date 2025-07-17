import { IterateeShorthand } from './IterateeShorthand.ts';

export type ValueKeyIteratee<T> = ((value: T, key: string) => unknown) | IterateeShorthand<T>;
