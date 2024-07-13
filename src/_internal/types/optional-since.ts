export type OptionalSince<T, OptionalStart extends number, Result extends any[] = []> = T extends [
  infer Head,
  ...infer Rest extends any[],
]
  ? Result['length'] extends OptionalStart
    ? OptionalSince<Rest, -2, [...Result, Head | undefined]>
    : OptionalStart extends -2
      ? OptionalSince<Rest, -2, [...Result, Head | undefined]>
      : OptionalSince<Rest, OptionalStart, [...Result, Head]>
  : Result;
