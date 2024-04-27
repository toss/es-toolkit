import { separateArgs } from "../_internal/arguments";
import { unionWith } from "./unionWith";
import { uniq } from "./uniq";

/**
 * `unionBy` function maps the elements of each array passed as arguments using a 'converter' function, and then returns the union of these arrays.
 *
 * @example
 * ```ts
 * unionBy([2.1], [1.2, 2.3], Math.floor);
 * // [2.1, 1.2]
 * ```
 */
export function unionBy<T, U>(
  ...args: [...arrays: T[][], converter: (v: T) => U]
): T[] {
  const { args: arrays, last: converter } = separateArgs(args);

  return unionWith(...arrays, (a, b) => {
    return converter(a) === converter(b);
  });
}
