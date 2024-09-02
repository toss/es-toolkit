const IS_PLAIN = /^\w*$/;
const IS_DEEP = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;

/**
 * Checks if a given key is a deep key.
 *
 * A deep key is a string that contains a dot (.) or square brackets with a property accessor.
 *
 * @param key - The key to check.
 * @returns - Returns true if the key is a deep key, otherwise false.
 *
 * Examples:
 *
 * isDeepKey('a.b') // true
 * isDeepKey('a[b]') // true
 * isDeepKey('a') // false
 * isDeepKey(123) // false
 * isDeepKey('a.b.c') // true
 * isDeepKey('a[b][c]') // true
 */
export function isDeepKey(key: PropertyKey): boolean {
  switch (typeof key) {
    case 'number':
    case 'symbol': {
      return false;
    }
    case 'string': {
      return !IS_PLAIN.test(key) && IS_DEEP.test(key);
    }
  }
}
