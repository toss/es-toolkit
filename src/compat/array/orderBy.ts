import { compareValues } from '../_internal/compareValues';
import { isKey } from '../_internal/isKey';
import { memoizeCapped } from '../_internal/memoizeCapped';
import { toPath } from '../_internal/toPath';

const memoizedToPath = memoizeCapped(toPath);

/**
 * Sorts an array of objects based on multiple properties and their corresponding order directions.
 *
 * This function takes an array of objects, an array of criteria to sort by, and an array of order directions.
 * It returns the sorted array, ordering by each key according to its corresponding direction
 * ('asc' for ascending or 'desc' for descending). If values for a key are equal,string
 * it moves to the next key to determine the order.
 *
 * @template T - The type of elements in the array.
 * @param { T[] | object | null | undefined} collection - The array of objects to be sorted.
 * @param {((item: T) => unknown) | PropertyKey | Array<((item: T) => unknown) | PropertyKey | PropertyKey[]>} criteria - An array of criteria (property names or property paths or custom key functions) to sort by.
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
  criteria?: ((item: T) => unknown) | PropertyKey | Array<((item: T) => unknown) | PropertyKey | PropertyKey[]>,
  orders?: unknown | unknown[]
): T[] {
  if (collection == null) {
    return [];
  }

  if (!Array.isArray(collection) && typeof collection === 'object') {
    collection = Object.values(collection);
  }

  if (!Array.isArray(criteria)) {
    criteria = criteria == null ? [] : [criteria];
  }

  if (!Array.isArray(orders)) {
    orders = orders == null ? [] : [orders];
  }

  const getValueByCriterion = (criterion: PropertyKey | ((item: T) => unknown) | PropertyKey[], object: T) => {
    if (object == null) {
      return object;
    }

    if (typeof criterion === 'function') {
      return criterion(object);
    }

    // When the criterion is an array with a single element, we have to check whether it is a key or a deep property.
    if (Array.isArray(criterion) && criterion.length === 1) {
      criterion = criterion[0];
    }

    // When the criterion is a key, use the key directly
    if (isKey(criterion, object)) {
      return object[criterion as keyof T];
    }

    // Convert the deep property to a criterion array
    if (!Array.isArray(criterion)) {
      criterion = memoizedToPath(criterion as string);
    }

    let target: object = object;

    for (let i = 0; i < criterion.length && target != null; i++) {
      target = target[criterion[i] as keyof typeof target];
    }

    return target;
  };

  const collectionWtihValues = (collection as T[]).slice().map(item => ({
    // Prepare the values that will be used for sorting, this way is more efficient than getting the values in the comparator function.
    values: criteria.map(criterion => getValueByCriterion(criterion, item)),
    original: item,
  }));

  return collectionWtihValues
    .sort((a, b) => {
      for (let i = 0; i < criteria.length; i++) {
        const order = String((orders as unknown[])[i]); // For Object('desc') case

        const comparedResult = compareValues(a.values[i], b.values[i], order);

        if (comparedResult !== 0) {
          return comparedResult;
        }
      }

      return 0;
    })
    .map(item => item.original);
}
