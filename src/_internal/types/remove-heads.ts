/* eslint-disable @typescript-eslint/no-unused-vars */
import { LiteralToPrimitive } from './literal-to-primitive';
import { RemoveHead } from './remove-head';
import { RequiredArray } from './required-array';

export type RemoveHeads<T extends any[], H extends any[]> =
  RequiredArray<T> extends [infer Head extends LiteralToPrimitive<H[0]>, ...infer Rest extends any[]]
    ? RemoveHeads<RemoveHead<T>, RemoveHead<H>>
    : T;
