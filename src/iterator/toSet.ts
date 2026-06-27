/**
 * Consumes `source` and collects its elements into a new `Set`, removing
 * duplicates by SameValueZero equality. This is a terminal operation: it pulls
 * every element, so it must not be used on an infinite iterator.
 *
 * @template T - The type of elements produced by the iterator.
 * @param source - The iterator to drain into a `Set`.
 * @returns A `Set` containing the distinct elements of `source`.
 *
 * @example
 * toSet([1, 2, 2, 3].values()); // => Set(3) { 1, 2, 3 }
 */
export function toSet<T>(source: Iterator<T>): Set<T> {
  const result = new Set<T>();

  let next = source.next();
  while (!next.done) {
    result.add(next.value);
    next = source.next();
  }

  return result;
}
