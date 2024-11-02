import { isIterateeCall } from '../_internal/isIterateeCall.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { toInteger } from '../util/toInteger.ts';

/**
 * Create a slice of `array` from `start` up to, but not including, `end`.
 *
 * It does not return a dense array for sparse arrays unlike the native `Array.prototype.slice`.
 *
 * @template T - The type of the array elements.
 * @param {ArrayLike<T> | null | undefined} array - The array to slice.
 * @param {number} [start=0] - The start position.
 * @param {number} [end=array.length] - The end position.
 * @returns {T[]} - Returns the slice of `array`.
 *
 * @example
 * slice([1, 2, 3], 1, 2); // => [2]
 * slice(new Array(3)); // => [undefined, undefined, undefined]
 */
export function slice<T>(array: ArrayLike<T> | null | undefined, start?: number, end?: number): T[] {
  if (!isArrayLike(array)) {
    return [];
  }

  const length = array.length;

  if (end === undefined) {
    end = length;
  } else if (typeof end !== 'number' && isIterateeCall(array, start, end)) {
    // support for expression like `_.map(slice)`
    start = 0;
    end = length;
  }

  start = toInteger(start);
  end = toInteger(end);

  if (start < 0) {
    start = Math.max(length + start, 0);
  } else {
    start = Math.min(start, length);
  }

  if (end < 0) {
    end = Math.max(length + end, 0);
  } else {
    end = Math.min(end, length);
  }

  const resultLength = Math.max(end - start, 0);
  const result = new Array(resultLength);

  for (let i = 0; i < resultLength; ++i) {
    result[i] = array[start + i];
  }

  return result;
}
