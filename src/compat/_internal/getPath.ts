import { isKey } from './isKey';
import { toPath } from './toPath';

/**
 * Get the `path` (property name) from the `key` (property name or property path).
 *
 * @template T - The type of the object.
 * @param {((item: T) => unknown) | string | string[]} key - The `key` (property name or property path or custom key function) to query.
 * @param {T} object - The object to query.
 * @returns {((item: T) => unknown) | string | string[]} The converted key (only property name or custom key function).
 */
export function getPath<T extends object>(
  key: ((item: T) => unknown) | string | string[],
  object: T
): ((item: T) => unknown) | string | string[] {
  if (Array.isArray(key)) {
    const path = [];
    let target: object = object;

    for (let i = 0; i < key.length; i++) {
      const k = key[i];

      if (isKey(k, target)) {
        target = target[k as keyof typeof target];
        path.push(k);
      } else {
        const keys = toPath(k);

        for (let i = 0; i < keys.length; i++) {
          target = target[keys[i] as keyof typeof target];
          path.push(keys[i]);
        }
      }
    }

    return path;
  }

  if (typeof key === 'function' || isKey(key, object)) {
    return key;
  }

  return toPath(key);
}
