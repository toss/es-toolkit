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
  const flooredDepth = Math.max(0, Math.floor(depth));

  if (flooredDepth === 0) {
    return Array.from(arr) as Array<FlatArray<T[], D>>;
  }

  // Use iterative approach to avoid stack overflow on deeply nested arrays
  type StackItem = [readonly unknown[], number, number]; // [array, depth, index]
  const stack: StackItem[] = [[arr as readonly unknown[], 0, 0]];

  while (stack.length > 0) {
    const top = stack[stack.length - 1];
    const [currentArr, currentDepth, currentIndex] = top;

    if (currentIndex >= currentArr.length) {
      stack.pop();
      continue;
    }

    top[2]++; // increment index

    const item = currentArr[currentIndex];
    if (Array.isArray(item) && currentDepth < flooredDepth) {
      stack.push([item as readonly unknown[], currentDepth + 1, 0]);
    } else {
      result.push(item as FlatArray<T[], D>);
    }
  }

  return result;
}
