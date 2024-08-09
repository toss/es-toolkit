import { isSymbol } from '../predicate/isSymbol';

/**  Matches any deep property path. (e.g. `a.b[0].c`)*/
const regexIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
/**  Matches any word character (alphanumeric & underscore).*/
const regexIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path. (It's ok that the `value` is not in the keys of the `object`)
 * @param {PropertyKey | boolean} value The value to check.
 * @param {unknown} object The object to query.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 *
 * @example
 * isKey('a', { a: 1 });
 * // => true
 *
 * isKey('a.b', { a: { b: 2 } });
 * // => false
 */
export function isKey(value?: PropertyKey | boolean | null | unknown[], object?: unknown): boolean {
  if (Array.isArray(value)) {
    return false;
  }

  if (typeof value === 'number' || typeof value === 'boolean' || value == null || isSymbol(value)) {
    return true;
  }

  return (
    regexIsPlainProp.test(value) || !regexIsDeepProp.test(value) || (object != null && Object.hasOwn(object, value))
  );
}
