/**
 * Flattens an array up to the specified depth.
 *
 * @template T - The type of elements within the array.
 * @template D - The depth to which the array should be flattened.
 * @param {T[]} arr - The array to flatten.
 * @param {D} depth - The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.
 * @returns {Array<FlatArray<T[], D>>} A new array that has been flattened.
 *
 * @example
 * const arr = flatten([1, [2, 3], [4, [5, 6]]], 1);
 * // Returns: [1, 2, 3, 4, [5, 6]]
 *
 * const arr = flatten([1, [2, 3], [4, [5, 6]]], 2);
 * // Returns: [1, 2, 3, 4, 5, 6]
 */
export function flatten<T, D extends number = 1>(arr: readonly T[], depth = 1 as D): Array<FlatArray<T[], D>> {
  const result: Array<FlatArray<T[], D>> = [];
  const flooredDepth = Math.floor(depth);

  const recursive = (arr: readonly T[], currentDepth: number) => {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (Array.isArray(item) && currentDepth < flooredDepth) {
        recursive(item, currentDepth + 1);
      } else {
        result.push(item as FlatArray<T[], D>);
      }
    }
  };

  recursive(arr, 0);
  return result;
}
