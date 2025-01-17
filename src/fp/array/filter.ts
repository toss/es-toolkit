/**
 * Filter array values by predicate function.
 *
 * @template T - The type of array.
 * @param {(value: T[number]) => boolean} predicate - The function that tests each item.
 * @returns {(arr: T) => T[number][]} A function that takes an array and returns filtered values.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const isEven = filter(value => value % 2 === 0);
 * const result = isEven(arr);
 * // result will be [2, 4]
 */
export function filter<T extends unknown[]>(predicate: (value: T[number]) => boolean): (arr: T) => T[number][];
/**
 * Filter array values by predicate function.
 *
 * @template T - The type of array.
 * @param {T} arr - The array to be filtered.
 * @param {(value: T[number]) => boolean} predicate - The function that tests each item.
 * @returns {T[number][]} A new array with filtered values.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const result = filter(arr, value => value % 2 === 0);
 * // result will be [2, 4]
 */
export function filter<T extends unknown[]>(arr: T, predicate: (value: T[number]) => boolean): T[number][];

export function filter<T extends unknown[]>(
  arrOrPredicate: T | ((value: T[number]) => boolean),
  predicate?: (value: T[number]) => boolean
) {
  if (predicate == null) {
    return (arr: T) => filter(arr, arrOrPredicate as (value: T[number]) => boolean);
  }

  const arr = arrOrPredicate as T[];
  const result = [];

  for (const item of arr) {
    if (predicate(item)) {
      result.push(item);
    }
  }

  return result;
}
