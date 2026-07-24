import { iterator } from './_internal/iterator.ts';

/**
 * Creates an infinite lazy iterator that starts with `seed` and repeatedly
 * applies `getNext` to produce the following value: `seed`, `getNext(seed)`,
 * `getNext(getNext(seed))`, and so on.
 *
 * Because the iterator is infinite, it must be bounded by a short-circuiting
 * helper such as the native `take` or {@link takeWhile} before being consumed.
 *
 * @template T - The type of values produced by the iterator.
 * @param seed - The first value of the sequence.
 * @param getNext - Computes the next value from the current one.
 * @returns An infinite lazy iterator over the generated sequence.
 *
 * @example
 * iterate(1, x => x * 2).take(5).toArray(); // => [1, 2, 4, 8, 16]
 */
export function iterate<T>(seed: T, getNext: (value: T) => T): IteratorObject<T, undefined> {
  let current = seed;
  let started = false;

  return iterator(function () {
    if (started) {
      current = getNext(current);
    } else {
      started = true;
    }

    return { value: current, done: false };
  });
}
