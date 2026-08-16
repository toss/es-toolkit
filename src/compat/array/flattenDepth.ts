import { ListOfRecursiveArraysOrValues } from '../_internal/ListOfRecursiveArraysOrValues.ts';
import { isArguments } from '../predicate/isArguments.ts';
import { isArray } from '../predicate/isArray.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';

/**
 * Recursively flattens array up to depth times.
 *
 * @template T
 * @param array - The array to flatten.
 * @param [depth=1] - The maximum recursion depth.
 * @returns Returns the new flattened array.
 *
 * @example
 * const array = [1, [2, [3, [4]], 5]];
 *
 * flattenDepth(array, 1);
 * // => [1, 2, [3, [4]], 5]
 *
 * flattenDepth(array, 2);
 * // => [1, 2, 3, [4], 5]
 */
export function flattenDepth<T>(array: ListOfRecursiveArraysOrValues<T> | null | undefined, depth = 1): T[] {
  if (!isArrayLike(array)) {
    return [];
  }
  const result: T[] = [];
  const flooredDepth = Math.floor(depth);

  const recursive = (arr: readonly T[], currentDepth: number) => {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (isFlattenable(item) && currentDepth < flooredDepth) {
        recursive(item as T[], currentDepth + 1);
      } else {
        result.push(item);
      }
    }
  };

  recursive(Array.from(array) as T[], 0);

  return result;
}

function isFlattenable(value: unknown): boolean {
  return isArray(value) || isArguments(value) || Boolean(value && (value as any)[Symbol.isConcatSpreadable]);
}
