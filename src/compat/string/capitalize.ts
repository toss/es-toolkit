import { toString } from '../util/toString.ts';

/**
 * Converts the first character of string to upper case and the remaining to lower case.
 *
 * @param string - The string to capitalize.
 * @returns The capitalized string.
 *
 * @example
 * const convertedStr1 = capitalize('fred') // returns 'Fred'
 * const convertedStr2 = capitalize('FRED') // returns 'Fred'
 * const convertedStr3 = capitalize('') // returns ''
 */
export function capitalize<T extends string>(str?: T): string extends T ? string : Capitalize<Lowercase<T>> {
  const lowercased = toString(str).toLowerCase();
  const characters = Array.from(lowercased);

  return (characters.length === 0 ? '' : characters[0].toUpperCase() + characters.slice(1).join('')) as string extends T
    ? string
    : Capitalize<Lowercase<T>>;
}
