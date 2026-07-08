/**
 * Removes the `readonly` modifier from all properties of `T`.
 * The inverse of the built-in `Readonly`.
 *
 * @template T - The object type to make writable.
 *
 * @example
 * type Config = { readonly host: string; readonly port: number };
 * type MutableConfig = Writable<Config>;
 * // => { host: string; port: number }
 */
export type Writable<T> = { -readonly [K in keyof T]: T[K] };
