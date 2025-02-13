/**
 * Creates a slice of array from start up to end.
 *
 * @template T - The type of array.
 * @param {number} [start=0] - The start position. Negative index counts from the end.
 * @param {number} [end=array.length] - The end position. Negative index counts from the end.
 * @returns {(arr: T) => T[number][]} A function that takes an array and returns sliced elements.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const getFirstThree = slice(0, 3);
 * const result = getFirstThree(arr);
 * // result will be [1, 2, 3]
 */
export function slice<T extends unknown[]>(start: number, end?: number): (arr: T) => T[number][];
/**
 * Creates a slice of array from start up to end.
 *
 * @template T - The type of array.
 * @param {T} arr - The array to slice.
 * @param {number} [start=0] - The start position. Negative index counts from the end.
 * @param {number} [end=array.length] - The end position. Negative index counts from the end.
 * @returns {T[number][]} A new array with extracted elements.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const result = slice(arr, 1, 3);
 * // result will be [2, 3]
 */
export function slice<T extends unknown[]>(arr: T, startOrEnd: number, end?: number): T[number][];

export function slice<T extends unknown[]>(arrOrStart: T | number, startOrEnd?: number, end?: number) {
  if (!Array.isArray(arrOrStart)) {
    return (arr: T) => slice(arr, arrOrStart, startOrEnd);
  }

  const arr = arrOrStart;

  return arr.slice(startOrEnd, end);
}
