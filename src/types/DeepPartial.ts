/**
 * Makes all properties of `T` optional recursively, unlike the built-in
 * `Partial` which only affects the first level.
 *
 * Recurses into plain objects, arrays/tuples (elements do not become sparse),
 * `Map` values, and `Set` contents. `Map` keys (lookup identity), functions,
 * `Date`, and `RegExp` pass through unchanged.
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
  T extends Map<infer K, infer V> ? Map<K, DeepPartial<V>> :
  T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepPartial<V>> :
  T extends Set<infer U> ? Set<DeepPartial<U>> :
  T extends ReadonlySet<infer U> ? ReadonlySet<DeepPartial<U>> :
  T extends readonly unknown[] ? { [K in keyof T]: DeepPartial<T[K]> } :
  T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } :
  T;
