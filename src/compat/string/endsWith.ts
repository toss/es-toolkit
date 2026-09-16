import { baseToString } from '../_internal/baseToString.ts';
import { toInteger } from '../util/toInteger.ts';
import { toString } from '../util/toString.ts';

/**
 * Checks if a string contains another string at the end of the string.
 *
 * Checks if one string endsWith another string. Optional position parameter to offset searching before a certain index.
 *
 * @param str - The string that might contain the target string.
 * @param target - The string to search for.
 * @param position - An optional position from the start to search up to this index
 * @returns True if the str string ends with the target string.
 *
 * @example
 * const isPrefix = endsWith('fooBar', 'foo') // returns true
 * const isPrefix = endsWith('fooBar', 'bar') // returns false
 * const isPrefix = endsWith('fooBar', 'abc') // returns false
 * const isPrefix = endsWith('fooBar', 'foo', 3) // returns true
 * const isPrefix = endsWith('fooBar', 'abc', 5) // returns false
 */
export function endsWith(str?: string, target?: string, position?: number): boolean {
  const string = toString(str);
  const search = baseToString(target);
  const length = string.length;
  const end = position === undefined ? length : Math.min(Math.max(toInteger(position), 0), length);

  return string.endsWith(search, end);
}
