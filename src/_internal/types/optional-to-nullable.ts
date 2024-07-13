import { RequiredArray } from './required-array';

type OptionalToNullableTranslator<A extends any[], B extends any[], Result extends any[] = []> = B extends [
  infer Head,
  ...infer Rest,
]
  ? A[Result['length']] extends B[0]
    ? OptionalToNullableTranslator<A, Rest, [...Result, Head]>
    : OptionalToNullableTranslator<A, Rest, [...Result, Head | undefined]>
  : Result;

export type OptionalToNullable<T extends any[]> = OptionalToNullableTranslator<T, RequiredArray<T>>;
