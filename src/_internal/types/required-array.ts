export type RequiredArray<T> = {
  [K in keyof T]-?: T[K];
};
