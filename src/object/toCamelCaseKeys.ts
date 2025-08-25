import { isArray } from '../compat/predicate/isArray.ts';
import { isPlainObject } from '../predicate/isPlainObject.ts';
import { camelCase } from '../string/camelCase.ts';

type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
  ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
  : Lowercase<S>;

type ToCamelCaseKeys<T> = T extends any[]
  ? Array<ToCamelCaseKeys<T[number]>>
  : T extends Record<string, any>
    ? { [K in keyof T as CamelCase<string & K>]: ToCamelCaseKeys<T[K]> }
    : T;

/**
 * Creates a new object composed of the properties with keys converted to camelCase.
 *
 * This function takes an object and returns a new object that includes the same properties,
 * but with all keys converted to camelCase format.
 *
 * @template T - The type of object.
 * @param {T} obj - The object to convert keys from.
 * @returns {ToCamelCaseKeys<T>} A new object with all keys converted to camelCase.
 *
 * @example
 * // Example with objects
 * const obj = { user_id: 1, first_name: 'John' };
 * const result = toCamelCaseKeys(obj);
 * // result will be { userId: 1, firstName: 'John' }
 *
 * // Example with arrays of objects
 * const arr = [
 *   { user_id: 1, first_name: 'John' },
 *   { user_id: 2, first_name: 'Jane' }
 * ];
 * const arrResult = toCamelCaseKeys(arr);
 * // arrResult will be [{ userId: 1, firstName: 'John' }, { userId: 2, firstName: 'Jane' }]
 *
 * // Example with nested objects
 * const nested = {
 *   user_data: {
 *     user_id: 1,
 *     user_address: {
 *       street_name: 'Main St',
 *       zip_code: '12345'
 *     }
 *   }
 * };
 * const nestedResult = toCamelCaseKeys(nested);
 * // nestedResult will be:
 * // {
 * //   userData: {
 * //     userId: 1,
 * //     userAddress: {
 * //       streetName: 'Main St',
 * //       zipCode: '12345'
 * //     }
 * //   }
 * // }
 */
export function toCamelCaseKeys<T>(obj: T): ToCamelCaseKeys<T> {
  if (isArray(obj)) {
    return obj.map(item => toCamelCaseKeys(item)) as ToCamelCaseKeys<T>;
  }

  if (isPlainObject(obj)) {
    const result = {} as ToCamelCaseKeys<T>;
    const keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      const camelKey = camelCase(key) as keyof typeof result;
      const convertedValue = toCamelCaseKeys(obj[key]);
      result[camelKey] = convertedValue as ToCamelCaseKeys<T>[keyof ToCamelCaseKeys<T>];
    }

    return result;
  }

  return obj as ToCamelCaseKeys<T>;
}
