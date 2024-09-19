import { trim as trimToolkit } from '../../string/trim.ts';

/**
 * Removes leading and trailing whitespace or specified characters from a string.
 *
 * @param {string} str - The string from which leading and trailing characters will be trimmed.
 * @param {string | string[]} chars - The character(s) to remove from the end of the string. Defaults to `" "`.
 * @returns {string} - The resulting string after the specified leading and trailing characters have been removed.
 *
 * @example
 * trim("  hello  "); // "hello"
 * trim("--hello--", "-"); // "hello"
 * trim("##hello##", ["#", "o"]); // "hell"
 */
export function trim(str: string, chars?: string | string[], guard?: unknown): string {
  if (str == null) {
    return '';
  }

  if (guard != null || chars == null) {
    return str.toString().trim();
  }

  switch (typeof chars) {
    case 'string': {
      return trimToolkit(str, chars.toString().split(''));
    }
    case 'object': {
      if (Array.isArray(chars)) {
        return trimToolkit(
          str,
          chars.map(x => x.toString())
        );
      } else {
        return trimToolkit(str, (chars as any).toString().split(''));
      }
    }
  }
}
