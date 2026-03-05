/**
 * Combines multiple iterables into a single iterable, yielding elements
 * from each iterable in order.
 *
 * This function is lazy — it does not iterate over the provided iterables
 * until the returned iterable is iterated.
 *
 * @template T - The type of elements in the iterables.
 * @param {Iterable<T>[]} iterables - The iterables to chain together.
 * @returns {IterableIterator<T>} An iterable iterator that yields elements from each iterable in order.
 *
 * @example
 * const result = chain([1, 2, 3], [4, 5, 6]);
 * console.log([...result]); // [1, 2, 3, 4, 5, 6]
 *
 * @example
 * Works with any iterable
 * const result = chain(new Set([1, 2]), new Map([[3, 'a']]).keys(), [4]);
 * console.log([...result]); // [1, 2, 3, 4]
 */
export function* chain<T>(...iterables: Array<Iterable<T>>): IterableIterator<T> {
  for (let i = 0; i < iterables.length; i++) {
    yield* iterables[i];
  }
}
