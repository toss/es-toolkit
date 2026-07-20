import { isPlainObject } from '../predicate/isPlainObject.ts';

interface UnFlattenObjectOptions {
  /**
   * The delimiter to use between nested keys.
   * @default '.'
   */
  delimiter?: string;
}

/**
 * Unflattens a single level object with delimiter-separated keys into a nested
 * object. This is the inverse of {@link flattenObject}.
 *
 * Object branches whose keys are all non-negative integers (e.g. `0`, `1`)
 * are converted to arrays, mirroring how {@link flattenObject} flattens
 * arrays. Non-plain objects (e.g. `Date`, `RegExp`) are left untouched.
 *
 * @param object - The flattened object to unflatten.
 * @param [options.delimiter='.'] - The delimiter to split keys on.
 * @returns The nested object.
 *
 * @example
 * const flattened = {
 *   'a.b.c': 1,
 *   'd.0': 2,
 *   'd.1': 3,
 * };
 *
 * const nested = unFlattenObject(flattened);
 * console.log(nested);
 * // Output:
 * // {
 * //   a: { b: { c: 1 } },
 * //   d: [2, 3]
 * // }
 */
export function unFlattenObject(
  object: Record<string, any>,
  { delimiter = '.' }: UnFlattenObjectOptions = {}
): Record<string, any> {
  const result: Record<string, any> = {};

  const keys = Object.keys(object);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = object[key];
    const segments = key.split(delimiter);

    let current: Record<string, any> = result;
    for (let j = 0; j < segments.length - 1; j++) {
      const segment = segments[j];
      if (current[segment] === undefined) {
        current[segment] = {};
      }
      current = current[segment] as Record<string, any>;
    }

    const last = segments[segments.length - 1];
    current[last] = value;
  }

  return toArrayDeep(result);
}

function toArrayDeep(value: any): any {
  if (Array.isArray(value)) {
    return value.map(toArrayDeep);
  }
  if (isPlainObject(value) && Object.keys(value).length > 0) {
    const keys = Object.keys(value);
    if (keys.every(k => /^\d+$/.test(k))) {
      const arr: any[] = [];
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        arr[Number(k)] = toArrayDeep(value[k]);
      }
      return arr;
    }
    const out: Record<string, any> = {};
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      out[k] = toArrayDeep(value[k]);
    }
    return out;
  }
  return value;
}
