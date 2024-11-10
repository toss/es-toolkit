import { words as wordsToolkit } from '../../string/words.ts';
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
 * const wordsArray2 = words('camelCaseHTTPRequest🚀');
 * // => ['camel', 'Case', 'HTTP', 'Request', '🚀']
 *
 * const wordsArray3 = words('hyphen-text');
 * // => ['hyphen', 'text']
 */
export function words(str?: string | object, pattern?: RegExp | string): string[] {
  const input = toString(str);

  return wordsToolkit(input, pattern);
}
