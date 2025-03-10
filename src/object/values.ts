/**
 * Returns an array of the values of an object.
 *
 * This function takes an object and returns a new array containing all the values
 * of the object's properties.
 *
 * @template T - The type of the object.
 * @template K - The type of keys in the object.
 * @param {T} obj - The object to extract values from.
 * @returns {Array<T[K]>} An array of the object's values.
 *
 * @example
 * const obj = { a: 1, b: 'hello', c: true };
 * const result = values(obj);
 * // result will be [1, 'hello', true]
 * const result = values('hello')
 * // result will be ["h", "e", "l", "l", "l", "o"]
 */

export function values<T extends Record<string, any>, K extends keyof T>(obj: T): Array<T[K]> {
  return obj == null ? [] : Object.values(obj);
}
