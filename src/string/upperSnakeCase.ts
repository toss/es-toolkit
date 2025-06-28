import { words as getWords } from './words.ts';

/**
 * Converts a string to upper snake case.
 *
 * Upper snake case is the naming convention in which each word is written in uppercase and separated by an underscore (_) character.
 * Also known as SCREAMING_SNAKE_CASE or CONSTANT_CASE.
 *
 * @param {string} str - The string that is to be changed to upper snake case.
 * @returns {string} - The converted string to upper snake case.
 *
 * @example
 * const convertedStr1 = upperSnakeCase('camelCase') // returns 'CAMEL_CASE'
 * const convertedStr2 = upperSnakeCase('some whitespace') // returns 'SOME_WHITESPACE'
 * const convertedStr3 = upperSnakeCase('hyphen-text') // returns 'HYPHEN_TEXT'
 * const convertedStr4 = upperSnakeCase('HTTPRequest') // returns 'HTTP_REQUEST'
 */
export function upperSnakeCase(str: string): string {
  const words = getWords(str);

  return words.map(word => word.toUpperCase()).join('_');
}
