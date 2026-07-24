import { partition as partitionIterator } from '../../iterator/partition.ts';

/**
 * Creates a function that consumes an iterator and splits its elements into
 * `[matched, unmatched]` arrays by `predicate`, for use as the terminal step of
 * a {@link pipe}.
 *
 * This is a terminal operation: it pulls every element, so it must not be used
 * on an infinite iterator.
 *
 * @template T - The type of elements produced by the source iterator.
 * @param predicate - Called with `(value, index)`; truthy sends the element to the first array.
 * @returns A function mapping an `Iterator<T>` to a `[T[], T[]]` tuple.
 *
 * @example
 * import { pipe } from 'es-toolkit/fp';
 * import { partition } from 'es-toolkit/fp/iterator';
 *
 * pipe([1, 2, 3, 4].values(), partition(x => x % 2 === 0)); // => [[2, 4], [1, 3]]
 */
export function partition<T>(predicate: (value: T, index: number) => boolean): (source: Iterator<T>) => [T[], T[]] {
  return function partitionInIterator(source: Iterator<T>): [T[], T[]] {
    return partitionIterator(source, predicate);
  };
}
