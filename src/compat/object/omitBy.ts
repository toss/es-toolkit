import { keysIn } from './keysIn.ts';
import { range } from '../../math/range.ts';
import { getSymbolsIn } from '../_internal/getSymbolsIn.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { isSymbol } from '../predicate/isSymbol.ts';

/**
 * Creates a new object composed of the properties that do not satisfy the predicate function.
 *
 * This function takes an object and a predicate function, and returns a new object that
 * includes only the properties for which the predicate function returns false.
 *
 * @template T - The type of object.
 * @param {T} obj - The object to omit properties from.
 * @param {(value: T[keyof T], key: keyof T, obj: T) => boolean} shouldOmit - A predicate function that determines
 * whether a property should be omitted. It takes the property's value, key, and the source object as arguments and returns `true`
 * if the property should be omitted, and `false` otherwise.
 * @returns {Partial<T>} Returns the new object.
 *
 * @example
 * const obj = { a: 1, b: 'omit', c: 3 };
 * const shouldOmit = (value) => typeof value === 'string';
 * const result = omitBy(obj, shouldOmit);
 * // result will be { a: 1, c: 3 }
 */
export function omitBy<T extends Record<string, any>>(
  obj: T,
  shouldOmit?: (value: T[keyof T], key: keyof T, obj: T) => boolean
): Partial<T> {
  if (obj == null) {
    return {};
  }

  const result: Partial<T> = {};

  if (shouldOmit == null) {
    return {};
  }

  const keys = isArrayLike(obj) ? range(0, obj.length) : ([...keysIn(obj), ...getSymbolsIn(obj)] as Array<keyof T>);
  for (let i = 0; i < keys.length; i++) {
    const key = (isSymbol(keys[i]) ? keys[i] : keys[i].toString()) as keyof T;
    const value = obj[key];

    if (!shouldOmit(value, key, obj)) {
      result[key] = value;
    }
  }

  return result;
}
