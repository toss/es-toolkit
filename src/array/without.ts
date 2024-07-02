/**
 * Creates an array excluding all given values using SameValueZero for equality comparisons.
 *
 * This function takes an input array and returns a new array that excludes all values
 * specified in the second argument. It uses SameValueZero for equality comparisons,
 * meaning that it considers -0 and +0 as equal but treats NaN as unequal to itself.
 *
 * @template T The type of elements in the array.
 * @param {ArrayLike<T>} array - The array to filter.
 * @param {...T[]} values - The values to exclude.
 * @returns {T[]} A new array without the specified values.
 *
 * @example
 * // Removes the specified values from the array
 * without([1, 2, 3, 4, 5], 2, 4);
 * // Returns: [1, 3, 5]
 *
 * @example
 * // Removes specified string values from the array
 * without(['a', 'b', 'c', 'a'], 'a');
 * // Returns: ['b', 'c']
 */
export function without<T>(array: ArrayLike<T>, ...values: T[]): T[] {
  if (!array || typeof array.length !== 'number') {
    return [];
  }
  const valuesSet = new Set(values);
  return Array.prototype.filter.call(array, item => !valuesSet.has(item));
}
