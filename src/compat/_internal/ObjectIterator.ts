export type ObjectIterator<T, R> = (value: T[keyof T], key: string, collection: T) => R;
