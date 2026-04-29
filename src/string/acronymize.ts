import { words as getWords } from './words.ts';

/**
 * Converts a string to an acronym.
 *
 * An acronym is a word formed from the initial letters of a phrase, with each letter capitalized.
 *
 * @param {string} str - The string to be converted to an acronym.
 * @returns {string} - The acronymized version of the input string.
 *
 * @example
 * const acronym1 = acronymize('Portable Network Graphics'); // returns 'PNG'
 * const acronym2 = acronymize('HyperText Markup Language'); // returns 'HTML'
 * const acronym3 = acronymize('As Soon As Possible'); // returns 'ASAP'
 * const acronym4 = acronymize('Federal Bureau of Investigation'); // returns 'FBI'
 */

const INITIAL_LETTER_OR_NUMBER = /^[\p{L}\p{N}]/u;

export function acronymize(str: string): string {
  const words = getWords(str);
  return words
    .map(word => {
      const [initial = ''] = Array.from(word);
      return INITIAL_LETTER_OR_NUMBER.test(initial) ? initial.toUpperCase() : '';
    })
    .join('');
}
