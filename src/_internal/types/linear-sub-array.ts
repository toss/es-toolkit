import { Last } from './last';
import { RequiredArray } from './required-array';

export type LinearSubArray<A extends any[], Result extends any[] = []> =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  RequiredArray<A> extends [infer _, ...infer Rest extends any[]]
    ? LinearSubArray<Rest, [...Result, [...(Result['length'] extends 0 ? [] : Last<Result>), A[0]]]>
    : Result[number];
