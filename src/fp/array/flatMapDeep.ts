import { flatMapDeep as flatMapDeepToolkit } from '../../array/flatMapDeep.ts';
import { type ExtractNestedArrayType } from '../../array/flattenDeep.ts';
import { combineEagerAndLazyFunctions, createLazyFunction } from '../_internal/lazy.ts';

/**
 * Creates a function that maps each element and recursively flattens the mapped values.
 *
 * The iteratee receives each value and index. The returned function is lazy-capable inside
 * {@link pipe}; a trailing short-circuiting operator can stop before later input values are mapped.
 *
 * @template T - The type of elements in the input array.
 * @template U - The type returned by the iteratee before recursive flattening.
 * @param iteratee - Called with each value and index to produce values to flatten.
 * @returns A function that maps a readonly array to a deeply flattened array.
 *
 * @example
 * import { flatMapDeep, pipe } from 'es-toolkit/fp';
 *
 * pipe([1, 2], flatMapDeep(value => [[value, value * 10]]));
 * // => [1, 10, 2, 20]
 */
export function flatMapDeep<T, U>(
  iteratee: (item: T, index: number) => U
): (array: readonly T[]) => Array<ExtractNestedArrayType<U>> {
  function flatMapDeepEager(array: readonly T[]): Array<ExtractNestedArrayType<U>> {
    return flatMapDeepToolkit(array, (item, index) => iteratee(item, index));
  }

  const flatMapDeepLazy = createLazyFunction<T, ExtractNestedArrayType<U>>((value, index, emit) => {
    emitDeep(iteratee(value, index), emit);
  });

  return combineEagerAndLazyFunctions(flatMapDeepEager, flatMapDeepLazy);
}

function emitDeep<T>(value: T, emit: (value: ExtractNestedArrayType<T>) => void): void {
  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index++) {
      emitDeep(value[index] as T, emit);
    }
    return;
  }

  emit(value as ExtractNestedArrayType<T>);
}
