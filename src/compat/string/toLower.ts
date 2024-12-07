import { toString } from '../util/toString.ts';

/**
 * Converts the given value to a string and transforms it to lower case.
 * The function can handle various input types by first converting them to strings.
 *
 * @param {unknown} [value=''] The value to convert.
 * @returns {string} Returns the lower cased string.
 * @example
 *
 * toLower('--FOO-BAR--');
 * // => '--foo-bar--'
 *
 * toLower(null);
 * // => ''
 *
 * toLower([1, 2, 3]);
 * // => '1,2,3'
 */
export function toLower(value?: unknown): string {
  return toString(value).toLowerCase();
}
