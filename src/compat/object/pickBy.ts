import { range } from "../../math/range.ts";
import { isArrayLike } from "../predicate/isArrayLike.ts";

/**
 * Creates a new object composed of the properties that satisfy the predicate function.
 *
 * This function takes an object and a predicate function, and returns a new object that
 * includes only the properties for which the predicate function returns true.
 *
 * @template T - The type of object.
 * @param {T} obj - The object to pick properties from.
 * @param {(value: T[keyof T], key: keyof T) => boolean} shouldPick - A predicate function that determines
 * whether a property should be picked. It takes the property's key and value as arguments and returns `true`
 * if the property should be picked, and `false` otherwise.
 * @returns {Partial<T>} A new object with the properties that satisfy the predicate function.
 *
 * @example
 * const obj = { a: 1, b: 'pick', c: 3 };
 * const shouldPick = (value) => typeof value === 'string';
 * const result = pickBy(obj, shouldPick);
 * // result will be { b: 'pick' }
 */
export function pickBy<T extends Record<string, any>>(
  obj: T,
  shouldPick?: (value: T[keyof T], key: keyof T, obj: T) => boolean,
): Partial<T> {
  if (obj == null) {
    return {};
  }

  const result: Partial<T> = {};

  if (shouldPick == null) {
    return obj;
  }

  const keys = isArrayLike(obj)
    ? range(0, obj.length)
    : Object.keys(obj) as Array<keyof T>;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i].toString() as keyof T;
    const value = obj[key];

    if (shouldPick(value, key, obj)) {
      result[key] = value;
    }
  }

  return result;
}
