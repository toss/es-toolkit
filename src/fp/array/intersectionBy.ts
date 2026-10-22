import { intersectionBy as intersectionByToolkit } from '../../array/intersectionBy.ts';
import { combineEagerAndLazyFunctions, type Sink } from '../_internal/lazy.ts';

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

  const intersectionByLazy = (emit: Sink<T>): Sink<T> => {
    const unmatched = new Set(mappedSecondSet);

    return (value: T): boolean => {
      const mappedValue = mapper(value);
      if (!unmatched.has(mappedValue)) {
        return true;
      }

      unmatched.delete(mappedValue);
      return emit(value);
    };
  };

  return combineEagerAndLazyFunctions(intersectionByEager, intersectionByLazy);
}
