// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> {}
