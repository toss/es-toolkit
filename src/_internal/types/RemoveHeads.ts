/* eslint-disable @typescript-eslint/no-unused-vars */
import { LiteralToPrimitive } from './LiteralToPrimitive';
import { RemoveHead } from './RemoveHead';
import { RequiredArray } from './RequiredArray';

export type RemoveHeads<T extends any[], H extends any[]> =
  RequiredArray<T> extends [infer Head extends LiteralToPrimitive<H[0]>, ...infer Rest extends any[]]
    ? RemoveHeads<RemoveHead<T>, RemoveHead<H>>
    : T;
