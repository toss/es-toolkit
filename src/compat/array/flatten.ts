import { Many } from '../_internal/Many.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';

/**
 * Flattens array a single level deep.
 *
 * @template T
 * @param {ArrayLike<Many<T>> | null | undefined} array - The array to flatten.
 * @returns {T[]} Returns the new flattened array.
 *
 * @example
 * flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
export function flatten<T>(array: ArrayLike<Many<T>> | null | undefined): T[];

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
export function flatten<T, D extends number = 1>(
  value: ArrayLike<T> | null | undefined,
  depth: D
): Array<FlatArray<T[], D>>;

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
export function flatten<T, D extends number = 1>(
  value: ArrayLike<T> | null | undefined,
  depth: D = 1 as D
): Array<FlatArray<T[], D>> {
  const result: Array<FlatArray<T[], D>> = [];
  const flooredDepth = Math.floor(depth);

  if (!isArrayLike(value)) {
    return result;
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
        result.push(item as FlatArray<T[], D>);
      }
    }
  };

  recursive(Array.from(value), 0);

  return result;
}
