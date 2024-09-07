import { isArrayLike } from './isArrayLike';
import { isObjectLike } from './isObjectLike';

/**
 * Checks if the given value is a non-primitive, array-like object.
 *
 * @param {unknown} value The value to check.
 * @returns {value is ArrayLike<unknown> & object} `true` if the value is a non-primitive, array-like object, `false` otherwise.
 *
 * @example
 * isArrayLikeObject([1, 2, 3]); // true
 * isArrayLikeObject({ 0: 'a', length: 1 }); // true
 * isArrayLikeObject('abc'); // false
 * isArrayLikeObject(()=>{}); // false
 */
export function isArrayLikeObject(value: unknown): value is ArrayLike<unknown> & object {
  return isObjectLike(value) && isArrayLike(value);
}
