import { scan as scanIterator } from '../../iterator/scan.ts';

/**
 * Creates a function that lazily yields the running accumulation of an iterator,
 * emitting `initial` first and then the accumulator after each element, for use
 * with {@link pipe}.
 *
 * @template T - The type of elements produced by the source iterator.
 * @template U - The type of the accumulated value.
 * @param callback - Called with `(accumulator, value, index)`; returns the next accumulator.
 * @param initial - The initial accumulator, emitted as the first value.
 * @returns A function mapping an `Iterator<T>` to a lazy `IteratorObject<U>`.
 *
 * @example
 * import { pipe } from 'es-toolkit/fp';
 * import { scan, toArray } from 'es-toolkit/fp/iterator';
 *
 * pipe([1, 2, 3].values(), scan((acc, x) => acc + x, 0), toArray()); // => [0, 1, 3, 6]
 */
export function scan<T, U>(
  callback: (accumulator: U, value: T, index: number) => U,
  initial: U
): (source: Iterator<T>) => IteratorObject<U, undefined> {
  return function scanInIterator(source: Iterator<T>): IteratorObject<U, undefined> {
    return scanIterator(source, callback, initial);
  };
}
