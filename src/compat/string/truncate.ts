import { isObject } from '../predicate/isObject.ts';

type TruncateOptions = {
  length?: number;
  separator?: string | RegExp;
  omission?: string;
};

/**
 * Used to compose unicode character classes.
 * @link https://github.com/lodash/lodash/blob/4.17.21-es/_hasUnicode.js
 *
 * Used to detect strings with zero-width joiners or code points from the astral planes.
 * @link http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/
 */
// eslint-disable-next-line no-misleading-character-class
const regexMultiByte = /[\u200d\ud800-\udfff\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\ufe0e\ufe0f]/;

/**
 * This regex might more completely detect unicode, but it is slower and this project
 * desires to mimic the behavior of lodash.
 */
// const regexMultiByte = /[^\x00-\x7F]/;

/**
 * Truncates `string` if it's longer than the given maximum string length.
 * The last characters of the truncated string are replaced with the omission
 * string which defaults to "...".
 *
 * @param {string} [string=''] The string to truncate.
 * @param {Object} [options={}] The options object.
 * @param {number} [options.length=30] The maximum string length.
 * @param {string} [options.omission='...'] The string to indicate text is omitted.
 * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
 *
 * @example
 * const test = 'hi-diddly-ho there, neighborino';
 * const truncatedStr1 = truncate(test) // returns 'hi-diddly-ho there, neighbo...'
 * const truncatedStr2 = truncate(test, { length: 24, separator: ' ' }) // returns 'hi-diddly-ho there,...'
 * const truncatedStr3 = truncate(test, { length: 24, separator: /,? +/ }) // returns 'hi-diddly-ho there...'
 * const truncatedStr4 = truncate(test, { omission: ' [...]' }) // returns 'hi-diddly-ho there, neig [...]'
 * const truncatedStr5 = truncate('ABC', { length: 3 }) // returns 'ABC'
 * const truncatedStr6 = truncate('ABC', { length: 2 }) // returns '...'
 * const truncatedStr7 = truncate('¥§✈✉🤓', { length: 5 }) // returns '¥§✈✉🤓'
 * const truncatedStr8 = truncate('¥§✈✉🤓', { length: 4, omission: '…' }) // returns '¥§✈…'
 */
export function truncate(string: string, options: TruncateOptions = {}): string {
  string = string != null ? `${string}` : '';

  let length = 30;
  let omission = '...';

  if (isObject(options)) {
    length = parseLength(options.length);
    omission = 'omission' in options ? `${options.omission}` : '...';
  }

  let i = string.length;

  // Unicode length of omission string
  const lengthOmission = Array.from(omission).length;
  // Unicode length of the string if it is truncated
  const lengthBase = Math.max(length - lengthOmission, 0);

  let strArray: string[] | undefined = undefined;
  const unicode = regexMultiByte.test(string);
  if (unicode) {
    strArray = Array.from(string);
    i = strArray.length;
  }

  // Return input string as it satisfies truncation length
  if (length >= i) {
    return string;
  }

  // Return omission string since the input string will be truncated and is shorter than the omission string
  if (i <= lengthOmission) {
    return omission;
  }

  // Use string.slice for non-unicode strings for performance
  let base = strArray === undefined ? string.slice(0, lengthBase) : strArray?.slice(0, lengthBase).join('');

  // Return truncated string with omission appended when there is no separator to check for
  const separator = options.separator;
  if (!separator) {
    base += omission;
    return base;
  }

  // Further truncate the string to the last separator using unicode regex
  const search = separator instanceof RegExp ? separator.source : separator;
  const flags = 'u' + (separator instanceof RegExp ? separator.flags.replace('u', '') : '');
  const withoutSeparator = new RegExp(`(?<result>.*(?:(?!${search}).))(?:${search})`, flags).exec(base);

  // Return the final truncated string with the omission string appended
  return (!withoutSeparator?.groups ? base : withoutSeparator.groups.result) + omission;
}

function parseLength(length: number | undefined) {
  if (length == null) {
    return 30;
  }

  if (length <= 0) {
    return 0;
  }

  return length;
}
