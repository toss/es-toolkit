import { isArray } from '../compat/predicate/isArray.ts';
import { isPlainObject } from '../compat/predicate/isPlainObject.ts';
import { pascalCase } from '../string/pascalCase.ts';

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

type NonPlainObject =
  | Date
  | RegExp
  | Map<any, any>
  | Set<any>
  | WeakMap<any, any>
  | WeakSet<any>
  | Promise<any>
  | Error
  | ArrayBuffer
  | DataView
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array
  | ((...args: any[]) => any)
  | typeof globalThis;

export type ToPascalCaseKeys<T> = T extends NonPlainObject
  ? T
  : T extends any[]
    ? Array<ToPascalCaseKeys<T[number]>>
    : T extends Record<string, any>
      ? { [K in keyof T as AnyToPascal<Extract<K, string>>]: ToPascalCaseKeys<T[K]> }
      : T;

/**
 * Creates a new object composed of the properties with keys converted to PascalCase.
 *
 * This function takes an object and returns a new object that includes the same properties,
 * but with all keys converted to PascalCase format.
 *
 * @template T - The type of object.
 * @param obj - The object to convert keys from.
 * @returns A new object with all keys converted to PascalCase.
 *
 * @example
 * // Example with objects
 * const obj = { userId: 1, firstName: 'John' };
 * const result = toPascalCaseKeys(obj);
 * // result will be { UserId: 1, FirstName: 'John' }
 *
 * // Example with arrays of objects
 * const arr = [
 *   { userId: 1, firstName: 'John' },
 *   { userId: 2, firstName: 'Jane' }
 * ];
 * const arrResult = toPascalCaseKeys(arr);
 * // arrResult will be [{ UserId: 1, FirstName: 'John' }, { UserId: 2, FirstName: 'Jane' }]
 *
 * // Example with nested objects
 * const nested = {
 *   userData: {
 *     userId: 1,
 *     userAddress: {
 *       streetName: 'Main St',
 *       zipCode: '12345'
 *     }
 *   }
 * };
 * const nestedResult = toPascalCaseKeys(nested);
 * // nestedResult will be:
 * // {
 * //   UserData: {
 * //     UserId: 1,
 * //     UserAddress: {
 * //       StreetName: 'Main St',
 * //       ZipCode: '12345'
 * //     }
 * //   }
 * // }
 */
export function toPascalCaseKeys<T>(obj: T): ToPascalCaseKeys<T> {
  if (isArray(obj)) {
    return obj.map(item => toPascalCaseKeys(item)) as unknown as ToPascalCaseKeys<T>;
  }

  if (isPlainObject(obj)) {
    const result = {} as ToPascalCaseKeys<T>;
    const keys = Object.keys(obj as Record<PropertyKey, any>);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      const pascalKey = pascalCase(key) as keyof typeof result;
      const convertedValue = toPascalCaseKeys((obj as Record<PropertyKey, any>)[key]);
      result[pascalKey] = convertedValue as ToPascalCaseKeys<T>[keyof ToPascalCaseKeys<T>];
    }

    return result;
  }

  return obj as ToPascalCaseKeys<T>;
}
