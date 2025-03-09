/**
 * Tests whether at least one element in the array passes the test implemented by the provided function.
 *
 * @template T - The type of array.
 * @param {(value: T[number]) => boolean} predicate - The function to test each element.
 * @returns {(arr: T) => boolean} A function that takes an array and returns whether any element passes the test.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const hasEven = some(value => value % 2 === 0);
 * const result = hasEven(arr);
 * // result will be true
 */
export function some<T extends unknown[]>(predicate: (value: T[number]) => boolean): (arr: T) => boolean;
/**
 * Tests whether at least one element in the array passes the test implemented by the provided function.
 *
 * @template T - The type of array.
 * @param {T} arr - The array to test.
 * @param {(value: T[number]) => boolean} predicate - The function to test each element.
 * @returns {boolean} Whether any element in the array passes the test.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const result = some(arr, value => value % 2 === 0);
 * // result will be true
 */
export function some<T extends unknown[]>(arr: T, predicate: (value: T[number]) => boolean): boolean;

export function some<T extends unknown[]>(
  arrOrPredicate: T | ((value: T[number]) => boolean),
  predicate?: (value: T[number]) => boolean
) {
  if (predicate == null) {
    return (arr: T) => some(arr, arrOrPredicate as (value: T[number]) => boolean);
  }

  const arr = arrOrPredicate as T;

  for (const item of arr) {
    if (predicate(item)) {
      return true;
    }
  }

  return false;
}
