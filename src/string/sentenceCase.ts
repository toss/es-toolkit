import { words as getWords } from './words.ts';

/**
 * Converts a string to sentence case.
 *
 * Sentence case is the naming convention in which the first character of the first word is capitalized,
 * all other characters are lowercase, and words are separated by spaces.
 *
 * @param {string} str - The string to convert.
 * @returns {string} The converted string.
 *
 * @example
 * const result1 = sentenceCase('hello world');  // result will be 'Hello world'
 * const result2 = sentenceCase('HELLO WORLD');  // result will be 'Hello world'
 * const result3 = sentenceCase('hello-world');  // result will be 'Hello world'
 * const result4 = sentenceCase('helloWorld');   // result will be 'Hello world'
 */
export function sentenceCase(str: string): string {
  const words = getWords(str.trim());
  let result = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    if (i === 0) {
      result += word[0].toUpperCase() + word.slice(1).toLowerCase();
    } else {
      result += ' ' + word.toLowerCase();
    }
  }

  return result;
}
