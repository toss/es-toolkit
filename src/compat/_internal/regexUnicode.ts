/**
 * Matches a single visible symbol (grapheme cluster) in a Unicode `string`,
 * combining surrogate pairs, combining marks, variation selectors, Fitzpatrick
 * modifiers, regional-indicator pairs, and zero-width-joiner sequences into a
 * single match.
 *
 * Ported from lodash to preserve identical behavior.
 * @link https://github.com/lodash/lodash/blob/4.17.21-es/_unicodeSize.js
 */

const rsAstralRange = '\\ud800-\\udfff';
const rsComboMarksRange = '\\u0300-\\u036f';
const reComboHalfMarksRange = '\\ufe20-\\ufe2f';
const rsComboSymbolsRange = '\\u20d0-\\u20ff';
const rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
const rsVarRange = '\\ufe0e\\ufe0f';

const rsAstral = `[${rsAstralRange}]`;
const rsCombo = `[${rsComboRange}]`;
const rsFitz = '\\ud83c[\\udffb-\\udfff]';
const rsModifier = `(?:${rsCombo}|${rsFitz})`;
const rsNonAstral = `[^${rsAstralRange}]`;
const rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
const rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
const rsZWJ = '\\u200d';

const reOptMod = `${rsModifier}?`;
const rsOptVar = `[${rsVarRange}]?`;
const rsOptJoin = `(?:${rsZWJ}(?:${[rsNonAstral, rsRegional, rsSurrPair].join('|')})${rsOptVar}${reOptMod})*`;
const rsSeq = rsOptVar + reOptMod + rsOptJoin;
const rsSymbol = `(?:${[`${rsNonAstral}${rsCombo}?`, rsCombo, rsRegional, rsSurrPair, rsAstral].join('|')})`;

export const regexUnicode = RegExp(`${rsFitz}(?=${rsFitz})|${rsSymbol}${rsSeq}`, 'g');
