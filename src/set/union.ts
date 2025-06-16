import { ensureSet, hasWorkingSetMethods, type SetLike } from './types.ts';

/**
 * Returns the union of two sets or arrays.
 *
 * This function takes two sets (or arrays) and returns a new set containing
 * all unique elements from both inputs.
 * Uses native Set.prototype.union if available, otherwise falls back
 * to a custom implementation.
 *
 * @template T - The type of elements in the set
 * @param {SetLike<T>} first - The first set or array
 * @param {SetLike<T>} second - The second set or array
 * @returns {Set<T>} A new set containing all unique elements from both inputs
 *
 * @example
 * // Using Sets
 * const set1 = new Set([1, 2, 3]);
 * const set2 = new Set([3, 4, 5]);
 * const result = union(set1, set2);
 * // result will be Set(5) {1, 2, 3, 4, 5}
 *
 * @example
 * // Using Arrays
 * const array1 = [1, 2, 3];
 * const array2 = [3, 4, 5];
 * const result = union(array1, array2);
 * // result will be Set(5) {1, 2, 3, 4, 5}
 */
export function union<T>(first: SetLike<T>, second: SetLike<T>): Set<T> {
  const set1 = ensureSet(first);
  const set2 = ensureSet(second);

  // Use native implementation if available
  if (hasWorkingSetMethods() && typeof set1.union === 'function') {
    return set1.union(set2);
  }

  // Fallback implementation
  return unionFallback(set1, set2);
}

/**
 * Fallback implementation for Set union.
 * More efficient than spread operator by avoiding array conversion.
 */
export function unionFallback<T>(set1: Set<T>, set2: Set<T>): Set<T> {
  // Create a copy of set1
  const result = new Set(set1);

  // Add all items from set2
  for (const item of set2) {
    result.add(item);
  }

  return result;
}
