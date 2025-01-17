/**
 * Tests whether all elements in the array pass the test implemented by the provided function.
 *
 * @template T - The type of array.
 * @param {(value: T[number]) => boolean} predicate - The function to test each element.
 * @returns {(arr: T) => boolean} A function that takes an array and returns whether all elements pass the test.
 *
 * @example
 * const arr = [2, 4, 6, 8];
 * const isEven = every(value => value % 2 === 0);
 * const result = isEven(arr);
 * // result will be true
 */
export function every<T extends unknown[]>(predicate: (value: T[number]) => boolean): (arr: T) => boolean;
/**
 * Tests whether all elements in the array pass the test implemented by the provided function.
 *
 * @template T - The type of array.
 * @param {T} arr - The array to test.
 * @param {(value: T[number]) => boolean} predicate - The function to test each element.
 * @returns {boolean} Whether all elements in the array pass the test.
 *
 * @example
 * const arr = [2, 4, 6, 8];
 * const result = every(arr, value => value % 2 === 0);
 * // result will be true
 */
export function every<T extends unknown[]>(arr: T, predicate: (value: T[number]) => boolean): boolean;

export function every<T extends unknown[]>(
  arrOrPredicate: T | ((value: T[number]) => boolean),
  predicate?: (value: T[number]) => boolean
) {
  if (predicate == null) {
    return (arr: T) => every(arr, arrOrPredicate as (value: T[number]) => boolean);
  }

  const arr = arrOrPredicate as T[];

  for (const item of arr) {
    if (!predicate(item)) {
      return false;
    }
  }

  return true;
}
