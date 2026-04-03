/**
 * Combines multiple iterables into a single iterable of tuples,
 * pairing elements at the same index from each iterable.
 *
 * Stops when the shortest iterable is exhausted.
 * This function is lazy. it does not iterate over the provided iterables
 * until the returned iterable is iterated.
 *
 * @template T - A tuple type representing the element types of each iterable.
 * @param {[...{ [K in keyof T]: Iterable<T[K]> }]} iterables - The iterables to zip.
 * @returns {IterableIterator<T>} An iterable iterator that yields tuples of elements.
 *
 * @example
 * Basic usage
 * const result = zipIterable([1, 2, 3], ['a', 'b', 'c']);
 * console.log([...result]); // [[1, 'a'], [2, 'b'], [3, 'c']]
 *
 * @example
 * Stops at the shortest iterable
 * const result = zipIterable([1, 2, 3], ['a', 'b']);
 * console.log([...result]); // [[1, 'a'], [2, 'b']]
 *
 * @example
 * Works with any iterable. not just arrays
 * const names = new Set(['toss', 'tech', 'korea']);
 * const scores = [90, 85, 92];
 * for (const [name, score] of zipIterable(names, scores)) {
 *   console.log(`${name}: ${score}`);
 * }
 *
 * @example
 * Merging two parallel API responses by index
 * const [users, profiles] = await Promise.all([fetchUsers(), fetchProfiles()]);
 * const merged = [...zipIterable(users, profiles)].map(([user, profile]) => ({
 *   ...user,
 *   ...profile,
 * }));
 *
 * @example
 * Comparing previous and current values (diff pattern)
 * const prev = [100, 200, 300];
 * const curr = [110, 190, 350];
 * const diffs = [...zipIterable(prev, curr)].map(([before, after]) => ({
 *   before,
 *   after,
 *   delta: after - before,
 *   percent: ((after - before) / before) * 100,
 * }));
 * // [{ before: 100, after: 110, delta: 10, percent: 10 }, ...]
 *
 * @example
 * Mapping column definitions to server-returned row arrays (e.g. CSV import)
 * const columns = [
 *   { key: 'name', label: 'Name' },
 *   { key: 'score', label: 'Score' },
 * ];
 * const rows: unknown[][] = [['Toss', 95], ['Tech', 82]];
 * const normalized = rows.map(row =>
 *   Object.fromEntries([...zipIterable(columns, row)].map(([col, value]) => [col.key, value]))
 * );
 * // [{ name: 'Toss', score: 95 }, { name: 'Tech', score: 82 }]
 *
 * @example
 * Detecting changed fields between renders (e.g. with usePrevious hook)
 * function useChangedFields<T extends object>(current: T, previous: T) {
 *   return [...zipIterable(Object.entries(current), Object.entries(previous))]
 *     .filter(([[, curr], [, prev]]) => curr !== prev)
 *     .map(([[key, curr], [, prev]]) => ({ key, prev, curr }));
 * }
 * // [{ key: 'score', prev: 82, curr: 95 }]
 */
export function* zipIterable<T extends readonly unknown[]>(
  ...iterables: { [K in keyof T]: Iterable<T[K]> }
): IterableIterator<T> {
  const iterators = iterables.map(iterable => iterable[Symbol.iterator]());
  const len = iterators.length;

  while (true) {
    const tuple: unknown[] = new Array(len);

    for (let i = 0; i < len; i++) {
      const result = iterators[i].next();

      if (result.done) {
        return;
      }

      tuple[i] = result.value;
    }

    yield tuple as unknown as T;
  }
}
