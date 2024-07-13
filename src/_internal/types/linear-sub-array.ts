/* eslint-disable @typescript-eslint/no-unused-vars */

import { Last } from './last';
import { OptionalSince } from './optional-since';
import { RequiredArray } from './required-array';

export type LinearSubArray<
  A extends any[],
  Origin extends any[] = A,
  OptionalStartIdx extends number = -1,
  Result extends any[] = [],
> =
  RequiredArray<A> extends [infer _Head, ...infer Rest]
    ? LinearSubArray<
        Rest,
        Origin,
        OptionalStartIdx extends -1
          ? undefined extends Origin[Result['length']]
            ? Result['length']
            : -1
          : OptionalStartIdx,
        [...Result, [...(Result['length'] extends 0 ? [] : Last<Result>), A[0]]]
      >
    : OptionalSince<Result[number], OptionalStartIdx>;
