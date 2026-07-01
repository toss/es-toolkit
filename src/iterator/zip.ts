import { iterator } from './_internal/iterator.ts';

type IteratorValue<T> = T extends Iterator<infer V> ? V : never;

/**
 * Lazily combines several iterators into a single iterator of tuples, pairing
 * the elements at matching positions. Iteration stops as soon as the **shortest**
 * source is exhausted.
 *
 * Stopping at the shortest source (rather than padding to the longest, as the
 * array `zip` does) is what makes this safe to use with infinite iterators:
 * `zip(range(0, Infinity), names.values())` ends with `names`.
 *
 * @template T - A tuple of the source iterator types.
 * @param sources - The iterators to zip together.
 * @returns A lazy iterator over tuples of the paired elements.
 *
 * @example
 * zip([1, 2, 3].values(), ['a', 'b'].values()).toArray(); // => [[1, 'a'], [2, 'b']]
 */
export function zip<T extends Array<Iterator<unknown>>>(
  ...sources: T
): IteratorObject<{ [K in keyof T]: IteratorValue<T[K]> }, undefined> {
  return iterator(function () {
    if (sources.length === 0) {
      return { value: undefined, done: true };
    }

    const tuple = new Array(sources.length);

    for (let index = 0; index < sources.length; index++) {
      const result = sources[index].next();

      if (result.done) {
        return { value: undefined, done: true };
      }

      tuple[index] = result.value;
    }

    return { value: tuple as { [K in keyof T]: IteratorValue<T[K]> }, done: false };
  });
}
