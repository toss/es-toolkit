/**
 * Wraps a `next` function into a lazy {@link IteratorObject} whose prototype is
 * the native `Iterator.prototype`. The result therefore behaves exactly like a
 * value returned by a built-in iterator helper (e.g. `array.values().map(...)`):
 * it is single-shot, it is iterable via `Symbol.iterator` (returning itself),
 * and it carries every native helper method (`map`, `filter`, `take`, `drop`,
 * `flatMap`, `reduce`, `toArray`, ...) so results can be chained with them.
 *
 * The result also follows the IteratorClose protocol of the native helpers, so
 * upstream resources (e.g. `try/finally` blocks in generator sources) are
 * released. `onClose` runs exactly once, at whichever of these happens first:
 * the consumer terminates early (`return()`, e.g. from `take` or a `for...of`
 * `break`), `next` throws, or `next` reports done. After the iterator is
 * closed, `next` is never called again and every subsequent step is done.
 *
 * Using a hand-rolled `next` rather than a generator function is a deliberate
 * performance choice — driving the iterator protocol directly measured roughly
 * twice as fast as `yield`-based generators for the same transforms, while
 * `Object.create(Iterator.prototype)` adds no measurable overhead over a plain
 * object literal.
 *
 * @template T - The type of values produced by the iterator.
 * @param next - Called to produce each step; return `{ done: true, value: undefined }` to finish.
 * @param onClose - Called once when the iterator closes; use it to close upstream iterators.
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
export function iterator<T>(
  next: () => IteratorResult<T, undefined>,
  onClose?: () => void
): IteratorObject<T, undefined> {
  let closed = false;

  const close = () => {
    if (!closed) {
      closed = true;
      onClose?.();
    }
  };

  const result = Object.create(Iterator.prototype) as IteratorObject<T, undefined> & {
    next: () => IteratorResult<T, undefined>;
    return: () => IteratorResult<T, undefined>;
  };

  result.next = function () {
    if (closed) {
      return { value: undefined, done: true };
    }

    let step;
    try {
      step = next();
    } catch (error) {
      close();
      throw error;
    }

    if (step.done) {
      close();
    }

    return step;
  };

  result.return = function () {
    close();
    return { value: undefined, done: true };
  };

  return result;
}
