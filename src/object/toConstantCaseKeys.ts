import { isArray } from '../compat/predicate/isArray.ts';
import { isPlainObject } from '../compat/predicate/isPlainObject.ts';
import { constantCase } from '../string/constantCase.ts';

type ConstantCase<S extends string> =
  S extends Lowercase<S>
    ? Uppercase<S>
    : S extends `${infer P1}${infer P2}`
      ? P2 extends Uncapitalize<P2>
        ? `${Uppercase<P1>}${ConstantCase<P2>}`
        : `${Uppercase<P1>}_${ConstantCase<Uncapitalize<P2>>}`
      : Uppercase<S>;

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

export type ToConstantCaseKeys<T> = T extends NonPlainObject
  ? T
  : T extends any[]
    ? Array<ToConstantCaseKeys<T[number]>>
    : T extends Record<string, any>
      ? { [K in keyof T as ConstantCase<string & K>]: ToConstantCaseKeys<T[K]> }
      : T;

/**
 * Creates a new object composed of the properties with keys converted to CONSTANT_CASE.
 *
 * This function takes an object and returns a new object that includes the same properties,
 * but with all keys converted to CONSTANT_CASE format.
 *
 * @template T - The type of object.
 * @param obj - The object to convert keys from.
 * @returns A new object with all keys converted to CONSTANT_CASE.
 *
 * @example
 * // Example with objects
 * const obj = { userId: 1, firstName: 'John' };
 * const result = toConstantCaseKeys(obj);
 * // result will be { USER_ID: 1, FIRST_NAME: 'John' }
 *
 * // Example with arrays of objects
 * const arr = [
 *   { userId: 1, firstName: 'John' },
 *   { userId: 2, firstName: 'Jane' }
 * ];
 * const arrResult = toConstantCaseKeys(arr);
 * // arrResult will be [{ USER_ID: 1, FIRST_NAME: 'John' }, { USER_ID: 2, FIRST_NAME: 'Jane' }]
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
 * const nestedResult = toConstantCaseKeys(nested);
 * // nestedResult will be:
 * // {
 * //   USER_DATA: {
 * //     USER_ID: 1,
 * //     USER_ADDRESS: {
 * //       STREET_NAME: 'Main St',
 * //       ZIP_CODE: '12345'
 * //     }
 * //   }
 * // }
 */
export function toConstantCaseKeys<T>(obj: T): ToConstantCaseKeys<T> {
  if (isArray(obj)) {
    return obj.map(item => toConstantCaseKeys(item)) as unknown as ToConstantCaseKeys<T>;
  }

  if (isPlainObject(obj)) {
    const result = {} as ToConstantCaseKeys<T>;
    const keys = Object.keys(obj as Record<PropertyKey, any>);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      const constantKey = constantCase(key) as keyof typeof result;
      const convertedValue = toConstantCaseKeys((obj as Record<PropertyKey, any>)[key]);
      result[constantKey] = convertedValue as ToConstantCaseKeys<T>[keyof ToConstantCaseKeys<T>];
    }

    return result;
  }

  return obj as ToConstantCaseKeys<T>;
}
