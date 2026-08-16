import { intersection as intersectionToolkit } from '../../array/intersection.ts';
import { combineEagerAndLazyFunctions, createLazyFunction } from '../_internal/lazy.ts';

/**
 * Creates a function that keeps values from the piped array that are also present in another array.
 *
 * Equality follows SameValueZero through Set membership, matching the main
 * {@link intersection} implementation. The returned function is lazy-capable
 * inside {@link pipe}.
 *
 * @template T - The type of elements in the arrays.
 * @param secondArray - Values to intersect with the piped array.
 * @returns A function that maps the piped array to its intersection.
 *
 * @example
 * import { intersection, pipe } from 'es-toolkit/fp';
 *
 * pipe([1, 2, 3], intersection([2, 4]));
 * // => [2]
 */
export function intersection<T>(secondArray: readonly T[]): (array: readonly T[]) => T[] {
  const secondSet = new Set(secondArray);

  function intersectionEager(array: readonly T[]): T[] {
    return intersectionToolkit(array, secondArray);
  }

  const intersectionLazy = createLazyFunction<T, T>((value, _index, emit) => {
    if (secondSet.has(value)) {
      emit(value);
    }
  });

  return combineEagerAndLazyFunctions(intersectionEager, intersectionLazy);
}
