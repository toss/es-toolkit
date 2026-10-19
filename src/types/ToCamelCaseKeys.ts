import type { NonPlainObject } from '../_internal/NonPlainObject.ts';

type SnakeToCamel<S extends string> = S extends `${infer H}_${infer T}`
  ? `${Lowercase<H>}${Capitalize<SnakeToCamel<T>>}`
  : Lowercase<S>;

type PascalToCamel<S extends string> = S extends `${infer F}${infer R}` ? `${Lowercase<F>}${R}` : S;

/** If it's snake_case, apply the snake_case rule; for uppercase keys, lowercase the entire string; otherwise, just lowercase the first letter (including PascalCase → camelCase). */
type AnyToCamel<S extends string> = S extends `${string}_${string}`
  ? SnakeToCamel<S>
  : S extends Uppercase<S>
    ? Lowercase<S>
    : PascalToCamel<S>;

/**
 * Converts the keys of `T` to camelCase recursively.
 *
 * This is the return type of the `toCamelCaseKeys` function. Recurses into
 * plain objects and arrays; built-in objects like `Date`, `Map`, and functions
 * pass through unchanged.
 *
 * @template T - The type whose keys are converted.
 *
 * @example
 * type Response = { user_id: number; first_name: string };
 * type Converted = ToCamelCaseKeys<Response>;
 * // => { userId: number; firstName: string }
 */
export type ToCamelCaseKeys<T> = T extends NonPlainObject
  ? T
  : T extends any[]
    ? Array<ToCamelCaseKeys<T[number]>>
    : T extends Record<string, any>
      ? { [K in keyof T as AnyToCamel<Extract<K, string>>]: ToCamelCaseKeys<T[K]> }
      : T;
