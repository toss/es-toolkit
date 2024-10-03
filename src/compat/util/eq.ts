/**
 * Performs a `SameValueZero` comparison between two values to determine if they are equivalent.
 *
 * @param {unknown} value - The value to compare.
 * @param {unknown} other - The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 *
 * @example
 * eq(1, 1); // true
 * eq(0, -0); // true
 * eq(NaN, NaN); // true
 * eq('a', Object('a')); // false
 */
export function eq(value?: unknown, other?: unknown): boolean {
  return value === other || (Number.isNaN(value) && Number.isNaN(other));
}
