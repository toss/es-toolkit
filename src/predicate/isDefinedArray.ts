/**
 * Check if all items in the array are defined.
 *
 * @param array The array to check.
 * @returns `true` if all items in the array are defined, `false` otherwise.
 *
 * @example
 * ```ts
 * isDefinedArray([1, 2, 3]); // true
 * isDefinedArray([undefined, 1, 2, 3]); // false
 * isDefinedArray([null, 1, 2, 3]); // false
 * isDefinedArray([undefined, null, 1, 2, 3]); // false
 * isDefinedArray([1, 2, 3, undefined]); // false
 * isDefinedArray([1, 2, 3, null]); // false
 * isDefinedArray([1, 2, 3, undefined, null]); // false
 * ```
 */
export function isDefinedArray<T>(array: Array<T | undefined | null>): array is T[] {
  return array.every(item => item !== undefined && item !== null);
}
