import { zipObject as zipObjectToolkit } from '../../array/zipObject';

/**
 * Combines two arrays, one of property names and one of corresponding values, into a single object.
 *
 * This function takes two arrays: one containing property names and another containing corresponding values.
 * It returns a new object where the property names from the first array are keys, and the corresponding elements
 * from the second array are values. If the `keys` array is longer than the `values` array, the remaining keys will
 * have `undefined` as their values.
 *
 * @template P - The type of elements in the array.
 * @template V - The type of elements in the array.
 * @param {P[]} keys - An array of property names.
 * @param {V[]} values - An array of values corresponding to the property names.
 * @returns {Record<P, V>} - A new object composed of the given property names and values.
 *
 * @example
 * const keys = ['a', 'b', 'c'];
 * const values = [1, 2, 3];
 * const result = zipObject(keys, values);
 * // result will be { a: 1, b: 2, c: 3 }
 *
 * const keys2 = ['a', 'b', 'c'];
 * const values2 = [1, 2];
 * const result2 = zipObject(keys2, values2);
 * // result2 will be { a: 1, b: 2, c: undefined }
 *
 * const keys2 = ['a', 'b'];
 * const values2 = [1, 2, 3];
 * const result2 = zipObject(keys2, values2);
 * // result2 will be { a: 1, b: 2 }
 */
export function zipObject<P extends PropertyKey, V>(keys: readonly P[], values: readonly V[]): Record<P, V>;

/**
 * Combines two arrays, one of property names and one of corresponding values, into a single object.
 *
 * This function takes two arrays: one containing property names and another containing corresponding values.
 * It returns a new object where the property names from the first array are keys, and the corresponding elements
 * from the second array are values. If the `keys` array is longer than the `values` array, the remaining keys will
 * have `undefined` as their values.
 *
 * @template P - The type of elements in the array.
 * @template V - The type of elements in the array.
 * @param {V[]} values - An array of values corresponding to the property names.
 * @returns {(keys: P[]) => Record<P, V>} A function that receive an array of property names as argument and returns - A new object composed of the given property names and values.
 *
 * @example
 * const keys = ['a', 'b', 'c'];
 * const values = [1, 2, 3];
 * const result = zipObject(values)(keys);
 * // result will be { a: 1, b: 2, c: 3 }
 *
 * const keys2 = ['a', 'b', 'c'];
 * const values2 = [1, 2];
 * const result2 = zipObject(keys2, values2);
 * // result2 will be { a: 1, b: 2, c: undefined }
 *
 * const keys2 = ['a', 'b'];
 * const values2 = [1, 2, 3];
 * const result2 = zipObject(keys2, values2);
 * // result2 will be { a: 1, b: 2 }
 */
export function zipObject<P extends PropertyKey, V>(values: readonly V[]): (keys: readonly P[]) => Record<P, V>;

export function zipObject<P extends PropertyKey, V>(keysOrValues: readonly P[] | readonly V[], values?: readonly V[]) {
  if (values == null) {
    return (keys: readonly P[]) => zipObject(keys, keysOrValues as readonly V[]);
  }

  const keys = keysOrValues as readonly P[];
  return zipObjectToolkit(keys, values);
}
