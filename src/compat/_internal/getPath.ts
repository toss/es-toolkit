import { isKey } from './isKey';
import { toPath } from './toPath';

/**
 * Get the `path` (property name) from the `key` (property name or property path).
 *
 * @param {string | string[]} key - The `key` (property name or property path) to convert.
 * @returns {string | string[]} The converted key (only property name).
 */
export function getPath(key: string | string[]): string | string[] {
  if (Array.isArray(key)) {
    const path = [];

    for (let i = 0; i < key.length; i++) {
      const k = key[i];

      if (isKey(k)) {
        path.push(k);
      } else {
        path.push(...toPath(k));
      }
    }

    return path;
  }

  return isKey(key) ? key : toPath(key);
}
