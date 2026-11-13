import type { IterateeShorthand } from './IterateeShorthand';
import type { ListIterator } from './ListIterator.ts';

export type ListIterateeCustom<T, R> = ListIterator<T, R> | IterateeShorthand<T>;
