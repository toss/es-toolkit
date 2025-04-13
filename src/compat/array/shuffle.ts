import { shuffle as shuffleToolkit } from '../../array';
import { isArrayLike } from '../predicate/isArrayLike';
import { isObjectLike } from '../predicate/isObjectLike';

/**
 * Shuffles the elements of an array-like object (e.g., array, string, arguments) into a new array.
 *
 * @template T - The element type of the array-like collection.
 * @param {ArrayLike<T>} collection - The array-like collection to shuffle.
 * @returns {T[]} A new array with shuffled elements.
 *
 * @example
 * shuffle([1, 2, 3, 4]); // e.g., [3, 1, 4, 2]
 *
 * @example
 * shuffle('abcd'); // e.g., ['b', 'd', 'a', 'c']
 */
export function shuffle<T>(collection: ArrayLike<T>): T[];

/**
 * Shuffles the values of an object into a new array.
 *
 * @template T - The value type of the object.
 * @param {T} collection - The object whose values will be shuffled.
 * @returns {T[]} A new array containing the shuffled values of the object.
 *
 * @example
 * shuffle({ a: 1, b: 2, c: 3 }); // e.g., [2, 1, 3]
 */
export function shuffle<T extends object>(collection: T): Array<T[keyof T]>;

/**
 * Handles `null` or `undefined` input by returning an empty array.
 *
 * @param {null | undefined} collection - A null or undefined value.
 * @returns {[]} An empty array.
 *
 * @example
 * shuffle(null); // []
 * shuffle(undefined); // []
 */
export function shuffle(collection: null | undefined): [];

/**
 * Shuffles the values of an array-like or object-like collection into a new array.
 * Returns an empty array for `null`, `undefined`, or unsupported types.
 *
 * @param {unknown} collection - The collection to shuffle.
 * @returns {unknown[]} A new shuffled array, or an empty array for unsupported types.
 */
export function shuffle(collection: unknown): unknown[] {
  if (!collection) {
    return [];
  }

  if (isArrayLike(collection)) {
    return shuffleToolkit(Array.from(collection));
  }

  if (isObjectLike(collection)) {
    return shuffleToolkit(Object.values(collection));
  }

  return [];
}
