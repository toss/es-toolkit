/**
 * Creates a function that lazily keeps the elements of an iterator for which
 * `predicate` returns truthy, narrowing the element type when `predicate` is a
 * type guard. For use with {@link pipe}. It delegates to the native
 * `Iterator.prototype.filter`.
 *
 * @template T - The type of elements produced by the source iterator.
 * @template S - The narrowed element type when `predicate` is a type guard.
 * @param predicate - Called with `(value, index)`; truthy keeps the element.
 * @returns A function mapping an `Iterator<T>` to a lazy `IteratorObject<S>`.
 *
 * @example
 * import { pipe } from 'es-toolkit/fp';
 * import { filter } from 'es-toolkit/fp/iterator';
 *
 * pipe([1, 2, 3, 4].values(), filter(x => x % 2 === 0)).toArray(); // => [2, 4]
 */
export function filter<T, S extends T>(
  predicate: (value: T, index: number) => value is S
): (source: Iterator<T>) => IteratorObject<S, undefined>;

/**
 * Creates a function that lazily keeps the elements of an iterator for which
 * `predicate` returns truthy, for use with {@link pipe}. It delegates to the
 * native `Iterator.prototype.filter`.
 *
 * @template T - The type of elements produced by the source iterator.
 * @param predicate - Called with `(value, index)`; truthy keeps the element.
 * @returns A function mapping an `Iterator<T>` to a lazy `IteratorObject<T>`.
 *
 * @example
 * import { pipe } from 'es-toolkit/fp';
 * import { filter } from 'es-toolkit/fp/iterator';
 *
 * pipe([1, 2, 3, 4].values(), filter(x => x % 2 === 0)).toArray(); // => [2, 4]
 */
export function filter<T>(
  predicate: (value: T, index: number) => unknown
): (source: Iterator<T>) => IteratorObject<T, undefined>;

export function filter<T>(
  predicate: (value: T, index: number) => unknown
): (source: Iterator<T>) => IteratorObject<T, undefined> {
  return function filterInIterator(source: Iterator<T>): IteratorObject<T, undefined> {
    return Iterator.from(source).filter(predicate) as IteratorObject<T, undefined>;
  };
}
