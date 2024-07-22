/**
 * Flattens an array up to the specified depth.
 *
 * @template T - The depth to which the array should be flattened.
 * @param {unknown} - The value to flatten.
 * @param value
 * @param {T} depth - The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.
 * @returns {Array<FlatArray<unknown, D>>} A new array that has been flattened.
 *
 * @example
 * const arr = flatten([1, [2, 3], [4, [5, 6]]], 1);
 * // Returns: [1, 2, 3, 4, [5, 6]]
 *
 * const arr = flatten([1, [2, 3], [4, [5, 6]]], 2);
 * // Returns: [1, 2, 3, 4, 5, 6]
 */
export function flatten<T extends number = 1>(value: unknown, depth = 1 as T): Array<FlatArray<unknown, T>> {
  const result: Array<FlatArray<T[], D>> = [];
  const flooredDepth = Math.floor(depth);

  const recursive = (arr: readonly T[], currentDepth: number) => {
    for (const item of arr) {
      if (Array.isArray(item) && currentDepth < flooredDepth) {
        recursive(item, currentDepth + 1)
      } else {
        result.push(item as FlatArray<T[], D>);
      }
    }
  };

  recursive(arr, 0);
  return result;
}
