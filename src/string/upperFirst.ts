/**
 * Converts the first character of string to upper case.
 *
 * @param {string} str - The string that is to be changed
 * @returns {string} - The converted string.
 *
 * @example
 * const convertedStr1 = upperCase('fred') // returns 'fred'
 * const convertedStr2 = upperCase('Fred') // returns 'Fred'
 * const convertedStr3 = upperCase('FRED') // returns 'FRED'
 */
export function upperFirst(str: string): string {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}
