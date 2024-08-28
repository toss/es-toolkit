import { compareValues } from '../_internal/compareValues';
import { isKey } from '../_internal/isKey';
import { toPath } from '../_internal/toPath';

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

  const getValueByNestedPath = (object: object, path: PropertyKey[]) => {
    let target: object = object;

    for (let i = 0; i < path.length && target != null; i++) {
      target = target[path[i] as keyof typeof target];
    }

    return target;
  };

  const getValueByCriterion = (
    criterion: PropertyKey | ((item: T) => unknown) | PropertyKey[] | { key: PropertyKey; path: string[] },
    object: T
  ) => {
    if (object == null) {
      return object;
    }

    if (typeof criterion === 'function') {
      return criterion(object);
    }

    if (Array.isArray(criterion)) {
      return getValueByNestedPath(object, criterion);
    }

    if (typeof criterion !== 'object') {
      return object[criterion as keyof typeof object];
    }

    // Case for possible to be a deep path
    if (Object.hasOwn(object, criterion.key)) {
      return object[criterion.key as keyof typeof object];
    }

    return getValueByNestedPath(object, criterion.path);
  };

  // Prepare all cases for criteria
  const preparedCriteria = criteria.map(criterion => {
    // lodash handles a array with one element as a single criterion
    if (Array.isArray(criterion) && criterion.length === 1) {
      criterion = criterion[0];
    }

    if (typeof criterion === 'function' || Array.isArray(criterion) || isKey(criterion)) {
      return criterion;
    }

    // If criterion is not key, it has possibility to be a deep path. So we have to prepare both cases.
    return { key: criterion, path: toPath(criterion as string) } as const;
  });

  return (collection as T[]).slice().sort((a, b) => {
    for (let i = 0; i < criteria.length; i++) {
      const order = String((orders as unknown[])[i]); // For Object('desc') case
      const valueA = getValueByCriterion(preparedCriteria[i], a);
      const valueB = getValueByCriterion(preparedCriteria[i], b);

      const comparedResult = compareValues(valueA, valueB, order);

      if (comparedResult !== 0) {
        return comparedResult;
      }
    }

    return 0;
  });
}
