import { intersectionWith as intersectionWithToolkit } from '../../array/intersectionWith.ts';
import { combineEagerAndLazyFunctions, createLazyFunction } from '../_internal/lazy.ts';

/**
 * Creates a function that keeps values equal to at least one configured value.
 *
 * Equality is decided by the provided comparator. The returned function is
 * lazy-capable inside {@link pipe}.
 *
 * @template T - The type of elements in the piped array.
 * @template U - The type of elements in the configured array.
 * @param secondArray - Values to compare against the piped array.
 * @param areItemsEqual - Returns true when a piped value equals a configured value.
 * @returns A function that maps the piped array to its custom intersection.
 *
 * @example
 * import { intersectionWith, pipe } from 'es-toolkit/fp';
 *
 * pipe([{ id: 1 }, { id: 2 }], intersectionWith([2], (item, id) => item.id === id));
 * // => [{ id: 2 }]
 */
export function intersectionWith<T, U>(
  secondArray: readonly U[],
  areItemsEqual: (item: T, other: U) => boolean
): (array: readonly T[]) => T[] {
  function intersectionWithEager(array: readonly T[]): T[] {
    return intersectionWithToolkit(array, secondArray, areItemsEqual);
  }

  const intersectionWithLazy = createLazyFunction<T, T>((value, _index, emit) => {
    if (secondArray.some(other => areItemsEqual(value, other))) {
      emit(value);
    }
  });

  return combineEagerAndLazyFunctions(intersectionWithEager, intersectionWithLazy);
}
