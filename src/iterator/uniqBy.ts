import { iterator } from './_internal/iterator.ts';

/**
 * Lazily yields the elements of `source` whose mapped key has not been seen
 * before, preserving the order of first occurrence. Keys are compared with
 * SameValueZero semantics (matching `Set`).
 *
 * Deduplication is streaming: each element is emitted as soon as it is found to
 * be unique, so this works with infinite iterators when bounded by a
 * short-circuiting helper.
 *
 * @template T - The type of elements produced by the iterator.
 * @template K - The type of the key used for comparison.
 * @param source - The iterator to deduplicate.
 * @param getKey - Maps an element to the key used to detect duplicates.
 * @returns A lazy iterator over the elements with duplicate keys removed.
 *
 * @example
 * uniqBy([1.1, 1.2, 2.3, 2.4].values(), Math.floor).toArray(); // => [1.1, 2.3]
 */
export function uniqBy<T, K>(source: Iterator<T>, getKey: (value: T) => K): IteratorObject<T, undefined> {
  const seen = new Set<K>();

  return iterator(function () {
    let result = source.next();

    while (!result.done) {
      const key = getKey(result.value);

      if (!seen.has(key)) {
        seen.add(key);
        return { value: result.value, done: false };
      }

      result = source.next();
    }

    return { value: undefined, done: true };
  });
}
