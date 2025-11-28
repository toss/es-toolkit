import { difference } from './difference.ts';

/**
 * Creates an array that excludes all specified values.
 *
 * It correctly excludes `NaN`, as it compares values using
 * [SameValueZero](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevaluezero).
 *
 * @template T The type of elements in the array.
 * @template V A subtype of T representing the values to exclude.
 * @param {readonly T[]} array - The array to filter.
 * @param {...V[]} values - The values to exclude.
 * @returns {Exclude<T, V>[]} A new array without the specified values.
 *
 * @example
 * // Removes the specified values from the array
 * without([1, 2, 3, 4, 5], 2, 4);
 * // Returns: [1, 3, 5]
 *
 * @example
 * // Removes specified string values from the array
 * without(['a', 'b', 'c', 'a'], 'a');
 * // Returns: ['b', 'c']
 */

// No values provided → return type stays as T[]
export function without<T>(array: readonly T[], ...values: []): T[];

// Literal or specific values provided → return Exclude<T, V>[]
export function without<T, V extends T>(array: readonly T[], ...values: V[]): Array<Exclude<T, V>>;

// Broad fallback overload for full backward compatibility
export function without<T>(array: readonly T[], ...values: T[]): T[];

// Implementation — same runtime logic as before
export function without<T, V extends T = never>(array: readonly T[], ...values: T[]): Array<Exclude<T, V>> {
  return difference(array, values) as Array<Exclude<T, V>>;
}
