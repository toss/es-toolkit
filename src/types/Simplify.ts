/**
 * Flattens an intersection or mapped type into a single, readable object type.
 *
 * Purely cosmetic: the resulting type is identical, but editors show the
 * resolved shape (`{ a: 1; b: 2 }`) instead of `A & B`. Handy for cleaning up
 * tooltips on composed types. Optional and readonly modifiers are preserved.
 *
 * @template T - The type to flatten.
 *
 * @example
 * type A = { name: string };
 * type B = { age: number };
 * type User = Simplify<A & B>;
 * // hover => { name: string; age: number }   (instead of A & B)
 */
export type Simplify<T> = { [K in keyof T]: T[K] } & {};
