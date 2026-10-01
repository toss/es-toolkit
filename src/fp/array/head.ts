import { head as headToolkit } from '../../array/head.ts';

/**
 * Creates a function that returns the first element of an array, or undefined.
 *
 * Empty arrays return undefined, matching the main {@link head} behavior. Use
 * the returned function with {@link pipe}.
 *
 * @template T - The type of elements in the array.
 * @returns A function that maps a readonly array to its first element, or undefined.
 *
 * @example
 * import { head, pipe } from 'es-toolkit/fp';
 *
 * pipe([] as number[], head());
 * // => undefined
 */
export function head<T>(): <A extends readonly T[]>(
  array: A
) => A extends readonly [unknown, ...unknown[]] ? A[number] : A[number] | undefined;
export function head<T>(): (array: readonly T[]) => T | undefined {
  return function (array: readonly T[]): T | undefined {
    return headToolkit(array);
  };
}
