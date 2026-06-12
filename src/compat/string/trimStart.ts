import { trimStart as trimStartToolkit } from '../../string/trimStart.ts';

/**
 * Removes leading whitespace or specified characters from a string.
 *
 * @param string - The string to trim.
 * @param chars - The characters to trim from the start of the string.
 * @returns Returns the trimmed string.
 *
 * @example
 * trimStart('  abc  ');
 * // => 'abc  '
 *
 * trimStart('-_-abc-_-', '_-');
 * // => 'abc-_-'
 */
export function trimStart(string?: string, chars?: string): string;

/**
 * Removes leading whitespace or specified characters from a string.
 *
 * @param string - The string to trim.
 * @param index - The index parameter (used with guard).
 * @param guard - Enables use as an iteratee for methods like `map`.
 * @returns Returns the trimmed string.
 *
 * @example
 * trimStart('  abc  ', 0, {});
 * // => 'abc  '
 */
export function trimStart(string: string, index: string | number, guard: object): string;

/**
 * Removes leading whitespace or specified characters from a string.
 *
 * @param str - The string from which leading characters will be trimmed.
 * @param chars - The character(s) to remove from the start of the string.
 * @param guard - Enables use as an iteratee for methods like `map`.
 * @returns Returns the trimmed string.
 *
 * @example
 * trimStart('  abc  ');
 * // => 'abc  '
 *
 * trimStart('-_-abc-_-', '_-');
 * // => 'abc-_-'
 */
export function trimStart(str?: string, chars?: string | number, guard?: object): string {
  if (str == null) {
    return '';
  }

  if (guard != null || chars == null) {
    return str.toString().trimStart();
  }

  return trimStartToolkit(str, chars.toString().split(''));
}
