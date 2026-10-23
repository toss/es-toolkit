import { unicodeWords } from '../_internal/words.ts';
import { toString } from '../util/toString.ts';

/**
 * Splits `string` into an array of its words.
 *
 * @param str - The string or object that is to be split into words.
 * @param [pattern] - The pattern to match words.
 * @returns Returns the words of `string`.
 *
 * @example
 * const wordsArray1 = words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 */
export function words(string?: string, pattern?: string | RegExp): string[];

/**
 * Splits `string` into an array of its words.
 *
 * @param str - The string or object that is to be split into words.
 * @param [pattern] - The pattern to match words.
 * @returns Returns the words of `string`.
 *
 * @example
 * const wordsArray1 = words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 */
export function words(string: string, index: string | number, guard: object): string[];

/**
 * Splits `string` into an array of its words.
 *
 * @param str - The string or object that is to be split into words.
 * @param [pattern] - The pattern to match words.
 * @returns Returns the words of `string`.
 *
 * @example
 * const wordsArray1 = words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 */
export function words(str?: string, pattern?: string | number | RegExp, guard?: object): string[] {
  const input = toString(str);

  if (guard || pattern === undefined) {
    return unicodeWords(input);
  }

  if (typeof pattern === 'number') {
    pattern = pattern.toString();
  }

  const matched = input.match(pattern);
  const words = matched == null ? [] : Array.from(matched);

  return words.filter(x => x !== '');
}
