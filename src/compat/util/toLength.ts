import { MAX_ARRAY_LENGTH } from '../_internal/MAX_ARRAY_LENGTH';
import { clamp } from '../math/clamp';

/**
 * Converts value to an integer suitable for use as the length of an array-like object.
 *
 * @param {unknown} value - The value to convert to an array length.
 * @returns {number} Returns the converted integer.
 *
 * @example
 * toLength(3.2)  // => 3
 * toLength(-1)   // => 0
 * toLength(1.9)  // => 1
 * toLength('42') // => 42
 * toLength(null) // => 0
 */
export function toLength(value?: unknown): number {
  if (value == null) {
    return 0;
  }

  const length = Math.floor(Number(value));
  
  return clamp(length, 0, MAX_ARRAY_LENGTH);
}
