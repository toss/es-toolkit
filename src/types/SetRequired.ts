import type { Simplify } from './Simplify.ts';

/**
 * Makes the given keys `K` of `T` required, leaving the rest unchanged.
 *
 * Like the built-in `Required`, but scoped to specific keys instead of the whole
 * object. Useful when a context guarantees some optional fields are present.
 *
 * @template T - The object type to transform.
 * @template K - The keys to make required.
 *
 * @example
 * type User = { id: number; name: string; avatar?: string };
 * type ProfileUser = SetRequired<User, 'avatar'>;
 * // => { id: number; name: string; avatar: string }
 */
export type SetRequired<T, K extends keyof T> = Simplify<Omit<T, K> & Required<Pick<T, K>>>;
