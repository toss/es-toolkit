import { get } from './get.ts';
import { isUnsafeProperty } from '../../_internal/isUnsafeProperty.ts';
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
 * @param object - The object to modify.
 * @param path - The path of the property to update.
 * @param updater - The function to produce the updated value.
 * @param customizer - The function to customize the update process.
 * @returns The modified object.
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
 * @param object - The object to modify.
 * @param path - The path of the property to update.
 * @param updater - The function to produce the updated value.
 * @param customizer - The function to customize the update process.
 * @returns The modified object.
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
 * @param obj - The object to modify.
 * @param path - The path of the property to update.
 * @param updater - The function to produce the updated value.
 * @param customizer - The function to customize the update process.
 * @returns The modified object.
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

  let resolvedPath: PropertyKey[];
  if (isKey(path, obj)) {
    resolvedPath = [path];
  } else if (Array.isArray(path)) {
    resolvedPath = path;
  } else {
    resolvedPath = toPath(path);
  }

  const updateValue = updater(get(obj, resolvedPath));

  let current: any = obj;

  for (let i = 0; i < resolvedPath.length && current != null; i++) {
    const key = toKey(resolvedPath[i]);

    if (isUnsafeProperty(key)) {
      continue;
    }

    let newValue: unknown;

    if (i === resolvedPath.length - 1) {
      newValue = updateValue;
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
