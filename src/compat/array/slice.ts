import { isIterateeCall } from '../_internal/isIterateeCall';
import { toInteger } from '../util/toInteger';

export function slice<T>(array: readonly T[], start?: number, end?: number): T[] {
  const length = array == null ? 0 : array.length;

  if (end && typeof end !== 'number' && isIterateeCall(array, start, end)) {
    // support for expression like `_.map(slice)`
    start = 0;
    end = length;
  } else {
    start = start == null ? 0 : toInteger(start);
    end = end === undefined ? length : toInteger(end);
  }

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
