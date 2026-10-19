import type { NonPlainObject } from '../_internal/NonPlainObject.ts';

type SnakeCase<S extends string> =
  S extends Uppercase<S>
    ? Lowercase<S>
    : S extends `${infer P1}${infer P2}`
      ? P2 extends Uncapitalize<P2>
        ? `${Lowercase<P1>}${SnakeCase<P2>}`
        : `${Lowercase<P1>}_${SnakeCase<Uncapitalize<P2>>}`
      : Lowercase<S>;

/**
 * Converts the keys of `T` to snake_case recursively.
 *
 * This is the return type of the `toSnakeCaseKeys` function. Recurses into
 * plain objects and arrays; built-in objects like `Date`, `Map`, and functions
 * pass through unchanged.
 *
 * @template T - The type whose keys are converted.
 *
 * @example
 * type Request = { userId: number; firstName: string };
 * type Converted = ToSnakeCaseKeys<Request>;
 * // => { user_id: number; first_name: string }
 */
export type ToSnakeCaseKeys<T> = T extends NonPlainObject
  ? T
  : T extends any[]
    ? Array<ToSnakeCaseKeys<T[number]>>
    : T extends Record<string, any>
      ? { [K in keyof T as SnakeCase<string & K>]: ToSnakeCaseKeys<T[K]> }
      : T;
