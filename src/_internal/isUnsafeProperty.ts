/**
 * Checks if a property key is unsafe to access or copy directly.
 *
 * This function is used in functions like `get`, `unset`, and `merge` to prevent
 * prototype pollution attacks by identifying `__proto__`, which modifies the object's
 * prototype chain. `constructor` and `prototype` stay accessible here because lodash
 * keeps reads of them unrestricted; write paths use `isUnsafeToWriteProperty` instead,
 * which also blocks those keys.
 *
 * @param key - The property key to check
 * @returns `true` if the property is unsafe to access directly, `false` otherwise
 * @internal
 */
export function isUnsafeProperty(key: PropertyKey) {
  return key === '__proto__';
}
