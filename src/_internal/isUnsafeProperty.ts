/**
 * Checks if a property key is unsafe to modify directly.
 *
 * This function is used in functions like `merge` to prevent prototype pollution attacks
 * by identifying property keys that could modify the object's prototype chain or constructor.
 *
 * @param key - The property key to check
 * @returns `true` if the property is unsafe to modify directly, `false` otherwise
 * @internal
 */
export function isUnsafeProperty(key: PropertyKey) {
  return key === '__proto__';
}
