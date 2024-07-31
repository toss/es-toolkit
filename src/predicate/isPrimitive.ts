/**
 * Checks whether a value is a JavaScript primitive.
 * JavaScript primitives include null, undefined, strings, numbers, booleans, symbols, and bigints.
 *
 * @param {unknown} value The value to check.
 * @returns {x is
 *   | null
 *   | undefined
 *   | string
 *   | number
 *   | boolean
 *   | symbol
 *   | bigint} Returns true if `x` is a primitive, false otherwise.
 */
export function isPrimitive(value: unknown): value is null | undefined | string | number | boolean | symbol | bigint {
  return Object(value) !== value;
}
