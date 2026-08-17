/**
 * Consumes `source` and returns the number of elements it produces. This is a
 * terminal operation: it pulls every element, so it must not be used on an
 * infinite iterator.
 *
 * Unlike `source.toArray().length`, this counts without allocating an array.
 *
 * @template T - The type of elements produced by the iterator.
 * @param source - The iterator to count.
 * @returns The number of elements produced by `source`.
 *
 * @example
 * count([1, 2, 3].values()); // => 3
 */
export function count<T>(source: Iterator<T>): number {
  let total = 0;

  let next = source.next();
  while (!next.done) {
    total++;
    next = source.next();
  }

  return total;
}
