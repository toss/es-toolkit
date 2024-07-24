import { CaseSplit, getWords } from './_internal/getWords.ts';

/**
 * Converts a string to lower case.
 *
 * Lower case is the naming convention in which each word is written in lowercase and separated by an space ( ) character.
 *
 * @template T - Literal type of the string.
 * @param {T} str - The string that is to be changed to lower case.
 * @returns {LowerCase<T>} - The converted string to lower case.
 *
 * @example
 * const convertedStr1 = lowerCase('camelCase') // returns 'camel case'
 * const convertedStr2 = lowerCase('some whitespace') // returns 'some whitespace'
 * const convertedStr3 = lowerCase('hyphen-text') // returns 'hyphen text'
 * const convertedStr4 = lowerCase('HTTPRequest') // returns 'http request'
 */
export const lowerCase = <T extends string>(str: T): LowerCase<T> => {
  const words = getWords(str) as string[];
  return words.map(word => word.toLowerCase()).join(' ') as LowerCase<T>;
};

type LowerCase<T extends string, S extends string = ''> =
  CaseSplit<T> extends [infer F, ...infer R]
    ? F extends string
      ? R extends string[]
        ? `${Lowercase<F>}${LowerCaseArray<R>}`
        : never
      : never
    : S;

type LowerCaseArray<T extends string[], S extends string = ''> = T extends [infer F, ...infer R]
  ? F extends string
    ? R extends string[]
      ? LowerCaseArray<R, `${S} ${Lowercase<F>}`>
      : never
    : never
  : S;
