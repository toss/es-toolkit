/**
 * Checks if the given value is a bigint.
 *
 * @param {unknown} x - The value to test.
 * @returns {x is bigint} True if the value is a bigint, false otherwise.
 */
export function isBigInt(x: unknown): x is bigint {
  return typeof x === 'bigint';
}
