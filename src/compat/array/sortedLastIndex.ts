import { sortedLastIndexBy } from './sortedLastIndexBy';
import { isNil, isNull, isSymbol } from '../../predicate';
import { isNumber } from '../predicate/isNumber';

const MAX_ARRAY_LENGTH = 4294967295;
const HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

/**
 * Uses a binary search to determine the highest index at which `value`
 * should be inserted into `array` in order to maintain its sort order.
 *
 * @category Array
 * @param {ArrayLike<T> | null | undefined} array The sorted array to inspect.
 * @param {T} value The value to evaluate.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 * @example
 * sortedIndex([4, 5, 5, 5, 6], 5)
 * // => 4
 */
export function sortedLastIndex<T>(array: ArrayLike<T> | null | undefined, value: T): number {
  if (isNil(array)) {
    return 0;
  }

  let high = array.length;

  if (!isNumber(value) || Number.isNaN(value) || high > HALF_MAX_ARRAY_LENGTH) {
    return sortedLastIndexBy(array, value, value => value);
  }

  let low = 0;

  while (low < high) {
    const mid = (low + high) >>> 1;
    const compute = array[mid];
    if (!isNull(compute) && !isSymbol(compute) && (compute as any) <= value) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return high;
}
