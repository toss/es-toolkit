import { difference } from './difference.ts';
import { intersection } from './intersection.ts';
import { union } from './union.ts';

/**
 * Computes the symmetric difference between two arrays. The symmetric difference is the set of elements
 * which are in either of the arrays, but not in their intersection.
 *
 * @param {T[]} arr1 - The first array.
 * @param {T[]} arr2 - The second array.
 * @returns {T[]} An array containing the elements that are present in either `arr1` or `arr2` but not in both.
 *
 * @example
 * // Returns [1, 2, 5, 6]
 * xor([1, 2, 3, 4], [3, 4, 5, 6]);
 *
 * @example
 * // Returns ['a', 'c']
 * xor(['a', 'b'], ['b', 'c']);
 */
export function xor<T>(arr1: readonly T[], arr2: readonly T[]): T[] {
  return difference(union(arr1, arr2), intersection(arr1, arr2));
}
