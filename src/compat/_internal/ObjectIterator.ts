export type ObjectIterator<T, R> = (value: T[keyof T], key: string, collection: T) => R;
export type ObjectIteratorTypeGuard<T, U extends T[keyof T]> = (
  value: T[keyof T],
  key: string,
  collection: T
) => value is U;
