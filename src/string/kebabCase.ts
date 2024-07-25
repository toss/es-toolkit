import { CaseSplit, getWords } from './_internal/getWords.ts';

/**
 * Converts a string to kebab case.
 *
 * Kebab case is the naming convention in which each word is written in lowercase and separated by a dash (-) character.
 *
 * @template T - Literal type of the string.
 * @param {T} str - The string that is to be changed to kebab case.
 * @returns {KebabCase<T>} - The converted string to kebab case.
 *
 * @example
 * const convertedStr1 = kebabCase('camelCase') // returns 'camel-case'
 * const convertedStr2 = kebabCase('some whitespace') // returns 'some-whitespace'
 * const convertedStr3 = kebabCase('hyphen-text') // returns 'hyphen-text'
 * const convertedStr4 = kebabCase('HTTPRequest') // returns 'http-request'
 */

export const kebabCase = <T extends string>(str: T): KebabCase<T> => {
  const words = getWords(str);
  return words.map(word => word.toLowerCase()).join('-') as KebabCase<T>;
};

type KebabCase<T extends string, S extends string = ''> =
  string[] extends CaseSplit<T>
    ? string
    : CaseSplit<T> extends [infer F, ...infer R]
      ? F extends string
        ? R extends string[]
          ? `${Lowercase<F>}${LowerCaseArray<R>}`
          : never
        : never
      : S;

type LowerCaseArray<T extends string[], S extends string = ''> = T extends [infer F, ...infer R]
  ? F extends string
    ? R extends string[]
      ? LowerCaseArray<R, `${S}-${Lowercase<F>}`>
      : never
    : never
  : S;
