/**
 * Makes all properties of `T` optional recursively, unlike the built-in
 * `Partial` which only affects the first level.
 *
 * Designed for nested object patches (config overrides, mock fixtures, partial
 * form state) applied with `merge`/`toMerged`. The recursion boundary matches
 * their runtime behavior: plain objects and arrays/tuples recurse (arrays do
 * not become sparse), while values `merge` replaces wholesale — `Map`, `Set`,
 * functions, `Date`, `RegExp` — must be provided complete.
 *
 * @template T - The type to make deeply optional.
 *
 * @example
 * type Config = { server: { host: string; port: number }; debug: boolean };
 * type ConfigPatch = DeepPartial<Config>;
 * // => { server?: { host?: string; port?: number }; debug?: boolean }
 *
 * const patch: ConfigPatch = { server: { port: 8080 } }; // ok, host omitted
 */
// prettier-ignore
export type DeepPartial<T> =
  T extends ((...args: any[]) => unknown) | Date | RegExp ? T :
  T extends Map<unknown, unknown> | ReadonlyMap<unknown, unknown> | Set<unknown> | ReadonlySet<unknown> ? T :
  T extends readonly unknown[] ? { [K in keyof T]: DeepPartial<T[K]> } :
  T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } :
  T;
