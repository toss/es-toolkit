import { Last } from "./last";

export type LinearSubArray<
  A extends any[], 
  Result extends any[] = []
> = A extends [infer Head, ...infer Rest extends any[]] 
  ? LinearSubArray<Rest, [...Result, [...(Result['length'] extends 0 ? [] : Last<Result>), Head]]> 
  : Result[number];