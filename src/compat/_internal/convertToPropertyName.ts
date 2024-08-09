import { isKey } from './isKey';
import { toPath } from './toPath';

/**
 * If the key is a deep key (or property path), convert it to a property name.
 * @param {string | string[]} key - The `key` (property name or property path) to convert.
 * @returns {string | string[]} The converted key (only property name).
 */
export const convertToPropertyName = (key: string | string[]): string | string[] => {
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
};
