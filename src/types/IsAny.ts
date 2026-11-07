/**
 * Resolves to `true` when `T` is `any`, `false` otherwise.
 *
 * `any` is the only type that `1 & T` can turn into something `0` is
 * assignable to, which is what makes it possible to tell `any` apart from
 * `unknown` and from every other type.
 *
 * @template T - The type to check.
 *
 * @example
 * type A = IsAny<any>;     // true
 * type B = IsAny<unknown>; // false
 * type C = IsAny<never>;   // false
 */
export type IsAny<T> = 0 extends 1 & T ? true : false;
