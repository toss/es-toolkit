/**
 * Removes leading whitespace or specified characters from a string.
 *
 * @param {string} str - The string from which leading characters will be trimmed.
 * @param {string | string[]} chars - The character(s) to remove from the end of the string.
 * @returns {string} - The resulting string after the specified leading character has been removed.
 *
 * @example
 * const trimmedStr1 = trimStart('---hello', '-') // returns 'hello'
 * const trimmedStr2 = trimStart('000123', '0') // returns '123'
 * const trimmedStr3 = trimStart('abcabcabc', 'a') // returns 'bcabcabc'
 * const trimmedStr4 = trimStart('xxxtrimmed', 'x') // returns 'trimmed'
 */
export function trimStart(str: string, chars?: string | string[]): string {
  if (chars === undefined) {
    return str.trimStart();
  }
  let startIndex = 0;

  switch (typeof chars) {
    case 'string': {
      while (startIndex < str.length && str[startIndex] === chars) {
        startIndex++;
      }
      break;
    }
    case 'object': {
      while (startIndex < str.length && chars.includes(str[startIndex])) {
        startIndex++;
      }
    }
  }

  return str.substring(startIndex);
}
