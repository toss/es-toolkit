export type RemoveRest<T, Result extends any[] = []> = T extends [infer Head, ...infer Rest]
  ? RemoveRest<Rest, [...Result, Head]>
  : Result;
