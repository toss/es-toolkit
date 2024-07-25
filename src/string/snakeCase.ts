import { CaseSplit, getWords } from './_internal/getWords.ts';

/**
 * Converts a string to snake case.
 *
 * Snake case is the naming convention in which each word is written in lowercase and separated by an underscore (_) character.
 *
 * @template T - Literal type of the string.
 * @param {T} str - The string that is to be changed to snake case.
 * @returns {SnakeCase<T>} - The converted string to snake case.
 *
 * @example
 * const convertedStr1 = snakeCase('camelCase') // returns 'camel_case'
 * const convertedStr2 = snakeCase('some whitespace') // returns 'some_whitespace'
 * const convertedStr3 = snakeCase('hyphen-text') // returns 'hyphen_text'
 * const convertedStr4 = snakeCase('HTTPRequest') // returns 'http_request'
 */

export const snakeCase = <T extends string>(str: T): SnakeCase<T> => {
  const words = getWords(str);
  return words.map(word => word.toLowerCase()).join('_') as SnakeCase<T>;
};

type SnakeCase<T extends string, S extends string = ''> =
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
      ? LowerCaseArray<R, `${S}_${Lowercase<F>}`>
      : never
    : never
  : S;
