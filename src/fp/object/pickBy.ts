import { pickBy as pickByToolkit } from '../../object/pickBy';

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
  shouldPick: (value: T[keyof T], key: keyof T) => boolean
): Partial<T>;

/**
 * Creates a new object composed of the properties that satisfy the predicate function.
 *
 * This function takes an object and a predicate function, and returns a new object that
 * includes only the properties for which the predicate function returns true.
 *
 * @template T - The type of object.
 * @param {(value: T[keyof T], key: keyof T) => boolean} shouldPick - A predicate function that determines
 * whether a property should be picked. It takes the property's key and value as arguments and returns `true`
 * if the property should be picked, and `false` otherwise.
 * @returns {(obj: T) => Partial<T>} A function that receive the object to pick properties from as argument and returns a new object with the properties that satisfy the predicate function.
 *
 * @example
 * const obj = { a: 1, b: 'pick', c: 3 };
 * const shouldPick = (value) => typeof value === 'string';
 * const result = pickBy(shouldPick)(obj);
 * // result will be { b: 'pick' }
 */
export function pickBy<T extends Record<string, any>>(
  shouldPick: (value: T[keyof T], key: keyof T) => boolean
): (obj: T) => Partial<T>;

export function pickBy<T extends Record<string, any>>(
  objOrShouldPick: T | ((value: T[keyof T], key: keyof T) => boolean),
  shouldPick?: (value: T[keyof T], key: keyof T) => boolean
) {
  if (shouldPick == null) {
    return (obj: T) => pickBy(obj, objOrShouldPick as (value: T[keyof T], key: keyof T) => boolean);
  }

  const obj = objOrShouldPick as T;
  return pickByToolkit(obj, shouldPick);
}
