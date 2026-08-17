/**
 * An array guaranteed to have at least one element.
 * The first element resolves to `T` instead of `T | undefined`.
 *
 * @template T - The type of the elements.
 *
 * @example
 * const a: NonEmptyArray<number> = [1, 2, 3]; // ok
 * const b: NonEmptyArray<number> = [];        // error: empty array not allowed
 */
export type NonEmptyArray<T> = [T, ...T[]];
