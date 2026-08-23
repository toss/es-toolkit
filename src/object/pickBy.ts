import type { ObjectKeys } from '../types/ObjectKeys.ts';

type PickByResult<T> = string extends keyof T
  ? Record<string, T[string & keyof T]>
  : number extends keyof T
    ? Record<number, T[number & keyof T]>
    : Partial<T>;

/**
 * Creates a new object composed of the properties that satisfy the predicate function.
 *
 * This function takes an object and a predicate function, and returns a new object that
 * includes only the properties for which the predicate function returns true.
 *
 * @template T - The type of object.
 * @param obj - The object to pick properties from.
 * @param shouldPick - A predicate function that determines
 * whether a property should be picked. It takes the property's key and value as arguments and returns `true`
 * if the property should be picked, and `false` otherwise. Numeric keys are passed as strings.
 * @returns A new object with the properties that satisfy the predicate function.
 *
 * @example
 * const obj = { a: 1, b: 'pick', c: 3 };
 * const shouldPick = (value) => typeof value === 'string';
 * const result = pickBy(obj, shouldPick);
 * // result will be { b: 'pick' }
 */
export function pickBy<T extends Record<string, any>>(
  obj: T,
  shouldPick: (value: T[keyof T], key: ObjectKeys<T>) => boolean
): PickByResult<T> {
  const result: Partial<T> = {};

  const keys = Object.keys(obj) as Array<ObjectKeys<T>>;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const objectKey = key as keyof T;
    const value = obj[objectKey];

    if (shouldPick(value, key)) {
      result[objectKey] = value;
    }
  }

  return result as PickByResult<T>;
}
