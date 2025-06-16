import { hasNativeIteratorHelpers, isArray, type IterableLike, type IterationResult } from './types.ts';

/**
 * Filters values in the iterator or array using the provided predicate function.
 *
 * If the input is an array, returns a new array with filtered values.
 * If the input is an iterable, returns a lazy iterable iterator.
 * Uses native iterator helpers if available.
 *
 * @template T - Type of values
 * @template I - Type of input collection (inferred)
 * @param {IterableLike<T>} input - The input array or iterable
 * @param {(item: T, index: number) => boolean} predicate - Function to test each value
 * @returns {IterationResult<T, T, I>} Array or lazy iterator with filtered values
 *
 * @example
 * // Array input
 * const numbers = [1, 2, 3, 4, 5];
 * const evens = filter(numbers, n => n % 2 === 0);
 * // evens will be [2, 4]
 *
 * @example
 * // Iterable input
 * const set = new Set([1, 2, 3, 4, 5]);
 * const evens = filter(set, n => n % 2 === 0);
 * // evens will be an IterableIterator with values 2, 4
 * // Access with [...evens] or for-of loop
 */
export function filter<T, I extends IterableLike<T>>(
  input: I,
  predicate: (item: T, index: number) => boolean
): IterationResult<T, T, I> {
  // Use array's native filter for arrays (optimized)
  if (isArray(input)) {
    return input.filter(predicate) as IterationResult<T, T, I>;
  }

  // Use native iterator helpers if available
  if (hasNativeIteratorHelpers()) {
    const iterator = input[Symbol.iterator]();
    if (typeof iterator.filter === 'function') {
      return iterator.filter((value: T) => predicate(value, 0)) as IterationResult<T, T, I>;
    }
  }

  // Fallback to generator implementation
  return filterIterable(input, predicate) as IterationResult<T, T, I>;
}

/**
 * Generator-based implementation of filter for iterables.
 * Performs lazy evaluation.
 */
function* filterIterable<T>(
  iterable: Iterable<T>,
  predicate: (item: T, index: number) => boolean
): IterableIterator<T> {
  let index = 0;
  for (const item of iterable) {
    if (predicate(item, index++)) {
      yield item;
    }
  }
}
