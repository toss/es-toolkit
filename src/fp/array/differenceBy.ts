import { differenceBy as differenceByToolkit } from '../../array/differenceBy.ts';
import { combineEagerAndLazyFunctions, createLazyFunction } from '../_internal/lazy.ts';

/**
 * Creates a function that returns values whose mapped identity is absent from another array.
 *
 * The mapper is applied to values from both arrays. The returned function is
 * lazy-capable inside {@link pipe}.
 *
 * @template T - The type of elements in the piped array.
 * @template U - The type of elements in the configured array.
 * @param secondArray - Values to exclude from the piped array after mapping.
 * @param mapper - Maps values from both arrays to comparison keys.
 * @returns A function that maps the piped array to its mapped difference.
 *
 * @example
 * import { differenceBy, pipe } from 'es-toolkit/fp';
 *
 * pipe([{ id: 1 }, { id: 2 }], differenceBy([2], value => typeof value === 'number' ? value : value.id));
 * // => [{ id: 1 }]
 */
export function differenceBy<T, U>(
  secondArray: readonly U[],
  mapper: (value: T | U) => unknown
): (array: readonly T[]) => T[] {
  const mappedSecondSet = new Set(secondArray.map(item => mapper(item)));

  function differenceByEager(array: readonly T[]): T[] {
    return differenceByToolkit(array, secondArray, mapper);
  }

  const differenceByLazy = createLazyFunction<T, T>((value, _index, emit) => {
    if (!mappedSecondSet.has(mapper(value))) {
      emit(value);
    }
  });

  return combineEagerAndLazyFunctions(differenceByEager, differenceByLazy);
}
