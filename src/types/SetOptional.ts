import type { Simplify } from './Simplify.ts';

/**
 * Makes the given keys `K` of `T` optional, leaving the rest unchanged.
 *
 * Like the built-in `Partial`, but scoped to specific keys instead of the whole
 * object. Useful for "create" inputs where a few fields have defaults.
 *
 * @template T - The object type to transform.
 * @template K - The keys to make optional.
 *
 * @example
 * type User = { id: number; name: string; avatar: string };
 * type NewUser = SetOptional<User, 'avatar'>;
 * // => { id: number; name: string; avatar?: string }
 */
export type SetOptional<T, K extends keyof T> = Simplify<Omit<T, K> & Partial<Pick<T, K>>>;
