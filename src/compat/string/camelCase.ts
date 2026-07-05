import { deburr } from './deburr.ts';
import { words } from './words.ts';
import { capitalize } from '../../string/capitalize.ts';
import { normalizeForCase } from '../_internal/normalizeForCase.ts';

/**
 * Converts a string to camel case.
 *
 * Camel case is the naming convention in which the first word is written in lowercase and
 * each subsequent word begins with a capital letter, concatenated without any separator characters.
 *
 * @param str - The string that is to be changed to camel case.
 * @returns The converted string to camel case.
 *
 * @example
 * const convertedStr1 = camelCase('camelCase') // returns 'camelCase'
 * const convertedStr2 = camelCase('some whitespace') // returns 'someWhitespace'
 * const convertedStr3 = camelCase('hyphen-text') // returns 'hyphenText'
 * const convertedStr4 = camelCase('HTTPRequest') // returns 'httpRequest'
 */

export function camelCase(str?: string): string {
  const splitWords = words(normalizeForCase(deburr(str)));

  if (splitWords.length === 0) {
    return '';
  }

  const [first, ...rest] = splitWords;

  return `${first.toLowerCase()}${rest.map(word => capitalize(word)).join('')}`;
}
