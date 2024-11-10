/**
 * Regular expression to match ASCII words and Unicode characters.
 * This pattern matches sequences of alphanumeric ASCII characters
 * as well as non-ASCII Unicode characters (e.g., emojis).
 */
const reUnicodeWord = /[a-zA-Z0-9]+|[^\u0000-\u007F]+/g;

/**
 * Splits `string` into an array of its words.
 *
 * @param {string} str The string to inspect.
 * @param {RegExp | string} [pattern] The pattern to match words.
 * @returns {string[]} Returns the words of `string`.
 *
 * @example
 * words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * words('camelCaseHTTPRequest🚀');
 * // => ['camel', 'Case', 'HTTP', 'Request', '🚀']
 */
export function words(str = '', pattern?: RegExp | string): string[] {
  if (pattern instanceof RegExp) {
    return Array.from(str.match(pattern) ?? []);
  }

  return Array.from(str.match(reUnicodeWord) ?? []);
}
