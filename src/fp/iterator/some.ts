/**
 * Creates a function that consumes an iterator until `predicate` returns truthy
 * and reports whether any element matched, for use as the terminal step of a
 * {@link pipe}. It delegates to the native `Iterator.prototype.some` and stops
 * pulling at the first match.
 *
 * @template T - The type of elements produced by the source iterator.
 * @param predicate - Called with `(value, index)`; truthy short-circuits to `true`.
 * @returns A function mapping an `Iterator<T>` to a boolean.
 *
 * @example
 * import { pipe } from 'es-toolkit/fp';
 * import { some } from 'es-toolkit/fp/iterator';
 *
 * pipe([1, 2, 3].values(), some(x => x > 2)); // => true
 */
export function some<T>(predicate: (value: T, index: number) => unknown): (source: Iterator<T>) => boolean {
  return function someInIterator(source: Iterator<T>): boolean {
    return Iterator.from(source).some(predicate);
  };
}
