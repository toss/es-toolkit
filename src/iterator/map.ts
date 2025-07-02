import {
  hasNativeIteratorHelpers,
  isArray,
  type IterableLike,
  type IterationResult,
  type IteratorWithHelpers,
} from './types.ts';

/**
 * Maps each value in the iterator or array using the provided mapper function.
 *
 * If the input is an array, returns a new array with the mapped values.
 * If the input is an iterable, returns a lazy iterable iterator.
 * Uses native iterator helpers if available.
 *
 * @template T - Type of input values
 * @template U - Type of output values
 * @template I - Type of input collection (inferred)
 * @param {IterableLike<T>} input - The input array or iterable
 * @param {(item: T, index: number) => U} mapper - Function to map each value
 * @returns {IterationResult<T, U, I>} Array or lazy iterator with transformed values
 *
 * @example
 * // Array input
 * const numbers = [1, 2, 3];
 * const doubled = map(numbers, n => n * 2);
 * // doubled will be [2, 4, 6]
 *
 * @example
 * // Iterable input
 * const set = new Set([1, 2, 3]);
 * const doubled = map(set, n => n * 2);
 * // doubled will be an IterableIterator with values 2, 4, 6
 * // Access with [...doubled] or for-of loop
 */
export function map<T, U, I extends IterableLike<T>>(
  input: I,
  mapper: (item: T, index: number) => U
): IterationResult<T, U, I> {
  // Use array's native map for arrays (optimized)
  if (isArray(input)) {
    return input.map(mapper) as IterationResult<T, U, I>;
  }

  // Use native iterator helpers if available
  if (hasNativeIteratorHelpers()) {
    const iterator = input[Symbol.iterator]() as IteratorWithHelpers<T>;
    if (typeof iterator.map === 'function') {
      return iterator.map((value: T) => mapper(value, 0)) as IterationResult<T, U, I>;
    }
  }

  // Fallback to generator implementation
  return mapIterable(input, mapper) as IterationResult<T, U, I>;
}

/**
 * Generator-based implementation of map for iterables.
 * Performs lazy evaluation.
 */
function* mapIterable<T, U>(iterable: Iterable<T>, mapper: (item: T, index: number) => U): IterableIterator<U> {
  let index = 0;
  for (const item of iterable) {
    yield mapper(item, index++);
  }
}
