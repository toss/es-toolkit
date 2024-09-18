import { compareValues } from '../_internal/compareValues.ts';
import { isKey } from '../_internal/isKey.ts';
import { toPath } from '../util/toPath.ts';

export type Criterion<T> = ((item: T) => unknown) | PropertyKey | PropertyKey[] | null | undefined;
/**
 * Sorts an array of objects based on multiple properties and their corresponding order directions.
 *
 * This function takes an array of objects, an array of criteria to sort by, and an array of order directions.
 * It returns the sorted array, ordering by each key according to its corresponding direction ('asc' for ascending or 'desc' for descending).
 * If values for a key are equal, it moves to the next key to determine the order.
 *
 * @template T - The type of elements in the array.
 * @param { T[] | object | null | undefined} collection - The array of objects to be sorted.
 * @param {Criterion<T> | Array<Criterion<T>>} criteria - An array of criteria (property names or property paths or custom key functions) to sort by.
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
  collection: readonly T[] | object | number | null | undefined,
  criteria?: Criterion<T> | Array<Criterion<T>>,
  orders?: unknown | unknown[]
): T[] {
  if (collection == null || typeof collection === 'number') {
    return [];
  }

  if (typeof collection === 'object' && !Array.isArray(collection)) {
    collection = Object.values(collection);
  }

  if (!Array.isArray(criteria)) {
    criteria = criteria == null ? [null] : [criteria];
  }

  if (!Array.isArray(orders)) {
    orders = orders == null ? [] : [orders];
  }

  // For Object('desc') case
  orders = (orders as unknown[]).map(order => String(order));

  const getValueByNestedPath = (object: object, path: PropertyKey[]) => {
    let target: object = object;

    for (let i = 0; i < path.length && target != null; ++i) {
      target = target[path[i] as keyof typeof target];
    }

    return target;
  };

  const getValueByCriterion = (criterion: Criterion<T> | { key: PropertyKey; path: string[] }, object: T) => {
    if (object == null || criterion == null) {
      return object;
    }

    if (typeof criterion === 'object' && 'key' in criterion) {
      if (Object.hasOwn(object, criterion.key)) {
        return object[criterion.key as keyof typeof object];
      }

      return getValueByNestedPath(object, criterion.path);
    }

    if (typeof criterion === 'function') {
      return criterion(object);
    }

    if (Array.isArray(criterion)) {
      return getValueByNestedPath(object, criterion);
    }

    if (typeof object === 'object') {
      return object[criterion as keyof typeof object];
    }

    return object;
  };

  // Prepare all cases for criteria
  const preparedCriteria = criteria.map(criterion => {
    // lodash handles a array with one element as a single criterion
    if (Array.isArray(criterion) && criterion.length === 1) {
      criterion = criterion[0];
    }

    if (criterion == null || typeof criterion === 'function' || Array.isArray(criterion) || isKey(criterion)) {
      return criterion;
    }

    // If criterion is not key, it has possibility to be a deep path. So we have to prepare both cases.
    return { key: criterion, path: toPath(criterion as string) } as const;
  });

  // Array.prototype.sort() always shifts the `undefined` values to the end of the array. So we have to prevent it by using a wrapper object.
  const preparedCollection = (collection as T[]).map(item => ({
    original: item,
    criteria: preparedCriteria.map(criterion => getValueByCriterion(criterion, item)),
  }));

  return preparedCollection
    .slice()
    .sort((a, b) => {
      for (let i = 0; i < preparedCriteria.length; i++) {
        const comparedResult = compareValues(a.criteria[i], b.criteria[i], (orders as string[])[i]);

        if (comparedResult !== 0) {
          return comparedResult;
        }
      }

      return 0;
    })
    .map(item => item.original);
}
