import { IterateeShorthand } from './IterateeShorthand';
import { ObjectIterator } from './ObjectIterator';

export type ObjectIterateeCustom<TObject, TResult> =
  | ObjectIterator<TObject, TResult>
  | IterateeShorthand<TObject[keyof TObject]>;
