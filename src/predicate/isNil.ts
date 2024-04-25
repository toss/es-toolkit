/**
 * @name isNil
 * Checks if the given value is null or undefined.
 * @param x The value to test if it is null or undefined
 */
export function isNil(x: unknown): x is null | undefined {
  return x == null || x == undefined;
}