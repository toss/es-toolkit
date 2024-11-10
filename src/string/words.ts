/**
 * Regular expression to match ASCII words and Unicode characters,
 * while ensuring punctuation marks (e.g., commas, spaces) are treated as separators.
 * This pattern matches sequences of alphanumeric ASCII characters,
 * non-ASCII Unicode characters (e.g., emojis), and punctuation marks.
 */
const reUnicodeWord = /[a-zA-Z0-9]+|[^\u0000-\u007F]+/g;

/**
 * Splits `string` into an array of its words, treating spaces and punctuation marks as separators.
 *
 * @param {string} str The string to inspect.
 * @param {RegExp | string} [pattern] The pattern to match words.
 * @returns {string[]} Returns the words of `string`.
 *
 * @example
 * words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 */
export function words(str = '', pattern?: RegExp | string): string[] {
  if (pattern instanceof RegExp) {
    return Array.from(str.match(pattern) ?? []);
  }

  return Array.from(str.match(reUnicodeWord) ?? []).filter(word => word.trim().length > 0);
}
