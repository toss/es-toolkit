import { deburr as deburrToolkit } from '../../string/deburr.ts';
import { toString } from '../util/toString.ts';

/**
 * Basic Latin equivalents of the Latin-1 Supplement and Latin Extended-A letters (U+00C0 to U+017F),
 * indexed by `charCode - 0xc0`. The `×` (U+00D7) and `÷` (U+00F7) operators are mapped to themselves.
 */
const deburredLetters: string[] = [];

for (let code = 0xc0; code <= 0x17f; code++) {
  deburredLetters.push(deburrToolkit(String.fromCharCode(code)));
}

/**
 * Converts a string by replacing special characters and diacritical marks with their ASCII equivalents.
 * For example, "Crème brûlée" becomes "Creme brulee".
 *
 * Like Lodash, only Latin-1 Supplement and Latin Extended-A letters are converted and combining
 * diacritical marks are removed. Other characters, such as Hangul, Cyrillic, or Greek letters, are kept as they are.
 *
 * @param str - The input string to be deburred.
 * @returns The deburred string with special characters replaced by their ASCII equivalents.
 *
 * @example
 * // Basic usage:
 * deburr('Æthelred') // returns 'Aethelred'
 *
 * @example
 * // Handling diacritical marks:
 * deburr('München') // returns 'Munchen'
 *
 * @example
 * // Special characters:
 * deburr('Crème brûlée') // returns 'Creme brulee'
 *
 * @example
 * // Letters outside the Latin-1 Supplement and Latin Extended-A blocks are kept:
 * deburr('한국어') // returns '한국어'
 * deburr('йогурт') // returns 'йогурт'
 */
export function deburr(str?: string): string {
  str = toString(str);

  let index = 0;

  // Characters below U+00C0 are never changed, so a string made only of them is returned as is.
  while (index < str.length && str.charCodeAt(index) < 0xc0) {
    index++;
  }

  if (index === str.length) {
    return str;
  }

  let result = str.slice(0, index);

  for (; index < str.length; index++) {
    const code = str.charCodeAt(index);

    if (code >= 0xc0 && code <= 0x17f) {
      result += deburredLetters[code - 0xc0];
      continue;
    }

    // Combining diacritical marks, combining marks for symbols, and combining half marks are removed.
    if ((code >= 0x300 && code <= 0x36f) || (code >= 0x20d0 && code <= 0x20ff) || (code >= 0xfe20 && code <= 0xfe2f)) {
      continue;
    }

    result += str[index];
  }

  return result;
}
