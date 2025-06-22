import { assignValue } from '../_internal/assignValue.ts';
import { isIndex } from '../_internal/isIndex.ts';
import { isKey } from '../_internal/isKey.ts';
import { PropertyPath } from '../_internal/PropertyPath.ts';
import { toKey } from '../_internal/toKey.ts';
import { isObject } from '../predicate/isObject.ts';
import { toPath } from '../util/toPath.ts';

/**
 * Updates the value at the specified path of the given object using an updater function and a customizer.
 * If any part of the path does not exist, it will be created.
 *
 * @template T - The type of the object.
 * @param {T} object - The object to modify.
 * @param {PropertyPath} path - The path of the property to update.
 * @param {(oldValue: any) => any} updater - The function to produce the updated value.
 * @param {(value: any, key: string, object: T) => any} customizer - The function to customize the update process.
 * @returns {T} - The modified object.
 *
 * @example
 * const object = { 'a': [{ 'b': { 'c': 3 } }] };
 * updateWith(object, 'a[0].b.c', (n) => n * n);
 * // => { 'a': [{ 'b': { 'c': 9 } }] }
 */
export function updateWith<T extends object>(
  object: T,
  path: PropertyPath,
  updater: (oldValue: any) => any,
  customizer?: (value: any, key: string, object: T) => any
): T;

/**
 * Updates the value at the specified path of the given object using an updater function and a customizer.
 * If any part of the path does not exist, it will be created.
 *
 * @template T - The type of the object.
 * @template R - The type of the return value.
 * @param {T} object - The object to modify.
 * @param {PropertyPath} path - The path of the property to update.
 * @param {(oldValue: any) => any} updater - The function to produce the updated value.
 * @param {(value: any, key: string, object: T) => any} customizer - The function to customize the update process.
 * @returns {R} - The modified object.
 *
 * @example
 * const object = { 'a': [{ 'b': { 'c': 3 } }] };
 * updateWith(object, 'a[0].b.c', (n) => n * n);
 * // => { 'a': [{ 'b': { 'c': 9 } }] }
 */
export function updateWith<T extends object, R>(
  object: T,
  path: PropertyPath,
  updater: (oldValue: any) => any,
  customizer?: (value: any, key: string, object: T) => any
): R;

/**
 * Updates the value at the specified path of the given object using an updater function and a customizer.
 * If any part of the path does not exist, it will be created.
 *
 * @template T - The type of the object.
 * @template R - The type of the return value.
 * @param {T} obj - The object to modify.
 * @param {PropertyPath} path - The path of the property to update.
 * @param {(value: any) => any} updater - The function to produce the updated value.
 * @param {(value: any, key: string, object: T) => any} customizer - The function to customize the update process.
 * @returns {T | R} - The modified object.
 *
 * @example
 * const object = { 'a': [{ 'b': { 'c': 3 } }] };
 * updateWith(object, 'a[0].b.c', (n) => n * n);
 * // => { 'a': [{ 'b': { 'c': 9 } }] }
 */
export function updateWith<T extends object, R>(
  obj: T,
  path: PropertyPath,
  updater: (value: any) => any,
  customizer?: (value: any, key: string, object: T) => any
): T | R {
  if (obj == null && !isObject(obj)) {
    return obj;
  }

  const resolvedPath = isKey(path, obj)
    ? [path]
    : Array.isArray(path)
      ? path
      : typeof path === 'string'
        ? toPath(path)
        : [path];

  let current: any = obj;

  for (let i = 0; i < resolvedPath.length && current != null; i++) {
    const key = toKey(resolvedPath[i]);
    let newValue: unknown;

    if (i === resolvedPath.length - 1) {
      newValue = updater(current[key]);
    } else {
      const objValue = current[key];
      const customizerResult = customizer?.(objValue, key as string, obj);
      newValue =
        customizerResult !== undefined
          ? customizerResult
          : isObject(objValue)
            ? objValue
            : isIndex(resolvedPath[i + 1])
              ? []
              : {};
    }

    assignValue(current, key, newValue);
    current = current[key];
  }

  return obj;
}
