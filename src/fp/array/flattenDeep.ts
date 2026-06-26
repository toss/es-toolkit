import { type ExtractNestedArrayType, flattenDeep as flattenDeepToolkit } from '../../array/flattenDeep.ts';
import { combineEagerAndLazyFunctions, createLazyFunction } from '../_internal/lazy.ts';

/**
 * Creates a function that recursively flattens an array.
 *
 * The returned function is lazy-capable inside {@link pipe}. A trailing
 * short-circuiting operator can stop before later nested values are visited.
 *
 * @template T - The type of elements in the array.
 * @returns A function that maps the piped array to a deeply flattened array.
 *
 * @example
 * import { flattenDeep, pipe } from 'es-toolkit/fp';
 *
 * pipe([1, [2, [3]]], flattenDeep());
 * // => [1, 2, 3]
 */
export function flattenDeep<T>(): (array: readonly T[]) => Array<ExtractNestedArrayType<T>> {
  function flattenDeepEager(array: readonly T[]): Array<ExtractNestedArrayType<T>> {
    return flattenDeepToolkit(array);
  }

  const flattenDeepLazy = createLazyFunction<T, ExtractNestedArrayType<T>>((value, _index, emit) => {
    emitDeep(value, emit);
  });

  return combineEagerAndLazyFunctions(flattenDeepEager, flattenDeepLazy);
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
