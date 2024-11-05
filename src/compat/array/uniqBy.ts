import { flatten } from './flatten';
import { last } from './last';
import { uniq as uniqToolkit } from '../../array/uniq.ts';
import { uniqBy as uniqByToolkit } from '../../array/uniqBy';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject';
import { iteratee as createIteratee } from '../util/iteratee.ts';

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
 * @param {string} path - The property path to get values from.
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
export function uniqBy<T>(array: ArrayLike<T>, path: string): T[];

/**
 * Creates a duplicate-free version of an array, combining multiple arrays and using an optional transform function.
 *
 * @template T
 * @param {ArrayLike<T>} array - The array to inspect.
 * @param {...Array<ArrayLike<T> | ((value: T) => unknown) | string>} values - Additional arrays and/or iteratee.
 * @returns {T[]} Returns the new duplicate-free array.
 *
 * @example
 * uniqBy([1, 2], [2, 3], [3, 4], Math.floor);
 * // => [1, 2, 3, 4]
 */
export function uniqBy<T>(
  array: ArrayLike<T> | null | undefined,
  ...values: Array<ArrayLike<T> | ((value: T) => unknown) | string>
): T[];

/**
 * Implementation of the uniqBy function.
 */
export function uniqBy<T>(
  arr: ArrayLike<T> | null | undefined,
  ...values: Array<ArrayLike<T> | ((value: T) => unknown) | string>
): T[] {
  if (!isArrayLikeObject(arr)) {
    return [];
  }

  const iteratee = last(values);
  if (iteratee === undefined) {
    return Array.from(arr);
  }

  const validArrays = values.slice(0, -1).filter(isArrayLikeObject);
  const flattenedArrays = flatten(validArrays) as T[];
  const allValues = [...Array.from(arr), ...flattenedArrays];

  if (isArrayLikeObject(iteratee)) {
    return uniqToolkit(allValues);
  }

  return uniqByToolkit(allValues, createIteratee(iteratee));
}
