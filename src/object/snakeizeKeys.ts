import { snakeCase } from '../string/snakeCase.ts';

type SnakeCase<S extends string> = S extends `${infer P1}${infer P2}`
  ? P2 extends Uncapitalize<P2>
    ? `${Lowercase<P1>}${SnakeCase<P2>}`
    : `${Lowercase<P1>}_${SnakeCase<Uncapitalize<P2>>}`
  : Lowercase<S>;

export type Snakified<T> = T extends any[]
  ? Array<Snakified<T[number]>>
  : T extends Record<string, any>
    ? { [K in keyof T as SnakeCase<string & K>]: Snakified<T[K]> }
    : T;

const isObject = (value: any): value is Record<string, any> => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

const isArray = Array.isArray;

export function snakeizeKeys<T>(obj: T): Snakified<T> {
  if (isArray(obj)) {
    return obj.map(item => snakeizeKeys(item)) as unknown as Snakified<T>;
  } else if (isObject(obj)) {
    const defaultObjectKeys = new Set(Object.getOwnPropertyNames(Object.prototype));

    return Object.keys(obj).reduce((result, key) => {
      if (defaultObjectKeys.has(key)) {
        result[key as keyof Snakified<T>] = obj[key];
        return result;
      }

      const snakeKey = snakeCase(key) as keyof Snakified<T>;
      result[snakeKey] = snakeizeKeys(obj[key]);
      return result;
    }, {} as Snakified<T>);
  }

  return obj as Snakified<T>;
}
