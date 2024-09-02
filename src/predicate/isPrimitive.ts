/**
 * Checks whether a value is a JavaScript primitive.
 * JavaScript primitives include null, undefined, strings, numbers, booleans, symbols, and bigints.
 *
 * @param value The value to check.
 * @returns
 * 
 * 
 * 
 * 
 * 
 * 
 *  Returns true if `value` is a primitive, false otherwise.
 */
export function isPrimitive(value: unknown): value is null | undefined | string | number | boolean | symbol | bigint {
  return value == null || (typeof value !== 'object' && typeof value !== 'function');
}
