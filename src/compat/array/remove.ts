import { remove as removeToolkit } from '../../array/remove.ts';
import { iteratee } from '../util/iteratee.ts';

/**
 * Removes elements from an array based on a predicate function.
 *
 * @param {ArrayLike<T>} arr - The array to iterate over.
 * @param {(value: T, index: number, arr: ArrayLike<T>) => boolean} shouldRemoveElement - The function invoked per iteration.
 * @returns {T[]} - Returns the modified array with the specified elements removed.
 *
 * @example
 * const array = [1, 2, 3];
 * remove(array, value => value % 2 === 0); // => [1, 3]
 */
export function remove<T>(
  arr: ArrayLike<T>,
  shouldRemoveElement: (value: T, index: number, arr: ArrayLike<T>) => boolean
): T[];

/**
 * Removes elements from an array based on a partial object match.
 *
 * @param {ArrayLike<T>} arr - The array to iterate over.
 * @param {Partial<T>} shouldRemoveElement - The partial object to match against each element.
 * @returns {T[]} - Returns the modified array with the specified elements removed.
 *
 * @example
 * const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];
 * remove(objects, { a: 1 }); // => [{ a: 2 }, { a: 3 }]
 */
export function remove<T>(arr: ArrayLike<T>, shouldRemoveElement: Partial<T>): T[];

/**
 * Removes elements from an array based on a property-value pair match.
 *
 * @param {ArrayLike<T>} arr - The array to iterate over.
 * @param {[keyof T, unknown]} shouldRemoveElement - The property-value pair to match against each element.
 * @returns {T[]} - Returns the modified array with the specified elements removed.
 *
 * @example
 * const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];
 * remove(objects, ['a', 1]); // => [{ a: 2 }, { a: 3 }]
 */
export function remove<T>(arr: ArrayLike<T>, shouldRemoveElement: [keyof T, unknown]): T[];

/**
 * Removes elements from an array based on a property key.
 *
 * @param {ArrayLike<T>} arr - The array to iterate over.
 * @param {keyof T} shouldRemoveElement - The key of the property to match against each element.
 * @returns {T[]} - Returns the modified array with the specified elements removed.
 *
 * @example
 * const objects = [{ a: 0 }, { a: 1 }];
 * remove(objects, 'a'); // => [{ a: 0 }]
 */
export function remove<T, K extends keyof T>(arr: ArrayLike<T>, shouldRemoveElement: K): T[];

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
    | keyof T
): T[] {
  return removeToolkit(arr as T[], iteratee(shouldRemoveElement));
}
