export type MemoObjectIterator<T, R, A> = (prev: R, curr: T, key: string, list: A) => R;
