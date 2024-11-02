import { toString } from '../util/toString.ts';

/**
 * Replaces the matched pattern with the replacement string.
 *
 * @param {string} target - The target string.
 * @param {string | RegExp} pattern - The pattern to match.
 * @param {string | ((substring: string, ...args: any[]) => string)} replacement - The replacement string or a function that returns the replacement string.
 * @returns {string} The new string with the matched pattern replaced.
 *
 * @example
 * replace('abcde', 'de', '123'); // 'abc123'
 * replace('abcde', /[bd]/g, '-'); // 'a-c-e'
 * replace('abcde', 'de', substring => substring.toUpperCase()); // 'abcDE'
 * replace('abcde', /[bd]/g, substring => substring.toUpperCase()); // 'aBcDe'
 */
export function replace(
  target = '',
  pattern: string | RegExp,
  replacement: string | ((substring: string, ...args: any[]) => string)
): string {
  if (arguments.length < 3) {
    return toString(target);
  }

  return toString(target).replace(pattern, replacement as any);
}
