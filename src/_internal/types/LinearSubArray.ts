/* eslint-disable @typescript-eslint/no-unused-vars */

import { Last } from './Last';
import { OptionalToNullable } from './OptionalToNullable';

export type LinearSubArray<A extends any[], Result extends any[] = []> =
  OptionalToNullable<A> extends [infer Head, ...infer Rest]
    ? LinearSubArray<Rest, [...Result, [...(Result['length'] extends 0 ? [] : Last<Result>), Head]]>
    : Result[number];
