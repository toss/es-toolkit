import { fill as fillToolkit } from '../../array/fill';

/**
 * Creates a function that fills elements of array with value from start up to end.
 *
 * @template T - The type of array elements.
 * @param {T} value - The value to fill array with.
 * @param {number} [start=0] - The start position.
 * @param {number} [end=array.length] - The end position.
 * @returns {(arr: T[]) => T[]} A function that takes an array and returns a new filled array.
 *
 * @example
 * const fillWithA = fill('a', 1, 3);
 * const result = fillWithA(['x', 'x', 'x', 'x']);
 * // result will be ['x', 'a', 'a', 'x']
 */
export function fill<T, U>(value: U, start?: number, end?: number): (arr: T[]) => Array<T | U>;
/**
 * Fills elements of array with value from start up to end.
 *
 * @template T - The type of array elements.
 * @param {T[]} arr - The array to fill.
 * @param {T} value - The value to fill array with.
 * @param {number} [start=0] - The start position.
 * @param {number} [end=array.length] - The end position.
 * @returns {T[]} A new array with filled elements.
 *
 * @example
 * const array = ['x', 'x', 'x', 'x'];
 * const result = fill(array, 'a', 1, 3);
 * // result will be ['x', 'a', 'a', 'x']
 */
export function fill<T, U>(arr: T[], value: U, start?: number, end?: number): Array<T | U>;

export function fill<T, U>(
  arrOrValue: T[] | T,
  valueOrStart?: U | number,
  startOrEnd?: number,
  end?: number
) {
  if (!Array.isArray(arrOrValue)) {
    return (arr: T[]) => fill(arr, arrOrValue, valueOrStart as number, startOrEnd);
  }

  const arr = arrOrValue;
  const value = valueOrStart as T;
  return fillToolkit(arr, value, startOrEnd ?? 0, end ?? arr.length);
}
