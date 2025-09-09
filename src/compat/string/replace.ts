import { toString } from '../util/toString.ts';

type ReplaceFunction = (match: string, ...args: any[]) => string;

export function replace(string: string, pattern: RegExp | string, replacement: ReplaceFunction | string): string;
export function replace(pattern: RegExp | string, replacement: ReplaceFunction | string): string;

/**
 * Replaces the matched pattern with the replacement string.
 *
 * @param {} target - The target string.
 * @param {} pattern - The pattern to match.
 * @param {} replacement - The replacement string or a function that returns the replacement string.
 * @returns {string} The new string with the matched pattern replaced.
 *
 * @example
 * replace('abcde', 'de', '123'); // 'abc123'
 * replace('abcde', /[bd]/g, '-'); // 'a-c-e'
 * replace('abcde', 'de', substring => substring.toUpperCase()); // 'abcDE'
 * replace('abcde', /[bd]/g, substring => substring.toUpperCase()); // 'aBcDe'
 */
export function replace(
  target: string | RegExp,
  pattern: RegExp | string | ReplaceFunction,
  replacement?: ReplaceFunction | string
): string {
  if (arguments.length < 3) {
    return toString(target);
  }

  return toString(target).replace(pattern as any, replacement as any);
}
