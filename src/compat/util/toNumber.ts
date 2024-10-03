import { isSymbol } from '../predicate/isSymbol';

/**
 * Converts `value` to a number.
 *
 * Unlike `Number()`, this function returns `NaN` for symbols.
 *
 * @param {unknown} value - The value to convert.
 * @returns {number} Returns the number.
 *
 * @example
 * toNumber(3.2); // => 3.2
 * toNumber(Number.MIN_VALUE); // => 5e-324
 * toNumber(Infinity); // => Infinity
 * toNumber('3.2'); // => 3.2
 * toNumber(Symbol.iterator); // => NaN
 * toNumber(NaN); // => NaN
 */
export function toNumber(value?: unknown): number {
  if (isSymbol(value)) {
    return NaN;
  }

  return Number(value);
}
