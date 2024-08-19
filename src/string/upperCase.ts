import { getWords } from './_internal/getWords.ts';

/**
 * Converts a string to upper case.
 *
 * Upper case is the naming convention in which each word is written in uppercase and separated by an space ( ) character.
 *
 * @param {string} str - The string that is to be changed to upper case.
 * @returns {string} - The converted string to upper case.
 *
 * @example
 * const convertedStr1 = upperCase('camelCase') // returns 'CAMEL CASE'
 * const convertedStr2 = upperCase('some whitespace') // returns 'SOME WHITESPACE'
 * const convertedStr3 = upperCase('hyphen-text') // returns 'HYPHEN TEXT'
 * const convertedStr4 = upperCase('HTTPRequest') // returns 'HTTP REQUEST'
 */
export const upperCase = (str: string): string => {
  const words = getWords(str);
  return words.map(word => word.toUpperCase()).join(' ');
};
