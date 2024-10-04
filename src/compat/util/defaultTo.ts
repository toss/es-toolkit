/**
 * Checks value to determine whether a default value should be returned in its place.
 *
 * The defaultValue is returned if value is NaN, null, or undefined.
 *
 * @param {unknown} value - The value to check.
 * @param {unknown} defaultValue - The default value to return if the first value is null, undefined, or NaN.
 * @returns {unknown} Returns either the first value or the default value.
 *
 * @example
 * defaultTo(null, 'default') // returns 'default'
 * defaultTo(undefined, 42) // returns 42
 * defaultTo(NaN, 0) // returns 0
 * defaultTo('actual', 'default') // returns 'actual'
 * defaultTo(123, 0) // returns 123
 */
export function defaultTo(value?: unknown, defaultValue?: unknown): any {
  return value == null || Number.isNaN(value) ? defaultValue : value;
}
