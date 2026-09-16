import { trim as trimToolkit } from '../../string/trim.ts';
import { baseToString } from '../_internal/baseToString.ts';
import { toString } from '../util/toString.ts';

/**
 * Removes leading and trailing whitespace or specified characters from a string.
 *
 * @param str - The string from which leading and trailing characters will be trimmed.
 * @param chars - The character(s) to remove from the end of the string. Defaults to `" "`.
 * @returns The resulting string after the specified leading and trailing characters have been removed.
 *
 * @example
 * trim("  hello  "); // "hello"
 * trim("--hello--", "-"); // "hello"
 * trim("##hello##", ["#", "o"]); // "hell"
 */
export function trim(string?: string, chars?: string): string;

/**
 * Removes leading and trailing whitespace or specified characters from a string.
 *
 * @param str - The string from which leading and trailing characters will be trimmed.
 * @param chars - The character(s) to remove from the end of the string. Defaults to `" "`.
 * @returns The resulting string after the specified leading and trailing characters have been removed.
 *
 * @example
 * trim("  hello  "); // "hello"
 * trim("--hello--", "-"); // "hello"
 * trim("##hello##", ["#", "o"]); // "hell"
 */
export function trim(string: string, index: string | number, guard: object): string;

export function trim(str: any, chars?: any, guard?: any): string {
  const string = toString(str);

  if (string && (guard || chars === undefined)) {
    return string.trim();
  }

  const chrs = baseToString(chars);

  if (!string || !chrs) {
    return string;
  }

  return trimToolkit(string, chrs.split(''));
}
