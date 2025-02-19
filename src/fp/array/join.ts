/**
 * Joins all elements of an array into a string with specified separator.
 *
 * @template T - The type of array.
 * @param {string} separator - The string used to separate array elements.
 * @returns {(arr: T) => string} A function that takes an array and returns a string with all elements joined.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const joinWithComma = join(',');
 * const result = joinWithComma(arr);
 * // result will be "1,2,3,4,5"
 */
export function join<T extends unknown[]>(separator: string): (arr: T) => string;
/**
 * Joins all elements of an array into a string with specified separator.
 *
 * @template T - The type of array.
 * @param {T} arr - The array to join.
 * @param {string} separator - The string used to separate array elements.
 * @returns {string} A string with all array elements joined.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const result = join(arr, ',');
 * // result will be "1,2,3,4,5"
 */
export function join<T extends unknown[]>(arr: T, separator: string): string;

export function join<T extends unknown[]>(arrOrSeparator: T | string, separator?: string) {
  if (separator === undefined && typeof arrOrSeparator === 'string') {
    return (arr: T) => join(arr, arrOrSeparator);
  }

  const arr = arrOrSeparator as T;
  return arr.join(separator);
}
