/**
 * Computes the difference between two arrays.
 *
 * This function takes two arrays and returns a new array containing the elements
 * that are present in the first array but not in the second array. It effectively
 * filters out any elements from the first array that also appear in the second array.
 *
 *
 * @template T The type of elements in the first array.
 * @template U A subtype of T representing the values to exclude.
 * @param {readonly T[]} firstArr - The array from which to derive the difference. This is the primary array
 * from which elements will be compared and filtered.
 * @param {readonly U[]} secondArr - The array containing elements to be excluded from the first array.
 * Each element in this array will be checked against the first array, and if a match is found,
 * that element will be excluded from the result.
 * @returns {Exclude<T, U>[]} A new array containing the elements that are present in the first array but not
 * in the second array.
 *
 * @example
 * const array1 = [1, 2, 3, 4, 5];
 * const array2 = [2, 4];
 * const result = difference(array1, array2);
 * // result will be [1, 3, 5] since 2 and 4 are in both arrays and are excluded from the result.
 */

// When the second array is empty → keep T[]
export function difference<T>(firstArr: readonly T[], secondArr: readonly []): T[];

// When the second array contains specific values → narrow to Exclude<T, U>[]
export function difference<T, U extends T>(firstArr: readonly T[], secondArr: readonly U[]): Array<Exclude<T, U>>;

// Fallback overload for backward compatibility → return T[]
export function difference<T>(firstArr: readonly T[], secondArr: readonly T[]): T[];

// Implementation — same parameter style as the original version
export function difference<T, U extends T = never>(
  firstArr: readonly T[],
  secondArr: readonly T[]
): Array<Exclude<T, U>> {
  const secondSet = new Set(secondArr);
  return firstArr.filter(item => !secondSet.has(item)) as Array<Exclude<T, U>>;
}
