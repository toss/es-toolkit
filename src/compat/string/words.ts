import { CASE_SPLIT_PATTERN } from '../../string/words.ts';
import { toString } from '../util/toString.ts';

/**
 * Splits `string` into an array of its words.
 *
 * @param {string | object} str - The string or object that is to be split into words.
 * @param {RegExp | string} [pattern] - The pattern to match words.
 * @returns {string[]} - Returns the words of `string`.
 *
 * @example
 * const wordsArray1 = words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 */
export function words(str?: string | object, pattern: RegExp | string = CASE_SPLIT_PATTERN, guard?: unknown): string[] {
  const input = toString(str);
  pattern = guard ? CASE_SPLIT_PATTERN : pattern;
  const words = Array.from(input.match(pattern) ?? []);

  return words.filter(x => x !== '');
}
