import { dropRightWhile as dropRightWhileToolkit } from '../../array/dropRightWhile.ts';
import { property } from '../object/property.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { matches } from '../predicate/matches.ts';
import { matchesProperty } from '../predicate/matchesProperty.ts';

/**
 * Drops elements from the end of an array while the predicate function returns truthy.
 *
 * @template T - The type of elements in the array.
 * @param {ArrayLike<T> | null | undefined} arr - The array from which to drop elements.
 * @param {(item: T, index: number, arr: T[]) => unknown} canContinueDropping - A predicate function that determines
 * whether to continue dropping elements. The function is called with each element, index, and array, and dropping
 * continues as long as it returns true.
 * @returns {T[]} A new array with the elements remaining after the predicate returns false.
 *
 * @example
 * const array = [5, 4, 3, 2, 1];
 * const result = dropRightWhile(array, x => x < 3);
 * result will be [5, 4, 3] since elements less than 3 are dropped.
 */
export function dropRightWhile<T>(
  arr: ArrayLike<T> | null | undefined,
  canContinueDropping: (item: T, index: number, arr: readonly T[]) => unknown
): T[];

/**
 * Drops elements from the end of an array while the specified object properties match.
 *
 * @template T - The type of elements in the array.
 * @param {ArrayLike<T> | null | undefined} arr - The array from which to drop elements.
 * @param {Partial<T>} objectToDrop - An object specifying the properties to match for dropping elements.
 * @returns {T[]} A new array with the elements remaining after the predicate returns false.
 *
 * @example
 * const array = [{ a: 1 }, { a: 2 }, { a: 3 }];
 * const result = dropRightWhile(array, { a: 3 });
 * result will be [{ a: 1 }, { a: 2 }] since the last object matches the properties of the provided object.
 */
export function dropRightWhile<T>(arr: ArrayLike<T> | null | undefined, objectToDrop: Partial<T>): T[];

/**
 * Drops elements from the end of an array while the specified property matches a given value.
 *
 * @template T - The type of elements in the array.
 * @param {ArrayLike<T> | null | undefined} arr - The array from which to drop elements.
 * @param {[keyof T, unknown]} propertyToDrop - A tuple containing the property key and the value to match for dropping elements.
 * @returns {T[]} A new array with the elements remaining after the predicate returns false.
 *
 * @example
 * const array = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * const result = dropRightWhile(array, ['id', 3]);
 * result will be [{ id: 1 }, { id: 2 }] since the last object has the id property matching the value 3.
 */
export function dropRightWhile<T>(arr: ArrayLike<T> | null | undefined, propertyToDrop: [keyof T, unknown]): T[];

/**
 * Drops elements from the end of an array while the specified property name matches.
 *
 * @template T - The type of elements in the array.
 * @param {ArrayLike<T> | null | undefined} arr - The array from which to drop elements.
 * @param {PropertyKey} propertyToDrop - The name of the property to match for dropping elements.
 * @returns {T[]} A new array with the elements remaining after the predicate returns false.
 *
 * @example
 * const array = [{ isActive: false }, { isActive: true }, { isActive: true }];
 * const result = dropRightWhile(array, 'isActive');
 * result will be [{ isActive: false }] since it drops elements until it finds one with a falsy isActive property.
 */
export function dropRightWhile<T>(arr: ArrayLike<T> | null | undefined, propertyToDrop: PropertyKey): T[];

/**
 * Removes elements from the end of an array until the predicate returns false.
 *
 * This function iterates over an array and drops elements from the end until the provided
 * predicate function returns false. It then returns a new array with the remaining elements.
 *
 * @template T - The type of elements in the array.
 * @param {ArrayLike<T> | null | undefined} arr - The array from which to drop elements.
 * @param {(item: T, index: number, arr: T[]) => unknown} predicate - A predicate function that determines
 * whether to continue dropping elements. The function is called with each element, index, and array, and dropping
 * continues as long as it returns true.
 * @returns {T[]} A new array with the elements remaining after the predicate returns false.
 *
 * @example
 * const array = [3, 2, 1];
 * const result = dropRightWhile(array, (item, index, arr) => index >= 1);
 * // Returns: [3]
 */
export function dropRightWhile<T>(
  arr: ArrayLike<T> | null | undefined,
  predicate: ((item: T, index: number, arr: readonly T[]) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey
): T[] {
  if (!isArrayLike(arr)) {
    return [];
  }

  return dropRightWhileImpl(Array.from(arr), predicate);
}

function dropRightWhileImpl<T>(
  arr: readonly T[],
  predicate: ((item: T, index: number, arr: readonly T[]) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey
): T[] {
  switch (typeof predicate) {
    case 'function': {
      return dropRightWhileToolkit(arr, (item, index, arr) => Boolean(predicate(item, index, arr)));
    }
    case 'object': {
      if (Array.isArray(predicate) && predicate.length === 2) {
        const key = predicate[0];
        const value = predicate[1];

        return dropRightWhileToolkit(arr, matchesProperty(key, value));
      } else {
        return dropRightWhileToolkit(arr, matches(predicate));
      }
    }
    case 'symbol':
    case 'number':
    case 'string': {
      return dropRightWhileToolkit(arr, property(predicate));
    }
  }
}
