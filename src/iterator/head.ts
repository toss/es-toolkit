/**
 * Returns the first element produced by `source`, or `undefined` if it is empty.
 * This pulls a single element and then stops, so it is safe to use on an
 * infinite iterator.
 *
 * @template T - The type of elements produced by the iterator.
 * @param source - The iterator to read the first element from.
 * @returns The first element, or `undefined` when the iterator yields nothing.
 *
 * @example
 * head([1, 2, 3].values()); // => 1
 * head([].values()); // => undefined
 */
export function head<T>(source: Iterator<T>): T | undefined {
  const result = source.next();
  return result.done ? undefined : result.value;
}
