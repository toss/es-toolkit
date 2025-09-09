export type ValueKeyIterateeTypeGuard<T, S extends T> = (value: T, key: string) => value is S;
