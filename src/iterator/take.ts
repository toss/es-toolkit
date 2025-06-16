import { hasNativeIteratorHelpers, isArray, type IterableLike, type IterationResult } from './types.ts';

/**
 * Returns a specified number of contiguous elements from the start of the iterator or array.
 *
 * If the input is an array, returns a new array with the first `count` elements.
 * If the input is an iterable, returns a lazy iterable iterator limited to the first `count` elements.
 * Uses native iterator helpers if available.
 *
 * @template T - Type of values
 * @template I - Type of input collection (inferred)
 * @param {IterableLike<T>} input - The input array or iterable
 * @param {number} count - Maximum number of elements to take
 * @returns {IterationResult<T, T, I>} Array or lazy iterator with at most `count` elements
 *
 * @example
 * // Array input
 * const numbers = [1, 2, 3, 4, 5];
 * const first3 = take(numbers, 3);
 * // first3 will be [1, 2, 3]
 *
 * @example
 * // Iterable input
 * const set = new Set([1, 2, 3, 4, 5]);
 * const first3 = take(set, 3);
 * // first3 will be an IterableIterator with values 1, 2, 3
 * // Access with [...first3] or for-of loop
 */
export function take<T, I extends IterableLike<T>>(input: I, count: number): IterationResult<T, T, I> {
  // Ensure count is non-negative
  const limit = Math.max(0, count);

  // Use array slice for arrays (optimized)
  if (isArray(input)) {
    return input.slice(0, limit) as IterationResult<T, T, I>;
  }

  // Use native iterator helpers if available
  if (hasNativeIteratorHelpers()) {
    const iterator = input[Symbol.iterator]();
    if (typeof iterator.take === 'function') {
      return iterator.take(limit) as IterationResult<T, T, I>;
    }
  }

  // Fallback to generator implementation
  return takeIterable(input, limit) as IterationResult<T, T, I>;
}

/**
 * Generator-based implementation of take for iterables.
 * Performs lazy evaluation.
 */
function* takeIterable<T>(iterable: Iterable<T>, count: number): IterableIterator<T> {
  let remaining = count;
  if (remaining <= 0) {
    return;
  }

  for (const item of iterable) {
    yield item;
    remaining--;
    if (remaining <= 0) {
      break;
    }
  }
}
