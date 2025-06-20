import { remove as removeToolkit } from '../../array/remove.ts';
import { identity } from '../../function/identity.ts';
import { ListIteratee } from '../_internal/ListIteratee.ts';
import { iteratee } from '../util/iteratee.ts';

/**
 * Removes all elements from array that predicate returns truthy for and returns an array of the removed
 * elements. The predicate is invoked with three arguments: (value, index, array).
 *
 * Note: Unlike _.filter, this method mutates array.
 *
 * @template T
 * @param {T[]} array - The array to modify.
 * @param {ListIteratee<T>} [predicate] - The function invoked per iteration.
 * @returns {T[]} Returns the new array of removed elements.
 *
 * @example
 * const array = [1, 2, 3, 4];
 * const evens = remove(array, n => n % 2 === 0);
 * console.log(array); // => [1, 3]
 * console.log(evens); // => [2, 4]
 */
export function remove<T>(array: T[], predicate?: ListIteratee<T>): T[];

/**
 * Removes elements from an array based on various criteria.
 *
 * @param {ArrayLike<T>} arr - The array to iterate over.
 * @param {(value: T, index: number, arr: ArrayLike<T>) => boolean | Partial<T> | [keyof T, unknown] | keyof T} shouldRemoveElement - The function invoked per iteration, a partial object, a property-value pair, or a key to match against each element.
 * @returns {T[]} - Returns the modified array with the specified elements removed.
 *
 * @example
 * // Using a predicate function
 * const numbers = [1, 2, 3, 4, 5];
 * remove(numbers, value => value % 2 === 0); // => [1, 3, 5]
 *
 * @example
 * // Using a partial object
 * const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];
 * remove(objects, { a: 1 }); // => [{ a: 2 }, { a: 3 }]
 *
 * @example
 * // Using a property-value pair
 * const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];
 * remove(objects, ['a', 1]); // => [{ a: 2 }, { a: 3 }]
 *
 * @example
 * // Using a property key
 * const objects = [{ a: 0 }, { a: 1 }];
 * remove(objects, 'a'); // => [{ a: 0 }]
 */
export function remove<T>(
  arr: ArrayLike<T>,
  shouldRemoveElement:
    | ((value: T, index: number, arr: ArrayLike<T>) => boolean)
    | Partial<T>
    | [keyof T, unknown]
    | keyof T = identity as any
): T[] {
  return removeToolkit(arr as T[], iteratee(shouldRemoveElement));
}
