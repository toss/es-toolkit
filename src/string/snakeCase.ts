import { CASE_SPLIT_PATTERN } from '../constants';

/**
 * Converts a string to snake case.
 *
 * Snake case is the naming convention in which each word is written in lowercase and separated by an underscore (_) character.
 *
 * @param {string} str - The string that is to be changed to snake case.
 * @returns {string} - The converted string to snake case.
 *
 * @example
 * const convertedStr1 = snakeCase('camelCase') // returns 'camel_case'
 * const convertedStr2 = snakeCase('some whitespace') // returns 'some_whitespace'
 * const convertedStr3 = snakeCase('hyphen-text') // returns 'hyphen_text'
 * const convertedStr4 = snakeCase('HTTPRequest') // returns 'http_request'
 */

export const snakeCase = (str: string): string => {
  const splitWords = str.match(CASE_SPLIT_PATTERN) || [];

  if (splitWords.length === 0) {
    return '';
  }

  let result = splitWords[0]!.toLowerCase();
  for (let i = 1; i < splitWords.length; i++) {
    result += '_' + splitWords[i].toLowerCase();
  }

  return result;
};
