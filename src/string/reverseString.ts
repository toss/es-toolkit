/**
 * Reverses a given string.
 *
 * This function takes a string as input and returns a new string that is the reverse of the input.
 *
 * @param {string} value - The string that is to be reversed.
 * @returns {string} - The reversed string.
 *
 * @example
 * const reversedStr1 = reverseString('hello') // returns 'olleh'
 * const reversedStr2 = reverseString('PascalCase') // returns 'esaClaP'
 * const reversedStr3 = reverseString('foo 😄 bar') // returns 'rab 😄 oof'
 */
export function reverseString(value: string): string {
  return [...value].reverse().join('');
}
