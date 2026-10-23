/**
 * Splits strings into words for `words` and the case functions in `es-toolkit/compat`.
 *
 * Modern engines use a pattern built on Unicode property escapes (`\p{...}`). Engines that
 * cannot parse them, such as Node.js 6 and browsers from the ES2015 era, fall back to lodash's
 * own ES5-compatible word patterns, so `words` behaves exactly like lodash there.
 *
 * The fallback patterns are taken from lodash:
 * @link https://github.com/lodash/lodash/blob/4.17.21-es/_unicodeWords.js
 * @link https://github.com/lodash/lodash/blob/4.17.21-es/_asciiWords.js
 * @link https://github.com/lodash/lodash/blob/4.17.21-es/_hasUnicodeWord.js
 */

const rNonCharLatin = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\xd7\\xf7';

const rUnicodeUpper = '(?:\\p{Lu}\\p{M}*)';
const rUnicodeLower = '(?:\\p{Ll}\\p{M}*)';

const rEmojiPict = '(?:\\p{Emoji_Presentation}|\\p{Extended_Pictographic})';

const rMisc = `(?:(?:[\\p{Lm}\\p{Lo}\\p{Lt}]|(?![${rNonCharLatin}0-9]|${rEmojiPict})[\\p{N}\\p{S}])\\p{M}*)`;

const rNumber = '\\d';

const rUnicodeOptContrLower = "(?:['\u2019](?:d|ll|m|re|s|t|ve))?";
const rUnicodeOptContrUpper = "(?:['\u2019](?:D|LL|M|RE|S|T|VE))?";
const rUnicodeBreak = `[\\p{Z}\\p{P}${rNonCharLatin}]`;

const rUnicodeMiscUpper = `(?:${rUnicodeUpper}|${rMisc})`;
const rUnicodeMiscLower = `(?:${rUnicodeLower}|${rMisc})`;

const rEmojiMod = '\\uFE0F?\\p{Emoji_Modifier}?';
const rEmojiAtom = `(?:\\p{Regional_Indicator}{2}|${rEmojiPict}${rEmojiMod})`;
const rEmojiSeq = `${rEmojiAtom}(?:\\u200D${rEmojiAtom})*`;

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
    // eslint-disable-next-line es-x/no-regexp-unicode-property-escapes, es-x/no-regexp-unicode-property-escapes-2019 -- compiled inside try/catch; `lodashWords` is the fallback for engines without property escapes
    return RegExp(
      [
        `${rUnicodeUpper}?${rUnicodeLower}+${rUnicodeOptContrLower}(?=${rUnicodeBreak}|${rUnicodeUpper}|$)`,

        `${rUnicodeMiscUpper}+${rUnicodeOptContrUpper}(?=${rUnicodeBreak}|${rUnicodeUpper}${rUnicodeMiscLower}|$)`,

        `${rUnicodeUpper}?${rUnicodeMiscLower}+${rUnicodeOptContrLower}`,

        `${rUnicodeUpper}+${rUnicodeOptContrUpper}`,

        `${rNumber}*(?:1ST|2ND|3RD|(?![123])${rNumber}TH)(?=\\b|[a-z_])`,

        `${rNumber}*(?:1st|2nd|3rd|(?![123])${rNumber}th)(?=\\b|[A-Z_])`,

        rEmojiSeq,

        `${rNumber}+`,
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
 * Splits `string` into words with the default word pattern.
 *
 * @param string - The string to split.
 * @returns The words of `string`.
 */
export function unicodeWords(string: string): string[] {
  const pattern = getUnicodeWordPattern();

  if (pattern == null) {
    return lodashWords(string);
  }

  const matched = string.match(pattern);
  const words = matched == null ? [] : Array.from(matched);

  return words.filter(x => x !== '');
}

// Fallback for engines without Unicode property escapes: lodash's ES5 word patterns.

/** Used to compose unicode character classes. */
const rsAstralRange = '\\ud800-\\udfff';
const rsComboMarksRange = '\\u0300-\\u036f';
const reComboHalfMarksRange = '\\ufe20-\\ufe2f';
const rsComboSymbolsRange = '\\u20d0-\\u20ff';
const rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
const rsDingbatRange = '\\u2700-\\u27bf';
const rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff';
const rsMathOpRange = '\\xac\\xb1\\xd7\\xf7';
const rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf';
const rsPunctuationRange = '\\u2000-\\u206f';
const rsSpaceRange =
  ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000';
const rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde';
const rsVarRange = '\\ufe0e\\ufe0f';
const rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
const rsApos = "['’]";
const rsBreak = `[${rsBreakRange}]`;
const rsCombo = `[${rsComboRange}]`;
const rsDigits = '\\d+';
const rsDingbat = `[${rsDingbatRange}]`;
const rsLower = `[${rsLowerRange}]`;
const rsMisc = `[^${rsAstralRange}${rsBreakRange}${rsDigits}${rsDingbatRange}${rsLowerRange}${rsUpperRange}]`;
const rsFitz = '\\ud83c[\\udffb-\\udfff]';
const rsModifier = `(?:${rsCombo}|${rsFitz})`;
const rsNonAstral = `[^${rsAstralRange}]`;
const rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
const rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
const rsUpper = `[${rsUpperRange}]`;
const rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
const rsMiscLower = `(?:${rsLower}|${rsMisc})`;
const rsMiscUpper = `(?:${rsUpper}|${rsMisc})`;
const rsOptContrLower = `(?:${rsApos}(?:d|ll|m|re|s|t|ve))?`;
const rsOptContrUpper = `(?:${rsApos}(?:D|LL|M|RE|S|T|VE))?`;
const reOptMod = `${rsModifier}?`;
const rsOptVar = `[${rsVarRange}]?`;
const rsOptJoin = `(?:${rsZWJ}(?:${[rsNonAstral, rsRegional, rsSurrPair].join('|')})${rsOptVar}${reOptMod})*`;
const rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])';
const rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])';
const rsSeq = rsOptVar + reOptMod + rsOptJoin;
const rsEmoji = `(?:${[rsDingbat, rsRegional, rsSurrPair].join('|')})${rsSeq}`;

/** Used to detect strings that need a more robust regexp to match words. */
const reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/** Used to match words composed of alphanumeric characters. */
// eslint-disable-next-line no-control-regex
const reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

let reLodashUnicodeWord: RegExp | undefined;

/** Used to match complex or compound words. */
function getLodashUnicodeWordPattern(): RegExp {
  if (reLodashUnicodeWord == null) {
    reLodashUnicodeWord = RegExp(
      [
        `${rsUpper}?${rsLower}+${rsOptContrLower}(?=${[rsBreak, rsUpper, '$'].join('|')})`,
        `${rsMiscUpper}+${rsOptContrUpper}(?=${[rsBreak, rsUpper + rsMiscLower, '$'].join('|')})`,
        `${rsUpper}?${rsMiscLower}+${rsOptContrLower}`,
        `${rsUpper}+${rsOptContrUpper}`,
        rsOrdUpper,
        rsOrdLower,
        rsDigits,
        rsEmoji,
      ].join('|'),
      'g'
    );
  }

  return reLodashUnicodeWord;
}

/**
 * Splits `string` into words with lodash's own ES5-compatible patterns. Used on engines that
 * cannot parse Unicode property escapes, so that `words` matches lodash exactly there.
 *
 * @param string - The string to split.
 * @returns The words of `string`.
 */
export function lodashWords(string: string): string[] {
  const pattern = reHasUnicodeWord.test(string) ? getLodashUnicodeWordPattern() : reAsciiWord;
  const matched = string.match(pattern);

  return matched == null ? [] : Array.from(matched);
}
