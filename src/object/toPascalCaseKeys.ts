import { isArray } from '../compat/predicate/isArray.ts';
import { isPlainObject } from '../compat/predicate/isPlainObject.ts';
import { pascalCase } from '../string/pascalCase.ts';
import type { ToPascalCaseKeys } from '../types/ToPascalCaseKeys.ts';

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
