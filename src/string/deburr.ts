const deburrMap: Record<string, string> = {
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
};

/**
 * Deburrs `str` by converting [Latin-1 Supplement](<https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table>) and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A) letters to basic Latin letters and removing [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @param {string} str The string to deburr.
 * @returns {string} Returns the deburred string.
 */
export function deburr(str: string): string {
  str = str.normalize('NFD');

  const result: string[] = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if ((char >= '\u0300' && char <= '\u036f') || (char >= '\ufe20' && char <= '\ufe23')) {
      continue;
    }

    result.push(deburrMap[char] ?? char);
  }

  return result.join('');
}
