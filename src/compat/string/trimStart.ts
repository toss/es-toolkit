import { trimStart as trimStartToolkit } from '../../string/trimStart.ts';

/**
 * Removes leading whitespace or specified characters from a string.
 *
 * @param {string} str - The string from which leading characters will be trimmed.
 * @param {string | string[]} chars - The character(s) to remove from the end of the string. Defaults to `" "`.
 * @returns {string} - The resulting string after the specified leading character has been removed.
 *
 * @example
 * const trimmedStr1 = ltrim('---hello', '-') // returns 'hello'
 * const trimmedStr2 = ltrim('000123', '0') // returns '123'
 * const trimmedStr3 = ltrim('abcabcabc', 'a') // returns 'bcabcabc'
 * const trimmedStr4 = ltrim('xxxtrimmed', 'x') // returns 'trimmed'
 */
export function trimStart(str: string, chars?: string | string[], guard?: unknown): string {
  if (str == null) {
    return '';
  }

  if (guard != null || chars == null) {
    return str.toString().trimStart();
  }

  switch (typeof chars) {
    case 'string': {
      return trimStartToolkit(str, chars.toString().split(''));
    }
    case 'object': {
      if (Array.isArray(chars)) {
        return trimStartToolkit(
          str,
          chars.map(x => x.toString())
        );
      } else {
        return trimStartToolkit(str, (chars as any).toString().split(''));
      }
    }
  }
}
