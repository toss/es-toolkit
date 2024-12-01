import { toString } from '../util/toString';

/**
 * Converts `string`, as a whole, to upper case just like
 * [String#toUpperCase](https://mdn.io/toUpperCase).
 *
 * @param {unknown} [value=''] The value to convert.
 * @returns {string} Returns the upper cased string.
 * @example
 *
 * toUpper('--foo-bar--');
 * // => '--FOO-BAR--'
 *
 * toUpper(null);
 * // => ''
 *
 * toUpper([1, 2, 3]);
 * // => '1,2,3'
 */
export function toUpper(value?: unknown): string {
  return toString(value).toUpperCase();
}
