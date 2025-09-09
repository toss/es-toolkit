import { IterateeShorthand } from './IterateeShorthand.ts';
import { ObjectIterator } from './ObjectIterator.ts';

export type ObjectIteratee<TObject> = ObjectIterator<TObject, unknown> | IterateeShorthand<TObject[keyof TObject]>;

export type ObjectIterateeCustom<TObject, TResult> =
  | ObjectIterator<TObject, TResult>
  | IterateeShorthand<TObject[keyof TObject]>;
