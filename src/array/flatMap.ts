import { flatten } from './flatten.ts';

/**
 * Maps each element in the array using the iteratee function and flattens the result up to the specified depth.
 *
 * @template T - The type of elements within the array.
 * @template U - The type of elements within the returned array from the iteratee function.
 * @template D - The depth to which the array should be flattened.
 * @param arr - The array to flatten.
 * @param iteratee - The function that produces the new array elements.
 * @param depth - The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.
 * @returns The new array with the mapped and flattened elements.
 *
 * @example
 * const arr = [1, 2, 3];
 *
 * flatMap(arr, (item: number) => [item, item]);
 * // [1, 1, 2, 2, 3, 3]
 *
 * flatMap(arr, (item: number) => [[item, item]], 2);
 * // [1, 1, 2, 2, 3, 3]
 */
export function flatMap<T, U, D extends number>(
  arr: readonly T[],
  iteratee: (item: T) => U,
  depth = 1 as D
): Array<FlatArray<U[], D>> {
  return flatten(
    arr.map(item => iteratee(item)),
    depth
  );
}
