import { isPlainObject } from '../predicate/isPlainObject.ts';

interface FlattenObjectOptions {
  /**
   * The delimiter to use between nested keys.
   * @default '.'
   */
  delimiter?: string;
}

/**
 * Flattens a nested object into a single level object with delimiter-separated keys.
 *
 * @param {object} object - The object to flatten.
 * @param {string} [options.delimiter='.'] - The delimiter to use between nested keys.
 * @returns {Record<string, any>} - The flattened object.
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
export function flattenObject(object: object, { delimiter = '.' }: FlattenObjectOptions = {}): Record<string, any> {
  return flattenObjectImpl(object, '', delimiter);
}

function flattenObjectImpl(object: object, prefix = '', delimiter = '.'): Record<string, any> {
  const result: Record<string, any> = {};
  const keys = Object.keys(object);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = (object as any)[key];

    const prefixedKey = prefix ? `${prefix}${delimiter}${key}` : key;

    if (isPlainObject(value) && Object.keys(value).length > 0) {
      Object.assign(result, flattenObjectImpl(value, prefixedKey, delimiter));
      continue;
    }

    if (Array.isArray(value)) {
      Object.assign(result, flattenObjectImpl(value, prefixedKey, delimiter));
      continue;
    }

    result[prefixedKey] = value;
  }

  return result;
}
