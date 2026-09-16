import { baseToString } from '../_internal/baseToString.ts';
import { toInteger } from '../util/toInteger.ts';
import { toString } from '../util/toString.ts';

/**
 * Checks if a string contains another string at the beginning of the string.
 *
 * Checks if one string startsWith another string. Optional position parameter to start searching from a certain index.
 *
 * @param str - The string that might contain the target string.
 * @param target - The string to search for.
 * @param position - An optional offset to start searching in the str string
 * @returns True if the str string starts with the target string.
 *
 * @example
 * const isPrefix = startsWith('fooBar', 'foo') // returns true
 * const isPrefix = startsWith('fooBar', 'bar') // returns false
 * const isPrefix = startsWith('fooBar', 'abc') // returns false
 * const isPrefix = startsWith('fooBar', 'Bar', 2) // returns true
 * const isPrefix = startsWith('fooBar', 'Bar', 5) // returns false
 */
export function startsWith(str?: string, target?: string, position?: number): boolean {
  const string = toString(str);
  const search = baseToString(target);
  const index = position == null ? 0 : Math.min(Math.max(toInteger(position), 0), string.length);

  return string.startsWith(search, index);
}
