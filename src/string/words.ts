/**
 * Regular expression pattern to split strings into words for various case conversions
 *
 * This pattern matches sequences of characters in a string, considering the following cases:
 * - Sequences of two or more uppercase letters followed by an uppercase letter and lowercase letters or digits (for acronyms)
 * - Sequences of one uppercase letter optionally followed by lowercase letters and digits
 * - Single uppercase letters
 * - Sequences of digits
 * - Emojis and other Unicode characters
 *
 * The resulting match can be used to convert camelCase, snake_case, kebab-case, and other mixed formats into
 * a consistent format like snake case. It also supports emojis and other Unicode characters.
 *
 * @example
 * const matches = 'camelCaseHTTPRequest🚀'.match(CASE_SPLIT_PATTERN);
 * // matches: ['camel', 'Case', 'HTTP', 'Request', '🚀']
 */
export const CASE_SPLIT_PATTERN =
  /\p{Lu}?\p{Ll}+|[0-9]+|\p{Lu}+(?!\p{Ll})|\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{L}+/gu;

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
 *
 * words('camelCaseHTTPRequest🚀');
 * // => ['camel', 'Case', 'HTTP', 'Request', '🚀']
 *
 * words('Lunedì 18 Set')
 * // => ['Lunedì', '18', 'Set']
 */
export function words(str: string): string[] {
  return Array.from(str.match(CASE_SPLIT_PATTERN) ?? []);
}
