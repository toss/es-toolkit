import { keys } from './keys.ts';

/**
 * Creates an array of the own enumerable property values of `object`.
 *
 * @template T
 * @param object - The object to query.
 * @returns Returns an array of property values.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * values(obj); // => [1, 2, 3]
 */
export function values<T>(object: Record<string, T> | Record<number, T> | ArrayLike<T> | null | undefined): T[];

/**
 * Creates an array of the own enumerable property values of `object`.
 *
 * @template T
 * @param object - The object to query.
 * @returns Returns an array of property values.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * values(obj); // => [1, 2, 3]
 */
export function values<T extends object>(object: T | null | undefined): Array<T[keyof T]>;

/**
 * Creates an array of the own enumerable property values of `object`.
 *
 * @param object - The object to query.
 * @returns Returns an array of property values.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * values(obj); // => [1, 2, 3]
 */
export function values(object: any): any[];

/**
 * Creates an array of the own enumerable property values of `object`.
 *
 * @param object The object to query.
 * @returns Returns an array of property values.
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * values(obj); // => [1, 2, 3]
 */
export function values(object: any): any[] {
  if (object == null) {
    return [];
  }

  // Read through `keys` rather than `Object.values`: the built-in skips array
  // holes, which would make `values` shorter than `keys` for a sparse array.
  const objectKeys = keys(object);
  const result = new Array(objectKeys.length);

  for (let i = 0; i < objectKeys.length; i++) {
    result[i] = object[objectKeys[i]];
  }

  return result;
}
