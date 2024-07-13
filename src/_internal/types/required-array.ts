export type RequiredArray<T> = {
  [K in keyof T]-?: Exclude<T[K], undefined>;
};
