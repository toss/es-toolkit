/**
 * Creates a function that consumes an iterator and runs `callback` for each
 * element, for use as the terminal step of a {@link pipe}. It delegates to the
 * native `Iterator.prototype.forEach`.
 *
 * This is a terminal operation: it pulls every element, so it must not be used
 * on an infinite iterator.
 *
 * @template T - The type of elements produced by the source iterator.
 * @param callback - Called with `(value, index)` for each element.
 * @returns A function mapping an `Iterator<T>` to `void`.
 *
 * @example
 * import { pipe } from 'es-toolkit/fp';
 * import { forEach } from 'es-toolkit/fp/iterator';
 *
 * pipe([1, 2, 3].values(), forEach(x => console.log(x))); // logs 1, 2, 3
 */
export function forEach<T>(callback: (value: T, index: number) => void): (source: Iterator<T>) => void {
  return function forEachInIterator(source: Iterator<T>): void {
    Iterator.from(source).forEach(callback);
  };
}
