import { isKey } from './isKey';
import { toPath } from './toPath';

/**
 * Get the `path` (property name) from the `key` (property name or property path).
 *
 * @param {string | string[]} key - The `key` (property name or property path) to convert.
 * @param {object} object - The object to query.
 * @returns {string | string[]} The converted key (only property name).
 */
export function getPath(key: string | string[], object: object): string | string[] {
  if (Array.isArray(key)) {
    const path = [];

    for (let i = 0; i < key.length; i++) {
      const k = key[i];

      if (isKey(k, object)) {
        object = object[k as keyof typeof object];
        path.push(k);
      } else {
        const keys = toPath(k);

        for (let i = 0; i < keys.length; i++) {
          object = object[keys[i] as keyof typeof object];
          path.push(keys[i]);
        }
      }
    }

    return path;
  }

  return isKey(key, object) ? key : toPath(key);
}
