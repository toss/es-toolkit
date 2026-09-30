const deburrMap = new Map<string, string>([
  ['Æ', 'Ae'],
  ['Ð', 'D'],
  ['Ø', 'O'],
  ['Þ', 'Th'],
  ['ß', 'ss'],
  ['æ', 'ae'],
  ['ð', 'd'],
  ['ø', 'o'],
  ['þ', 'th'],
  ['Đ', 'D'],
  ['đ', 'd'],
  ['Ħ', 'H'],
  ['ħ', 'h'],
  ['ı', 'i'],
  ['Ĳ', 'IJ'],
  ['ĳ', 'ij'],
  ['ĸ', 'k'],
  ['Ŀ', 'L'],
  ['ŀ', 'l'],
  ['Ł', 'L'],
  ['ł', 'l'],
  ['ŉ', "'n"],
  ['Ŋ', 'N'],
  ['ŋ', 'n'],
  ['Œ', 'Oe'],
  ['œ', 'oe'],
  ['Ŧ', 'T'],
  ['ŧ', 't'],
  ['ſ', 's'],
]);

/**
 * Converts a string by replacing special characters and diacritical marks with their ASCII equivalents.
 * For example, "Crème brûlée" becomes "Creme brulee".
 *
 * Only Latin letters are converted. Letters of other scripts, such as Hangul, Cyrillic, or Greek,
 * are kept as they are, even if they carry diacritical marks.
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
 * // Letters of other scripts are kept as they are:
 * deburr('한국어') // returns '한국어'
 * deburr('йогурт') // returns 'йогурт'
 */
export function deburr(str: string): string {
  let result = '';

  for (let index = 0; index < str.length; index++) {
    result += deburrChar(str[index]);
  }

  return result;
}

function deburrChar(char: string): string {
  const code = char.charCodeAt(0);

  if (code < 0x80) {
    return char;
  }

  if (isCombiningMark(code)) {
    return '';
  }

  const deburred = deburrMap.get(char);

  if (deburred != null) {
    return deburred;
  }

  const decomposed = char.normalize('NFD');
  const base = decomposed[0];

  // Only a Latin letter with diacritical marks is deburred.
  // Other letters, such as Hangul syllables or Cyrillic letters, are kept as they are.
  if (!isAsciiLetter(base.charCodeAt(0)) && !deburrMap.has(base)) {
    return char;
  }

  let result = '';

  for (let index = 0; index < decomposed.length; index++) {
    if (!isCombiningMark(decomposed.charCodeAt(index))) {
      result += deburrMap.get(decomposed[index]) ?? decomposed[index];
    }
  }

  return result;
}

function isAsciiLetter(code: number): boolean {
  return (code >= 0x41 && code <= 0x5a) || (code >= 0x61 && code <= 0x7a);
}

function isCombiningMark(code: number): boolean {
  return (
    // Combining Diacritical Marks
    (code >= 0x300 && code <= 0x36f) ||
    // Combining Diacritical Marks for Symbols
    (code >= 0x20d0 && code <= 0x20ff) ||
    // Combining Half Marks
    (code >= 0xfe20 && code <= 0xfe2f)
  );
}
