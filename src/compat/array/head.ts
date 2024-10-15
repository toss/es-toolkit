import { head as headToolkit } from '../../array/head.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';

/**
 * Returns the first element of an array or `undefined` if the array is empty.
 *
 * This function takes an array and returns the first element of the array.
 * If the array is empty, the function returns `undefined`.
 *
 * @template T - The type of elements in the array.
 * @param {ArrayLike<T> | undefined | null} arr - The array from which to get the first element.
 * @returns {T | undefined} The first element of the array, or `undefined` if the array is empty.
 *
 * @example
 * const emptyArr: number[] = [];
 * const noElement = head(emptyArr);
 * // noElement will be undefined
 */
export function head<T>(arr: ArrayLike<T> | undefined | null): T | undefined {
  if (!isArrayLike(arr)) {
    return undefined;
  }
  return headToolkit(Array.from(arr));
}
