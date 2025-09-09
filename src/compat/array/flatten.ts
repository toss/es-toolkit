import { isArrayLike } from '../predicate/isArrayLike.ts';

/**
 * Flattens array up to depth times.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} value - The array to flatten.
 * @param {number} depth - The maximum recursion depth.
 * @returns {any[]} Returns the new flattened array.
 *
 * @example
 * flatten([1, [2, [3, [4]], 5]], 2);
 * // => [1, 2, 3, [4], 5]
 */
export function flatten<T>(value: ArrayLike<T | readonly T[]> | null | undefined): T[];

export function flatten<T>(value: ArrayLike<T | readonly T[]> | null | undefined, depth = 1): T[] {
  const result: T[] = [];
  const flooredDepth = Math.floor(depth);

  if (!isArrayLike(value)) {
    return result as T[];
  }

  const recursive = (arr: readonly T[], currentDepth: number) => {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
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
        result.push(item);
      }
    }
  };

  recursive(Array.from(value) as any, 0);

  return result;
}
