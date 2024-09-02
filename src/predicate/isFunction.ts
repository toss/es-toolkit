/**
 * Checks if `value` is a function.
 *
 * @param value The value to check.
 * @returns Returns `true` if `value` is a function, else `false`.
 *
 * @example
 * isFunction(Array.prototype.slice); // true
 * isFunction(async function () {}); // true
 * isFunction(function* () {}); // true
 * isFunction(Proxy); // true
 * isFunction(Int8Array); // true
 */
export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === 'function';
}
