import type { Simplify } from './Simplify.ts';

/**
 * Merges two object types, with the second type (`U`) overriding the first (`T`).
 * Unlike `T & U`, overlapping keys are replaced instead of intersected.
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
