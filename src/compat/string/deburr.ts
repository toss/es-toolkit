/**
 * Regular expression to match Latin Unicode letters in the ranges:
 * - \xc0-\xd6: Latin capital letters with diacritics (À-Ö)
 * - \xd8-\xf6: More Latin capital and small letters with diacritics (Ø-ö)
 * - \xf8-\xff: Latin small letters with diacritics (ø-ÿ)
 * - \u0100-\u017f: Extended Latin alphabet with diacritics
 */
const LATIN_LETTERS_REGEX = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/**
 * Unicode ranges for various combining diacritical marks:
 * - Combining Diacritical Marks (0300-036F)
 * - Combining Half Marks (FE20-FE2F)
 * - Combining Diacritical Marks for Symbols (20D0-20FF)
 * - Combining Diacritical Marks Extended (1AB0-1AFF)
 * - Combining Diacritical Marks Supplement (1DC0-1DFF)
 */
const COMBINING_DIACRITICAL_MARKS = '\\u0300-\\u036f';
const COMBINING_HALF_MARKS = '\\ufe20-\\ufe2f';
const COMBINING_DIACRITICAL_MARKS_FOR_SYMBOLS = '\\u20d0-\\u20ff';
const COMBINING_DIACRITICAL_MARKS_EXTENDED = '\\u1ab0-\\u1aff';
const COMBINING_DIACRITICAL_MARKS_SUPPLEMENT = '\\u1dc0-\\u1dff';

// Create a character class pattern that matches any combining mark
const DIACRITIC_MARKS_REGEX = `[${COMBINING_DIACRITICAL_MARKS}${COMBINING_HALF_MARKS}${COMBINING_DIACRITICAL_MARKS_FOR_SYMBOLS}${COMBINING_DIACRITICAL_MARKS_EXTENDED}${COMBINING_DIACRITICAL_MARKS_SUPPLEMENT}]`;

/**
 * Regular expression to match combining diacritical marks and symbols.
 * These are special Unicode characters that combine with base characters
 * to form accented letters and other modified characters.
 *
 * @see https://en.wikipedia.org/wiki/Combining_Diacritical_Marks
 * @see https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols
 */
// eslint-disable-next-line no-misleading-character-class
const DIACRITICAL_MARKS_REGEX = RegExp(DIACRITIC_MARKS_REGEX, 'g');

const DEBURRED_LETTERS: Record<string, string> = {
  '\xc0': 'A',
  '\xc1': 'A',
  '\xc2': 'A',
  '\xc3': 'A',
  '\xc4': 'A',
  '\xc5': 'A',
  '\xe0': 'a',
  '\xe1': 'a',
  '\xe2': 'a',
  '\xe3': 'a',
  '\xe4': 'a',
  '\xe5': 'a',
  '\xc7': 'C',
  '\xe7': 'c',
  '\xd0': 'D',
  '\xf0': 'd',
  '\xc8': 'E',
  '\xc9': 'E',
  '\xca': 'E',
  '\xcb': 'E',
  '\xe8': 'e',
  '\xe9': 'e',
  '\xea': 'e',
  '\xeb': 'e',
  '\xcc': 'I',
  '\xcd': 'I',
  '\xce': 'I',
  '\xcf': 'I',
  '\xec': 'i',
  '\xed': 'i',
  '\xee': 'i',
  '\xef': 'i',
  '\xd1': 'N',
  '\xf1': 'n',
  '\xd2': 'O',
  '\xd3': 'O',
  '\xd4': 'O',
  '\xd5': 'O',
  '\xd6': 'O',
  '\xd8': 'O',
  '\xf2': 'o',
  '\xf3': 'o',
  '\xf4': 'o',
  '\xf5': 'o',
  '\xf6': 'o',
  '\xf8': 'o',
  '\xd9': 'U',
  '\xda': 'U',
  '\xdb': 'U',
  '\xdc': 'U',
  '\xf9': 'u',
  '\xfa': 'u',
  '\xfb': 'u',
  '\xfc': 'u',
  '\xdd': 'Y',
  '\xfd': 'y',
  '\xff': 'y',
  '\xc6': 'Ae',
  '\xe6': 'ae',
  '\xde': 'Th',
  '\xfe': 'th',
  '\xdf': 'ss',
  '\u0100': 'A',
  '\u0102': 'A',
  '\u0104': 'A',
  '\u0101': 'a',
  '\u0103': 'a',
  '\u0105': 'a',
  '\u0106': 'C',
  '\u0108': 'C',
  '\u010a': 'C',
  '\u010c': 'C',
  '\u0107': 'c',
  '\u0109': 'c',
  '\u010b': 'c',
  '\u010d': 'c',
  '\u010e': 'D',
  '\u0110': 'D',
  '\u010f': 'd',
  '\u0111': 'd',
  '\u0112': 'E',
  '\u0114': 'E',
  '\u0116': 'E',
  '\u0118': 'E',
  '\u011a': 'E',
  '\u0113': 'e',
  '\u0115': 'e',
  '\u0117': 'e',
  '\u0119': 'e',
  '\u011b': 'e',
  '\u011c': 'G',
  '\u011e': 'G',
  '\u0120': 'G',
  '\u0122': 'G',
  '\u011d': 'g',
  '\u011f': 'g',
  '\u0121': 'g',
  '\u0123': 'g',
  '\u0124': 'H',
  '\u0126': 'H',
  '\u0125': 'h',
  '\u0127': 'h',
  '\u0128': 'I',
  '\u012a': 'I',
  '\u012c': 'I',
  '\u012e': 'I',
  '\u0130': 'I',
  '\u0129': 'i',
  '\u012b': 'i',
  '\u012d': 'i',
  '\u012f': 'i',
  '\u0131': 'i',
  '\u0134': 'J',
  '\u0135': 'j',
  '\u0136': 'K',
  '\u0137': 'k',
  '\u0138': 'k',
  '\u0139': 'L',
  '\u013b': 'L',
  '\u013d': 'L',
  '\u013f': 'L',
  '\u0141': 'L',
  '\u013a': 'l',
  '\u013c': 'l',
  '\u013e': 'l',
  '\u0140': 'l',
  '\u0142': 'l',
  '\u0143': 'N',
  '\u0145': 'N',
  '\u0147': 'N',
  '\u014a': 'N',
  '\u0144': 'n',
  '\u0146': 'n',
  '\u0148': 'n',
  '\u014b': 'n',
  '\u014c': 'O',
  '\u014e': 'O',
  '\u0150': 'O',
  '\u014d': 'o',
  '\u014f': 'o',
  '\u0151': 'o',
  '\u0154': 'R',
  '\u0156': 'R',
  '\u0158': 'R',
  '\u0155': 'r',
  '\u0157': 'r',
  '\u0159': 'r',
  '\u015a': 'S',
  '\u015c': 'S',
  '\u015e': 'S',
  '\u0160': 'S',
  '\u015b': 's',
  '\u015d': 's',
  '\u015f': 's',
  '\u0161': 's',
  '\u0162': 'T',
  '\u0164': 'T',
  '\u0166': 'T',
  '\u0163': 't',
  '\u0165': 't',
  '\u0167': 't',
  '\u0168': 'U',
  '\u016a': 'U',
  '\u016c': 'U',
  '\u016e': 'U',
  '\u0170': 'U',
  '\u0172': 'U',
  '\u0169': 'u',
  '\u016b': 'u',
  '\u016d': 'u',
  '\u016f': 'u',
  '\u0171': 'u',
  '\u0173': 'u',
  '\u0174': 'W',
  '\u0175': 'w',
  '\u0176': 'Y',
  '\u0177': 'y',
  '\u0178': 'Y',
  '\u0179': 'Z',
  '\u017b': 'Z',
  '\u017d': 'Z',
  '\u017a': 'z',
  '\u017c': 'z',
  '\u017e': 'z',
  '\u0132': 'IJ',
  '\u0133': 'ij',
  '\u0152': 'Oe',
  '\u0153': 'oe',
  '\u0149': "'n",
  '\u017f': 's',
};

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
  if (!str) {
    return '';
  }

  return str.replace(LATIN_LETTERS_REGEX, x => DEBURRED_LETTERS[x]).replace(DIACRITICAL_MARKS_REGEX, '');
}
