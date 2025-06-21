/**
 * Checks if the given key is a prototype pollution key.
 * 
 * @param {PropertyKey} key - The key to check
 * @returns {boolean} True if the key is dangerous for prototype pollution
 */
export function isPrototypePollutionKey(key: PropertyKey): boolean {
  return key === '__proto__' || 
         key === 'constructor' || 
         key === 'prototype' ||
         key === '__defineGetter__' ||
         key === '__defineSetter__' ||
         key === '__lookupGetter__' ||
         key === '__lookupSetter__';
}