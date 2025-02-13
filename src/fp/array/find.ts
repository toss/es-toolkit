/**
 * Returns the first element in the array that satisfies the provided testing function.
 *
 * @template T - The type of array.
 * @param {(value: T[number]) => boolean} predicate - The function to test each element.
 * @returns {(arr: T) => T[number] | undefined} A function that takes an array and returns the first element that satisfies the test, or undefined if no element is found.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const findFirstEven = find(value => value % 2 === 0);
 * const result = findFirstEven(arr);
 * // result will be 2
 */
export function find<T extends unknown[]>(predicate: (value: T[number]) => boolean): (arr: T) => T[number] | undefined;
/**
 * Returns the first element in the array that satisfies the provided testing function.
 *
 * @template T - The type of array.
 * @param {T} arr - The array to search.
 * @param {(value: T[number]) => boolean} predicate - The function to test each element.
 * @returns {T[number] | undefined} The first element that satisfies the test, or undefined if no element is found.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const result = find(arr, value => value % 2 === 0);
 * // result will be 2
 */
export function find<T extends unknown[]>(arr: T, predicate: (value: T[number]) => boolean): T[number] | undefined;

export function find<T extends unknown[]>(
  arrOrPredicate: T | ((value: T[number]) => boolean),
  predicate?: (value: T[number]) => boolean
) {
  if (predicate == null) {
    return (arr: T) => find(arr, arrOrPredicate as (value: T[number]) => boolean);
  }

  const arr = arrOrPredicate as T[];

  for (const item of arr) {
    if (predicate(item)) {
      return item;
    }
  }

  return undefined;
}
