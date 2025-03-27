import { camelCase } from '../string/camelCase.ts';

type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
  ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
  : Lowercase<S>;

export type Camelized<T> = T extends any[]
  ? Array<Camelized<T[number]>>
  : T extends Record<string, any>
    ? { [K in keyof T as CamelCase<string & K>]: Camelized<T[K]> }
    : T;

const isObject = (value: any): value is Record<string, any> => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

const isArray = Array.isArray;

/**
 * Creates a new object composed of the properties with keys converted to camelCase.
 *
 * This function takes an object and returns a new object that includes the same properties,
 * but with all keys converted to camelCase format.
 *
 * @template T - The type of object.
 * @param {T} obj - The object to convert keys from.
 * @returns {Camelized<T>} A new object with all keys converted to camelCase.
 *
 * @example
 * const obj = { user_id: 1, first_name: 'John' };
 * const result = camelizeKeys(obj);
 * // result will be { userId: 1, firstName: 'John' }
 */
export function camelizeKeys<T>(obj: T): Camelized<T> {
  if (isArray(obj)) {
    return obj.map(item => camelizeKeys(item)) as unknown as Camelized<T>;
  } else if (isObject(obj)) {
    const defaultObjectKeys = new Set(Object.getOwnPropertyNames(Object.prototype));

    return Object.keys(obj).reduce((result, key) => {
      if (defaultObjectKeys.has(key)) {
        result[key as keyof Camelized<T>] = obj[key];
        return result;
      }

      const camelKey = camelCase(key) as keyof Camelized<T>;
      result[camelKey] = camelizeKeys(obj[key]);
      return result;
    }, {} as Camelized<T>);
  }

  return obj as Camelized<T>;
}
