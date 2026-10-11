import { lowerFirst as lowerFirstToolkit } from '../../string/lowerFirst.ts';
import { toString } from '../util/toString.ts';

/**
 * Converts the first character of string to lower case.
 *
 * @param str - The string that is to be changed
 * @returns The converted string.
 *
 * @example
 * const convertedStr1 = lowerFirst('fred') // returns 'fred'
 * const convertedStr2 = lowerFirst('Fred') // returns 'fred'
 * const convertedStr3 = lowerFirst('FRED') // returns 'fRED'
 */
export function lowerFirst<T extends string = string>(str?: T): Uncapitalize<T> {
  return lowerFirstToolkit(toString(str)) as Uncapitalize<T>;
}
