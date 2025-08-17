import { toNumber } from './toNumber.ts';

/**
 * Converts `value` to a finite number.
 *
 * @param {unknown} value - The value to convert.
 * @returns {number} Returns the number.
 *
 * @example
 * toFinite(3.2); // => 3.2
 * toFinite(Number.MIN_VALUE); // => 5e-324
 * toFinite(Infinity); // => 1.7976931348623157e+308
 * toFinite('3.2'); // => 3.2
 * toFinite(Symbol.iterator); // => 0
 * toFinite(NaN); // => 0
 */
export function toFinite(value: any): number {
  if (!value) {
    return value === 0 ? value : 0;
  }

  value = toNumber(value);

  if (value === Infinity || value === -Infinity) {
    const sign = value < 0 ? -1 : 1;
    return sign * Number.MAX_VALUE;
  }

  return value === value ? (value as number) : 0;
}
