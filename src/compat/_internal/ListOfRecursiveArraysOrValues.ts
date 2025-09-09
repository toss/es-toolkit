import { RecursiveArray } from './RecursiveArray.ts';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListOfRecursiveArraysOrValues<T> extends ArrayLike<T | RecursiveArray<T>> {}
