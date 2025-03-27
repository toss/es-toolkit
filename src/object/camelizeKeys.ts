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
