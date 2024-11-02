import { zip } from '../../array/zip.ts';
import { set } from '../object/set.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';

/**
 * Creates a deeply nested object given arrays of paths and values.
 *
 * This function takes two arrays: one containing arrays of property paths, and the other containing corresponding values.
 * It returns a new object where paths from the first array are used as key paths to set values, with corresponding elements from the second array as values.
 * Paths can be dot-separated strings or arrays of property names.
 *
 * If the `keys` array is longer than the `values` array, the remaining keys will have `undefined` as their values.
 *
 * @template P - The type of property paths.
 * @template V - The type of values corresponding to the property paths.
 * @param {ArrayLike<P | P[]>} keys - An array of property paths, each path can be a dot-separated string or an array of property names.
 * @param {ArrayLike<V>} values - An array of values corresponding to the property paths.
 * @returns {Record<P, V>} A new object composed of the given property paths and values.
 *
 * @example
 * const paths = ['a.b.c', 'd.e.f'];
 * const values = [1, 2];
 * const result = zipObjectDeep(paths, values);
 * // result will be { a: { b: { c: 1 } }, d: { e: { f: 2 } } }
 *
 * @example
 * const paths = [['a', 'b', 'c'], ['d', 'e', 'f']];
 * const values = [1, 2];
 * const result = zipObjectDeep(paths, values);
 * // result will be { a: { b: { c: 1 } }, d: { e: { f: 2 } } }
 *
 * @example
 * const paths = ['a.b[0].c', 'a.b[1].d'];
 * const values = [1, 2];
 * const result = zipObjectDeep(paths, values);
 * // result will be { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
 */
export function zipObjectDeep<P extends PropertyKey, V>(keys: ArrayLike<P | P[]>, values: ArrayLike<V>): Record<P, V> {
  const result = {} as { [K in P]: V };
  if (!isArrayLike(keys)) {
    return result;
  }
  if (!isArrayLike(values)) {
    values = [];
  }
  const zipped = zip<P | P[], V>(Array.from(keys), Array.from(values));

  for (let i = 0; i < zipped.length; i++) {
    const [key, value] = zipped[i];

    if (key != null) {
      set(result, key, value);
    }
  }

  return result;
}
