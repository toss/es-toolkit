import { repeat } from './repeat.ts';
import { toString } from '../util/toString.ts';

/**
 * Pads the start of a string with a given character until it reaches the specified length.
 *
 * If the length is less than or equal to the original string's length, or if the padding character is an empty string,
 * the original string is returned unchanged.
 *
 * @param {string} str - The string to pad.
 * @param {number} [length] - The length of the resulting string once padded.
 * @param {string} [chars] - The character(s) to use for padding.
 * @returns {string} - The padded string, or the original string if padding is not required.
 *
 * @example
 * const result1 = padStart('abc', 6);          // result will be '   abc'
 * const result2 = padStart('abc', 6, '_-');    // result will be '_-_abc'
 * const result3 = padStart('abc', 3);          // result will be 'abc'
 * const result4 = padStart('abc', 2);          // result will be 'abc'
 */
export function padStart(str?: string, length = 0, chars = ' '): string {
  return padStartImpl(toString(str), length, chars);
}

function padStartImpl(str: string, _length: number, chars: string): string {
  const strLength = str.length;
  const maxLength = Math.floor(_length);

  if (maxLength <= strLength || chars === '') {
    return str;
  }

  const fillLength = maxLength - strLength;
  let filler = repeat(chars, Math.ceil(fillLength / chars.length));

  if (filler.length > fillLength) {
    filler = filler.slice(0, fillLength);
  }

  return filler + str;
}
