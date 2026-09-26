import type { Simplify } from './Simplify.ts';

/**
 * Makes the given keys `K` of `T` optional, leaving the rest unchanged.
 * Like the built-in `Partial`, but scoped to specific keys.
 *
 * Distributes over unions, so a union stays a union.
 *
 * @template T - The object type to transform.
 * @template K - The keys to make optional.
 *
 * @example
 * type User = { id: number; name: string; email: string };
 * type UserDraft = SetOptional<User, 'email'>;
 * // => { id: number; name: string; email?: string }
 */
export type SetOptional<T, K extends keyof T> = T extends unknown ? Simplify<Omit<T, K> & Partial<Pick<T, K>>> : never;
