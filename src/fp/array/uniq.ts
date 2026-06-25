import { uniq as uniqToolkit } from '../../array/uniq.ts';

/**
 * Creates a function that removes duplicate values from an array, preserving
 * the order of first occurrence. Equality follows `SameValueZero` (the
 * semantics of `Set`). Use it with {@link pipe}.
 *
 * @template T - The type of elements in the array.
 * @returns A function that maps a `readonly T[]` to a duplicate-free `T[]`.
 *
 * @example
 * import { pipe, uniq } from 'es-toolkit/fp';
 *
 * pipe([1, 2, 2, 3, 3, 3], uniq()); // => [1, 2, 3]
 */
export function uniq<T>(): (array: readonly T[]) => T[] {
  return function (array: readonly T[]): T[] {
    return uniqToolkit(array);
  };
}
