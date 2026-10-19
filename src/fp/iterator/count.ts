import { count as countIterator } from '../../iterator/count.ts';

/**
 * Creates a function that consumes an iterator and returns the number of
 * elements it produces, for use as the terminal step of a {@link pipe}.
 *
 * This is a terminal operation: it pulls every element, so it must not be used
 * on an infinite iterator.
 *
 * @template T - The type of elements produced by the source iterator.
 * @returns A function mapping an `Iterator<T>` to its element count.
 *
 * @example
 * import { pipe } from 'es-toolkit/fp';
 * import { filter, count } from 'es-toolkit/fp/iterator';
 *
 * pipe([1, 2, 3, 4].values(), filter(x => x % 2 === 0), count()); // => 2
 */
export function count<T>(): (source: Iterator<T>) => number {
  return function countInIterator(source: Iterator<T>): number {
    return countIterator(source);
  };
}
