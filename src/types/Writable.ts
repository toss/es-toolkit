/**
 * Removes the `readonly` modifier from all properties of `T`.
 *
 * The inverse of the built-in `Readonly`. Handy for turning a `readonly` shape
 * (e.g. from `as const`) back into a mutable one.
 *
 * @template T - The object type to make writable.
 *
 * @example
 * type Config = { readonly host: string; readonly port: number };
 * type MutableConfig = Writable<Config>;
 * // => { host: string; port: number }
 */
export type Writable<T> = { -readonly [K in keyof T]: T[K] };
