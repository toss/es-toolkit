import type { NonPlainObject } from '../_internal/NonPlainObject.ts';

type SnakeToKebab<S extends string> = S extends `${infer P1}_${infer P2}`
  ? Lowercase<`${P1}-${SnakeToKebab<P2>}`>
  : Lowercase<S>;
type CamelToKebab<S extends string> = S extends `${infer P1}${infer P2}`
  ? P2 extends Uncapitalize<P2>
    ? `${Lowercase<P1>}${CamelToKebab<P2>}`
    : `${Lowercase<P1>}-${CamelToKebab<Uncapitalize<P2>>}`
  : S;

type KebabCase<S extends string> = S extends `${string}_${string}`
  ? SnakeToKebab<S>
  : S extends Uppercase<S>
    ? Lowercase<S>
    : CamelToKebab<S>;

/**
 * Converts the keys of `T` to kebab-case recursively.
 *
 * This is the return type of the `toKebabCaseKeys` function. Recurses into
 * plain objects and arrays; built-in objects like `Date`, `Map`, and functions
 * pass through unchanged.
 *
 * @template T - The type whose keys are converted.
 *
 * @example
 * type Response = { userId: number; firstName: string };
 * type Converted = ToKebabCaseKeys<Response>;
 * // => { 'user-id': number; 'first-name': string }
 */
export type ToKebabCaseKeys<T> = T extends NonPlainObject
  ? T
  : T extends any[]
    ? Array<ToKebabCaseKeys<T[number]>>
    : T extends Record<string, any>
      ? { [K in keyof T as KebabCase<string & K>]: ToKebabCaseKeys<T[K]> }
      : T;
