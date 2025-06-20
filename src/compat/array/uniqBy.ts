import { uniqBy as uniqByToolkit } from '../../array/uniqBy.ts';
import { identity } from '../../function/identity.ts';
import { ValueIteratee } from '../_internal/ValueIteratee.ts';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject.ts';
import { iteratee as createIteratee } from '../util/iteratee.ts';

/**
 * Creates a duplicate-free version of an array, using an optional transform function.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} array - The array to inspect.
 * @param {ValueIteratee<T>} iteratee - The transform function or property name to get values from.
 * @returns {T[]} Returns the new duplicate-free array.
 *
 * @example
 * uniqBy([2.1, 1.2, 2.3], Math.floor);
 * // => [2.1, 1.2]
 */
export function uniqBy<T>(array: ArrayLike<T> | null | undefined, iteratee: ValueIteratee<T>): T[];

/**
 * Creates a duplicate-free version of an array, combining multiple arrays and using an optional transform function.
 *
 * @template T
 * @param {ArrayLike<T>} array - The array to inspect.
 * @param {((value: T) => unknown) | PropertyKey | [keyof T, unknown] | Partial<T>} iteratee - The transform function or property name to get values from.
 * @returns {T[]} Returns the new duplicate-free array.
 *
 * @example
 * uniqBy([1, 2], [2, 3], [3, 4], Math.floor);
 * // => [1, 2, 3, 4]
 */
export function uniqBy<T>(
  array: ArrayLike<T> | null | undefined,
  iteratee: ((value: T) => unknown) | PropertyKey | [keyof T, unknown] | Partial<T> = identity
): T[] {
  if (!isArrayLikeObject(array)) {
    return [];
  }

  return uniqByToolkit(Array.from(array), createIteratee(iteratee));
}
