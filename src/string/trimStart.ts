import { flatMap } from '../array/flatMap.ts';

/**
 * Removes leading whitespace or specified characters from a string.
 *
 * @param {string} str - The string from which leading characters will be trimmed.
 * @param {string | string[]} chars - The character(s) to remove from the start of the string.
 * @returns {string} - The resulting string after the specified leading character has been removed.
 *
 * @example
 * const trimmedStr1 = trimStart('---hello', '-') // returns 'hello'
 * const trimmedStr2 = trimStart('000123', '0') // returns '123'
 * const trimmedStr3 = trimStart('abcabcabc', 'a') // returns 'bcabcabc'
 * const trimmedStr4 = trimStart('xxxtrimmed', 'x') // returns 'trimmed'
 */
export function trimStart(str: string, chars?: string | string[]): string {
  if (chars === undefined) {
    return str.trimStart();
  }

  const charsToUse = Array.isArray(chars) ? flatMap(chars, char => char.split('')) : chars;
  let startIndex = 0;

  while (startIndex < str.length && charsToUse.includes(str[startIndex])) {
    startIndex++;
  }

  return str.substring(startIndex);
}
