import { isArrayLike } from '../predicate/isArrayLike.ts';

type PropertyName = string | number | symbol;

/**
 * Converts an array of key-value pairs into an object.
 *
 * @template T - The type of the values.
 * @param pairs - An array of key-value pairs.
 * @returns An object where keys are strings and values are of type T.
 *
 * @example
 * const pairs = [['a', 1], ['b', 2]];
 * const result = fromPairs(pairs);
 * // => { a: 1, b: 2 }
 */
export function fromPairs<T>(pairs: ArrayLike<[PropertyName, T]> | null | undefined): Record<string, T>;

/**
 * Converts an array of key-value pairs into an object.
 *
 * @param pairs - An array of key-value pairs.
 * @returns An object where keys are strings and values can be any type.
 *
 * @example
 * const pairs = [['a', 1], ['b', 'hello']];
 * const result = fromPairs(pairs);
 * // => { a: 1, b: 'hello' }
 */
export function fromPairs(pairs: ArrayLike<any[]> | null | undefined): Record<string, any>;

/**
 * Converts an array of key-value pairs into an object.
 *
 * @template T - The type of the keys in the resulting object. It must extend `PropertyKey`.
 * @template U - The type of the values in the resulting object.
 *
 * @param pairs - An array of key-value pairs where each key is a `PropertyKey` and each value is of type `U`.
 * @returns An object where the keys are of type `T` and the values are of type `U`.
 *
 * @example
 * const pairs = [['a', 1], ['b', 2]];
 * const result = fromPairs(pairs);
 * // result will be: { a: 1, b: 2 }
 */
export function fromPairs<T>(
  pairs: ArrayLike<[PropertyName, T]> | ArrayLike<any[]> | null | undefined
): Record<string, any> | Record<string, T> {
  if (!isArrayLike(pairs)) {
    return {};
  }

  const result: Record<string, any> = {};

  for (let i = 0; i < pairs.length; i++) {
    const [key, value] = pairs[i];
    result[key] = value;
  }

  return result;
}
