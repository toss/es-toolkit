/**
 * Flattens an intersection or mapped type into a single, readable object type.
 *
 * The result is equivalent for plain object types, but editors show the
 * resolved shape (`{ a: 1; b: 2 }`) instead of `A & B`. Optional and readonly
 * modifiers are preserved.
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
