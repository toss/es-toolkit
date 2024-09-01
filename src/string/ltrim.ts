/**
 * Trims specific characters from the start of a string.
 *
 * This function removes all leading occurrences of the specified character from the input string.
 * Only the characters at the beginning of the string will be removed.
 *
 * @param {string} str - The string from which leading characters will be trimmed.
 * @param {string} toTrim - The character to remove from the start of the string.
 * @returns {string} - The resulting string after the specified leading character has been removed.
 *
 * @example
 * const trimmedStr1 = ltrim('---hello', '-') // returns 'hello'
 * const trimmedStr2 = ltrim('000123', '0') // returns '123'
 * const trimmedStr3 = ltrim('abcabcabc', 'a') // returns 'bcabcabc'
 * const trimmedStr4 = ltrim('xxxtrimmed', 'x') // returns 'trimmed'
 */

import {TrimParameter} from "./trim.ts";

export const ltrim = (str: string, toTrim: TrimParameter): string => {
  const chars: string[] = str.split('');
  let startHere = 0;
  while ((chars[startHere] === toTrim || toTrim.includes(chars[startHere])) && startHere < chars.length) {
    startHere++;
  }
  return chars.splice(startHere, chars.length).join('');
};
