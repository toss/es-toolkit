const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Checks if `key` is an own property of `object`, like `Object.hasOwn`, which is not available on ES2015 engines.
 *
 * @param object - The object to inspect.
 * @param key - The key to check.
 * @returns `true` if `key` is an own property of `object`, otherwise `false`.
 */
export function hasOwn(object: object, key: PropertyKey): boolean {
  return hasOwnProperty.call(object, key);
}
