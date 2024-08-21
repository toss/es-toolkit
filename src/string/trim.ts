/**
 * Trims specific characters from a string.
 *
 * This function removes all occurrences of the specified characters from the input string.
 * The characters to be removed can be provided as a single character or an array of characters.
 *
 * @param {string} str - The string from which characters will be trimmed.
 * @param {TrimParameter} toTrim - The character(s) to remove from the string. Can be a single character or an array of characters.
 * @returns {string} - The resulting string after the specified characters have been removed.
 *
 * @example
 * const trimmedStr1 = trim('hello world', 'l') // returns 'heo word'
 * const trimmedStr2 = trim('hello world', ['l', 'o']) // returns 'he wrd'
 * const trimmedStr3 = trim('abcabcabc', 'b') // returns 'acacac'
 * const trimmedStr4 = trim('123-456-789', ['-', '3']) // returns '12456789'
 */

type TrimParameter = string | string[];

export const trim = (str: string, toTrim: TrimParameter): string => {
  const chars = str.split('');
  const trimmedChars: string[] = [];
  for (const char of chars) {
    if ((char !== toTrim && typeof toTrim === 'string') || !toTrim.includes(char)) {
      trimmedChars.push(char);
    }
  }
  return trimmedChars.join('');
};
