/**
 * Checks if a property key is unsafe to write to.
 *
 * Writing through `__proto__`, `constructor`, or `prototype` can reach
 * `Object.prototype` and pollute every object, so write paths like `set`,
 * `update`, and `zipObjectDeep` abort when a path segment matches one of
 * these keys, matching lodash's behavior.
 *
 * Read paths like `get` and `unset` use `isUnsafeProperty` instead, which
 * only blocks `__proto__`; lodash keeps reads of `constructor` and
 * `prototype` unrestricted.
 *
 * @param key - The property key to check
 * @returns `true` if the property is unsafe to write to, `false` otherwise
 * @internal
 */
export function isUnsafeToWriteProperty(key: PropertyKey) {
  return key === '__proto__' || key === 'constructor' || key === 'prototype';
}
