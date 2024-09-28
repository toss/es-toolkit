import { trimStart } from './trimStart.ts';
import { trimEnd } from './trimEnd.ts';

/**
 * Removes leading and trailing whitespace or specified characters from a string.
 *
 * @param {string} str - The string from which characters will be trimmed.
 * @param {string | string[]} chars - The character(s) to remove from the string. Can be a single character or an array of characters.
 * @returns {string} - The resulting string after the specified characters have been removed.
 *
 * @example
 * trim("  hello  "); // "hello"
 * trim("--hello--", "-"); // "hello"
 * trim("##hello##", ["#", "o"]); // "hell"
 */
export function trim(str: string, chars?: string | string[]): string {
  if (chars === undefined) {
    return str.trim();
  }

  return trimStart(trimEnd(str, chars), chars);
}
