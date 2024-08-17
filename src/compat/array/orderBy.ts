import { getPath } from '../_internal/getPath';

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
 * @param {((item: T) => unknown) | string | Array<((item: T) => unknown) | string | string[]>} keys - An array of keys (property names or property paths or custom key functions) to sort by.
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
export function orderBy<T extends object>(
  collection: T[] | null | undefined,
  keys?: ((item: T) => unknown) | string | Array<((item: T) => unknown) | string | string[]>,
  orders?: unknown | unknown[]
): T[] {
  if (collection == null) {
    return [];
  }

  if (!Array.isArray(keys)) {
    keys = keys == null ? [] : [keys];
  }

  if (!Array.isArray(orders)) {
    orders = orders == null ? [] : [orders];
  }

  const compareValues = <V>(a: V, b: V, order: string) => {
    if (a < b) {
      return order === 'desc' ? 1 : -1; // Default is ascending order
    }

    if (a > b) {
      return order === 'desc' ? -1 : 1;
    }

    return 0;
  };

  const getValueByPath = (path: string | ((item: T) => unknown) | string[], obj: T) => {
    if (Array.isArray(path)) {
      let value: object = obj;

      for (let i = 0; i < path.length; i++) {
        value = value[path[i] as keyof typeof value];
      }

      return value;
    }

    if (typeof path === 'function') {
      return path(obj);
    }

    return obj[path as keyof typeof obj];
  };

  keys = keys.map(key => getPath(key, collection[0]));

  return collection.slice().sort((a, b) => {
    for (let i = 0; i < keys.length; i++) {
      const path = keys[i];

      const valueA = getValueByPath(path, a);
      const valueB = getValueByPath(path, b);
      const order = String((orders as unknown[])[i]); // For Object('desc') case

      const comparedResult = compareValues(valueA, valueB, order);

      if (comparedResult !== 0) {
        return comparedResult;
      }
    }

    return 0;
  });
}
