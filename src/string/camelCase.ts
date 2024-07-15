import { capitalize } from "./capitalize.ts";
import { getWords } from "./_internal/getWords.ts";

/**
 * Converts a string to camel case.
 *
 * camel case is the naming convention in which each word is written in lowercase and separated by an underscore (_) character.
 *
 * @param {string} str - The string that is to be changed to camel case.
 * @returns {string} - The converted string to camel case.
 *
 * @example
 * const convertedStr1 = camelCase('camelCase') // returns 'camelCase'
 * const convertedStr2 = camelCase('some whitespace') // returns 'someWhitespace'
 * const convertedStr3 = camelCase('hyphen-text') // returns 'hyphenText'
 * const convertedStr4 = camelCase('HTTPRequest') // returns 'httpRequest'
 */

export function camelCase(str: string): string {
  const words = getWords(str);

  if (words.length === 0) {
    return "";
  }

  const [first, ...rest] = words;

  return `${first.toLowerCase()}${rest.map((word) => capitalize(word)).join("")
    }`;
}
