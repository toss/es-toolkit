/**
 * Chains multiple iterables together into a single lazy iterator (Python's
 * `itertools.chain`). Like `Array.prototype.concat`, but lazy — it yields
 * elements from each iterable in order without building an intermediate array,
 * and works with any iterable (not only `Symbol.isConcatSpreadable` ones).
 *
 * @template T - The element type.
 * @param iterables - The iterables to chain.
 * @returns A lazy iterator over every element of every iterable, in order.
 *
 * @example
 * Array.from(chain('ABC', [1, 2, 3])) // ['A', 'B', 'C', 1, 2, 3]
 * @example
 * const evens = [2, 4, 6]
 * const odds = [1, 3, 5]
 * Array.from(chain(evens, odds)) // [2, 4, 6, 1, 3, 5]
 *
 * @group array
 */
export function chain<T>(...iterables: ReadonlyArray<Iterable<T>>): IterableIterator<T> {
  return (function* () {
    for (let i = 0; i < iterables.length; i++) {
      for (const item of iterables[i]) {
        yield item;
      }
    }
  })();
}
