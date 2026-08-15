import { uniqWith as uniqWithToolkit } from '../../array/uniqWith.ts';
import { combineEagerAndLazyFunctions, type Sink } from '../_internal/lazy.ts';

/**
 * Creates a function that removes duplicate values using a custom equality function.
 *
 * The first value in each equality group is preserved. The returned function is
 * lazy-capable inside {@link pipe}.
 *
 * @template T - The type of elements in the array.
 * @param areItemsEqual - Returns true when two values should be treated as equal.
 * @returns A function that maps the piped array to unique values.
 *
 * @example
 * import { pipe, uniqWith } from 'es-toolkit/fp';
 *
 * pipe([{ id: 1 }, { id: 1 }, { id: 2 }], uniqWith((a, b) => a.id === b.id));
 * // => [{ id: 1 }, { id: 2 }]
 */
export function uniqWith<T>(areItemsEqual: (item: T, other: T) => boolean): (array: readonly T[]) => T[] {
  function uniqWithEager(array: readonly T[]): T[] {
    return uniqWithToolkit(array, areItemsEqual);
  }

  const uniqWithLazy = (emit: Sink<T>): Sink<T> => {
    const seen: T[] = [];

    return (value: T): boolean => {
      if (seen.some(item => areItemsEqual(item, value))) {
        return true;
      }

      seen.push(value);
      return emit(value);
    };
  };

  return combineEagerAndLazyFunctions(uniqWithEager, uniqWithLazy);
}
