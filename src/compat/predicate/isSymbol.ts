/**
 * Check whether a value is a symbol.
 *
 * This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `symbol`.
 *
 * @param value The value to check.
 * @returns Returns `true` if `value` is a symbol, else `false`.
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
