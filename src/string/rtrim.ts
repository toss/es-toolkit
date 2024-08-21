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

export const rtrim = (str: string, toTrim: string): string => {
  const chars: string[] = str.split('');
  while (chars.at(-1) === toTrim) {
    chars.pop();
  }
  return chars.join('');
}
