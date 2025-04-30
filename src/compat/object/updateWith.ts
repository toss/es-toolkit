import { assignValue } from '../_internal/assignValue.ts';
import { isIndex } from '../_internal/isIndex.ts';
import { isKey } from '../_internal/isKey.ts';
import { toKey } from '../_internal/toKey.ts';
import { isObject } from '../predicate/isObject.ts';
import { toPath } from '../util/toPath.ts';

/**
 * Updates the value at the specified path of the given object using an updater function and a customizer.
 * If any part of the path does not exist, it will be created.
 *
 * @template T - The type of the object.
 * @param {T} obj - The object to modify.
 * @param {PropertyKey | PropertyKey[]} path - The path of the property to update.
 * @param {(value: unknown) => unknown} updater - The function to produce the updated value.
 * @param {(value: unknown) => unknown} customizer - The function to customize the update process.
 * @returns {T} - The modified object.
 */
export function updateWith<T extends object | null | undefined>(
  obj: T,
  path: PropertyKey | readonly PropertyKey[],
  updater: (value: unknown) => unknown,
  customizer: (value: unknown) => unknown
): T {
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
      const customizerResult = customizer(objValue);
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
