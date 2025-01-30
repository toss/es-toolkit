import { iteratee } from '../util/iteratee.ts';
import { toInteger } from '../util/toInteger.ts';

/**
 * Finds the last item in an array that matches the given predicate function.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arr - The array to search through.
 * @param {(item: T, index: number, arr: T[]) => unknown} doesMatch - A function that takes an item, its index, and the array, and returns a truthy value if the item matches the criteria.
 * @param {number} [fromIndex=arr.length-1] - The index to start the search from, defaults to arr.length-1.
 * @returns {T | undefined} - The last item that matches the predicate, or `undefined` if no match is found.
 *
 * @example
 * // Using a predicate function
 * const items = [1, 2, 3, 4, 5];
 * const result = findLast(items, (item) => item > 3);
 * console.log(result); // 5
 */
export function findLast<T>(
  arr: ArrayLike<T> | null | undefined,
  doesMatch: (item: T, index: number, arr: readonly T[]) => unknown,
  fromIndex?: number
): T | undefined;

/**
 * Finds the last item in an array that matches the given partial object.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arr - The array to search through.
 * @param {Partial<T>} doesMatch - A partial object that specifies the properties to match.
 * @param {number} [fromIndex=arr.length-1] - The index to start the search from, defaults to arr.length-1.
 * @returns {T | undefined} - The last item that matches the partial object, or `undefined` if no match is found.
 *
 * @example
 * // Using a partial object
 * const items = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Bob' }];
 * const result = findLast(items, { name: 'Bob' });
 * console.log(result); // { id: 3, name: 'Bob' }
 */
export function findLast<T>(
  arr: ArrayLike<T> | null | undefined,
  doesMatch: Partial<T>,
  fromIndex?: number
): T | undefined;

/**
 * Finds the last item in an array that matches a property with a specific value.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arr - The array to search through.
 * @param {[keyof T, unknown]} doesMatchProperty - An array where the first element is the property key and the second element is the value to match.
 * @param {number} [fromIndex=arr.length-1] - The index to start the search from, defaults to arr.length-1.
 * @returns {T | undefined} - The last item that has the specified property value, or `undefined` if no match is found.
 *
 * @example
 * // Using a property-value pair
 * const items = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Alice' }];
 * const result = findLast(items, ['name', 'Alice']);
 * console.log(result); // { id: 3, name: 'Alice' }
 */
export function findLast<T>(
  arr: ArrayLike<T> | null | undefined,
  doesMatchProperty: [keyof T, unknown],
  fromIndex?: number
): T | undefined;

/**
 * Finds the last item in an array that has a specific property, where the property name is provided as a PropertyKey.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arr - The array to search through.
 * @param {PropertyKey} propertyToCheck - The property name to check.
 * @param {number} [fromIndex=arr.length-1] - The index to start the search from, defaults to arr.length-1.
 * @returns {T | undefined} - The last item that has the specified property, or `undefined` if no match is found.
 *
 * @example
 * // Using a property name
 * const items = [{ id: 1, name: 'Alice' }, { id: 2 }, { id: 3, name: 'Bob' }];
 * const result = findLast(items, 'name');
 * console.log(result); // { id: 3, name: 'Bob' }
 */
export function findLast<T>(
  arr: ArrayLike<T> | null | undefined,
  propertyToCheck: PropertyKey,
  fromIndex?: number
): T | undefined;

/**
 * Finds the last item in an object that matches the given predicate function.
 *
 * @template T
 * @param {T | null | undefined} object - The object to search through.
 * @param {(item: T[keyof T], index: number, arr: T) => unknown} doesMatch - A function that takes an item, its key, and the object, and returns a truthy value if the item matches the criteria.
 * @param {number} [fromIndex=Object.keys(object).length-1] - The index to start the search from, defaults to Object.keys(object).length-1.
 * @returns {T | undefined} - The last property value that matches the predicate, or `undefined` if no match is found.
 *
 * @example
 * // Using a predicate function
 * const obj = { a: 1, b: 2, c: 3 };
 * const result = findLast(obj, (item) => item > 1);
 * console.log(result); // 3
 */
export function findLast<T extends Record<string, unknown>>(
  object: T | null | undefined,
  doesMatch: (item: T[keyof T], index: keyof T, object: T) => unknown,
  fromIndex?: number
): T | undefined;

/**
 * Finds the last item in an object that matches the given partial value.
 *
 * @template T
 * @param {T | null | undefined} object - The object to search through.
 * @param {Partial<T[keyof T]>} doesMatch - A partial value to match against the values of the object.
 * @param {number} [fromIndex=Object.keys(object).length-1] - The index to start the search from, defaults to Object.keys(object).length-1.
 * @returns {T | undefined} - The last property value that matches the partial value, or `undefined` if no match is found.
 *
 * @example
 * // Using a partial value
 * const obj = { a: { id: 1, name: 'Bob' }, b: { id: 2, name: 'Alice' }, c: { id: 3, name: 'Bob' } };
 * const result = findLast(obj, { name: 'Bob' });
 * console.log(result); // { id: 3, name: 'Bob' }
 */
export function findLast<T extends Record<string, unknown>>(
  object: T | null | undefined,
  doesMatch: Partial<T[keyof T]>,
  fromIndex?: number
): T | undefined;

/**
 * Finds the last item in an object that matches a property with a specific value.
 *
 * @template T
 * @param {T | null | undefined} object - The object to search through.
 * @param {[keyof T[keyof T], unknown]} doesMatchProperty - An array where the first element is the property key and the second element is the value to match.
 * @param {number} [fromIndex=Object.keys(object).length-1] - The index to start the search from, defaults to Object.keys(object).length-1.
 * @returns {T | undefined} - The last item that has the specified property value, or `undefined` if no match is found.
 *
 * @example
 * // Using a property-value pair
 * const items = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' }, c: { id: 3, name: 'Alice' } };
 * const result = findLast(items, ['name', 'Alice']);
 * console.log(result); // { id: 3, name: 'Alice' }
 */
export function findLast<T extends Record<string, unknown>>(
  object: T | null | undefined,
  doesMatchProperty: [keyof T[keyof T], unknown],
  fromIndex?: number
): T | undefined;

/**
 * Finds the last item in an object that has a specific property, where the property name is provided as a PropertyKey.
 *
 * @template T
 * @param {T | null | undefined} object - The object to search through.
 * @param {PropertyKey} propertyToCheck - The property name to check.
 * @param {number} [fromIndex=Object.keys(object).length-1] - The index to start the search from, defaults to Object.keys(object).length-1.
 * @returns {T | undefined} - The last property value that has the specified property, or `undefined` if no match is found.
 *
 * @example
 * // Using a property name
 * const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2 }, c: { id: 3, name: 'Bob' } };
 * const result = findLast(obj, 'name');
 * console.log(result); // { id: 3, name: 'Bob' }
 */
export function findLast<T extends Record<string, unknown>>(
  object: T | null | undefined,
  propertyToCheck: PropertyKey,
  fromIndex?: number
): T | undefined;

/**
 * Finds the last item in an object that has a specific property, where the property name is provided as a PropertyKey.
 *
 * @template T
 * @param {ArrayLike<T> | Record<any, any> | null | undefined} source - The source array or object to search through.
 * @param {((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey} doesMatch - The criteria to match. It can be a function, a partial object, a key-value pair, or a property name.
 * @param {number} [fromIndex] - The index to start the search from, defaults to source.length-1 for arrays or Object.keys(source).length-1 for objects.
 * @returns {T | undefined} - The last property value that has the specified property, or `undefined` if no match is found.
 *
 * @example
 * // Using a property name
 * const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2 }, c: { id: 3, name: 'Bob' } };
 * const result = findLast(obj, 'name');
 * console.log(result); // { id: 3, name: 'Bob' }
 */
export function findLast<T>(
  source: ArrayLike<T> | Record<any, any> | null | undefined,
  _doesMatch: ((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey,
  fromIndex?: number
): T | undefined {
  if (!source) {
    return undefined;
  }

  const length = Array.isArray(source) ? source.length : Object.keys(source).length;

  fromIndex = toInteger(fromIndex ?? length - 1);

  if (fromIndex < 0) {
    fromIndex = Math.max(length + fromIndex, 0);
  } else {
    fromIndex = Math.min(fromIndex, length - 1);
  }

  const doesMatch = iteratee(_doesMatch);

  const values = Array.isArray(source) ? source.slice(0, fromIndex + 1) : Object.values(source).slice(0, fromIndex + 1);

  if (typeof doesMatch === 'function' && !Array.isArray(source)) {
    const keys = Object.keys(source).slice(0, fromIndex + 1) as Array<keyof T>;

    for (let i = fromIndex; i >= 0; i--) {
      const key = keys[i];
      const value = source[key] as T;

      if (doesMatch(value, key as number, source)) {
        return value;
      }
    }

    return undefined;
  }

  return values.findLast(doesMatch);
}
