import { describe, expect, it } from 'vitest';
import { deburr } from './deburr';
import { burredLetters } from '../_internal/burredLetters';
import { comboMarks } from '../_internal/comboMarks';
import { deburredLetters } from '../_internal/deburredLetters';
import { deburr as deburrCompat } from '../compat/string/deburr';

describe('deburr', () => {
  it('should convert examples correctly', () => {
    expect(deburr('Æthelred')).toBe('Aethelred');
    expect(deburr('München')).toBe('Munchen');
    expect(deburr('Crème brûlée')).toBe('Creme brulee');
  });

  it('should convert Latin Unicode letters to basic Latin', () => {
    const actual = burredLetters.map(deburr);
    expect(actual).toEqual(deburredLetters);
  });

  it('should not deburr Latin mathematical operators', () => {
    const operators = ['\xd7', '\xf7'];
    const actual = operators.map(deburr);

    expect(actual).toEqual(operators);
  });

  it('should deburr combining diacritical marks', () => {
    const expected = comboMarks.map(() => 'ei');

    const actual = comboMarks.map(chr => deburr(`e${chr}i`));

    expect(actual).toEqual(expected);
  });

  it('should remove combining marks from every supported range', () => {
    // Combining Diacritical Marks (U+0300-U+036F).
    expect(deburr('e\u0300i')).toBe('ei');
    expect(deburr('e\u036fi')).toBe('ei');
    // Combining Diacritical Marks for Symbols (U+20D0-U+20FF).
    expect(deburr('e\u20d0i')).toBe('ei');
    expect(deburr('e\u20ddi')).toBe('ei');
    expect(deburr('e\u20e1i')).toBe('ei');
    expect(deburr('e\u20ffi')).toBe('ei');
    // Combining Half Marks (U+FE20-U+FE2F).
    expect(deburr('e\ufe20i')).toBe('ei');
    expect(deburr('e\ufe24i')).toBe('ei');
    expect(deburr('e\ufe26i')).toBe('ei');
    expect(deburr('e\ufe2fi')).toBe('ei');
  });

  it('should preserve characters just outside the combining mark ranges', () => {
    expect(deburr('e\u02ffi')).toBe('e\u02ffi');
    expect(deburr('e\u0370i')).toBe('e\u0370i');
    expect(deburr('e\u20cfi')).toBe('e\u20cfi');
    expect(deburr('e\u2100i')).toBe('e\u2100i');
    expect(deburr('e\ufe1fi')).toBe('e\ufe1fi');
    expect(deburr('e\ufe30i')).toBe('e\ufe30i');
  });

  it('should remove consecutive marks spanning different ranges', () => {
    expect(deburr('a\u0301\u0327\u20d1')).toBe('a');
    expect(deburr('\u00c6\u20dd')).toBe('Ae');
  });

  it('should not decompose Hangul syllables', () => {
    expect(deburr('한국어')).toBe('한국어');
    expect(deburr('한국어')).toHaveLength(3);
    expect(deburr('한국어 테스트')).toBe('한국어 테스트');
  });

  it('should keep letters of other scripts as they are, even with diacritical marks', () => {
    expect(deburr('йогурт')).toBe('йогурт');
    expect(deburr('Мой край')).toBe('Мой край');
    expect(deburr('Ελληνικά')).toBe('Ελληνικά');
    expect(deburr('がぎぐ')).toBe('がぎぐ');
  });

  it('should not decompose Indic and Arabic letters', () => {
    expect(deburr('\u0958')).toBe('\u0958'); // Devanagari KA with nukta
    expect(deburr('\u09cb')).toBe('\u09cb'); // Bengali vowel sign O
    expect(deburr('\u0623')).toBe('\u0623'); // Arabic ALEF with hamza above
  });

  it('should deburr Latin letters outside the Latin-1 Supplement and Latin Extended-A blocks', () => {
    expect(deburr('Tiếng Việt')).toBe('Tieng Viet');
    expect(deburr('Ǎǎ')).toBe('Aa');
  });

  it('should deburr letters that decompose into a special Latin letter', () => {
    expect(deburr('ǢǣǼǽǾǿẛ')).toBe('AeaeAeaeOos');
  });

  it('should keep non-letter symbols that decompose into ASCII', () => {
    expect(deburr('≠')).toBe('≠');
    expect(deburr('\u037e')).toBe('\u037e'); // Greek question mark
  });

  it('should deburr only Latin letters in a mixed string', () => {
    expect(deburr('Café Москва 한국어')).toBe('Cafe Москва 한국어');
  });

  it('should keep surrogate pairs', () => {
    expect(deburr('😀é')).toBe('😀e');
  });

  it('should match the compat implementation for U+00C0 to U+017F', () => {
    for (let code = 0xc0; code <= 0x17f; code++) {
      const char = String.fromCharCode(code);
      expect(deburr(char)).toBe(deburrCompat(char));
    }
  });
});
