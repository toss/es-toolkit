import type { Simplify } from './Simplify.ts';

/**
 * Merges two object types, with the second type (`U`) overriding the first (`T`).
 *
 * Unlike a plain `T & U` intersection, overlapping keys are replaced instead of
 * intersected, so changing a property's type just works (e.g. `string` -> `Date`)
 * rather than collapsing to `never`.
 *
 * @template T - The base object type.
 * @template U - The object type whose properties take precedence.
 *
 * @example
 * type Base = { id: number; createdAt: string };
 * type Override = { createdAt: Date };
 * type Result = Merge<Base, Override>;
 * // => { id: number; createdAt: Date }
 */
export type Merge<T, U> = Simplify<Omit<T, keyof U> & U>;
