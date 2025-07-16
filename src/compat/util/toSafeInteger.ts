import { toInteger } from './toInteger.ts';
import { MAX_SAFE_INTEGER } from '../_internal/MAX_SAFE_INTEGER.ts';
import { clamp } from '../math/clamp.ts';

/**
 * Converts `value` to a safe integer.
 *
 * A safe integer can be compared and represented correctly.
 *
 * @param {any} value - The value to convert.
 * @returns {number} Returns the value converted to a safe integer.
 *
 * @example
 * toSafeInteger(3.2); // => 3
 * toSafeInteger(Number.MAX_VALUE); // => 9007199254740991
 * toSafeInteger(Infinity); // => 9007199254740991
 * toSafeInteger('3.2'); // => 3
 * toSafeInteger(NaN); // => 0
 * toSafeInteger(null); // => 0
 * toSafeInteger(-Infinity); // => -9007199254740991
 */
export function toSafeInteger(value: any): number {
  if (value == null) {
    return 0;
  }

  return clamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
}
