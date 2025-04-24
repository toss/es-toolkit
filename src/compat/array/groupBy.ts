import { groupBy as groupByToolkit } from '../../array/groupBy.ts';
import { identity } from '../../function/identity.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { iteratee as createIteratee } from '../util/iteratee.ts';

/**
 * Maps each element of an array based on a provided key-generating function.
 *
 * This function takes an array and a function that generates a key from each element. It returns
 * an object where the keys are the generated keys and the values are the corresponding elements.
 * If there are multiple elements generating the same key, the last element among them is used
 * as the value.
 *
 * @template T - The type of elements in the array.
 * @template K - The type of keys.
 * @param {T[]} arr - The array of elements to be mapped.
 * @param {(item: T) => K} getKeyFromItem - A function that generates a key from an element.
 * @returns {Record<K, T>} An object where keys are mapped to each element of an array.
 *
 * @example
 * const array = [
 *   { category: 'fruit', name: 'apple' },
 *   { category: 'fruit', name: 'banana' },
 *   { category: 'vegetable', name: 'carrot' }
 * ];
 * const result = keyBy(array, item => item.category);
 * // result will be:
 * // {
 * //   fruit: { category: 'fruit', name: 'banana' },
 * //   vegetable: { category: 'vegetable', name: 'carrot' }
 * // }
 */
export function groupBy<T, K extends PropertyKey>(
  source: ArrayLike<T> | null | undefined,
  getKeyFromItem?:
    | ((item: T, index: number, arr: any) => unknown)
    | Partial<T>
    | [keyof T, unknown]
    | PropertyKey
    | null
): Record<K, T[]>;

/**
 * Groups the elements of an object based on a provided key-generating function.
 *
 * This function takes an object and a function that generates a key from each value. It returns
 * an object where the keys are the generated keys and the values are arrays of elements that share
 * the same key.
 *
 * @template T - The type of values in the object.
 * @template K - The type of keys.
 * @param {Record<any, T> | null | undefined} source - The object to group.
 * @param {Function | PropertyKey | Array | Object} [getKeyFromItem] - The iteratee to transform keys.
 *   - If a function is provided, it's invoked for each element in the collection.
 *   - If a property name (string) is provided, that property of each element is used as the key.
 *   - If a property-value pair (array) is provided, elements with matching property values are used.
 *   - If a partial object is provided, elements with matching properties are used.
 * @returns {Record<K, T>} An object where each key is associated with an array of elements that
 * share that key.
 *
 * @example
 * // Using an object
 * const obj = { a: { category: 'fruit' }, b: { category: 'vegetable' }, c: { category: 'fruit' } };
 * const result = groupBy(obj, 'category');
 * // => { fruit: [{ category: 'fruit' }, { category: 'fruit' }], vegetable: [{ category: 'vegetable' }] }
 */
export function groupBy<T, K extends PropertyKey>(
  source: Record<any, T> | null | undefined,
  getKeyFromItem?:
    | ((item: T, index: number, arr: any) => unknown)
    | Partial<T>
    | [keyof T, unknown]
    | PropertyKey
    | null
): Record<K, T[]>;

/**
 * Groups the elements of an array or object based on a provided key-generating function.
 *
 * This function takes an array or object and a function that generates a key from each element or value.
 * It returns an object where the keys are the generated keys and the values are arrays of elements that
 * share the same key.
 *
 * @template T - The type of elements in the array or values in the object.
 * @template K - The type of keys.
 * @param {ArrayLike<T> | Record<any, T> | null | undefined} source - The collection to group.
 * @param {Function | PropertyKey | Array | Object} [_getKeyFromItem] - The iteratee to transform keys.
 *   - If a function is provided, it's invoked for each element in the collection.
 *   - If a property name (string) is provided, that property of each element is used as the key.
 *   - If a property-value pair (array) is provided, elements with matching property values are used.
 *   - If a partial object is provided, elements with matching properties are used.
 * @returns {Record<K, T>} An object where each key is associated with an array of elements that
 * share that key.
 *
 * @example
 * // Using an array
 * const array = [6.1, 4.2, 6.3];
 * const result = groupBy(array, Math.floor);
 * // => { 4: [4.2], 6: [6.1, 6.3] }
 *
 * @example
 * // Using a property name
 * const array = ['one', 'two', 'three'];
 * const result = groupBy(array, 'length');
 * // => { 3: ['one', 'two'], 5: ['three'] }
 */
export function groupBy<T, K extends PropertyKey>(
  source: ArrayLike<T> | Record<any, T> | null | undefined,
  _getKeyFromItem?:
    | ((item: T, index: number, arr: any) => unknown)
    | Partial<T>
    | [keyof T, unknown]
    | PropertyKey
    | null
): Record<K, T[]> {
  if (source == null) {
    return {} as Record<K, T[]>;
  }

  const items = isArrayLike(source) ? Array.from(source) : Object.values(source);
  const getKeyFromItem = createIteratee(_getKeyFromItem ?? identity);

  return groupByToolkit<T, K>(items, getKeyFromItem);
}
