/**
 * @name isUndefined
 * Checks if the given value is undefined.
 * @param x The value to test if it is undefined
 */
export function isUndefined(x: unknown): x is undefined {
  return x === undefined;
}