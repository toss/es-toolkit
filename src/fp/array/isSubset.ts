import { isSubset as isSubsetToolkit } from '../../array/isSubset';
import { difference } from '../array/difference.ts';

/**
 * Checks if the `subset` array is entirely contained within the `superset` array.
 *
 *
 * @template T - The type of elements contained in the arrays.
 * @param {T[]} superset - The array that may contain all elements of the subset.
 * @param {T[]} subset - The array to check against the superset.
 * @returns {boolean} - Returns `true` if all elements of the `subset` are present in the `superset`, otherwise returns `false`.
 *
 * @example
 * ```typescript
 * const superset = [1, 2, 3, 4, 5];
 * const subset = [2, 3, 4];
 * isSubset(superset, subset); // true
 * ```
 *
 * @example
 * ```typescript
 * const superset = ['a', 'b', 'c'];
 * const subset = ['a', 'd'];
 * isSubset(superset, subset); // false
 * ```
 */
export function isSubset<T>(superset: readonly T[], subset: readonly T[]): boolean;

/**
 * Checks if the `subset` array is entirely contained within the `superset` array.
 *
 *
 * @template T - The type of elements contained in the arrays.
 * @param {T[]} subset - The array to check against the superset.
 * @returns {(superset: T[]) => boolean} A function that receive the array that may contain all elements of the subset as argument and returns - Returns `true` if all elements of the `subset` are present in the `superset`, otherwise returns `false`.
 *
 * @example
 * ```typescript
 * const superset = [1, 2, 3, 4, 5];
 * const subset = [2, 3, 4];
 * isSubset(subset)(superset); // true
 * ```
 *
 * @example
 * ```typescript
 * const superset = ['a', 'b', 'c'];
 * const subset = ['a', 'd'];
 * isSubset(superset, subset); // false
 * ```
 */
export function isSubset<T>(subset: readonly T[]): (superset: readonly T[]) => boolean;

export function isSubset<T>(supersetOrSubset: readonly T[] | readonly T[], subset?: readonly T[]) {
  if (subset == null) {
    return (superset: readonly T[]) => isSubset(superset, supersetOrSubset as readonly T[]);
  }

  const superset = supersetOrSubset as readonly T[];
  return isSubsetToolkit(superset, subset);
}
