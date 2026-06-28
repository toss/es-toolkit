import { IterateeShorthand } from './IterateeShorthand';
import { ListIterator } from './ListIterator.ts';

export type ListIterateeCustom<T, R> = ListIterator<T, R> | IterateeShorthand<T>;
