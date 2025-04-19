import { isArrayLikeObject } from '../predicate/isArrayLikeObject.ts';
import { toArray } from '../util/toArray.ts';

/**
 * Computes the symmetric difference of the provided arrays, returning an array of elements
 * that exist in only one of the arrays.
 *
 * @template T - The type of elements in the arrays.
 * @param {...(ArrayLike<T> | null | undefined)} arrays - The arrays to compare.
 * @returns {T[]} An array containing the elements that are present in only one of the provided `arrays`.
 *
 * @example
 * // Returns [1, 2, 5, 6]
 * xor([1, 2, 3, 4], [3, 4, 5, 6]);
 *
 * @example
 * // Returns ['a', 'c']
 * xor(['a', 'b'], ['b', 'c']);
 *
 * @example
 * // Returns [1, 3, 5]
 * xor([1, 2], [2, 3], [4, 5]);
 */
export function xor<T>(...arrays: Array<ArrayLike<T> | null | undefined>): T[] {
  const itemCounts: Map<T, number> = new Map();

  for (let i = 0; i < arrays.length; i++) {
    const array = arrays[i];

    if (!isArrayLikeObject(array)) {
      continue;
    }

    const itemSet = new Set(toArray(array));

    for (const item of itemSet) {
      if (!itemCounts.has(item)) {
        itemCounts.set(item, 1);
      } else {
        itemCounts.set(item, itemCounts.get(item)! + 1);
      }
    }
  }

  const result: T[] = [];

  for (const [item, count] of itemCounts) {
    if (count === 1) {
      result.push(item);
    }
  }

  return result;
}
