import { capitalize } from './capitalize.ts';
import { words as getWords } from './words.ts';

/**
 * Converts a string to capital case (also known as "start case"), in which
 * the first letter of each word is capitalised and the rest are lower-cased,
 * with words separated by a single space. Not to be confused with
 * {@link capitalize}, which only capitalises the first letter of the whole
 * string. See issue #306.
 *
 * @param str - The string to convert to capital case.
 * @returns The converted string to capital case.
 *
 * @example
 * capitalCase('hello world') // 'Hello World'
 * capitalCase('some whitespace') // 'Some Whitespace'
 * capitalCase('hyphen-text') // 'Hyphen Text'
 * capitalCase('camelCase') // 'Camel Case'
 */
export function capitalCase(str: string): string {
  const words = getWords(str);
  if (words.length === 0) {
    return '';
  }
  return words.map(word => capitalize(word)).join(' ');
}
