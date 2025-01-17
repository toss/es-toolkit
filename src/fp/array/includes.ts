/**
 * Determines whether an array includes a certain value.
 *
 * @template T - The type of array.
 * @param {T[number]} searchElement - The value to search for.
 * @returns {(arr: T) => boolean} A function that takes an array and returns whether the array includes the search element.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const hasTwo = includes(2);
 * const result = hasTwo(arr);
 * // result will be true
 */
export function includes<T extends unknown[]>(searchElement: T[number]): (arr: T) => boolean;
/**
 * Determines whether an array includes a certain value.
 *
 * @template T - The type of array.
 * @param {T} arr - The array to search in.
 * @param {T[number]} searchElement - The value to search for.
 * @returns {boolean} Whether the array includes the search element.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const result = includes(arr, 2);
 * // result will be true
 */
export function includes<T extends unknown[]>(arr: T, searchElement: T[number]): boolean;

export function includes<T extends unknown[]>(arrOrSearchElement: T | T[number], searchElement?: T[number]) {
  if (searchElement === undefined && !Array.isArray(arrOrSearchElement)) {
    return (arr: T) => includes(arr, arrOrSearchElement);
  }

  const arr = arrOrSearchElement as T;
  return arr.includes(searchElement as T[number]);
}
