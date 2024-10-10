import { compact as compactToolkit } from '../../array/compact.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';

type Falsey = false | null | 0 | 0n | '' | undefined;
type NotFalsey<T> = Exclude<T, Falsey>;

/**
 * Removes falsey values (false, null, 0, 0n, '', undefined, NaN) from an array.
 *
 * @template T - The type of elements in the array.
 * @param {ArrayLike<T | Falsey> | null | undefined} arr - The input array to remove falsey values.
 * @returns {Array<Exclude<T, false | null | 0 | 0n | '' | undefined>>} - A new array with all falsey values removed.
 *
 * @example
 * compact([0, 0n, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]);
 * Returns: [1, 2, 3, 4, 5]
 */
export function compact<T>(arr: ArrayLike<T | Falsey> | null | undefined): Array<NotFalsey<T>> {
  if (!isArrayLike(arr)) {
    return [];
  }

  return compactToolkit(Array.from(arr));
}
