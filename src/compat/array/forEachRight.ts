import { identity } from '../../function/identity.ts';
import { range } from '../../math/range.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';

/**
 * Iterates over elements of 'array' from right to left and invokes 'callback' for each element.
 *
 * @template K - The type of elements in the array.
 * @template T - The type of the array.
 * @param {T | null | undefined} array - The array to iterate over.
 * @param {(value: K, index: number, array: T) => unknown} [callback] - The function invoked for each element.
 * The callback function receives three arguments:
 *  - 'value': The current element being processed in the array.
 *  - 'index': The index of the current element being processed in the array.
 *  - 'array': The array 'forEachRight' was called upon.
 * @returns {T} Returns the original array.
 *
 * @example
 * forEachRight([1, 2, 3], (value, index, array) => console.log(value, index));
 * // Output:
 * // 3 2
 * // 2 1
 * // 1 0
 *
 */
export function forEachRight<T>(array: T[], callback?: (value: T, index: number, array: T[]) => unknown): T[];

/**
 * Iterates over elements of 'array' from right to left and invokes 'callback' for each element.
 *
 * @template K - The type of elements in the array.
 * @template T - The type of the array.
 * @param {T | null | undefined} array - The array to iterate over.
 * @param {(value: K, index: number, array: T) => unknown} [callback] - The function invoked for each element.
 * The callback function receives three arguments:
 *  - 'value': The current element being processed in the array.
 *  - 'index': The index of the current element being processed in the array.
 *  - 'array': The array 'forEachRight' was called upon.
 * @returns {T} Returns the original array.
 *
 * @example
 * forEachRight([1, 2, 3], (value, index, array) => console.log(value, index));
 * // Output:
 * // 3 2
 * // 2 1
 * // 1 0
 *
 */
export function forEachRight<T>(
  array: readonly T[],
  callback?: (value: T, index: number, array: T[]) => unknown
): readonly T[];

/**
 * Iterates over elements of 'array' from right to left and invokes 'callback' for each element.
 *
 * @template T - The type of string.
 * @param {T | null | undefined} string - The string to iterate over
 * @param {(value: T, index: number, string: T) => unknown} [callback] - The function invoked for each char.
 * The callback function receives three arguments:
 *  - 'char': The current char being processed in the string.
 *  - 'index': The index of the current char being processed in the string.
 *  - 'string': The string 'forEachRight' was called upon.
 * @returns {T} Returns the original string.
 *
 * @example
 * forEachRight('abc', (char, index, string) => console.log(char, index));
 * // Output:
 * // 'c' 2
 * // 'b' 1
 * // 'a' 0
 */
export function forEachRight<T extends string | null | undefined>(
  string: T,
  callback?: (char: string, index: number, string: string) => unknown
): T;

/**
 * Iterates over elements of 'array' from right to left and invokes 'callback' for each element.
 *
 * @template T - The type of elements in the array.
 * @param { ArrayLike<T> } array - The array to iterate over.
 * @param {(value: T, index: number, array: ArrayLike<T>) => unknown} [callback] - The function invoked for each element.
 * The callback function receives three arguments:
 *  - 'value': The current element being processed in the array.
 *  - 'index': The index of the current element being processed in the array.
 *  - 'array': The array 'forEachRight' was called upon.
 * @returns {T} Returns the original array.
 *
 * @example
 * forEachRight([1, 2, 3], (value, index, array) => console.log(value, index));
 * // Output:
 * // 3 2
 * // 2 1
 * // 1 0
 *
 */
export function forEachRight<T>(
  array: ArrayLike<T>,
  callback?: (value: T, index: number, array: ArrayLike<T>) => unknown
): ArrayLike<T>;

/**
 * Iterates over elements of 'array' from right to left and invokes 'callback' for each element.
 *
 * @template T - The type of object.
 * @param {T} object - The object to iterate over.
 * @param {(value: T[keyof T], key: keyof T, object: T) => unknown} [callback] - The function invoked for each property.
 * The callback function receives three arguments:
 *  - 'value': The current property being processed in the object.
 *  - 'key': The key of the current property being processed in the object.
 *  - 'object': The object 'forEachRight' was called upon.
 * @returns {T} Returns the original object.
 *
 * @example
 * forEachRight({'a': 1, 'b': 2 }, (value, key, object) => console.log(value, key));
 * // Output:
 * // 2 'b'
 * // 1 'a'
 */
export function forEachRight<T extends object | null | undefined>(
  object: T,
  callback?: (value: T[keyof T], key: keyof T, object: T) => unknown
): T;

/**
 * Iterates over elements of 'array' from right to left and invokes 'callback' for each element.
 *
 * @template T - The type of object.
 * @param {T} object - The object to iterate over.
 * @param {(value: T[keyof T], key: keyof T, object: T) => unknown} [callback] - The function invoked for each property.
 * The callback function receives three arguments:
 *  - 'value': The current property being processed in the object.
 *  - 'key': The key of the current property being processed in the object.
 *  - 'object': The object 'forEachRight' was called upon.
 * @returns {T} Returns the original object.
 *
 * @example
 * forEachRight({'a': 1, 'b': 2 }, (value, key, object) => console.log(value, key));
 * // Output:
 * // 2 'b'
 * // 1 'a'
 */
export function forEachRight<T>(
  collection: ArrayLike<T> | Record<any, any> | string | null | undefined,
  callback: (item: any, index: any, arr: any) => unknown = identity
): ArrayLike<T> | Record<any, any> | string | null | undefined {
  if (!collection) {
    return collection;
  }

  const keys: PropertyKey[] = isArrayLike(collection) ? range(0, collection.length) : Object.keys(collection);

  for (let i = keys.length - 1; i >= 0; i--) {
    const key = keys[i];
    const value = (collection as any)[key];

    const result = callback(value, key, collection);

    if (result === false) {
      break;
    }
  }

  return collection;
}
