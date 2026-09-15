import { legacyWords } from '../_internal/legacyWords.ts';
import { toString } from '../util/toString.ts';

const rNonCharLatin = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\xd7\\xf7';

const rUnicodeUpper = '\\p{Lu}';
const rUnicodeLower = '\\p{Ll}';

const rMisc = '(?:[\\p{Lm}\\p{Lo}]\\p{M}*)';
const rNumber = '\\d';
const rUnicodeOptContrLower = "(?:['\u2019](?:d|ll|m|re|s|t|ve))?";
const rUnicodeOptContrUpper = "(?:['\u2019](?:D|LL|M|RE|S|T|VE))?";
const rUnicodeBreak = `[\\p{Z}\\p{P}${rNonCharLatin}]`;

const rUnicodeMiscUpper = `(?:${rUnicodeUpper}|${rMisc})`;
const rUnicodeMiscLower = `(?:${rUnicodeLower}|${rMisc})`;

// `null` once compiling the pattern has failed, so the fallback is used without retrying.
let rUnicodeWord: RegExp | null | undefined;

// The pattern uses Unicode property escapes, which engines older than
// Chrome 64 / Safari 11.1 cannot parse. Since it is assembled from strings,
// transpilers cannot rewrite it either, so it is compiled lazily: merely
// importing this module never throws, only calling `words` without a custom
// pattern requires engine support.
function getUnicodeWordPattern(): RegExp | null {
  if (rUnicodeWord === undefined) {
    rUnicodeWord = compileUnicodeWordPattern();
  }
  return rUnicodeWord;
}

function compileUnicodeWordPattern(): RegExp | null {
  try {
    // eslint-disable-next-line es-x/no-regexp-unicode-property-escapes, es-x/no-regexp-unicode-property-escapes-2019 -- compiled inside try/catch; `legacyWords` is the fallback for engines without property escapes
    return RegExp(
      [
        `${rUnicodeUpper}?${rUnicodeLower}+${rUnicodeOptContrLower}(?=${rUnicodeBreak}|${rUnicodeUpper}|$)`,

        `${rUnicodeMiscUpper}+${rUnicodeOptContrUpper}(?=${rUnicodeBreak}|${rUnicodeUpper}${rUnicodeMiscLower}|$)`,

        `${rUnicodeUpper}?${rUnicodeMiscLower}+${rUnicodeOptContrLower}`,

        `${rUnicodeUpper}+${rUnicodeOptContrUpper}`,

        `${rNumber}*(?:1ST|2ND|3RD|(?![123])${rNumber}TH)(?=\\b|[a-z_])`,

        `${rNumber}*(?:1st|2nd|3rd|(?![123])${rNumber}th)(?=\\b|[A-Z_])`,

        `${rNumber}+`,

        '\\p{Emoji_Presentation}',

        '\\p{Extended_Pictographic}',
      ].join('|'),
      'gu'
    );
  } catch (e) {
    // Engines without Unicode property escapes (e.g. Node.js 6) throw a
    // SyntaxError here; use lodash's ES5-compatible word patterns instead.
    return null;
  }
}

/**
 * Splits `string` into an array of its words.
 *
 * @param str - The string or object that is to be split into words.
 * @param [pattern] - The pattern to match words.
 * @returns Returns the words of `string`.
 *
 * @example
 * const wordsArray1 = words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 */
export function words(string?: string, pattern?: string | RegExp): string[];

/**
 * Splits `string` into an array of its words.
 *
 * @param str - The string or object that is to be split into words.
 * @param [pattern] - The pattern to match words.
 * @returns Returns the words of `string`.
 *
 * @example
 * const wordsArray1 = words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 */
export function words(string: string, index: string | number, guard: object): string[];

/**
 * Splits `string` into an array of its words.
 *
 * @param str - The string or object that is to be split into words.
 * @param [pattern] - The pattern to match words.
 * @returns Returns the words of `string`.
 *
 * @example
 * const wordsArray1 = words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 */
export function words(str?: string, pattern?: string | number | RegExp, guard?: object): string[] {
  const input = toString(str);

  if (guard || pattern === undefined) {
    const unicodeWordPattern = getUnicodeWordPattern();

    if (unicodeWordPattern == null) {
      return legacyWords(input);
    }

    pattern = unicodeWordPattern;
  }

  if (typeof pattern === 'number') {
    pattern = pattern.toString();
  }

  const matched = input.match(pattern);
  const words = matched == null ? [] : Array.from(matched);

  return words.filter(x => x !== '');
}
