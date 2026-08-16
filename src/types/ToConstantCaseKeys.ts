import type { NonPlainObject } from '../_internal/NonPlainObject.ts';

type ConstantCase<S extends string> =
  S extends Lowercase<S>
    ? Uppercase<S>
    : S extends `${infer P1}${infer P2}`
      ? P2 extends Uncapitalize<P2>
        ? `${Uppercase<P1>}${ConstantCase<P2>}`
        : `${Uppercase<P1>}_${ConstantCase<Uncapitalize<P2>>}`
      : Uppercase<S>;

/**
 * Converts the keys of `T` to CONSTANT_CASE recursively.
 *
 * This is the return type of the `toConstantCaseKeys` function. Recurses into
 * plain objects and arrays; built-in objects like `Date`, `Map`, and functions
 * pass through unchanged.
 *
 * @template T - The type whose keys are converted.
 *
 * @example
 * type Response = { userId: number; firstName: string };
 * type Converted = ToConstantCaseKeys<Response>;
 * // => { USER_ID: number; FIRST_NAME: string }
 */
export type ToConstantCaseKeys<T> = T extends NonPlainObject
  ? T
  : T extends any[]
    ? Array<ToConstantCaseKeys<T[number]>>
    : T extends Record<string, any>
      ? { [K in keyof T as ConstantCase<string & K>]: ToConstantCaseKeys<T[K]> }
      : T;
