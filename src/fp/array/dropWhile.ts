import { dropWhile as dropWhileToolkit } from '../../array/dropWhile.ts';
import { combineEagerAndLazyFunctions, type Sink } from '../_internal/lazy.ts';

/**
 * Creates a function that removes leading values while a predicate returns true.
 *
 * Once the predicate returns false, that value and all following values are
 * emitted. The returned function is lazy-capable inside {@link pipe}.
 *
 * @template T - The type of elements in the array.
 * @param predicate - Called with each leading value and index while values are being dropped.
 * @returns A function that maps the piped array to the remaining suffix.
 *
 * @example
 * import { dropWhile, pipe } from 'es-toolkit/fp';
 *
 * pipe([1, 2, 3, 1], dropWhile(value => value < 3));
 * // => [3, 1]
 */
export function dropWhile<T>(predicate: (item: T, index: number) => boolean): (array: readonly T[]) => T[] {
  function dropWhileEager(array: readonly T[]): T[] {
    return dropWhileToolkit(array, (item, index) => predicate(item, index));
  }

  const dropWhileLazy = (emit: Sink<T>): Sink<T> => {
    let dropping = true;
    let index = 0;

    return (value: T): boolean => {
      if (dropping && predicate(value, index++)) {
        return true;
      }

      dropping = false;
      return emit(value);
    };
  };

  return combineEagerAndLazyFunctions(dropWhileEager, dropWhileLazy);
}
