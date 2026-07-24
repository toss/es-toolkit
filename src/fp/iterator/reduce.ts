/**
 * Creates a function that consumes an iterator and folds its elements into a
 * single value, starting from `initial`, for use as the terminal step of a
 * {@link pipe}. It delegates to the native `Iterator.prototype.reduce`.
 *
 * This is a terminal operation: it pulls every element, so it must not be used
 * on an infinite iterator.
 *
 * @template T - The type of elements produced by the source iterator.
 * @template U - The type of the accumulated value.
 * @param callback - Called with `(accumulator, value, index)`; returns the next accumulator.
 * @param initial - The initial accumulator value.
 * @returns A function mapping an `Iterator<T>` to the final accumulated value.
 *
 * @example
 * import { pipe } from 'es-toolkit/fp';
 * import { reduce } from 'es-toolkit/fp/iterator';
 *
 * pipe([1, 2, 3].values(), reduce((acc, x) => acc + x, 0)); // => 6
 */
export function reduce<T, U>(
  callback: (accumulator: U, value: T, index: number) => U,
  initial: U
): (source: Iterator<T>) => U {
  return function reduceInIterator(source: Iterator<T>): U {
    return Iterator.from(source).reduce(callback, initial);
  };
}
