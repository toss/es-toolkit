import { initial as initialToolkit } from '../../array/initial.ts';

/**
 * Creates a function that returns every element except the last one.
 *
 * The returned function follows the main {@link initial} behavior and always returns a new array.
 * Use it with {@link pipe}.
 *
 * @template T - The type of elements in the array.
 * @returns A function that maps a readonly array to its initial elements.
 *
 * @example
 * import { initial, pipe } from 'es-toolkit/fp';
 *
 * pipe([1, 2, 3], initial());
 * // => [1, 2]
 */
export function initial<T>(): (array: readonly T[]) => T[] {
  return function (array: readonly T[]): T[] {
    return initialToolkit(array);
  };
}
