type NotFalsey<T> = Exclude<T, false | null | 0 | '' | undefined>;

/**
 * Removes falsey values (false, null, 0, '', undefined, NaN) from an array.
 *
 * @template T - The type of elements in the array.
 * @param arr - The input array to remove falsey values.
 * @returns - A new array with all falsey values removed.
 *
 * @example
 * compact([0, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]);
 * Returns: [1, 2, 3, 4, 5]
 */
export function compact<T>(arr: readonly T[]): Array<NotFalsey<T>> {
  const result: Array<NotFalsey<T>> = [];

  for (const item of arr) {
    if (item) {
      result.push(item as NotFalsey<T>);
    }
  }

  return result;
}
