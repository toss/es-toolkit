import { compareValues } from '../_internal/compareValues.ts';

/**
 * Sorts an array of objects or primitives based on the given `criteria` and their corresponding order directions.
 *
 * - For objects: If you provide keys, it sorts the objects by the values of those keys.
 * - For objects: If you provide functions, it sorts based on the values returned by those functions.
 * - For primitives: If you provide functions, it sorts based on the values returned by those functions.
 * - For primitives: If you provide no criteria, it sorts the primitives themselves.
 *
 * The function returns the array of objects sorted in corresponding order directions.
 * If two objects have the same value for the current criterion, it uses the next criterion to determine their order.
 * If the number of orders is less than the number of criteria, it uses the last order for the rest of the criteria.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array of objects or primitives to be sorted.
 * @param {Array<((item: T) => unknown) | keyof T>} [criteria=[]] - The criteria for sorting. This can be an array of object keys or functions that return values used for sorting. If empty or not provided, sorts by the values themselves.
 * @param {Array<'asc' | 'desc'>} [orders=['asc']] - An array of order directions ('asc' for ascending or 'desc' for descending).
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
 *
 * const result = orderBy(users, [obj => obj.user, 'age'], ['asc', 'desc']);
 * // result will be:
 * // [
 * //   { user: 'barney', age: 36 },
 * //   { user: 'barney', age: 34 },
 * //   { user: 'fred', age: 48 },
 * //   { user: 'fred', age: 40 },
 * // ]
 *
 * @example
 * // Sort an array of strings in descending order.
 * const strings = ['banana', 'apple', 'cherry'];
 * const result = orderBy(strings, [], ['desc']);
 * // result will be: ['cherry', 'banana', 'apple']
 *
 * @example
 * // Sort an array of numbers in ascending order (default).
 * const numbers = [3, 1, 2];
 * const result = orderBy(numbers);
 * // result will be: [1, 2, 3]
 */
export function orderBy<T>(
  arr: readonly T[],
  criteria: Array<((item: T) => unknown) | keyof T> = [],
  orders: Array<'asc' | 'desc'> = ['asc']
): T[] {
  const effectiveCriteria = criteria.length > 0 ? criteria : [(item: T) => item];
  const effectiveOrders = orders.length > 0 ? orders : ['asc' as const];

  return arr.slice().sort((a, b) => {
    const ordersLength = effectiveOrders.length;

    for (let i = 0; i < effectiveCriteria.length; i++) {
      const order = ordersLength > i ? effectiveOrders[i] : effectiveOrders[ordersLength - 1];
      const criterion = effectiveCriteria[i];
      const criterionIsFunction = typeof criterion === 'function';

      const valueA = criterionIsFunction ? criterion(a) : a[criterion as keyof T];
      const valueB = criterionIsFunction ? criterion(b) : b[criterion as keyof T];

      const result = compareValues(valueA, valueB, order);

      if (result !== 0) {
        return result;
      }
    }

    return 0;
  });
}
