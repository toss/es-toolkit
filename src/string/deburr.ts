const deburrMap = new Map<string, string>(
  Object.entries({
    Æ: 'Ae',
    Ð: 'D',
    Ø: 'O',
    Þ: 'Th',
    ß: 'ss',
    æ: 'ae',
    ð: 'd',
    ø: 'o',
    þ: 'th',
    Đ: 'D',
    đ: 'd',
    Ħ: 'H',
    ħ: 'h',
    ı: 'i',
    Ĳ: 'IJ',
    ĳ: 'ij',
    ĸ: 'k',
    Ŀ: 'L',
    ŀ: 'l',
    Ł: 'L',
    ł: 'l',
    ŉ: "'n",
    Ŋ: 'N',
    ŋ: 'n',
    Œ: 'Oe',
    œ: 'oe',
    Ŧ: 'T',
    ŧ: 't',
    ſ: 's',
  })
);

/**
 * Converts a string by replacing special characters and diacritical marks with their ASCII equivalents.
 * For example, "Crème brûlée" becomes "Creme brulee".
 *
 * @param {string} str - The input string to be deburred.
 * @returns {string} - The deburred string with special characters replaced by their ASCII equivalents.
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
 */
export function deburr(str: string): string {
  str = str.normalize('NFD');

  let result = '';

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if ((char >= '\u0300' && char <= '\u036f') || (char >= '\ufe20' && char <= '\ufe23')) {
      continue;
    }

    result += deburrMap.get(char) ?? char;
  }

  return result;
}
