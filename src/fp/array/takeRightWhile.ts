import { takeRightWhile as takeRightWhileToolkit } from '../../array/takeRightWhile.ts';

/**
 * Creates a function that takes trailing values while a predicate returns true.
 *
 * The predicate is evaluated from right to left and receives the value, index, and full
 * input array. Use the returned function with {@link pipe}.
 *
 * @template T - The type of elements in the array.
 * @param predicate - Called with each value, index, and array while taking from the end.
 * @returns A function that maps a readonly array to the matching suffix.
 *
 * @example
 * import { pipe, takeRightWhile } from 'es-toolkit/fp';
 *
 * pipe([1, 2, 3, 4], takeRightWhile(value => value > 2));
 * // => [3, 4]
 */
export function takeRightWhile<T>(
  predicate: (element: T, index: number, array: readonly T[]) => boolean
): (array: readonly T[]) => T[] {
  return function (array: readonly T[]): T[] {
    return takeRightWhileToolkit(array, predicate);
  };
}
