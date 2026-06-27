import { toSet as toSetIterator } from '../../iterator/toSet.ts';

/**
 * Creates a function that consumes an iterator and collects its elements into a
 * `Set`, for use as the terminal step of a {@link pipe}.
 *
 * This is a terminal operation: it pulls every element, so it must not be used
 * on an infinite iterator.
 *
 * @template T - The type of elements produced by the source iterator.
 * @returns A function mapping an `Iterator<T>` to a `Set<T>`.
 *
 * @example
 * import { pipe } from 'es-toolkit/fp';
 * import { toSet } from 'es-toolkit/fp/iterator';
 *
 * pipe([1, 2, 2, 3].values(), toSet()); // => Set(3) { 1, 2, 3 }
 */
export function toSet<T>(): (source: Iterator<T>) => Set<T> {
  return function toSetInIterator(source: Iterator<T>): Set<T> {
    return toSetIterator(source);
  };
}
