import { isKey } from './isKey';
import { toPath } from './toPath';

/**
 * Get the `path` (property name) from the `key` (property name or property path).
 *
 * @param {string | string[]} key - The `key` (property name or property path) to convert.
 * @param {object} object - The object to query.
 * @returns {string | string[]} The converted key (only property name).
 */
export function getPath<T extends object>(
  key: ((item: T) => unknown) | string | string[],
  object: T
): ((item: T) => unknown) | string | string[] {
  if (Array.isArray(key)) {
    const path = [];
    let keyOwner: object = object;

    for (let i = 0; i < key.length; i++) {
      const k = key[i];

      if (isKey(k, keyOwner)) {
        keyOwner = keyOwner[k as keyof typeof keyOwner];
        path.push(k);
      } else {
        const keys = toPath(k);

        for (let i = 0; i < keys.length; i++) {
          keyOwner = keyOwner[keys[i] as keyof typeof keyOwner];
          path.push(keys[i]);
        }
      }
    }

    return path;
  }
  if (typeof key === 'function') {
    return key;
  }

  return isKey(key, object) ? key : toPath(key);
}
