import { reUnicode } from './unicodeSize.ts';

/**
 * Splits a Unicode `string` into an array of its visible symbols (grapheme clusters).
 *
 * Ported from lodash to preserve identical behavior.
 * @link https://github.com/lodash/lodash/blob/4.17.21-es/_unicodeToArray.js
 */
export function unicodeToArray(str: string): string[] {
  return str.match(reUnicode) || [];
}
