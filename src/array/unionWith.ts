import { uniqWith } from "./uniqWith";

/**
 * `unionWith` function returns the union of multiple arrays passed as arguments. During this process, it removes any duplicated elements.
 *
 * @example
 * ```ts
 * unionWith(
 *   [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }],
 *   [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }],
 *   (x, y) => x === y
 * );
 * // [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
 * ```
 */
export function unionWith<T>(arr1: T[], arr2: T[], areItemsEqual: (item1: T, item2: T) => boolean): T[] {
  return uniqWith([...arr1, ...arr2], areItemsEqual);
}
