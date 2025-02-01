/**
 * Returns the index of the first element in the array that satisfies the provided testing function.
 *
 * @template T - The type of array.
 * @param {(value: T[number]) => boolean} predicate - The function to test each element.
 * @returns {(arr: T) => number} A function that takes an array and returns the index of the first element that satisfies the test, or -1 if no element is found.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const findFirstEvenIndex = findIndex(value => value % 2 === 0);
 * const result = findFirstEvenIndex(arr);
 * // result will be 1
 */
export function findIndex<T extends unknown[]>(predicate: (value: T[number]) => boolean): (arr: T) => number;
/**
 * Returns the index of the first element in the array that satisfies the provided testing function.
 *
 * @template T - The type of array.
 * @param {T} arr - The array to search.
 * @param {(value: T[number]) => boolean} predicate - The function to test each element.
 * @returns {number} The index of the first element that satisfies the test, or -1 if no element is found.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const result = findIndex(arr, value => value % 2 === 0);
 * // result will be 1
 */
export function findIndex<T extends unknown[]>(arr: T, predicate: (value: T[number]) => boolean): number;

export function findIndex<T extends unknown[]>(
  arrOrPredicate: T | ((value: T[number]) => boolean),
  predicate?: (value: T[number]) => boolean
) {
  if (predicate == null) {
    return (arr: T) => findIndex(arr, arrOrPredicate as (value: T[number]) => boolean);
  }

  const arr = arrOrPredicate as T[];

  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i])) {
      return i;
    }
  }

  return -1;
}
