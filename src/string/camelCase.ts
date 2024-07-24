import { capitalize } from './capitalize.ts';
import { CaseSplit, getWords } from './_internal/getWords.ts';
import { Capitalize } from './capitalize.ts';

/**
 * Converts a string to camel case.
 *
 * camel case is the naming convention in which each word is written in lowercase and separated by an underscore (_) character.
 *
 * @template T - Literal type of the string.
 * @param {T} str - The string that is to be changed to camel case.
 * @returns {CamelCase<T>} - The converted string to camel case.
 *
 * @example
 * const convertedStr1 = camelCase('camelCase') // returns 'camelCase'
 * const convertedStr2 = camelCase('some whitespace') // returns 'someWhitespace'
 * const convertedStr3 = camelCase('hyphen-text') // returns 'hyphenText'
 * const convertedStr4 = camelCase('HTTPRequest') // returns 'httpRequest'
 */

export function camelCase<T extends string>(str: T): CamelCase<T> {
  const words = getWords(str) as string[];

  if (words.length === 0) {
    return '' as CamelCase<T>;
  }

  const [first, ...rest] = words;

  return `${first.toLowerCase()}${rest.map(word => capitalize(word)).join('')}` as CamelCase<T>;
}

type CamelCase<T extends string> =
  CaseSplit<T> extends [infer F, ...infer R]
    ? F extends string
      ? R extends string[]
        ? `${Lowercase<F>}${CapitalizeArray<R>}`
        : never
      : never
    : '';

type CapitalizeArray<T extends string[], S extends string = ''> = T extends [infer F, ...infer R]
  ? F extends string
    ? R extends string[]
      ? CapitalizeArray<R, `${S}${Capitalize<F>}`>
      : never
    : never
  : S;
