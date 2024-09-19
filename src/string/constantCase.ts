import { getWords } from './_internal/getWords.ts';

/**
 * Converts a string to constant case.
 *
 * Snake case is the naming convention in which each word is written in lowercase and separated by an underscore (_) character.
 *
 * @param {string} str - The string that is to be changed to constant case.
 * @returns {string} - The converted string to constant case.
 *
 * @example
 * const convertedStr1 = constantCase('camelCase') // returns 'CAMEL_CASE'
 * const convertedStr2 = constantCase('some whitespace') // returns 'SOME_WHITESPACE'
 * const convertedStr3 = constantCase('hyphen-text') // returns 'HYPHEN_TEXT'
 * const convertedStr4 = constantCase('HTTPRequest') // returns 'HTTP_REQUEST'
 */

export function constantCase(str: string): string {
  const words = getWords(str);
  return words.map(word => word.toUpperCase()).join('_');
}
