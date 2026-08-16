import { flatten as flattenToolkit } from '../../array/flatten.ts';
import { combineEagerAndLazyFunctions, createLazyFunction } from '../_internal/lazy.ts';

/**
 * Creates a function that flattens an array up to the specified depth.
 *
 * The returned function is lazy-capable inside {@link pipe}. A trailing
 * short-circuiting operator can stop before later nested values are visited.
 *
 * @template T - The type of elements in the array.
 * @template D - The depth to which nested arrays should be flattened.
 * @param depth - The flattening depth. Defaults to 1.
 * @returns A function that maps the piped array to a flattened array.
 *
 * @example
 * import { flatten, pipe } from 'es-toolkit/fp';
 *
 * pipe([1, [2, [3]]], flatten(2));
 * // => [1, 2, 3]
 */
export function flatten<T, D extends number = 1>(depth = 1 as D): (array: readonly T[]) => Array<FlatArray<T[], D>> {
  const flooredDepth = Math.floor(depth);

  function flattenEager(array: readonly T[]): Array<FlatArray<T[], D>> {
    return flattenToolkit(array, depth);
  }

  const flattenLazy = createLazyFunction<T, FlatArray<T[], D>>((value, _index, emit) => {
    emitFlattened(value, 0, flooredDepth, emit);
  });

  return combineEagerAndLazyFunctions(flattenEager, flattenLazy);
}

function emitFlattened<T, D extends number>(
  value: T,
  currentDepth: number,
  maxDepth: number,
  emit: (value: FlatArray<T[], D>) => void
): void {
  if (Array.isArray(value) && currentDepth < maxDepth) {
    for (let index = 0; index < value.length; index++) {
      emitFlattened(value[index] as T, currentDepth + 1, maxDepth, emit);
    }
    return;
  }

  emit(value as FlatArray<T[], D>);
}
