/**
 * Pads the start of a string with a given character until it reaches the specified length.
 * If the length is less than or equal to the original string's length, or if the padding character is an empty string,
 * the original string is returned unchanged.
 *
 * @template T - The type of the input string.
 * @param {T} str - The string to pad.
 * @param {number} [length=0] - The length of the resulting string once padded. Default is 0.
 * @param {string} [chars=' '] - The character(s) to use for padding. Default is a single space.
 * @returns {string} - The padded string, or the original string if padding is not required.
 *
 * @example
 * const result1 = padStart('abc', 6);          // result will be '   abc'
 * const result2 = padStart('abc', 6, '_-');    // result will be '_-_abc'
 * const result3 = padStart('abc', 3);          // result will be 'abc'
 * const result4 = padStart('abc', 2);          // result will be 'abc'
 */
export const padStart = <T extends string>(str: T, length = 0, chars = ' '): string => {
  if (Number.isSafeInteger(length) && length > str.length && chars.length > 0) {
    return str.padStart(length, chars);
  }
  return str;
};
