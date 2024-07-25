import { CaseSplit, getWords } from './_internal/getWords.ts';
import { Capitalize } from './capitalize.ts';

/**
 * Converts the first character of each word in a string to uppercase and the remaining characters to lowercase.
 *
 * Start case is the naming convention in which each word is written with an initial capital letter.
 * @template T - Literal type of the string.
 * @param {T} str - The string to convert.
 * @returns {StartCase<T>} The converted string.
 *
 * @example
 * const result1 = startCase('hello world');  // result will be 'Hello World'
 * const result2 = startCase('HELLO WORLD');  // result will be 'HELLO WORLD'
 * const result3 = startCase('hello-world');  // result will be 'Hello World'
 * const result4 = startCase('hello_world');  // result will be 'Hello World'
 */
export function startCase<T extends string>(str: T): StartCase<T> {
  const words = getWords(str.trim());
  let result = '';
  for (const word of words) {
    if (result) {
      result += ' ';
    }
    if (word === word.toUpperCase()) {
      result += word;
    } else {
      result += word[0].toUpperCase() + word.slice(1).toLowerCase();
    }
  }
  return result as StartCase<T>;
}

type StartCase<T extends string, S extends string = ''> =
  string[] extends CaseSplit<T>
    ? string
    : CaseSplit<T> extends [infer F, ...infer R]
      ? F extends string
        ? R extends string[]
          ? F extends Uppercase<F>
            ? `${F}${StartCaseArray<R>}`
            : `${Capitalize<F>}${StartCaseArray<R>}`
          : never
        : never
      : S;

type StartCaseArray<T extends string[], S extends string = ''> = T extends [infer F, ...infer R]
  ? F extends string
    ? R extends string[]
      ? F extends Uppercase<F>
        ? StartCaseArray<R, `${S} ${F}`>
        : StartCaseArray<R, `${S} ${Capitalize<F>}`>
      : never
    : never
  : S;
