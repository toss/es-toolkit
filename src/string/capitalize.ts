/**
 * Converts the first character of string to upper case and the remaining to lower case.
 *
 * @param {string} str - The string to be converted to uppercase.
 * @returns {Capitalize<string>} - The capitalized string.
 *
 * @example
 * const result = capitalize('fred') // returns 'Fred'
 * const result2 = capitalize('FRED') // returns 'Fred'
 */

export const capitalize = (str: string): Capitalize<string> => {
  return (str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()) as Capitalize<string>;
};
