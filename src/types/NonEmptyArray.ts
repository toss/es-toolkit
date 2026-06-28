/**
 * An array guaranteed to have at least one element.
 *
 * Modeled as a tuple with a required first element followed by a rest, so the
 * type system knows the array is never empty. This lets accessors like the first
 * element resolve to `T` instead of `T | undefined`.
 *
 * @template T - The type of the elements.
 *
 * @example
 * const a: NonEmptyArray<number> = [1];        // ok
 * const b: NonEmptyArray<number> = [1, 2, 3];  // ok
 * const c: NonEmptyArray<number> = [];         // error: empty array not allowed
 *
 * @example
 * function first<T>(arr: NonEmptyArray<T>): T {
 *   return arr[0]; // T, not T | undefined
 * }
 */
export type NonEmptyArray<T> = [T, ...T[]];
