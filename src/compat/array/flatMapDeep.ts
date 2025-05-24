import { flatMapDepth } from './flatMapDepth.ts';

type RecursiveArray<T> = Array<T | RecursiveArray<T>>;

/**
 * Recursively maps each element in an array and then deeply flattens the resulting array.
 *
 * @template T - The type of elements within the array.
 * @param {Record<string, ArrayLike<T | RecursiveArray<T>> | T> | Record<number, ArrayLike<T | RecursiveArray<T>> | T> | null | undefined} collection - The array or object to iterate over.
 * @returns {T[]} A new array that has been deeply flattened.
 *
 * @example
 * const result = flatMapDeep([[1, 2], [3, 4]]);
 * // [1, 2, 3, 4]
 */
export function flatMapDeep<T>(
  collection:
    | Record<string, ArrayLike<T | RecursiveArray<T>> | T>
    | Record<number, ArrayLike<T | RecursiveArray<T>> | T>
    | null
    | undefined
): T[];

/**
 * Recursively maps each element in an array using a provided iteratee function and then deeply flattens the resulting array.
 *
 * @template T - The type of elements within the array.
 * @template R - The type of elements within the returned array from the iteratee function.
 * @param {ArrayLike<T> | null | undefined} array - The array to iterate over.
 * @param {(value: T, index: number, array: ArrayLike<T>) => ArrayLike<R | RecursiveArray<R>> | R} iteratee - The function that produces the new array elements.
 * @returns {R[]} A new array that has been deeply flattened.
 *
 * @example
 * const result = flatMapDeep([1, 2, 3], n => [n, n]);
 * // [1, 1, 2, 2, 3, 3]
 */
export function flatMapDeep<T, R>(
  array: ArrayLike<T> | null | undefined,
  iteratee?: (value: T, index: number, array: ArrayLike<T>) => ArrayLike<R | RecursiveArray<R>> | R
): R[];

/**
 * Recursively maps each element in an object using a provided iteratee function and then deeply flattens the resulting array.
 *
 * @template T - The type of elements within the object.
 * @template R - The type of elements within the returned array from the iteratee function.
 * @param {T} collection - The object to iterate over.
 * @param {(value: T[keyof T], key: string, object: T) => ArrayLike<R | RecursiveArray<R>> | R} iteratee - The function that produces the new array elements.
 * @returns {R[]} A new array that has been deeply flattened.
 *
 * @example
 * const result = flatMapDeep({ a: [1, 2, 3], b: [4, 5, 6] }, n => [n, n]);
 * // [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]
 */
export function flatMapDeep<T extends object, R>(
  collection: T,
  iteratee?: (value: T[keyof T], key: string, object: T) => ArrayLike<R | RecursiveArray<R>> | R
): R[];

/**
 * Recursively maps each element in an object using a provided path and then deeply flattens the resulting array.
 *
 * @param {object | null | undefined} collection - The object to iterate over.
 * @param {string} path - The path of the property to get.
 * @returns {any[]} A new array that has been deeply flattened.
 *
 * @example
 * const result = flatMapDeep({ a: {a: 1, b: 2}, b: {a: 3, b: 4} }, 'a');
 * // [1, 3]
 */
export function flatMapDeep(collection: object | null | undefined, path: string): any[];

/**
 * Recursively maps each element in an object using a provided matches object and then deeply flattens the resulting array.
 *
 * @param {object | null | undefined} collection - The object to iterate over.
 * @param {object} matches - The object to match.
 * @returns {boolean[]} A new array that has been deeply flattened.
 *
 * @example
 * const result = flatMapDeep({ a: {a: 1, b: 2}, b: {a: 3, b: 4} }, {a: 1, b: 2});
 * // [true, false]
 */
export function flatMapDeep(collection: object | null | undefined, matches: object): boolean[];

/**
 * Recursively maps each element in an array using a provided iteratee function and then deeply flattens the resulting array.
 *
 * @template T - The type of elements within the array.
 * @template R - The type of elements within the returned array from the iteratee function.
 * @param {Record<string, ArrayLike<T | RecursiveArray<T>> | T> | Record<number, ArrayLike<T | RecursiveArray<T>> | T> | ArrayLike<T> | object | null | undefined} collection - The array or object to iterate over.
 * @param {((value: T, index: number, array: ArrayLike<T>) => ArrayLike<R | RecursiveArray<R>> | R) | ((value: T[keyof T], key: string, object: T) => ArrayLike<R | RecursiveArray<R>> | R) | string | object} iteratee - The function that produces the new array elements.
 * @returns {T[] | R[] | any[] | boolean[]} A new array that has been deeply flattened.
 *
 * @example
 * const result = flatMapDeep([1, 2, 3], n => [[n, n]]);
 * // [1, 1, 2, 2, 3, 3]
 */
export function flatMapDeep<T, R>(
  collection:
    | Record<string, ArrayLike<T | RecursiveArray<T>> | T>
    | Record<number, ArrayLike<T | RecursiveArray<T>> | T>
    | ArrayLike<T>
    | object
    | null
    | undefined,
  iteratee?:
    | ((value: T, index: number, array: ArrayLike<T>) => ArrayLike<R | RecursiveArray<R>> | R)
    | ((value: T[keyof T], key: string, object: T) => ArrayLike<R | RecursiveArray<R>> | R)
    | string
    | object
): T[] | R[] | any[] | boolean[] {
  return flatMapDepth(collection, iteratee as any, Infinity);
}
