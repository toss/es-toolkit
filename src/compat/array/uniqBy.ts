import { uniqBy as uniqByToolkit } from '../../array/uniqBy';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject';
import { iteratee as createIteratee } from '../util/iteratee.ts';

/**
 * Creates a duplicate-free version of an array using a transform function for comparison.
 *
 * @template T
 * @param {ArrayLike<T>} array - The array to inspect.
 * @returns {T[]} Returns the new duplicate-free array.
 *
 * @example
 * uniqBy([1, 2, 3, 1]);
 * // => [1, 2, 3]
 */
export function uniqBy<T>(array: ArrayLike<T>): T[];
/**
 * Creates a duplicate-free version of an array using a transform function for comparison.
 *
 * @template T
 * @param {ArrayLike<T>} array - The array to inspect.
 * @param {(value: T) => unknown} iteratee - The transform function.
 * @returns {T[]} Returns the new duplicate-free array.
 *
 * @example
 * uniqBy([2.1, 1.2, 2.3], Math.floor);
 * // => [2.1, 1.2]
 */
export function uniqBy<T>(array: ArrayLike<T>, iteratee: (value: T) => unknown): T[];

/**
 * Creates a duplicate-free version of an array using a property name for comparison.
 *
 * @template T
 * @param {ArrayLike<T>} array - The array to inspect.
 * @param {PropertyKey} iteratee - The property path to get values from.
 * @returns {T[]} Returns the new duplicate-free array.
 *
 * @example
 * const users = [
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 37 }
 * ];
 * uniqBy(users, 'user');
 * // => [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }]
 */
export function uniqBy<T>(array: ArrayLike<T>, iteratee: PropertyKey): T[];
/**
 * Creates a duplicate-free version of an array using a property name for comparison.
 *
 * @template T
 * @param {ArrayLike<T>} array - The array to inspect.
 * @param {Partial<T>} iteratee - The property path to get values from.
 * @returns {T[]} Returns the new duplicate-free array.
 *
 * @example
 * const users = [
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 37 }
 * ];
 * uniqBy(users, { 'user': 'barney'});
 * // => [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }]
 */
export function uniqBy<T>(array: ArrayLike<T>, iteratee: Partial<T>): T[];
/**
 * Creates a duplicate-free version of an array using a property name for comparison.
 *
 * @template T
 * @param {ArrayLike<T>} array - The array to inspect.
 * @param {[keyof T, unknown]} iteratee - The property path to get values from.
 * @returns {T[]} Returns the new duplicate-free array.
 *
 * @example
 * const users = [
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 37 }
 * ];
 * uniqBy(users, ['user', 'barney']);
 * // => [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }]
 */
export function uniqBy<T>(array: ArrayLike<T>, iteratee: [keyof T, unknown]): T[];
/**
 * Creates a duplicate-free version of an array, combining multiple arrays and using an optional transform function.
 *
 * @template T
 * @param {ArrayLike<T>} array - The array to inspect.
 * @param {((value: T) => unknown) | PropertyKey | [keyof T, unknown] | Partial<T>} iteratee - Additional arrays and/or iteratee.
 * @returns {T[]} Returns the new duplicate-free array.
 *
 * @example
 * uniqBy([1, 2], [2, 3], [3, 4], Math.floor);
 * // => [1, 2, 3, 4]
 */
export function uniqBy<T>(
  array: ArrayLike<T> | null | undefined,
  iteratee?: ((value: T) => unknown) | PropertyKey | [keyof T, unknown] | Partial<T>
): T[] {
  if (!isArrayLikeObject(array)) {
    return [];
  }

  return uniqByToolkit(Array.from(array), createIteratee(iteratee));
}
