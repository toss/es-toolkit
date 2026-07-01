import { iterator } from './_internal/iterator.ts';

/**
 * Lazily yields the running accumulation of `source` under `callback`, like a
 * `reduce` that emits every intermediate result. The `initial` value is emitted
 * first, followed by the accumulator after each element.
 *
 * For an input of length `n`, the output has length `n + 1`. This is the
 * "scan-left" / prefix-scan behavior and has no native iterator-helper
 * equivalent.
 *
 * @template T - The type of elements produced by `source`.
 * @template U - The type of the accumulated value.
 * @param source - The iterator to accumulate over.
 * @param callback - Called with `(accumulator, value, index)`; returns the next accumulator.
 * @param initial - The initial accumulator, emitted as the first value.
 * @returns A lazy iterator over the initial value and each successive accumulator.
 *
 * @example
 * scan([1, 2, 3].values(), (acc, x) => acc + x, 0).toArray(); // => [0, 1, 3, 6]
 */
export function scan<T, U>(
  source: Iterator<T>,
  callback: (accumulator: U, value: T, index: number) => U,
  initial: U
): IteratorObject<U, undefined> {
  let accumulator = initial;
  let index = 0;
  let emittedInitial = false;

  return iterator(function () {
    if (!emittedInitial) {
      emittedInitial = true;
      return { value: accumulator, done: false };
    }

    const result = source.next();

    if (result.done) {
      return { value: undefined, done: true };
    }

    accumulator = callback(accumulator, result.value, index++);
    return { value: accumulator, done: false };
  });
}
