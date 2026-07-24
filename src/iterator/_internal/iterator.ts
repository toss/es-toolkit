/**
 * Wraps a `next` function into a lazy {@link IteratorObject} whose prototype is
 * the native `Iterator.prototype`. The result therefore behaves exactly like a
 * value returned by a built-in iterator helper (e.g. `array.values().map(...)`):
 * it is single-shot, it is iterable via `Symbol.iterator` (returning itself),
 * and it carries every native helper method (`map`, `filter`, `take`, `drop`,
 * `flatMap`, `reduce`, `toArray`, ...) so results can be chained with them.
 *
 * Using a hand-rolled `next` rather than a generator function is a deliberate
 * performance choice — driving the iterator protocol directly measured roughly
 * twice as fast as `yield`-based generators for the same transforms, while
 * `Object.create(Iterator.prototype)` adds no measurable overhead over a plain
 * object literal.
 *
 * @template T - The type of values produced by the iterator.
 * @param next - Called to produce each step; return `{ done: true, value: undefined }` to finish.
 * @returns A lazy {@link IteratorObject} that yields the values produced by `next`.
 *
 * @example
 * function repeat<T>(value: T, times: number): IteratorObject<T, undefined> {
 *   let remaining = times;
 *   return iterator(function () {
 *     if (remaining <= 0) {
 *       return { value: undefined, done: true };
 *     }
 *     remaining--;
 *     return { value, done: false };
 *   });
 * }
 */
export function iterator<T>(next: () => IteratorResult<T, undefined>): IteratorObject<T, undefined> {
  const result = Object.create(Iterator.prototype) as IteratorObject<T, undefined> & {
    next: () => IteratorResult<T, undefined>;
  };
  result.next = next;
  return result;
}
