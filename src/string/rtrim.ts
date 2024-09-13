/**
 * Trims specific characters from the end of a string.
 *
 * This function removes all trailing occurrences of the specified character from the input string.
 * Only the characters at the end of the string will be removed.
 *
 * @param {string} str - The string from which trailing characters will be trimmed.
 * @param {string} toTrim - The character to remove from the end of the string.
 * @returns {string} - The resulting string after the specified trailing character has been removed.
 *
 * @example
 * const trimmedStr1 = rtrim('hello---', '-') // returns 'hello'
 * const trimmedStr2 = rtrim('123000', '0') // returns '123'
 * const trimmedStr3 = rtrim('abcabcabc', 'c') // returns 'abcabcab'
 * const trimmedStr4 = rtrim('trimmedxxx', 'x') // returns 'trimmed'
 */

import { TrimParameter } from './trim.ts';

export const rtrim = (str: string, toTrim: TrimParameter): string => {
  const chars: string[] = str.split('');

  while (chars.length > 0) {
    const lastChar = chars[chars.length - 1];
    if (typeof toTrim === 'string' ? lastChar === toTrim : toTrim.includes(lastChar)) {
      chars.pop();
    } else {
      break;
    }
  }

  return chars.join('');
};
