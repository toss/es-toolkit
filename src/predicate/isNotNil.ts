/**
 * @name isNotNil
 * Checks if the given value is not null nor undefined.
 * The main use of this function is to used with TypeScript as a type predicate.
 * @param x The value to test if it is not null nor undefined
 * @example
 * // Here the type of `arr` is (number | undefined)[]
 * const arr = [1, undefined, 3];
 * // Here the type of `result` is number[]
 * const result = arr.filter(isNotNil);
 */
export function isNotNil<T>(x: T | null | undefined): x is T {
  return x != null && x != undefined;
}