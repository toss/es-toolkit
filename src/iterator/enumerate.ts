/**
 * Pairs each element of an iterable with its index.
 *
 * Unlike `Array.prototype.entries()`, this works with any iterable.
 * not just arrays.
 * This function is lazy. it does not iterate over the provided iterable
 * until the returned iterable is iterated.
 *
 * @template T - The type of elements in the iterable.
 * @param {Iterable<T>} iterable - The iterable to enumerate.
 * @param {number} [start=0] - The starting index. Defaults to `0`.
 * @returns {IterableIterator<[number, T]>} An iterable iterator that yields `[index, element]` tuples.
 *
 * @example
 * const result = enumerate(['a', 'b', 'c']);
 * // console.log([...result]); [[0, 'a'], [1, 'b'], [2, 'c']]
 *
 * @example
 * Works with any iterable. not just arrays
 * for (const [index, value] of enumerate(new Set(['x', 'y', 'z']))) {
 *   console.log(`${index}: ${value}`);
 * }
 * 0: x
 * 1: y
 * 2: z
 *
 * @example
 * Custom start index
 * const result = enumerate(['a', 'b', 'c'], 1);
 * console.log([...result]); // [[1, 'a'], [2, 'b'], [3, 'c']]
 *
 * @example
 * Works with generator functions
 * function* words() {
 *   yield 'hello';
 *   yield 'world';
 * }
 * console.log([...enumerate(words())]); // [[0, 'hello'], [1, 'world']]
 */
export function* enumerate<T>(iterable: Iterable<T>, start?: number): IterableIterator<[number, T]> {
  let index = start ?? 0;

  for (const value of iterable) {
    yield [index++, value];
  }
}
