import { isPlainObject } from '../predicate/isPlainObject.ts';

/**
 * Flattens a nested object into a single level object with dot-separated keys.
 *
 * @param object - The object to flatten.
 * @returns - The flattened object.
 *
 * @example
 * const nestedObject = {
 *   a: {
 *     b: {
 *       c: 1
 *     }
 *   },
 *   d: [2, 3]
 * };
 *
 * const flattened = flattenObject(nestedObject);
 * console.log(flattened);
 * // Output:
 * // {
 * //   'a.b.c': 1,
 * //   'd.0': 2,
 * //   'd.1': 3
 * // }
 */
export function flattenObject(object: object): Record<string, any> {
  return flattenObjectImpl(object);
}

function flattenObjectImpl(object: object, prefix = ''): Record<string, any> {
  const result: Record<string, any> = {};
  const keys = Object.keys(object);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = (object as any)[key];

    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (isPlainObject(value) && Object.keys(value).length > 0) {
      Object.assign(result, flattenObjectImpl(value, prefixedKey));
      continue;
    }

    if (Array.isArray(value)) {
      for (let index = 0; index < value.length; index++) {
        result[`${prefixedKey}.${index}`] = value[index];
      }
      continue;
    }

    result[prefixedKey] = value;
  }

  return result;
}
