import { isPlainObject } from '../predicate/isPlainObject.ts';

interface FlattenObjectOptions {
  /**
   * The delimiter to use between nested keys.
   * @default '.'
   */
  delimiter?: string;
}

interface FlattenObjectMapOptions {
  /**
   * The delimiter to use between nested keys.
   * @default '.'
   */
  delimiter?: string;
  /**
   * The target Map to populate with flattened key-value pairs.
   */
  target: Map<string, any>;
}

/**
 * Flattens a nested object into a single level object with delimiter-separated keys.
 *
 * @param {object} object - The object to flatten.
 * @param {FlattenObjectOptions | FlattenObjectMapOptions | Map<string, any>} [options] - Options for flattening.
 * @returns {Record<string, any> | Map<string, any>} - The flattened object or Map.
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
 * // Or flatten into a Map
 * const map = flattenObject(nestedObject, new Map());
 * console.log(map);
 * // Output: Map { 'a.b.c' => 1, 'd.0' => 2, 'd.1' => 3 }
 *
 * // Or flatten into a Map with custom delimiter
 * const customMap = flattenObject(nestedObject, { delimiter: '_', target: new Map() });
 * console.log(customMap);
 * // Output: Map { 'a_b_c' => 1, 'd_0' => 2, 'd_1' => 3 }
 */
export function flattenObject(
  object: object,
  options?: FlattenObjectOptions | FlattenObjectMapOptions | Map<string, any>
): Record<string, any> | Map<string, any> {
  // Legacy support: Map as second parameter
  if (options instanceof Map) {
    flattenObjectIntoMap(object, options, '', '.');
    return options;
  }

  // New syntax: { delimiter, target }
  if (options && 'target' in options) {
    const { delimiter = '.', target } = options;
    flattenObjectIntoMap(object, target, '', delimiter);
    return target;
  }

  // Original syntax: { delimiter }
  const { delimiter = '.' } = options || {};
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

function flattenObjectIntoMap(object: object, target: Map<string, any>, prefix = '', delimiter = '.'): void {
  const keys = Object.keys(object);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = (object as any)[key];

    const prefixedKey = prefix ? `${prefix}${delimiter}${key}` : key;

    if (isPlainObject(value) && Object.keys(value).length > 0) {
      flattenObjectIntoMap(value, target, prefixedKey, delimiter);
      continue;
    }

    if (Array.isArray(value)) {
      flattenObjectIntoMap(value, target, prefixedKey, delimiter);
      continue;
    }

    target.set(prefixedKey, value);
  }
}
