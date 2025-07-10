import { identity } from '../../function/identity.ts';
import { ValueIteratee } from '../_internal/ValueIteratee.ts';
import { values as valuesToolkit } from '../object/values.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { iteratee as createIteratee } from '../util/iteratee.ts';

/**
 * Creates an object composed of keys generated from the results of running each element of collection through iteratee.
 * The order of grouped values is determined by the order they occur in collection.
 *
 * @template T - The type of elements in the array-like collection
 * @param {ArrayLike<T> | null | undefined} collection - The collection to iterate over
 * @param {ValueIteratee<T>} [iteratee=identity] - The iteratee to transform keys
 * @returns {Record<string, T[]>} Returns the composed aggregate object
 *
 * @example
 * groupBy([6.1, 4.2, 6.3], Math.floor)
 * // => { '4': [4.2], '6': [6.1, 6.3] }
 *
 * groupBy(['one', 'two', 'three'], 'length')
 * // => { '3': ['one', 'two'], '5': ['three'] }
 */
export function groupBy<T>(
  collection: ArrayLike<T> | null | undefined,
  iteratee?: ValueIteratee<T>
): Record<string, T[]>;

/**
 * Creates an object composed of keys generated from the results of running each element of collection through iteratee.
 * The order of grouped values is determined by the order they occur in collection.
 *
 * @template T - The type of the object
 * @param {T | null | undefined} collection - The object to iterate over
 * @param {ValueIteratee<T[keyof T]>} [iteratee=identity] - The iteratee to transform keys
 * @returns {Record<string, Array<T[keyof T]>>} Returns the composed aggregate object
 *
 * @example
 * groupBy({ a: 6.1, b: 4.2, c: 6.3 }, Math.floor)
 * // => { '4': [4.2], '6': [6.1, 6.3] }
 */
export function groupBy<T extends object>(
  collection: T | null | undefined,
  iteratee?: ValueIteratee<T[keyof T]>
): Record<string, Array<T[keyof T]>>;

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

  const items = isArrayLike(source) ? Array.from(source) : valuesToolkit(source);
  const getKeyFromItem = createIteratee(_getKeyFromItem ?? identity);

  const result = {} as Record<K, T[]>;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const key = getKeyFromItem(item) as K;

    // eslint-disable-next-line prefer-object-has-own
    if (!Object.prototype.hasOwnProperty.call(result, key)) {
      result[key] = [];
    }

    result[key].push(item);
  }

  return result;
}
