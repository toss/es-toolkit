import { intersectionBy as intersectionByToolkit } from '../../array/intersectionBy.ts';
import { combineEagerAndLazyFunctions, createLazyFunction } from '../_internal/lazy.ts';

/**
 * Creates a function that keeps values whose mapped identity appears in another array.
 *
 * The mapper is applied to values from both arrays. The returned function is
 * lazy-capable inside {@link pipe}.
 *
 * @template T - The type of elements in the piped array.
 * @template U - The type of elements in the configured array.
 * @param secondArray - Values to intersect with the piped array after mapping.
 * @param mapper - Maps values from both arrays to comparison keys.
 * @returns A function that maps the piped array to its mapped intersection.
 *
 * @example
 * import { intersectionBy, pipe } from 'es-toolkit/fp';
 *
 * pipe([{ id: 1 }, { id: 2 }], intersectionBy([2], value => typeof value === 'number' ? value : value.id));
 * // => [{ id: 2 }]
 */
export function intersectionBy<T, U>(
  secondArray: readonly U[],
  mapper: (value: T | U) => unknown
): (array: readonly T[]) => T[] {
  const mappedSecondSet = new Set(secondArray.map(item => mapper(item)));

  function intersectionByEager(array: readonly T[]): T[] {
    return intersectionByToolkit(array, secondArray, mapper);
  }

  const intersectionByLazy = createLazyFunction<T, T>((value, _index, emit) => {
    if (mappedSecondSet.has(mapper(value))) {
      emit(value);
    }
  });

  return combineEagerAndLazyFunctions(intersectionByEager, intersectionByLazy);
}
