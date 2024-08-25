import { compareValues } from '../_internal/compareValues';
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

  const getValueByCriterion = (
    criterion: PropertyKey[][] | Array<number | symbol | ((item: T) => unknown)> | Array<string | string[]>,
    object: T
  ) => {
    if (object == null) {
      return object;
    }

    let currentCriterion: PropertyKey | ((item: T) => unknown) | PropertyKey[] | null = null;

    // If criterion has only one case, it means it doesn't have possibility to be a deep path.
    if (criterion.length === 1) {
      currentCriterion = criterion[0];

      if (typeof currentCriterion === 'function') {
        return currentCriterion(object);
      }

      if (!Array.isArray(currentCriterion)) {
        return object[currentCriterion as keyof typeof object];
      }

      // If criterion is and array, it needs to get value by nested path.
    }

    // If criterion has two cases, it means it has possibility to be a deep path.
    if (!currentCriterion) {
      // Just using property name when object has its own property
      if (Object.hasOwn(object, criterion[0] as string)) {
        return object[criterion[0] as keyof typeof object];
      }

      currentCriterion = criterion[1];
    }

    // Get value by nested path
    let target: object = object;

    for (let i = 0; i < (currentCriterion as PropertyKey[]).length && target != null; i++) {
      target = target[(currentCriterion as PropertyKey[])[i] as keyof typeof target];
    }

    return target;
  };

  // Prepare all cases for criteria
  const preparedCriteria = criteria.map(criterion => {
    if (Array.isArray(criterion)) {
      // if criterion is nested path, it doesn't have possibility to be a deep path.
      if (criterion.length === 1) {
        criterion = criterion[0];
      } else {
        return [criterion];
      }
    }

    if (typeof criterion === 'function' || typeof criterion !== 'string') {
      return [criterion];
    }

    // If criterion is a string, it has possibility to be a deep path. So we have to prepare both cases.
    return [criterion, memoizedToPath(criterion)]; // [Using when object has its own property, Using when object doesn't have its own property]
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
