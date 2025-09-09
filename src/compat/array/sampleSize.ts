import { sampleSize as sampleSizeToolkit } from '../../array/sampleSize.ts';
import { isIterateeCall } from '../_internal/isIterateeCall.ts';
import { clamp } from '../math/clamp.ts';
import { toArray } from '../util/toArray.ts';
import { toInteger } from '../util/toInteger.ts';

/**
 * Returns a sample element array of a specified size from a collection.
 *
 * @template T
 * @param {Record<string, T> | Record<number, T> | null | undefined} collection - The collection to sample from.
 * @param {number} [n] - The size of sample.
 * @returns {T[]} A new array with sample size applied.
 *
 * @example
 * sampleSize([1, 2, 3], 2);
 * // => [2, 3] (example, actual result will vary)
 */
export function sampleSize<T>(collection: Record<string, T> | Record<number, T> | null | undefined, n?: number): T[];

/**
 * Returns a sample element array of a specified size from an object.
 *
 * @template T
 * @param {T | null | undefined} collection - The object to sample from.
 * @param {number} [n] - The size of sample.
 * @returns {Array<T[keyof T]>} A new array with sample size applied.
 *
 * @example
 * sampleSize({ a: 1, b: 2, c: 3 }, 2);
 * // => [2, 3] (example, actual result will vary)
 */
export function sampleSize<T extends object>(collection: T | null | undefined, n?: number): Array<T[keyof T]>;

/**
 * Returns a sample element array of a specified `size`.
 *
 * This function takes an array and a number, and returns an array containing the sampled elements using Floyd's algorithm.
 *
 * {@link https://www.nowherenearithaca.com/2013/05/robert-floyds-tiny-and-beautiful.html Floyd's algorithm}
 *
 * @template T - The type of elements in the array.
 * @param {Record<string, T> | Record<number, T> | T | null | undefined} collection - The array to sample from.
 * @param {number} size - The size of sample.
 * @returns {Array<T[keyof T]> | T[]} A new array with sample size applied.
 *
 * @example
 * const result = sampleSize([1, 2, 3], 2)
 * // result will be an array containing two of the elements from the collection.
 * // [1, 2] or [1, 3] or [2, 3]
 */
export function sampleSize<T>(
  collection: Record<string, T> | Record<number, T> | T | null | undefined,
  size?: number,
  guard?: unknown
): Array<T[keyof T]> | T[] {
  const arrayCollection = toArray(collection);

  if (guard ? isIterateeCall(collection, size, guard) : size === undefined) {
    size = 1;
  } else {
    size = clamp(toInteger(size), 0, arrayCollection.length);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return sampleSizeToolkit(arrayCollection, size);
}
