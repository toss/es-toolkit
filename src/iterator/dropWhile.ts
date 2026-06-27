import { iterator } from './_internal/iterator.ts';

/**
 * Lazily skips elements from `source` as long as `shouldDrop` returns a truthy
 * value, then yields every remaining element (including the one that first
 * failed the predicate).
 *
 * The native iterator helpers offer `drop` (by count) but not a predicate-based
 * `dropWhile`, which is why this is provided.
 *
 * @template T - The type of elements produced by the iterator.
 * @param source - The iterator to drop elements from.
 * @param shouldDrop - Called with `(value, index)`; elements are skipped while it returns truthy.
 * @returns A lazy iterator over the elements after the dropped leading run.
 *
 * @example
 * dropWhile([1, 2, 3, 1].values(), x => x < 3).toArray(); // => [3, 1]
 */
export function dropWhile<T>(
  source: Iterator<T>,
  shouldDrop: (value: T, index: number) => boolean
): IteratorObject<T, undefined> {
  let index = 0;
  let dropping = true;

  return iterator(function () {
    while (dropping) {
      const result = source.next();

      if (result.done) {
        dropping = false;
        return { value: undefined, done: true };
      }

      if (!shouldDrop(result.value, index++)) {
        dropping = false;
        return { value: result.value, done: false };
      }
    }

    const result = source.next();

    if (result.done) {
      return { value: undefined, done: true };
    }

    return { value: result.value, done: false };
  });
}
