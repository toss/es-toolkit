/**
 * Creates a function that lazily skips the first `count` elements of an iterator
 * and yields the rest, for use with {@link pipe}. It delegates to the native
 * `Iterator.prototype.drop`.
 *
 * @template T - The type of elements produced by the source iterator.
 * @param count - The number of elements to skip; must be a non-negative integer.
 * @returns A function mapping an `Iterator<T>` to a lazy `IteratorObject<T>`.
 * @throws {RangeError} Throws if `count` is negative or `NaN` (native behavior).
 *
 * @example
 * import { pipe } from 'es-toolkit/fp';
 * import { drop } from 'es-toolkit/fp/iterator';
 *
 * pipe([1, 2, 3, 4, 5].values(), drop(2)).toArray(); // => [3, 4, 5]
 */
export function drop<T>(count: number): (source: Iterator<T>) => IteratorObject<T, undefined> {
  return function dropInIterator(source: Iterator<T>): IteratorObject<T, undefined> {
    return Iterator.from(source).drop(count);
  };
}
