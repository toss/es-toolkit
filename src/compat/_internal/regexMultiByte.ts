/**
 * Used to compose unicode character classes.
 * @link https://github.com/lodash/lodash/blob/4.17.21-es/_hasUnicode.js
 *
 * Used to detect strings with zero-width joiners or code points from the astral planes.
 * @link http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/
 */

export const regexMultiByte = new RegExp(
  // eslint-disable-next-line no-misleading-character-class
  '[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]'
);
