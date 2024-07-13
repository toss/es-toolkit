import { RequiredArray } from './required-array';
import { LiteralToPrimitive } from './literal-to-primitive';
import { RemoveHead } from './remove-head';
import { OptionalSince } from './optional-since';
import { Minus } from './minus';

export type RemoveHeads<
  T extends any[],
  H extends any[],
  Origin extends any[] = T,
  OptionalStartIdx extends number = -1,
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
        OptionalStartIdx extends -1
          ? undefined extends Origin[Deleted['length']]
            ? Deleted['length']
            : -1
          : OptionalStartIdx,
        [...Deleted, H[0]]
      >
    : OptionalStartIdx extends -1
      ? T
      : Minus<OptionalStartIdx, Deleted['length']> extends never
        ? OptionalSince<T, 0>
        : OptionalSince<T, Minus<OptionalStartIdx, Deleted['length']>>;
