import { toString } from '../util/toString.ts';

/**
 * Removes trailing whitespace or specified characters from a string.
 *
 * @param {string} string - The string to trim.
 * @param {string} chars - The characters to trim from the end of the string.
 * @returns {string} Returns the trimmed string.
 *
 * @example
 * trimEnd('  abc  ');
 * // => '  abc'
 *
 * trimEnd('-_-abc-_-', '_-');
 * // => '-_-abc'
 */
export function trimEnd(string?: string, chars?: string): string;

/**
 * Removes trailing whitespace or specified characters from a string.
 *
 * @param {string} string - The string to trim.
 * @param {string | number} index - The index parameter (used with guard).
 * @param {object} guard - Enables use as an iteratee for methods like `map`.
 * @returns {string} Returns the trimmed string.
 *
 * @example
 * trimEnd('  abc  ', 0, {});
 * // => '  abc'
 */
export function trimEnd(string: string, index: string | number, guard: object): string;

/**
 * Removes trailing whitespace or specified characters from a string.
 *
 * @param {string} str - The string from which trailing characters will be trimmed.
 * @param {string | number} chars - The character(s) to remove from the end of the string.
 * @param {object} guard - Enables use as an iteratee for methods like `map`.
 * @returns {string} Returns the trimmed string.
 *
 * @example
 * trimEnd('  abc  ');
 * // => '  abc'
 *
 * trimEnd('-_-abc-_-', '_-');
 * // => '-_-abc'
 */
export function trimEnd(str?: string, chars?: string | number, guard?: object): string {
  if (str == null) {
    return '';
  }

  if (guard != null || chars == null) {
    chars = ' ';
  }

  return trimEndImpl(toString(str), chars.toString().split(''));
}

function trimEndImpl(str: string, chars: string[]): string {
  let endIndex = str.length;

  while (endIndex > 0 && chars.includes(str[endIndex - 1])) {
    endIndex--;
  }

  return str.substring(0, endIndex);
}
