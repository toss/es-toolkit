import { updateWith } from './updateWith.ts';
import { assignValue } from '../_internal/assignValue.ts';
import { isIndex } from '../_internal/isIndex.ts';
import { isKey } from '../_internal/isKey.ts';
import { toKey } from '../_internal/toKey.ts';
import { isObject } from '../predicate/isObject.ts';
import { toPath } from '../util/toPath.ts';

export function set<T extends object>(obj: T, path: PropertyKey | readonly PropertyKey[], value: unknown): T;
/**
 * Sets the value at the specified path of the given object. If any part of the path does not exist, it will be created.
 *
 * @template T - The type of the object.
 * @param {T} obj - The object to modify.
 * @param {PropertyKey | PropertyKey[]} path - The path of the property to set.
 * @param {unknown} value - The value to set.
 * @returns {T} - The modified object.
 *
 * @example
 * // Set a value in a nested object
 * const obj = { a: { b: { c: 3 } } };
 * set(obj, 'a.b.c', 4);
 * console.log(obj.a.b.c); // 4
 *
 * @example
 * // Set a value in an array
 * const arr = [1, 2, 3];
 * set(arr, 1, 4);
 * console.log(arr[1]); // 4
 *
 * @example
 * // Create non-existent path and set value
 * const obj = {};
 * set(obj, 'a.b.c', 4);
 * console.log(obj); // { a: { b: { c: 4 } } }
 */
export function set<T extends object>(obj: T, path: PropertyKey | readonly PropertyKey[], value: unknown): T {
  return updateWith(
    obj,
    path,
    () => value,
    () => undefined
  );
}
