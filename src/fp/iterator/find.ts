/**
 * Creates a function that consumes an iterator until `predicate` returns truthy
 * and returns that element (or `undefined` if none match), for use as the
 * terminal step of a {@link pipe}. It delegates to the native
 * `Iterator.prototype.find` and stops pulling at the first match.
 *
 * @template T - The type of elements produced by the source iterator.
 * @param predicate - Called with `(value, index)`; truthy selects the element.
 * @returns A function mapping an `Iterator<T>` to the matching element or `undefined`.
 *
 * @example
 * import { pipe } from 'es-toolkit/fp';
 * import { find } from 'es-toolkit/fp/iterator';
 *
 * pipe([1, 2, 3, 4].values(), find(x => x > 2)); // => 3
 */
export function find<T>(predicate: (value: T, index: number) => unknown): (source: Iterator<T>) => T | undefined {
  return function findInIterator(source: Iterator<T>): T | undefined {
    return Iterator.from(source).find(predicate);
  };
}
