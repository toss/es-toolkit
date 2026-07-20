import { isPlainObject } from '../predicate/isPlainObject.ts';

interface FlattenObjectOptions {
  /**
   * The delimiter to use between nested keys.
   * @default '.'
   */
  delimiter?: string;
  /**
   * When `true`, return a `Map<string, any>` instead of a plain object. See issue #1388.
   * @default false
   */
  map?: boolean;
}

/**
 * Flattens a nested object into a single level object with delimiter-separated keys.
 *
 * @param object - The object to flatten.
 * @param [options.delimiter='.'] - The delimiter to use between nested keys.
 * @returns The flattened object.
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
export function flattenObject(object: object, options?: { delimiter?: string; map?: false }): Record<string, any>;
export function flattenObject(object: object, options: { delimiter?: string; map: true }): Map<string, any>;
export function flattenObject(
  object: object,
  { delimiter = '.', map = false }: FlattenObjectOptions = {}
): Record<string, any> | Map<string, any> {
  const flat = flattenObjectImpl(object, '', delimiter);
  return map ? new Map(Object.keys(flat).map(key => [key, flat[key]] as [string, any])) : flat;
}

function flattenObjectImpl(object: object, prefix: string, delimiter: string): Record<string, any> {
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

    if (Array.isArray(value) && value.length > 0) {
      Object.assign(result, flattenObjectImpl(value, prefixedKey, delimiter));
      continue;
    }

    result[prefixedKey] = value;
  }

  return result;
}
