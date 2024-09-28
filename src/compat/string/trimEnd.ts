import { trimEnd as trimEndToolkit } from '../../string/trimEnd.ts';

/**
 * Removes trailing whitespace or specified characters from a string.
 *
 * @param {string} str - The string from which trailing characters will be trimmed.
 * @param {string | string[]} chars - The character(s) to remove from the end of the string. Defaults to `" "`.
 * @returns {string} - The resulting string after the specified trailing character has been removed.
 *
 * @example
 * const trimmedStr1 = trimEnd('hello---', '-') // returns 'hello'
 * const trimmedStr2 = trimEnd('123000', '0') // returns '123'
 * const trimmedStr3 = trimEnd('abcabcabc', 'c') // returns 'abcabcab'
 * const trimmedStr4 = trimEnd('trimmedxxx', 'x') // returns 'trimmed'
 */
export function trimEnd(str: string, chars?: string | string[], guard?: unknown): string {
  if (str == null) {
    return '';
  }

  if (guard != null || chars == null) {
    return str.toString().trimEnd();
  }

  switch (typeof chars) {
    case 'string': {
      return trimEndToolkit(str, chars.toString().split(''));
    }
    case 'object': {
      if (Array.isArray(chars)) {
        return trimEndToolkit(
          str,
          chars.map(x => x.toString())
        );
      } else {
        return trimEndToolkit(str, (chars as any).toString().split(''));
      }
    }
  }
}
