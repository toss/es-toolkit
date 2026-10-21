import type { IsAny } from './IsAny.ts';

/**
 * Resolves to `true` when `T` is `unknown`, `false` otherwise.
 *
 * A plain `unknown extends T` check is also `true` for `any`, so this type
 * rules `any` out first. Useful when a type-level helper should treat an
 * `unknown` input differently from a concrete type.
 *
 * @template T - The type to check.
 *
 * @example
 * type A = IsUnknown<unknown>; // true
 * type B = IsUnknown<any>;     // false
 * type C = IsUnknown<string>;  // false
 */
export type IsUnknown<T> = IsAny<T> extends true ? false : unknown extends T ? true : false;
