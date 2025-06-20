import { sample as sampleToolkit } from '../../array/sample.ts';
import { toArray } from '../_internal/toArray.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';

/**
 * Gets a random element from collection.
 *
 * @template T
 * @param {readonly [T, ...T[]]} collection - The collection to sample.
 * @returns {T} Returns the random element.
 *
 * @example
 * sample([1, 2, 3, 4]);
 * // => 2
 */
export function sample<T>(collection: readonly [T, ...T[]]): T;

/**
 * Gets a random element from collection.
 *
 * @template T
 * @param {Record<string, T> | Record<number, T> | null | undefined} collection - The collection to sample.
 * @returns {T | undefined} Returns the random element.
 *
 * @example
 * sample({ 'a': 1, 'b': 2, 'c': 3 });
 * // => 2
 */
export function sample<T>(collection: Record<string, T> | Record<number, T> | null | undefined): T | undefined;

/**
 * Gets a random element from collection.
 *
 * @template T
 * @param {T | null | undefined} collection - The collection to sample.
 * @returns {T[keyof T] | undefined} Returns the random element.
 *
 * @example
 * sample({ 'a': 1, 'b': 2, 'c': 3 });
 * // => 2
 */
export function sample<T extends object>(collection: T | null | undefined): T[keyof T] | undefined;

/**
 * The implementation for the overloaded sample function.
 *
 * This function takes an array, string, or object and returns a single element selected randomly.
 * If the input is empty, or if it's null or undefined, the function returns `undefined`.
 *
 * @template T - The type of elements in the collection.
 * @param {ArrayLike<T> | Record<string, T>} collection - The collection to sample from.
 * @returns {T | string | undefined} A random element from the collection, or `undefined` if the collection is empty or invalid.
 */
export function sample<T>(collection: ArrayLike<T> | Record<string, T> | null | undefined): T | string | undefined {
  if (collection == null) {
    return undefined;
  }

  if (isArrayLike(collection)) {
    return sampleToolkit(toArray(collection));
  }

  return sampleToolkit(Object.values(collection));
}
