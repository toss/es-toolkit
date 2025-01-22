import { difference } from './difference.ts';
import { intersection } from './intersection.ts';
import { union } from './union.ts';
import { xor as xorToolkit } from '../../array/xor';

/**
 * Computes the symmetric difference between two arrays. The symmetric difference is the set of elements
 * which are in either of the arrays, but not in their intersection.
 *
 * @template T - The type of elements in the array.
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
export function xor<T>(arr1: readonly T[], arr2: readonly T[]): T[];

/**
 * Computes the symmetric difference between two arrays. The symmetric difference is the set of elements
 * which are in either of the arrays, but not in their intersection.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr2 - The second array.
 * @returns {(arr1: T[]) => T[]} A function that receive the first array as argument and returns an array containing the elements that are present in either `arr1` or `arr2` but not in both.
 *
 * @example
 * // Returns [1, 2, 5, 6]
 * xor(2, 3, 4], [3, 4, 5, 6])([1);
 *
 * @example
 * // Returns ['a', 'c']
 * xor(['a', 'b'], ['b', 'c']);
 */
export function xor<T>(arr2: readonly T[]): (arr1: readonly T[]) => T[];

export function xor<T>(arr1OrArr2: readonly T[] | readonly T[], arr2?: readonly T[]) {
  if (arr2 == null) {
    return (arr1: readonly T[]) => xor(arr1, arr1OrArr2 as readonly T[]);
  }

  const arr1 = arr1OrArr2 as readonly T[];
  return xorToolkit(arr1, arr2);
}
