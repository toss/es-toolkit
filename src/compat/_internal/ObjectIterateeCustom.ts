import type { IterateeShorthand } from './IterateeShorthand';
import type { ObjectIterator } from './ObjectIterator';

export type ObjectIterateeCustom<TObject, TResult> =
  | ObjectIterator<TObject, TResult>
  | IterateeShorthand<TObject[keyof TObject]>;
