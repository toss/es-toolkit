import { chunk as chunkIterator } from '../../iterator/chunk.ts';

/**
 * Creates a function that lazily groups the elements of an iterator into arrays
 * of length `size`, for use with {@link pipe}. The final chunk may be shorter.
 *
 * @template T - The type of elements produced by the source iterator.
 * @param size - The length of each chunk; must be an integer greater than zero.
 * @returns A function mapping an `Iterator<T>` to a lazy `IteratorObject<T[]>`.
 * @throws {Error} Throws an error if `size` is not an integer greater than zero.
 *
 * @example
 * import { pipe } from 'es-toolkit/fp';
 * import { chunk, toArray } from 'es-toolkit/fp/iterator';
 *
 * pipe([1, 2, 3, 4, 5].values(), chunk(2), toArray()); // => [[1, 2], [3, 4], [5]]
 */
export function chunk<T>(size: number): (source: Iterator<T>) => IteratorObject<T[], undefined> {
  return function chunkInIterator(source: Iterator<T>): IteratorObject<T[], undefined> {
    return chunkIterator(source, size);
  };
}
