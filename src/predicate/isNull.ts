/**
 * @name isNull
 * Checks if the given value is null.
 * @param x The value to test if it is null
 */
export function isNull(x: unknown): x is null {
  return x === null;
}