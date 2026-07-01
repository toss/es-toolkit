import { head as headIterator } from '../../iterator/head.ts';

/**
 * Creates a function that returns the first element of an iterator (or
 * `undefined` if it is empty), for use as the terminal step of a {@link pipe}.
 * It pulls a single element and then stops, so it is safe on an infinite
 * iterator.
 *
 * @template T - The type of elements produced by the source iterator.
 * @returns A function mapping an `Iterator<T>` to its first element or `undefined`.
 *
 * @example
 * import { pipe } from 'es-toolkit/fp';
 * import { filter, head } from 'es-toolkit/fp/iterator';
 *
 * pipe([1, 2, 3, 4].values(), filter(x => x % 2 === 0), head()); // => 2
 */
export function head<T>(): (source: Iterator<T>) => T | undefined {
  return function headInIterator(source: Iterator<T>): T | undefined {
    return headIterator(source);
  };
}
