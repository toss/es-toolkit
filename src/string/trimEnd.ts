/**
 * Removes trailing whitespace or specified characters from a string.
 *
 * If `chars` is a string, it should be a single character. To trim a string with multiple characters,
 * provide an array instead.
 *
 * @param {string} str - The string from which trailing characters will be trimmed.
 * @param {string | string[]} chars - The character(s) to remove from the end of the string.
 * @returns {string} - The resulting string after the specified trailing character has been removed.
 *
 * @example
 * const trimmedStr1 = trimEnd('hello---', '-') // returns 'hello'
 * const trimmedStr2 = trimEnd('123000', '0') // returns '123'
 * const trimmedStr3 = trimEnd('abcabcabc', 'c') // returns 'abcabcab'
 * const trimmedStr4 = trimEnd('trimmedxxx', 'x') // returns 'trimmed'
 */
export function trimEnd(str: string, chars?: string | string[]): string {
  if (chars === undefined) {
    return str.trimEnd();
  }

  let endIndex = str.length;

  switch (typeof chars) {
    case 'string': {
      if (chars.length !== 1) {
        throw new Error(`The 'chars' parameter should be a single character string.`);
      }

      while (endIndex > 0 && str[endIndex - 1] === chars) {
        endIndex--;
      }
      break;
    }
    case 'object': {
      while (endIndex > 0 && chars.includes(str[endIndex - 1])) {
        endIndex--;
      }
    }
  }

  return str.substring(0, endIndex);
}
