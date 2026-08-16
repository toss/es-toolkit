/**
 * Creates a function that returns the length of an array.
 *
 * Use it with {@link pipe} when a pipeline should end with the number of input values.
 *
 * @template T - The type of elements in the array.
 * @returns A function that maps a readonly array to its length.
 *
 * @example
 * import { length, pipe } from 'es-toolkit/fp';
 *
 * pipe(['a', 'b', 'c'], length());
 * // => 3
 */
export function length<T>(): (array: readonly T[]) => number {
  return function (array: readonly T[]): number {
    return array.length;
  };
}
