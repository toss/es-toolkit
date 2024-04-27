import { separateArgs } from "../_internal/arguments";

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
export function unionWith<T>(
  ...args: [...arrays: T[][], comparator: (item1: T, item2: T) => boolean]
): T[] {
  const { args: arrays, last: comparator } = separateArgs(args);
  const flatten = [...arrays.flat()];

  const result: T[] = [];

  for (const element of flatten) {
    const isUniq = result.find((v) => comparator(v, element)) == null;
    if (isUniq) {
      result.push(element);
    }
  }

  return result;
}
