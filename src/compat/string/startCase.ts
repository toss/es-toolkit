import { getWords } from '../../string/_internal/getWords.ts';
import { normalizeForCase } from '../_internal/normalizeForCase.ts';

/**
 * Converts the first character of each word in a string to uppercase and the remaining characters to lowercase.
 *
 * Start case is the naming convention in which each word is written with an initial capital letter.
 * @param {string | object} str - The string to convert.
 * @returns {string} The converted string.
 *
 * @example
 * const result1 = startCase('hello world');  // result will be 'Hello World'
 * const result2 = startCase('HELLO WORLD');  // result will be 'HELLO WORLD'
 * const result3 = startCase('hello-world');  // result will be 'Hello World'
 * const result4 = startCase('hello_world');  // result will be 'Hello World'
 */
export function startCase(str?: string | object): string {
  const words = getWords(normalizeForCase(str).trim());

  let result = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    if (result) {
      result += ' ';
    }

    if (word === word.toUpperCase()) {
      result += word;
    } else {
      result += word[0].toUpperCase() + word.slice(1).toLowerCase();
    }
  }

  return result;
}
