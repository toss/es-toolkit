import { isArray } from '../compat/predicate/isArray.ts';
import { isPlainObject } from '../compat/predicate/isPlainObject.ts';
import { snakeCase } from '../string/snakeCase.ts';

type SnakeCase<S extends string> = S extends `${infer P1}${infer P2}`
  ? P2 extends Uncapitalize<P2>
    ? `${Lowercase<P1>}${SnakeCase<P2>}`
    : `${Lowercase<P1>}_${SnakeCase<Uncapitalize<P2>>}`
  : Lowercase<S>;

export type ToSnakeCaseKeys<T> = T extends any[]
  ? Array<ToSnakeCaseKeys<T[number]>>
  : T extends Record<string, any>
    ? { [K in keyof T as SnakeCase<string & K>]: ToSnakeCaseKeys<T[K]> }
    : T;

/**
 * Creates a new object composed of the properties with keys converted to snake_case.
 *
 * This function takes an object and returns a new object that includes the same properties,
 * but with all keys converted to snake_case format.
 *
 * @template T - The type of object.
 * @param {T} obj - The object to convert keys from.
 * @returns {ToSnakeCaseKeys<T>} A new object with all keys converted to snake_case.
 *
 * @example
 * // Example with objects
 * const obj = { userId: 1, firstName: 'John' };
 * const result = toSnakeCaseKeys(obj);
 * // result will be { user_id: 1, first_name: 'John' }
 *
 * // Example with arrays of objects
 * const arr = [
 *   { userId: 1, firstName: 'John' },
 *   { userId: 2, firstName: 'Jane' }
 * ];
 * const arrResult = toSnakeCaseKeys(arr);
 * // arrResult will be [{ user_id: 1, first_name: 'John' }, { user_id: 2, first_name: 'Jane' }]
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
 * const nestedResult = toSnakeCaseKeys(nested);
 * // nestedResult will be:
 * // {
 * //   user_data: {
 * //     user_id: 1,
 * //     user_address: {
 * //       street_name: 'Main St',
 * //       zip_code: '12345'
 * //     }
 * //   }
 * // }
 */
export function toSnakeCaseKeys<T>(obj: T): ToSnakeCaseKeys<T> {
  if (isArray(obj)) {
    return obj.map(item => toSnakeCaseKeys(item)) as unknown as ToSnakeCaseKeys<T>;
  }

  if (isPlainObject(obj)) {
    const result = {} as ToSnakeCaseKeys<T>;
    const keys = Object.keys(obj as Record<PropertyKey, any>);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      const snakeKey = snakeCase(key) as keyof typeof result;
      const convertedValue = toSnakeCaseKeys((obj as Record<PropertyKey, any>)[key]);
      result[snakeKey] = convertedValue as ToSnakeCaseKeys<T>[keyof ToSnakeCaseKeys<T>];
    }

    return result;
  }

  return obj as ToSnakeCaseKeys<T>;
}
