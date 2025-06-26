import {
  hasNativeIteratorHelpers,
  isArray,
  type IterableLike,
  type IterationResult,
  type IteratorWithHelpers,
} from './types.ts';

/**
 * Skips a specified number of elements from the start of the iterator or array and returns the rest.
 *
 * If the input is an array, returns a new array without the first `count` elements.
 * If the input is an iterable, returns a lazy iterable iterator that skips the first `count` elements.
 * Uses native iterator helpers if available.
 *
 * @template T - Type of values
 * @template I - Type of input collection (inferred)
 * @param {IterableLike<T>} input - The input array or iterable
 * @param {number} count - Number of elements to skip
 * @returns {IterationResult<T, T, I>} Array or lazy iterator with elements after skipping
 *
 * @example
 * // Array input
 * const numbers = [1, 2, 3, 4, 5];
 * const afterFirst2 = drop(numbers, 2);
 * // afterFirst2 will be [3, 4, 5]
 *
 * @example
 * // Iterable input
 * const set = new Set([1, 2, 3, 4, 5]);
 * const afterFirst2 = drop(set, 2);
 * // afterFirst2 will be an IterableIterator with values 3, 4, 5
 * // Access with [...afterFirst2] or for-of loop
 */
export function drop<T, I extends IterableLike<T>>(input: I, count: number): IterationResult<T, T, I> {
  // Ensure count is non-negative
  const skip = Math.max(0, count);

  // Use array slice for arrays (optimized)
  if (isArray(input)) {
    return input.slice(skip) as IterationResult<T, T, I>;
  }

  // Use native iterator helpers if available
  if (hasNativeIteratorHelpers()) {
    const iterator = input[Symbol.iterator]() as IteratorWithHelpers<T>;
    if (typeof iterator.drop === 'function') {
      return iterator.drop(skip) as IterationResult<T, T, I>;
    }
  }

  // Fallback to generator implementation
  return dropIterable(input, skip) as IterationResult<T, T, I>;
}

/**
 * Generator-based implementation of drop for iterables.
 * Performs lazy evaluation.
 */
function* dropIterable<T>(iterable: Iterable<T>, count: number): IterableIterator<T> {
  let remaining = count;
  const iterator = iterable[Symbol.iterator]();

  // Skip the first 'count' elements
  while (remaining > 0) {
    const { done } = iterator.next();
    if (done) {
      return;
    }
    remaining--;
  }

  // Yield the rest of the elements
  let result = iterator.next();
  while (!result.done) {
    yield result.value;
    result = iterator.next();
  }
}
