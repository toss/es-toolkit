import { toFinite } from './toFinite';

/**
 * Converts `value` to an integer.
 * 
 * This function first converts `value` to a finite number. If the result has any decimal places,
 * they are removed by rounding down to the nearest whole number.
 *
 * @param {unknown} value - The value to convert.
 * @returns {number} Returns the number.
 *
 * @example
 * toInteger(3.2); // => 3
 * toInteger(Number.MIN_VALUE); // => 0
 * toInteger(Infinity); // => 1.7976931348623157e+308
 * toInteger('3.2'); // => 3
 * toInteger(Symbol.iterator); // => 0
 * toInteger(NaN); // => 0
 */
export function toInteger(value?: unknown): number {
  const finite = toFinite(value);
  const remainder = finite % 1;

  return remainder ? finite - remainder : finite;
}
