import { sample as sampleToolkit } from '../../array/sample.ts';

/**
 * Creates a function that returns one random element from an array.
 *
 * The returned function follows the main {@link sample} behavior. Use it with {@link pipe}.
 *
 * @template T - The type of elements in the array.
 * @returns A function that maps a readonly array to a random element.
 *
 * @example
 * import { pipe, sample } from 'es-toolkit/fp';
 *
 * pipe([1, 2, 3], sample());
 * // => one of 1, 2, or 3
 */
export function sample<T>(): (array: readonly T[]) => T {
  return function (array: readonly T[]): T {
    return sampleToolkit(array);
  };
}
