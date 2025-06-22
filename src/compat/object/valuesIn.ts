import { keysIn } from './keysIn.ts';

/**
 * Retrieves the values from an object, including those inherited from its prototype.
 *
 * @template T
 * @param {Record<string, T> | Record<number, T> | ArrayLike<T> | null | undefined} object - The object to query.
 * @returns {T[]} Returns an array of property values.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * valuesIn(obj); // => [1, 2, 3]
 */
export function valuesIn<T>(object: Record<string, T> | Record<number, T> | ArrayLike<T> | null | undefined): T[];

/**
 * Retrieves the values from an object, including those inherited from its prototype.
 *
 * @template T
 * @param {T | null | undefined} object - The object to query.
 * @returns {Array<T[keyof T]>} Returns an array of property values.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * valuesIn(obj); // => [1, 2, 3]
 */
export function valuesIn<T extends object>(object: T | null | undefined): Array<T[keyof T]>;

/**
 * Retrieves the values from an object, including those inherited from its prototype.
 *
 * - If the value is not an object, it is converted to an object.
 * - Array-like objects are treated like arrays.
 * - Sparse arrays with some missing indices are treated like dense arrays.
 * - If the value is `null` or `undefined`, an empty array is returned.
 * - When handling prototype objects, the `constructor` property is excluded from the results.
 *
 * @param {any} object The object to query.
 * @returns {any[]} Returns an array of property values.
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * valuesIn(obj); // => [1, 2, 3]
 */
export function valuesIn(object: any): any[] {
  const keys = keysIn(object);
  const result: any[] = new Array(keys.length);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    result[i] = object[key];
  }

  return result;
}
