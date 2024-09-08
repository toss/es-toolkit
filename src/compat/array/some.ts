import { property } from '../object/property';

/**
 * Returns `true` if at least one element in the array meets the condition
 * set by the predicate function or a given property name.
 *
 * @template T - The type of elements in the array.
 *
 * @param {T[] | null | undefined} arr - The array to check, which can also be `null` or `undefined`.
 * @param {((value: T, index: number, arr: T[]) => unknown) | keyof T} predicate -
 * A predicate function that tests each element, or a string representing the property name of the objects in the array.
 *
 * @returns {boolean} Returns `true` if the predicate function returns a truthy value for any element,
 * or if the property value is truthy for any object in the array. Returns `false` otherwise.
 *
 * @example
 * ```ts
 * some([1, 2, 3], number => number % 2 === 0); // true;
 * some([1, 'string'], Number); // true
 * some([false, false, false], value => value); // false
 * some([1, false, 'string'], () => true); // true
 * ```
 */
export function some<T>(
  arr: T[] | null | undefined,
  predicate: ((value: T, index: number, arr: T[]) => unknown) | keyof T
) {
  if (arr == null || typeof arr === 'undefined') {
    return false;
  }

  const predicateFn = typeof predicate === 'function' ? predicate : property(predicate);
  return arr.some((value, index, array) => predicateFn(value, index, array));
}
