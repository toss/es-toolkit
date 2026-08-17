import { uniqBy as uniqByIterator } from '../../iterator/uniqBy.ts';

/**
 * Creates a function that lazily yields the elements of an iterator whose mapped
 * key has not been seen before, preserving first-occurrence order, for use with
 * {@link pipe}. Keys are compared with SameValueZero semantics.
 *
 * @template T - The type of elements produced by the source iterator.
 * @template K - The type of the key used for comparison.
 * @param getKey - Maps an element to the key used to detect duplicates.
 * @returns A function mapping an `Iterator<T>` to a lazy `IteratorObject<T>`.
 *
 * @example
 * import { pipe } from 'es-toolkit/fp';
 * import { uniqBy, toArray } from 'es-toolkit/fp/iterator';
 *
 * pipe([1.1, 1.2, 2.3].values(), uniqBy(Math.floor), toArray()); // => [1.1, 2.3]
 */
export function uniqBy<T, K>(getKey: (value: T) => K): (source: Iterator<T>) => IteratorObject<T, undefined> {
  return function uniqByInIterator(source: Iterator<T>): IteratorObject<T, undefined> {
    return uniqByIterator(source, getKey);
  };
}
