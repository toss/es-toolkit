import { RequiredArray } from './required-array';
import { LiteralToPrimitive } from './literal-to-primitive';
import { RemoveHead } from './remove-head';
import { OptionalSince } from './optional-since';
import { Minus } from './minus';

export type RemoveHeads<
  T extends any[],
  H extends any[],
  Origin extends any[] = T,
  StartOfOptional extends number = -1,
  Deleted extends any[] = [],
> =
  RequiredArray<T> extends [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    infer _ extends LiteralToPrimitive<H[0]>,
    ...infer Rest extends any[],
  ]
    ? RemoveHeads<
        undefined extends T[0] ? Rest : RemoveHead<T>,
        RemoveHead<H>,
        Origin,
        StartOfOptional extends -1
          ? undefined extends Origin[Deleted['length']]
            ? Deleted['length']
            : -1
          : StartOfOptional,
        [...Deleted, H[0]]
      >
    : StartOfOptional extends -1
      ? T
      : Minus<StartOfOptional, Deleted['length']> extends never
        ? OptionalSince<T, 0>
        : OptionalSince<T, Minus<StartOfOptional, Deleted['length']>>;
