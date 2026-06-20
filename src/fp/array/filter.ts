import type { LazyEvaluator } from '../_internal/lazy.ts';
import { SKIP_ITEM, toLazy } from '../_internal/lazy.ts';

/**
 * Creates a data-last operator that keeps only the elements for which
 * `predicate` returns a truthy value, equivalent to `Array.prototype.filter`.
 * A type predicate narrows the element type of the result.
 *
 * The returned operator is **lazy-capable**: inside a {@link pipe} it is fused
 * with adjacent lazy operators and runs element-by-element.
 *
 * @template T - The type of elements in the input array.
 * @template S - The narrowed element type when `predicate` is a type guard.
 * @param predicate - Called with `(value, index, array)` for each element;
 *   return `true` to keep the element. During lazy evaluation `array` holds
 *   only the elements seen so far.
 * @returns A function that maps a `readonly T[]` to a filtered array.
 *
 * @example
 * import { pipe, filter } from 'es-toolkit/fp';
 *
 * pipe([1, 2, 3, 4], filter(x => x % 2 === 0)); // => [2, 4]
 *
 * @example
 * // A type guard narrows the result type to `string[]`.
 * pipe([1, 'a', 2, 'b'], filter((x): x is string => typeof x === 'string')); // => ['a', 'b']
 */
export function filter<T, S extends T>(
  predicate: (value: T, index: number, array: readonly T[]) => value is S
): (array: readonly T[]) => S[];
export function filter<T>(
  predicate: (value: T, index: number, array: readonly T[]) => boolean
): (array: readonly T[]) => T[];
export function filter<T>(
  predicate: (value: T, index: number, array: readonly T[]) => boolean
): (array: readonly T[]) => T[] {
  return toLazy(
    (array: readonly T[]): T[] => array.filter((value, index) => predicate(value, index, array)),
    filterLazy,
    [predicate]
  );
}

function filterLazy<T>(predicate: (value: T, index: number, array: readonly T[]) => boolean): LazyEvaluator<T> {
  return (value, index, data) =>
    predicate(value, index, data) ? { done: false, hasNext: true, next: value } : SKIP_ITEM;
}
