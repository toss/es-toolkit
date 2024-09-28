import { getWords } from './_internal/getWords.ts';

/**
 * Converts the first character of each word in a string to uppercase and the remaining characters to lowercase.
 *
 * Start case is the naming convention in which each word is written with an initial capital letter.
 * @param {string} str - The string to convert.
 * @returns {string} The converted string.
 *
 * @example
 * const result1 = startCase('hello world');  // result will be 'Hello World'
 * const result2 = startCase('HELLO WORLD');  // result will be 'Hello World'
 * const result3 = startCase('hello-world');  // result will be 'Hello World'
 * const result4 = startCase('hello_world');  // result will be 'Hello World'
 */
export function startCase(str: string): string {
  const words = getWords(str.trim());
  let result = '';
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (result) {
      result += ' ';
    }

    result += word[0].toUpperCase() + word.slice(1).toLowerCase();
  }
  return result;
}
