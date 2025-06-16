import { ensureSet, hasWorkingSetMethods, type SetLike } from './types.ts';

/**
 * Returns the symmetric difference of two sets or arrays.
 *
 * This function takes two sets (or arrays) and returns a new set containing
 * elements that are present in either input but not in both.
 * Uses native Set.prototype.symmetricDifference if available, otherwise falls back
 * to a custom implementation.
 *
 * @template T - The type of elements in the set
 * @param {SetLike<T>} first - The first set or array
 * @param {SetLike<T>} second - The second set or array
 * @returns {Set<T>} A new set containing elements present in either input but not in both
 *
 * @example
 * // Using Sets
 * const set1 = new Set([1, 2, 3]);
 * const set2 = new Set([3, 4, 5]);
 * const result = symmetricDifference(set1, set2);
 * // result will be Set(4) {1, 2, 4, 5}
 *
 * @example
 * // Using Arrays
 * const array1 = [1, 2, 3];
 * const array2 = [3, 4, 5];
 * const result = symmetricDifference(array1, array2);
 * // result will be Set(4) {1, 2, 4, 5}
 */
export function symmetricDifference<T>(first: SetLike<T>, second: SetLike<T>): Set<T> {
  const set1 = ensureSet(first);
  const set2 = ensureSet(second);

  // Use native implementation if available
  if (hasWorkingSetMethods() && typeof set1.symmetricDifference === 'function') {
    return set1.symmetricDifference(set2);
  }

  // Fallback implementation
  return symmetricDifferenceFallback(set1, set2);
}

/**
 * Fallback implementation for Set symmetric difference.
 * Elements that are in exactly one of the sets.
 */
export function symmetricDifferenceFallback<T>(set1: Set<T>, set2: Set<T>): Set<T> {
  const result = new Set<T>();

  // Add elements that are in set1 but not in set2
  for (const item of set1) {
    if (!set2.has(item)) {
      result.add(item);
    }
  }

  // Add elements that are in set2 but not in set1
  for (const item of set2) {
    if (!set1.has(item)) {
      result.add(item);
    }
  }

  return result;
}
