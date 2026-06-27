/**
 * Creates a function that lazily transforms each element of an iterator with
 * `callback`, for use with {@link pipe}. It delegates to the native
 * `Iterator.prototype.map`, so the result is a lazy, single-shot iterator.
 *
 * @template T - The type of elements produced by the source iterator.
 * @template U - The type of elements produced by the result.
 * @param callback - Called with `(value, index)`; its return value is yielded.
 * @returns A function mapping an `Iterator<T>` to a lazy `IteratorObject<U>`.
 *
 * @example
 * import { pipe } from 'es-toolkit/fp';
 * import { map } from 'es-toolkit/fp/iterator';
 *
 * pipe([1, 2, 3].values(), map(x => x * 2)).toArray(); // => [2, 4, 6]
 */
export function map<T, U>(
  callback: (value: T, index: number) => U
): (source: Iterator<T>) => IteratorObject<U, undefined> {
  return function mapInIterator(source: Iterator<T>): IteratorObject<U, undefined> {
    return Iterator.from(source).map(callback);
  };
}
