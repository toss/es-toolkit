import { regexMultiByte } from '../_internal/regexMultiByte.ts';
import { isObject } from '../predicate/isObject.ts';

type TruncateOptions = {
  length?: number;
  separator?: string | RegExp;
  omission?: string;
};

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
 * @param [string=''] The string to truncate.
 * @param [options={}] The options object.
 * @param [options.length=30] The maximum string length.
 * @param [options.omission='...'] The string to indicate text is omitted.
 * @param [options.separator] The separator pattern to truncate to.
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
export function truncate(string?: string, options?: TruncateOptions): string {
  string = string != null ? `${string}` : '';

  let length = 30;
  let omission = '...';

  if (isObject(options)) {
    length = 'length' in options ? parseLength(options.length) : 30;
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
  const separator = options?.separator;
  if (!separator) {
    base += omission;
    return base;
  }

  const separatorAtBoundary =
    separator instanceof RegExp
      ? string.slice(base.length).search(separator) === 0
      : string.indexOf(separator, base.length) === base.length;
  if (separatorAtBoundary) {
    return base + omission;
  }

  let lastSeparator = -1;
  if (typeof separator === 'string') {
    lastSeparator = base.lastIndexOf(separator);
  } else {
    const flags = separator.flags.includes('g') ? separator.flags : separator.flags + 'g';
    const pattern = new RegExp(separator.source, flags);
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(base)) !== null) {
      lastSeparator = match.index;
      if (match[0].length === 0) {
        const unicode = pattern.unicode || pattern.flags.includes('v');
        pattern.lastIndex = match.index + (unicode && (base.codePointAt(match.index) ?? 0) > 0xffff ? 2 : 1);
      }
    }
  }
  if (lastSeparator !== -1) {
    base = base.slice(0, lastSeparator);
  }

  // Return the final truncated string with the omission string appended
  return base + omission;
}

function parseLength(length: number | undefined) {
  if (length == null) {
    return 0;
  }

  if (length <= 0) {
    return 0;
  }

  return length;
}
