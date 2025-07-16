import { toString } from '../util/toString.ts';

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
export function toUpper<T extends string = string>(value?: T): Uppercase<T> {
  return toString(value).toUpperCase() as Uppercase<T>;
}
