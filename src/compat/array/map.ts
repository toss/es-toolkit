import { identity } from '../../function/identity.ts';
import { range } from '../../math/range.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { iteratee as iterateeToolkit } from '../util/iteratee.ts';

/**
 * Maps each element in a readonly array to a new array of values using an iteratee function.
 *
 * @param {readonly T[]} collection - The collection to iterate over.
 * @param {(value: T, index: number, collection: readonly T[]) => U} iteratee - The function invoked per iteration.
 * @returns {U[]} - Returns the new mapped array.
 *
 * @example
 * const array = [1, 2, 3];
 * map(array, value => value * 2); // => [2, 4, 6]
 */
export function map<T, U>(
  collection: readonly T[],
  iteratee: (value: T, index: number, collection: readonly T[]) => U
): U[];

/**
 * Maps each element in a readonly array to a boolean array based on a partial object match.
 *
 * @param {readonly T[]} collection - The collection to iterate over.
 * @param {Partial<T>} iteratee - The partial object to match against each element.
 * @returns {boolean[]} - Returns an array of booleans indicating matches.
 *
 * @example
 * const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];
 * map(objects, { a: 1 }); // => [true, false, false]
 */
export function map<T>(collection: readonly T[], iteratee: Partial<T>): boolean[];

/**
 * Maps each element in a readonly array to a boolean array based on a property-value pair match.
 *
 * @param {readonly T[]} collection - The collection to iterate over.
 * @param {[keyof T, unknown]} iteratee - The property-value pair to match against each element.
 * @returns {boolean[]} - Returns an array of booleans indicating matches.
 *
 * @example
 * const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];
 * map(objects, ['a', 1]); // => [true, false, false]
 */
export function map<T>(collection: readonly T[], iteratee: [keyof T, unknown]): boolean[];

/**
 * Maps each element in a readonly array to an array of property values.
 *
 * @param {readonly T[]} collection - The collection to iterate over.
 * @param {K} iteratee - The key of the property to extract from each element.
 * @returns {Array<T[K]>} - Returns an array of property values.
 *
 * @example
 * const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];
 * map(objects, 'a'); // => [1, 2, 3]
 */
export function map<T, K extends keyof T>(collection: readonly T[], iteratee: K): Array<T[K]>;

/**
 * Maps each element in a readonly array to itself if no iteratee is provided.
 *
 * @param {readonly T[]} collection - The collection to iterate over.
 * @param {null | undefined} [iteratee] - Optional iteratee.
 * @returns {T[]} - Returns the original array.
 *
 * @example
 * const numbers = [1, 2, 3];
 * map(numbers); // => [1, 2, 3]
 */
export function map<T>(collection: readonly T[], iteratee?: null | undefined): T[];

/**
 * Maps each element in an ArrayLike object to a new array of values using an iteratee function.
 *
 * @param {ArrayLike<T>} collection - The collection to iterate over.
 * @param {(value: T, index: number, collection: ArrayLike<T>) => U} iteratee - The function invoked per iteration.
 * @returns {U[]} - Returns the new mapped array.
 *
 * @example
 * const arrayLike = {0: 1, 1: 2, 2: 3, length: 3};
 * map(arrayLike, value => value * 2); // => [2, 4, 6]
 */
export function map<T, U>(
  collection: ArrayLike<T>,
  iteratee: (value: T, index: number, collection: ArrayLike<T>) => U
): U[];

/**
 * Maps each element in an ArrayLike object to a boolean array based on a partial object match.
 *
 * @param {ArrayLike<T>} collection - The collection to iterate over.
 * @param {Partial<T>} iteratee - The partial object to match against each element.
 * @returns {boolean[]} - Returns an array of booleans indicating matches.
 *
 * @example
 * const arrayLike = [{ a: 1 }, { a: 2 }, { a: 3 }];
 * map(arrayLike, { a: 1 }); // => [true, false, false]
 */
export function map<T>(collection: ArrayLike<T>, iteratee: Partial<T>): boolean[];

/**
 * Maps each element in an ArrayLike object to a boolean array based on a property-value pair match.
 *
 * @param {ArrayLike<T>} collection - The collection to iterate over.
 * @param {[keyof T, unknown]} iteratee - The property-value pair to match against each element.
 * @returns {boolean[]} - Returns an array of booleans indicating matches.
 *
 * @example
 * const arrayLike = [{ a: 1 }, { a: 2 }, { a: 3 }];
 * map(arrayLike, ['a', 1]); // => [true, false, false]
 */
export function map<T>(collection: ArrayLike<T>, iteratee: [keyof T, unknown]): boolean[];

/**
 * Maps each element in an ArrayLike object to an array of property values.
 *
 * @param {ArrayLike<T>} collection - The collection to iterate over.
 * @param {K} iteratee - The key of the property to extract from each element.
 * @returns {Array<T[K]>} - Returns an array of property values.
 *
 * @example
 * const arrayLike = [{ a: 1 }, { a: 2 }, { a: 3 }];
 * map(arrayLike, 'a'); // => [1, 2, 3]
 */
export function map<T, K extends keyof T>(collection: ArrayLike<T>, iteratee: K): Array<T[K]>;

/**
 * Maps each element in an ArrayLike object to itself if no iteratee is provided.
 *
 * @param {ArrayLike<T>} collection - The collection to iterate over.
 * @param {null | undefined} [iteratee] - Optional iteratee.
 * @returns {ArrayLike<T>} - Returns the original ArrayLike object.
 *
 * @example
 * const arrayLike = {0: 1, 1: 2, 2: 3, length: 3};
 * map(arrayLike); // => {0: 1, 1: 2, 2: 3, length: 3}
 */
export function map<T, U>(collection: ArrayLike<T>, iteratee?: null | undefined): ArrayLike<T>;

/**
 * Maps each value in an object to a new array of values using an iteratee function.
 *
 * @param {T} collection - The object to iterate over.
 * @param {(value: T[keyof T], key: string, collection: T) => U} iteratee - The function invoked per iteration.
 * @returns {U[]} - Returns the new mapped array.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * map(obj, (value, key) => `${key}: ${value}`); // => ['a: 1', 'b: 2', 'c: 3']
 */
export function map<T extends object, U>(
  collection: T,
  iteratee: (value: T[keyof T], key: string, collection: T) => U
): U[];

/**
 * Maps each value in an object to a boolean array based on a partial object match.
 *
 * @param {T} object - The object to iterate over.
 * @param {Partial<T[keyof T]>} iteratee - The partial object to match against each value.
 * @returns {boolean[]} - Returns an array of booleans indicating matches.
 *
 * @example
 * const obj = { a: { x: 1 }, b: { x: 2 }, c: { x: 3 } };
 * map(obj, { x: 1 }); // => [true, false, false]
 */
export function map<T>(object: T, iteratee: Partial<T[keyof T]>): boolean[];

/**
 * Maps each value in an object to a boolean array based on a property-value pair match.
 *
 * @param {T} object - The object to iterate over.
 * @param {[keyof T[keyof T], unknown]} iteratee - The property-value pair to match against each value.
 * @returns {boolean[]} - Returns an array of booleans indicating matches.
 *
 * @example
 * const obj = { a: { x: 1 }, b: { x: 2 }, c: { x: 3 } };
 * map(obj, ['x', 1]); // => [true, false, false]
 */
export function map<T>(object: T, iteratee: [keyof T[keyof T], unknown]): boolean[];

/**
 * Maps each value in an object to an array of property values.
 *
 * @param {T} object - The object to iterate over.
 * @param {K} iteratee - The key of the property to extract from each value.
 * @returns {Array<T[keyof T][K]>} - Returns an array of property values.
 *
 * @example
 * const obj = { a: { x: 1 }, b: { x: 2 }, c: { x: 3 } };
 * map(obj, 'x'); // => [1, 2, 3]
 */
export function map<T, K extends keyof T[keyof T]>(object: T, iteratee: K): Array<T[keyof T][K]>;

/**
 * Maps each value in an object to itself if no iteratee is provided.
 *
 * @param {T} object - The object to iterate over.
 * @param {null | undefined} [iteratee] - Optional iteratee.
 * @returns {U[]} - Returns the original object values as an array.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * map(obj); // => [1, 2, 3]
 */
export function map<T extends object, U>(object: T, iteratee?: null | undefined): U[];

/**
 * Maps each element in a collection to a new array of values using an iteratee.
 *
 * @param {T[] | ArrayLike<T> | Record<string, T> | null | undefined} collection - The collection to iterate over.
 * @param {((value: any, index: PropertyKey, collection: any) => any) | PropertyKey | object} iteratee - The function invoked per iteration or the key to map over.
 * @returns {any[]} - Returns the new mapped array.
 *
 * @example
 * // Using a transformation function
 * const array = [1, 2, 3];
 * map(array, value => value * 2); // => [2, 4, 6]
 *
 * @example
 * // Using a property key as the iteratee
 * const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];
 * map(objects, 'a'); // => [1, 2, 3]
 *
 * @example
 * // Using an object as the iteratee
 * const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];
 * map(objects, { a: 1 }); // => [true, false, false]
 *
 * @example
 * // No iteratee
 * const numbers = [1, 2, 3];
 * map(numbers); // => [1, 2, 3]
 *
 * @example
 * // Using an object as the collection
 * const obj = { a: 1, b: 2, c: 3 };
 * map(obj, (value, key) => `${key}: ${value}`); // => ['a: 1', 'b: 2', 'c: 3']
 */
export function map(
  collection: any[] | ArrayLike<any> | Record<any, any> | null | undefined,
  _iteratee?: ((value: any, index: PropertyKey, collection: any) => any) | PropertyKey | object | null
): any[] {
  if (!collection) {
    return [];
  }

  const keys: PropertyKey[] =
    isArrayLike(collection) || Array.isArray(collection) ? range(0, collection.length) : Object.keys(collection);

  const iteratee = iterateeToolkit(_iteratee ?? identity);

  const result: any[] = new Array(keys.length);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = (collection as any)[key];

    result[i] = iteratee(value, key, collection);
  }

  return result;
}
