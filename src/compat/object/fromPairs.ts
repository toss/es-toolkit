/**
 * Transforms an array of key-value pairs into an object.
 *
 * @param {Array} data - An array of key-value pairs.
 * @returns {Record<T, U>} - An object with keys and values from the input array.
 *
 * @example
 * const pairs = [['a', 1], ['b', 2]];
 *
 * const object = fromPairs(pairs);
 * console.log(object);
 * // Output:
 * // {
 * //   a: 1,
 * //   b: 2
 * // }
 */

export function fromPairs<T extends PropertyKey, U>(
  data: Array<[PropertyKey, U]> | Map<PropertyKey, U>
): { [key in T]: U } {
  const obj = {} as { [key in T]: U };
  for (const [key, value] of data) {
    obj[key as T] = value;
  }
  return obj;
}
