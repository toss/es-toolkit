import { regexUnicode } from './regexUnicode.ts';

/**
 * Splits a Unicode `string` into an array of its visible symbols (grapheme clusters).
 *
 * Ported from lodash to preserve identical behavior.
 * @link https://github.com/lodash/lodash/blob/4.17.21-es/_unicodeToArray.js
 */
export function unicodeToArray(str: string, limit?: number): string[] {
  if (limit === undefined) {
    return str.match(regexUnicode) || [];
  }

  // Stop after `limit` symbols, so a caller that only needs the start of a long string does not split all of it
  const result: string[] = [];
  regexUnicode.lastIndex = 0;

  let match: RegExpExecArray | null;
  while (result.length < limit && (match = regexUnicode.exec(str)) !== null) {
    result.push(match[0]);
  }

  return result;
}
