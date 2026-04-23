/** Matches any deep property path. Examples: `a.b`, `a[0]`, `a["b"]` */
const regexIsDeepProp = /\.|(\[(?:[^[\]]*|(["'])(?:(?!\2)[^\\]|\\.)*?\2)\])/;

/**
 * Checks if a given key is a deep key.
 *
 * A deep key is a string that contains a dot (.) or square brackets with a property accessor.
 *
 * @param {PropertyKey} key - The key to check.
 * @returns {boolean} - Returns true if the key is a deep key, otherwise false.
 *
 * Examples:
 *
 * isDeepKey('a.b') // true
 * isDeepKey('a[b]') // true
 * isDeepKey('a') // false
 * isDeepKey(123) // false
 * isDeepKey('a.b.c') // true
 * isDeepKey('a[b][c]') // true
 * isDeepKey('a.') // false
 * isDeepKey('.a') // false
 * isDeepKey('a[b') // false
 * isDeepKey('a]b]') // false
 * isDeepKey('a][b') // false
 * isDeepKey('') // false
 * isDeepKey('a[0]') // true
 *
 */
export function isDeepKey(key: PropertyKey): boolean {
  switch (typeof key) {
    case 'number':
    case 'symbol': {
      return false;
    }
    case 'string': {
      if (key === '' || key.startsWith('.') || key.endsWith('.')) return false;

      return regexIsDeepProp.test(key);
    }
    default: {
      return false;
    }
  }
}
