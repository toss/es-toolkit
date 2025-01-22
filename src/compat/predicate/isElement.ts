import { isObjectLike } from './isObjectLike';
import { isPlainObject } from './isPlainObject';

/**
 * Checks if `value` is likely a DOM element.
 *
 * @param {any} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
 *
 * @example
 * console.log(isElement(document.body)); // true
 * console.log(isElement('<body>')); // false
 */
export function isElement(value?: any): boolean {
  return isObjectLike(value) && (value as any).nodeType === 1 && !isPlainObject(value);
}
