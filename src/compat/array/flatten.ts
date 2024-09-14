/**
 * Flattens an array up to the specified depth.
 *
 * @template T - The type of elements within the array.
 * @template D - The depth to which the array should be flattened.
 * @param {T[] | object} value - The object to flatten.
 * @param {D} depth - The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.
 * @returns {Array<FlatArray<T[], D>> | []} A new array that has been flattened.
 *
 * @example
 * const arr = flatten([1, [2, 3], [4, [5, 6]]], 1);
 * // Returns: [1, 2, 3, 4, [5, 6]]
 *
 * const arr = flatten([1, [2, 3], [4, [5, 6]]], 2);
 * // Returns: [1, 2, 3, 4, 5, 6]
 */
export function flatten<T, D extends number = 1>(
  value: readonly T[] | object,
  depth = 1 as D
): Array<FlatArray<T[], D>> | [] {
  const result: Array<FlatArray<T[], D>> = [];
  const flooredDepth = Math.floor(depth);

  if (!Array.isArray(value)) {
    return result;
  }

  const recursive = (arr: readonly T[], currentDepth: number) => {
    for (const item of arr) {
      if (
        currentDepth < flooredDepth &&
        (Array.isArray(item) ||
          Boolean(item?.[Symbol.isConcatSpreadable as keyof object]) ||
          (item !== null && typeof item === 'object' && Object.prototype.toString.call(item) === '[object Arguments]'))
      ) {
        if (Array.isArray(item)) {
          recursive(item, currentDepth + 1);
        } else {
          recursive(Array.from(item as T[]), currentDepth + 1);
        }
      } else {
        result.push(item as FlatArray<T[], D>);
      }
    }
  };

  recursive(value, 0);

  return result;
}
