import { identify } from "../_internal/identify";
import { unionBy } from "./unionBy";

/**
 * `union` function returns the union of the arrays passed as arguments.
 *
 * @example
 * ```ts
 * union([2], [1, 2]);
 * // [2, 1]
 * ```
 */
export function union<T>(...args: T[][]): T[] {
  return unionBy(...args, identify);
}
