/**
 * Lazily yields the [Cartesian product](https://en.wikipedia.org/wiki/Cartesian_product)
 * of the input arrays as a generator, one tuple at a time. This is the lazy
 * counterpart of {@link cartesianProduct}: it does not materialise the full
 * product in memory, so it can be used for very large products or stopped
 * early with `break`/`for...of`.
 *
 * Tuples are yielded in lexicographic order with the rightmost array
 * advancing fastest, matching {@link cartesianProduct}. If no arrays are
 * passed, a single empty tuple is yielded. If any input array is empty,
 * nothing is yielded.
 *
 * See issue #1061.
 *
 * @template T
 * @param arrs - The arrays to take the product of.
 * @returns A generator yielding one tuple (`T[]`) at a time.
 *
 * @example
 * const gen = cartesianProductGenerator([1, 2], ['a', 'b']);
 * for (const tuple of gen) {
 *   console.log(tuple);
 * }
 * // [1, 'a']
 * // [1, 'b']
 * // [2, 'a']
 * // [2, 'b']
 */
export function* cartesianProductGenerator<T>(...arrs: Array<readonly T[]>): Generator<T[]> {
  if (arrs.length === 0) {
    yield [];
    return;
  }

  const [head, ...tail] = arrs;

  if (head.length === 0) {
    return;
  }

  for (let i = 0; i < head.length; i++) {
    for (const rest of cartesianProductGenerator<T>(...tail)) {
      yield [head[i], ...rest];
    }
  }
}
