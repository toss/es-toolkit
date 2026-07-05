/**
 * Makes all properties of `T` optional recursively, unlike the built-in
 * `Partial` which only affects the first level.
 *
 * Designed for nested object patches (config overrides, mock fixtures, partial
 * form state). Arrays and tuples recurse into their elements without becoming
 * sparse. Functions, `Date`, and `RegExp` pass through unchanged.
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
export type DeepPartial<T> = T extends ((...args: any[]) => unknown) | Date | RegExp
  ? T
  : T extends readonly unknown[]
    ? { [K in keyof T]: DeepPartial<T[K]> }
    : T extends object
      ? { [K in keyof T]?: DeepPartial<T[K]> }
      : T;
