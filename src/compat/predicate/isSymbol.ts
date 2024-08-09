/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @param {unknown} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 * isSymbol(Symbol.iterator);
 * // => true
 *
 * isSymbol('abc');
 * // => false
 */
export function isSymbol(value?: unknown): value is symbol {
  return typeof value === 'symbol' || (value != null && value instanceof Symbol);
}
