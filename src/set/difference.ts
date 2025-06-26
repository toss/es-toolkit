import { ensureSet, hasWorkingSetMethods, type SetLike, type SetOperations } from './types.ts';

/**
 * Returns the difference of two sets or arrays.
 *
 * This function takes two sets (or arrays) and returns a new set containing
 * elements that are present in the first input but not in the second.
 * Uses native Set.prototype.difference if available, otherwise falls back
 * to a custom implementation.
 *
 * @template T - The type of elements in the set
 * @param {SetLike<T>} first - The first set or array
 * @param {SetLike<T>} second - The second set or array
 * @returns {Set<T>} A new set containing elements present in first but not in second
 *
 * @example
 * // Using Sets
 * const set1 = new Set([1, 2, 3, 4, 5]);
 * const set2 = new Set([3, 4, 5, 6, 7]);
 * const result = difference(set1, set2);
 * // result will be Set(2) {1, 2}
 *
 * @example
 * // Using Arrays
 * const array1 = [1, 2, 3, 4, 5];
 * const array2 = [3, 4, 5, 6, 7];
 * const result = difference(array1, array2);
 * // result will be Set(2) {1, 2}
 */
export function difference<T>(first: SetLike<T>, second: SetLike<T>): Set<T> {
  const set1 = ensureSet(first);
  const set2 = ensureSet(second);

  // Use native implementation if available
  if (hasWorkingSetMethods()) {
    const differenceMethod = (set1 as unknown as SetOperations<T>).difference;
    if (typeof differenceMethod === 'function') {
      return differenceMethod.call(set1, set2);
    }
  }

  // Fallback implementation
  return differenceFallback(set1, set2);
}

/**
 * Fallback implementation for Set difference.
 */
export function differenceFallback<T>(set1: Set<T>, set2: Set<T>): Set<T> {
  const result = new Set<T>();

  for (const item of set1) {
    if (!set2.has(item)) {
      result.add(item);
    }
  }

  return result;
}
