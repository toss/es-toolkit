import type { NonPlainObject } from '../_internal/NonPlainObject.ts';

type SnakeToPascal<S extends string> = S extends `${infer H}_${infer T}`
  ? `${Capitalize<Lowercase<H>>}${Capitalize<SnakeToPascal<T>>}`
  : Capitalize<Lowercase<S>>;

type CamelToPascal<S extends string> = S extends `${infer F}${infer R}` ? `${Uppercase<F>}${R}` : S;

/** If it's snake_case, apply the snake_case rule; for uppercase keys, lowercase and capitalize the entire string; otherwise, just uppercase the first letter (including camelCase → PascalCase). */
type AnyToPascal<S extends string> = S extends `${string}_${string}`
  ? SnakeToPascal<S>
  : S extends Uppercase<S>
    ? Capitalize<Lowercase<S>>
    : CamelToPascal<S>;

/**
 * Converts the keys of `T` to PascalCase recursively.
 *
 * This is the return type of the `toPascalCaseKeys` function. Recurses into
 * plain objects and arrays; built-in objects like `Date`, `Map`, and functions
 * pass through unchanged.
 *
 * @template T - The type whose keys are converted.
 *
 * @example
 * type Response = { userId: number; firstName: string };
 * type Converted = ToPascalCaseKeys<Response>;
 * // => { UserId: number; FirstName: string }
 */
export type ToPascalCaseKeys<T> = T extends NonPlainObject
  ? T
  : T extends any[]
    ? Array<ToPascalCaseKeys<T[number]>>
    : T extends Record<string, any>
      ? { [K in keyof T as AnyToPascal<Extract<K, string>>]: ToPascalCaseKeys<T[K]> }
      : T;
