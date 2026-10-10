import { last as lastToolkit } from '../../array/last.ts';

/**
 * Creates a function that returns the last element of an array, or undefined.
 *
 * Empty arrays return undefined, matching the main {@link last} behavior. Use
 * the returned function with {@link pipe}.
 *
 * @template T - The type of elements in the array.
 * @returns A function that maps a readonly array to its last element, or undefined.
 *
 * @example
 * import { last, pipe } from 'es-toolkit/fp';
 *
 * pipe([] as number[], last());
 * // => undefined
 */
export function last<T>(): <A extends readonly T[]>(
  array: A
) => A extends readonly [...unknown[], unknown] ? A[number] : A[number] | undefined;
export function last<T>(): (array: readonly T[]) => T | undefined {
  return function (array: readonly T[]): T | undefined {
    return lastToolkit(array);
  };
}
