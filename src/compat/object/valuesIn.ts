import { keysIn } from './keysIn';

/**
 * Retrieves the values from an object, including those inherited from its prototype.
 *
 * - If the value is not an object, it is converted to an object.
 * - Array-like objects are treated like arrays.
 * - Sparse arrays with some missing indices are treated like dense arrays.
 * - If the value is `null` or `undefined`, an empty array is returned.
 * - When handling prototype objects, the `constructor` property is excluded from the results.
 *
 * @param {Record<PropertyKey, T> | null | undefined} object The object to query.
 * @returns {T[]} Returns an array of property values.
 * @example
 * const object = { a: 1, b: 2 };
 * valuesIn(object); // => [1, 2]
 *
 * const arr = [1, 2, 3];
 * valuesIn(arr); // => [1, 2, 3]
 *
 * function Foo() {
 *   this.a = 1;
 * }
 * Foo.prototype.b = 2;
 * const foo = new Foo();
 * valuesIn(foo); // => [1] (includes inherited properties)
 *
 * const objWithLength = { 0: 'a', 1: 'b', length: 2 };
 * valuesIn(objWithLength); // => ['a', 'b', 2]
 */
export function valuesIn<T>(object: Record<PropertyKey, T> | null | undefined): T[];

/**
 * Retrieves the values from an object, including those inherited from its prototype.
 *
 * - If the value is not an object, it is converted to an object.
 * - Array-like objects are treated like arrays.
 * - Sparse arrays with some missing indices are treated like dense arrays.
 * - If the value is `null` or `undefined`, an empty array is returned.
 * - When handling prototype objects, the `constructor` property is excluded from the results.
 *
 * @param {ArrayLike<T>} arr The array or array-like object to query.
 * @returns {T[]} Returns an array of values.
 * @example
 * const arrayLike = { 0: 'a', 1: 'b', length: 2 };
 * valuesIn(arrayLike); // => ['a', 'b']
 */
export function valuesIn<T>(arr: ArrayLike<T>): T[];

/**
 * Retrieves the values from an object, including those inherited from its prototype.
 *
 * - If the value is not an object, it is converted to an object.
 * - Array-like objects are treated like arrays.
 * - Sparse arrays with some missing indices are treated like dense arrays.
 * - If the value is `null` or `undefined`, an empty array is returned.
 * - When handling prototype objects, the `constructor` property is excluded from the results.
 *
 * @param {T | null | undefined} object The object to query.
 * @returns {Array<T[keyof T]>} Returns an array of property values.
 * @example
 * const obj = { x: 1, y: 2, z: 3 };
 * valuesIn(obj); // => [1, 2, 3]
 */
export function valuesIn<T extends object>(object: T | null | undefined): Array<T[keyof T]>;

/**
 * Retrieves the values from an object, including those inherited from its prototype.
 *
 * - If the value is not an object, it is converted to an object.
 * - Array-like objects are treated like arrays.
 * - Sparse arrays with some missing indices are treated like dense arrays.
 * - If the value is `null` or `undefined`, an empty array is returned.
 * - When handling prototype objects, the `constructor` property is excluded from the results.
 *
 * @param {any} object The object to query.
 * @returns {any[]} Returns an array of property values.
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * valuesIn(obj); // => [1, 2, 3]
 */
export function valuesIn(object: any): any[] {
  const keys = keysIn(object);
  const result: any[] = new Array(keys.length);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    result[i] = object[key];
  }

  return result;
}
