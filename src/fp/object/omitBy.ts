import { omitBy as omitByToolkit } from '../../object/omitBy';

/**
 * Creates a new object composed of the properties that do not satisfy the predicate function.
 *
 * This function takes an object and a predicate function, and returns a new object that
 * includes only the properties for which the predicate function returns false.
 *
 * @template T - The type of object value.
 * @template O - The type of object.
 * @param {O} obj - The object to omit properties from.
 * @param {(value: T, key: keyof O) => boolean} shouldOmit - A predicate function that determines
 * whether a property should be omitted. It takes the property's key and value as arguments and returns `true`
 * if the property should be omitted, and `false` otherwise.
 * @returns {Partial<O>} A new object with the properties that do not satisfy the predicate function.
 *
 * @example
 * const obj = { a: 1, b: 'omit', c: 3 };
 * const shouldOmit = (value) => typeof value === 'string';
 * const result = omitBy(obj, shouldOmit);
 * // result will be { a: 1, c: 3 }
 */
export function omitBy<T, O extends Record<string, T>>(
  obj: O,
  shouldOmit: (value: T, key: keyof O) => boolean
): Partial<O>;

/**
 * Creates a new object composed of the properties that do not satisfy the predicate function.
 *
 * This function takes an object and a predicate function, and returns a new object that
 * includes only the properties for which the predicate function returns false.
 *
 * @template T - The type of object value.
 * @param {(value: T, key: string) => boolean} shouldOmit - A predicate function that determines
 * whether a property should be omitted. It takes the property's key and value as arguments and returns `true`
 * if the property should be omitted, and `false` otherwise.
 * @returns {(obj: Record<string, T>) => Partial<Record<string, T>} A function that receive the object to omit properties from as argument and returns a new object with the properties that do not satisfy the predicate function.
 *
 * @example
 * const obj = { a: 1, b: 'omit', c: 3 };
 * const shouldOmit = (value) => typeof value === 'string';
 * const result = omitBy(shouldOmit)(obj);
 * // result will be { a: 1, c: 3 }
 */
export function omitBy<T>(
  shouldOmit: (value: T, key: string) => boolean
): (obj: Record<string, T>) => Partial<Record<string, T>>;

export function omitBy<T, O extends Record<string, T>>(
  objOrShouldOmit: O | ((value: T, key: keyof O) => boolean),
  shouldOmit?: (value: T, key: keyof O) => boolean
) {
  if (shouldOmit == null) {
    return (obj: O) => omitBy(obj, objOrShouldOmit as (value: T, key: keyof O) => boolean);
  }

  const obj = objOrShouldOmit as O;
  return omitByToolkit(obj, shouldOmit);
}
