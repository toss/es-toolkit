import { isPlainObject } from '../predicate/isPlainObject.ts';

interface FlattenObjectOptions {
  /**
   * The delimiter to use between nested keys.
   * @default '.'
   */
  delimiter?: string;
  /**
   * If true, arrays are kept as values instead of being flattened.
   * @default false
   */
  preserveArrays?: boolean;
}

/**
 * Flattens a nested object into a single level object with delimiter-separated keys.
 *
 * @param object - The object to flatten.
 * @param [options.delimiter='.'] - The delimiter to use between nested keys.
 * @param [options.preserveArrays=false] - If true, arrays are kept as values instead of being flattened.
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
 *
 * const preserved = flattenObject(nestedObject, { preserveArrays: true });
 * console.log(preserved);
 * // Output:
 * // {
 * //   'a.b.c': 1,
 * //   'd': [2, 3]
 * // }
 */
export function flattenObject(
  object: object,
  { delimiter = '.', preserveArrays = false }: FlattenObjectOptions = {}
): Record<string, any> {
  return flattenObjectImpl(object, '', delimiter, preserveArrays);
}

function flattenObjectImpl(
  object: object,
  prefix: string,
  delimiter: string,
  preserveArrays: boolean
): Record<string, any> {
  const result: Record<string, any> = {};
  const keys = Object.keys(object);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = (object as any)[key];

    const prefixedKey = prefix ? `${prefix}${delimiter}${key}` : key;

    if (isPlainObject(value) && Object.keys(value).length > 0) {
      Object.assign(result, flattenObjectImpl(value, prefixedKey, delimiter, preserveArrays));
      continue;
    }

    if (Array.isArray(value) && !preserveArrays && value.length > 0) {
      Object.assign(result, flattenObjectImpl(value, prefixedKey, delimiter, preserveArrays));
      continue;
    }

    result[prefixedKey] = value;
  }

  return result;
}
