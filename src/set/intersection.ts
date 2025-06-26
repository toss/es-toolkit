import { ensureSet, hasWorkingSetMethods, type SetLike, type SetOperations } from './types.ts';

/**
 * Returns the intersection of two sets or arrays.
 *
 * This function takes two sets (or arrays) and returns a new set containing
 * elements that are present in both inputs.
 * Uses native Set.prototype.intersection if available, otherwise falls back
 * to a custom implementation.
 *
 * @template T - The type of elements in the set
 * @param {SetLike<T>} first - The first set or array
 * @param {SetLike<T>} second - The second set or array
 * @returns {Set<T>} A new set containing elements present in both inputs
 *
 * @example
 * // Using Sets
 * const set1 = new Set([1, 2, 3, 4]);
 * const set2 = new Set([3, 4, 5, 6]);
 * const result = intersection(set1, set2);
 * // result will be Set(2) {3, 4}
 *
 * @example
 * // Using Arrays
 * const array1 = [1, 2, 3, 4];
 * const array2 = [3, 4, 5, 6];
 * const result = intersection(array1, array2);
 * // result will be Set(2) {3, 4}
 */
export function intersection<T>(first: SetLike<T>, second: SetLike<T>): Set<T> {
  const set1 = ensureSet(first);
  const set2 = ensureSet(second);

  // Use native implementation if available
  if (hasWorkingSetMethods()) {
    const intersectionMethod = (set1 as unknown as SetOperations<T>).intersection;
    if (typeof intersectionMethod === 'function') {
      return intersectionMethod.call(set1, set2);
    }
  }

  // Fallback implementation
  return intersectionFallback(set1, set2);
}

/**
 * Fallback implementation for Set intersection.
 * Optimizes by iterating over the smaller set for better performance.
 */
export function intersectionFallback<T>(set1: Set<T>, set2: Set<T>): Set<T> {
  // Optimize by iterating over the smaller set
  const [smaller, larger] = set1.size <= set2.size ? [set1, set2] : [set2, set1];
  const result = new Set<T>();

  for (const item of smaller) {
    if (larger.has(item)) {
      result.add(item);
    }
  }

  return result;
}
