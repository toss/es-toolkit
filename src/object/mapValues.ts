/**
 * Creates a new object with the same keys as the given object, but with values generated
 * by running each own enumerable property of the object through the iteratee function.
 *
 * @template T - The type of the object.
 * @template K - The type of the keys in the object.
 * @template V - The type of the new values generated by the iteratee function.
 *
 * @param {T} object - The object to iterate over.
 * @param {(value: T[K], key: K, object: T) => V} getNewValue - The function invoked per own enumerable property.
 * @returns {Record<K, V>} - Returns the new mapped object.
 *
 * @example
 * // Example usage:
 * const obj = { a: 1, b: 2 };
 * const result = mapValues(obj, (value) => value * 2);
 * console.log(result); // { a: 2, b: 4 }
 */
export function mapValues<T extends Record<PropertyKey, unknown>, K extends keyof T, V>(
  object: T,
  getNewValue: (value: T[K], key: K, object: T) => V
): Record<K, V> {
  const result = {} as Record<K, V>;
  const keys = Object.keys(object);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i] as K;
    const value = object[key];

    result[key] = getNewValue(value, key, object);
  }

  return result;
}
