export type OptionalSince<T, OptionalStartIdx extends number, Result extends any[] = []> = T extends [
  infer Head,
  ...infer Rest extends any[],
]
  ? Result['length'] extends OptionalStartIdx
    ? OptionalSince<Rest, -2, [...Result, Head | undefined]>
    : OptionalStartIdx extends -2
      ? OptionalSince<Rest, -2, [...Result, Head | undefined]>
      : OptionalSince<Rest, OptionalStartIdx, [...Result, Head]>
  : Result;
