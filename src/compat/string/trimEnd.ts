/**
 * Removes trailing whitespace or specified characters from a string.
 *
 * @param string - The string to trim.
 * @param chars - The characters to trim from the end of the string.
 * @returns Returns the trimmed string.
 *
 * @example
 * trimEnd('  abc  ');
 * // => '  abc'
 *
 * trimEnd('-_-abc-_-', '_-');
 * // => '-_-abc'
 */
export function trimEnd(string?: string, chars?: string): string;

/**
 * Removes trailing whitespace or specified characters from a string.
 *
 * @param string - The string to trim.
 * @param index - The index parameter (used with guard).
 * @param guard - Enables use as an iteratee for methods like `map`.
 * @returns Returns the trimmed string.
 *
 * @example
 * trimEnd('  abc  ', 0, {});
 * // => '  abc'
 */
export function trimEnd(string: string, index: string | number, guard: object): string;

/**
 * Removes trailing whitespace or specified characters from a string.
 *
 * @param str - The string from which trailing characters will be trimmed.
 * @param chars - The character(s) to remove from the end of the string.
 * @param guard - Enables use as an iteratee for methods like `map`.
 * @returns Returns the trimmed string.
 *
 * @example
 * trimEnd('  abc  ');
 * // => '  abc'
 *
 * trimEnd('-_-abc-_-', '_-');
 * // => '-_-abc'
 */
export function trimEnd(str?: string, chars?: string | number, guard?: object): string {
  if (str == null) {
    return '';
  }

  if (guard != null || chars == null) {
    return trimEndImpl(str.toString());
  }

  return trimEndImpl(str.toString(), chars.toString().split(''));
}

// A copy of `trimEnd` from `es-toolkit/string` that does not rely on `String.prototype.trimEnd`,
// which is not available on ES2015 engines. `\s` matches the same characters as the native method.
function trimEndImpl(str: string, chars?: string[]): string {
  let endIndex = str.length;

  if (chars === undefined) {
    while (endIndex > 0 && /\s/.test(str[endIndex - 1])) {
      endIndex--;
    }
  } else {
    while (endIndex > 0 && chars.includes(str[endIndex - 1])) {
      endIndex--;
    }
  }

  return str.substring(0, endIndex);
}
