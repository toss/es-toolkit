/**
 * Regular expression pattern to split strings into words for various case conversions
 *
 * This pattern matchs sequences of characters in a string, considering the following case:
 * - Sequences of two or more uppercase letters followed by an uppercase letter and lowercase letters or digits (for acronyms)
 * - Sequences of one uppercase letter optionally followed by lowercase letters and digits
 * - Single uppercase letters
 * - Sequences of digis
 *
 * The resulting match can be used to convert camelCase, snake_case, kebab-case, and other mixed formats into
 * a consistent format like snake case.
 *
 * @example
 * const matches = 'camelCaseHTTPRequest'.match(CASE_SPLIT_PATTERN);
 * // matchs: ['camel', 'Case', 'HTTP', 'Request']
 */
const CASE_SPLIT_PATTERN = /[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g;

export function getWords(str: string): string[] {
  return Array.from(str.match(CASE_SPLIT_PATTERN) ?? []);
}
