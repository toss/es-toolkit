/**
 * Converts the first character of string to upper case and the remaining to lower case.
 *
 * @param {string} str - The string to be converted to uppercase.
 * @returns {string} - The capitalized string.
 *
 * @example
 * const result = capitalize('fred') // returns 'Fred'
 * const result2 = capitalize('FRED') // returns 'Fred'
 */

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
