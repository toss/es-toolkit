import { compareValues } from '../_internal/compareValues';
import { isKey } from '../_internal/isKey';
import { memoizeCapped } from '../_internal/memoizeCapped';
import { toPath } from '../_internal/toPath';

const memoizedToPath = memoizeCapped(toPath);

/**
 * Sorts an array of objects based on multiple properties and their corresponding order directions.
 *
 * This function takes an array of objects, an array of keys to sort by, and an array of order directions.
 * It returns the sorted array, ordering by each key according to its corresponding direction
 * ('asc' for ascending or 'desc' for descending). If values for a key are equal,string
 * it moves to the next key to determine the order.
 *
 * @template T - The type of elements in the array.
 * @param {T[] | null} collection - The array of objects to be sorted.
 * @param {((item: T) => unknown) | PropertyKey | Array<((item: T) => unknown) | PropertyKey | PropertyKey[]>} keys - An array of keys (property names or property paths or custom key functions) to sort by.
 * @param {unknown | unknown[]} orders - An array of order directions ('asc' for ascending or 'desc' for descending).
 * @returns {T[]} - The sorted array.
 *
 * @example
 * // Sort an array of objects by 'user' in ascending order and 'age' in descending order.
 * const users = [
 *   { user: 'fred', age: 48 },
 *   { user: 'barney', age: 34 },
 *   { user: 'fred', age: 40 },
 *   { user: 'barney', age: 36 },
 * ];
 * const result = orderBy(users, ['user', (item) => item.age], ['asc', 'desc']);
 * // result will be:
 * // [
 * //   { user: 'barney', age: 36 },
 * //   { user: 'barney', age: 34 },
 * //   { user: 'fred', age: 48 },
 * //   { user: 'fred', age: 40 },
 * // ]
 */
export function orderBy<T>(
  collection: T[] | object | null | undefined,
  keys?: ((item: T) => unknown) | PropertyKey | Array<((item: T) => unknown) | PropertyKey | PropertyKey[]>,
  orders?: unknown | unknown[]
): T[] {
  if (collection == null) {
    return [];
  }

  if (!Array.isArray(collection) && typeof collection === 'object') {
    collection = Object.values(collection);
  }

  if (!Array.isArray(keys)) {
    keys = keys == null ? [] : [keys];
  }

  if (!Array.isArray(orders)) {
    orders = orders == null ? [] : [orders];
  }

  const getValueByPath = (path: PropertyKey | ((item: T) => unknown) | PropertyKey[], object: T) => {
    if (object == null) {
      return object;
    }

    if (typeof path === 'function') {
      return path(object);
    }

    // for the path array has only one deep property
    if (Array.isArray(path) && path.length === 1) {
      path = path[0];
    }

    // Handle the case when the path
    if (isKey(path, object)) {
      return object[path as keyof T];
    }

    // Convert the deep property to a path array
    if (!Array.isArray(path)) {
      path = memoizedToPath(path as string);
    }

    let target: object = object;

    for (let i = 0; i < path.length && target != null; i++) {
      target = target[path[i] as keyof typeof target];
    }

    return target;
  };

  const withCriteria = (collection as T[]).slice().map(item => ({
    // Prepare the criteria for performance
    criteria: keys.map(key => getValueByPath(key, item)),
    original: item,
  }));

  return withCriteria
    .sort((a, b) => {
      for (let i = 0; i < keys.length; i++) {
        const order = String((orders as unknown[])[i]); // For Object('desc') case

        const comparedResult = compareValues(a.criteria[i], b.criteria[i], order);

        if (comparedResult !== 0) {
          return comparedResult;
        }
      }

      return 0;
    })
    .map(item => item.original);
}
