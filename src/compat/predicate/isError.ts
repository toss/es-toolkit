import { isObjectLike } from './isObjectLike.ts';
import { isPlainObject } from './isPlainObject.ts';
import { getTag } from '../_internal/getTag.ts';

/**
 * Checks if `value` is an Error object.
 *
 * @param value The value to check.
 * @returns Returns `true` if `value` is an Error object, `false` otherwise.
 *
 * @example
 * ```typescript
 * console.log(isError(new Error())); // true
 * console.log(isError('Error')); // false
 * console.log(isError({ name: 'Error', message: '' })); // false
 * ```
 */
export function isError(value: any): value is Error {
  if (!isObjectLike(value)) {
    return false;
  }

  const tag = getTag(value);

  return (
    tag === '[object Error]' ||
    tag === '[object DOMException]' ||
    (typeof value.message === 'string' && typeof value.name === 'string' && !isPlainObject(value))
  );
}
