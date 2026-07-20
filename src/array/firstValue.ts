/**
 * Returns the first value produced by `iterable`, or `undefined` if the
 * iterable is empty. Unlike {@link head} (array-oriented), this works with any
 * iterable — arrays, sets, maps, generators, strings, etc. — and is lazy: it
 * pulls a single value and does not consume the rest. See issue #1796.
 *
 * @template T - The element type.
 * @param iterable - The iterable to read the first value from.
 * @returns The first value, or `undefined` if the iterable is empty.
 *
 * @example
 * firstValue([1, 2, 3]) // 1
 * firstValue(new Set([1, 2])) // 1
 * firstValue([]) // undefined
 *
 * @group array
 */
export function firstValue<T>(iterable: Iterable<T>): T | undefined {
  const iterator = iterable[Symbol.iterator]();
  const result = iterator.next();
  return result.done ? undefined : result.value;
}
