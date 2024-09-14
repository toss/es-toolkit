import { isArrayLike } from '../predicate/isArrayLike.ts';

/**
 * Converts an array of key-value pairs into an object.
 *
 * @param {any[]} pairs - An array of key-value pairs where each key is a `PropertyKey` and each value is of type `U`.
 * @returns {Record<string, any>} - An object where the keys are from the first element and values are from the second element.
 *
 * @example
 * const pairs = [['a', 1], ['b', 2]];
 * const result = fromPairs(pairs);
 * // result will be: { a: 1, b: 2 }
 */
export function fromPairs(pairs: readonly any[]): Record<string, any>;
/**
 * Converts an array of key-value pairs into an object.
 *
 * @template T - The type of the keys in the resulting object. It must extend `PropertyKey`.
 * @template U - The type of the values in the resulting object.
 *
 * @param {Array<[T, U]>} pairs - An array of key-value pairs where each key is a `PropertyKey` and each value is of type `U`.
 * @returns {Record<T, U>} - An object where the keys are of type `T` and the values are of type `U`.
 *
 * @example
 * const pairs = [['a', 1], ['b', 2]];
 * const result = fromPairs(pairs);
 * // result will be: { a: 1, b: 2 }
 */
export function fromPairs<T extends PropertyKey, U>(pairs: ReadonlyArray<[T, U]> | Map<T, U>): Record<T, U>;
/**
 * Converts an array of key-value pairs into an object.
 *
 * @template T - The type of the keys in the resulting object. It must extend `PropertyKey`.
 * @template U - The type of the values in the resulting object.
 *
 * @param {Array<[T, U]>} pairs - An array of key-value pairs where each key is a `PropertyKey` and each value is of type `U`.
 * @returns {Record<T, U>} - An object where the keys are of type `T` and the values are of type `U`.
 *
 * @example
 * const pairs = [['a', 1], ['b', 2]];
 * const result = fromPairs(pairs);
 * // result will be: { a: 1, b: 2 }
 */
export function fromPairs<T extends PropertyKey, U>(pairs: ReadonlyArray<[T, U]> | Map<T, U>): Record<T, U> {
  if (!isArrayLike(pairs) && !(pairs instanceof Map)) {
    return {} as Record<T, U>;
  }

  const result = {} as Record<T, U>;

  for (const [key, value] of pairs) {
    result[key as T] = value;
  }

  return result;
}
