/**
 * Creates a function that lazily yields the first `limit` elements of an
 * iterator, for use with {@link pipe}. It delegates to the native
 * `Iterator.prototype.take`, which stops pulling from the source once `limit`
 * elements have been produced.
 *
 * @template T - The type of elements produced by the source iterator.
 * @param limit - The number of elements to take; must be a non-negative integer.
 * @returns A function mapping an `Iterator<T>` to a lazy `IteratorObject<T>`.
 * @throws {RangeError} Throws if `limit` is negative or `NaN` (native behavior).
 *
 * @example
 * import { pipe } from 'es-toolkit/fp';
 * import { take } from 'es-toolkit/fp/iterator';
 *
 * pipe([1, 2, 3, 4, 5].values(), take(3)).toArray(); // => [1, 2, 3]
 */
export function take<T>(limit: number): (source: Iterator<T>) => IteratorObject<T, undefined> {
  return function takeInIterator(source: Iterator<T>): IteratorObject<T, undefined> {
    return Iterator.from(source).take(limit);
  };
}
