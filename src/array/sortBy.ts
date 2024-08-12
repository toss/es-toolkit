type Iteratee<T> = (object: T) => T[keyof T];

/**
 * Sorts an array of objects based on the given iteratees or keys in ascending order.
 *
 * This function takes an array of objects, an array of iteratees or keys to sort by.
 * It returns the sorted array, ordering by each key according to ascending order.
 * If values for a key are equal, it moves to the next key to determine the order.
 *
 * @template T - The type of the objects in the array.
 * @param {T[]} collection - The array of objects to be sorted.
 * @param {Array<Iteratee<T> | keyof T>} iteratees - The array of iteratees or keys to sort by.
 * @returns {T[]} - The ascendingly sorted array of objects.
 *
 * @example
 * const users = [
 *  { user: 'foo', age: 24 },
 *  { user: 'bar', age: 7 },
 *  { user: 'foo ', age: 8 },
 *  { user: 'bar ', age: 29 },
 * ];
 *
 * sortBy(users, ['user', 'age']);
 * sortBy(users, [obj => obj.user, 'age']);
 * // results will be:
 * // [
 * //   { user : 'bar', age: 7 },
 * //   { user : 'bar', age: 29 },
 * //   { user : 'foo', age: 8 },
 * //   { user : 'foo', age: 24 },
 * // ]
 */
export function sortBy<T extends object>(collection: T[], iteratees: Array<Iteratee<T> | keyof T>): T[] {
  const compareValues = (a: T[keyof T], b: T[keyof T]) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }

    return 0;
  };

  const shallowCopiedCollection = collection.slice();
  const sortedCollection = shallowCopiedCollection.sort((a, b) => {
    for (let i = 0; i < iteratees.length; i++) {
      const iteratee = iteratees[i];
      const iterateeIsFunction = typeof iteratee === 'function';

      const valueA = iterateeIsFunction ? iteratee(a) : a[iteratee];
      const valueB = iterateeIsFunction ? iteratee(b) : b[iteratee];

      const result = compareValues(valueA, valueB);

      if (result !== 0) {
        return result;
      }
    }

    return 0;
  });

  return sortedCollection;
}
