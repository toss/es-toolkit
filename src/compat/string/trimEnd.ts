import { trimEnd as trimEndToolkit } from '../../string/trimEnd.ts';
import { baseToString } from '../_internal/baseToString.ts';
import { toString } from '../util/toString.ts';

/**
 * Removes trailing whitespace or specified characters from a string.
 *
 * @param string - The string to trim.
 * @param chars - The characters to trim from the end of the string.
 * @returns Returns the trimmed string.
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
 * @param string - The string to trim.
 * @param index - The index parameter (used with guard).
 * @param guard - Enables use as an iteratee for methods like `map`.
 * @returns Returns the trimmed string.
 *
 * @example
 * trimEnd('  abc  ', 0, {});
 * // => '  abc'
 */
export function trimEnd(string: string, index: string | number, guard: object): string;

/**
 * Removes trailing whitespace or specified characters from a string.
 *
 * @param str - The string from which trailing characters will be trimmed.
 * @param chars - The character(s) to remove from the end of the string.
 * @param guard - Enables use as an iteratee for methods like `map`.
 * @returns Returns the trimmed string.
 *
 * @example
 * trimEnd('  abc  ');
 * // => '  abc'
 *
 * trimEnd('-_-abc-_-', '_-');
 * // => '-_-abc'
 */
export function trimEnd(str?: string, chars?: string | number, guard?: object): string {
  const string = toString(str);

  if (string && (guard || chars === undefined)) {
    return string.trimEnd();
  }

  const chrs = baseToString(chars);

  if (!string || !chrs) {
    return string;
  }

  return trimEndToolkit(string, chrs.split(''));
}
