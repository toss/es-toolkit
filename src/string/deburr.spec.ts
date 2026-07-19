import { describe, expect, it } from 'vitest';
import { deburr } from './deburr';
import { burredLetters } from '../_internal/burredLetters';
import { comboMarks } from '../_internal/comboMarks';
import { deburredLetters } from '../_internal/deburredLetters';

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

  it('should preserve the input NFC/NFD form for characters that are not deburred', () => {
    // Hangul is a convenient probe: NFC and NFD differ, and deburr leaves it unchanged.
    const nfc = '한글';
    const nfd = nfc.normalize('NFD');
    expect(nfc).not.toBe(nfd);

    expect(deburr(nfc)).toBe(nfc);
    expect(deburr(nfd)).toBe(nfd);

    expect(deburr(`${nfc}café`)).toBe(`${nfc}cafe`);
    expect(deburr(`${nfc} + Æthelred`)).toBe(`${nfc} + Aethelred`);

    // Mixed NFC + NFD is treated as non-NFD and recomposed to NFC.
    const mixed = nfd + '가';
    expect(deburr(mixed)).toBe(`${nfc}가`);
  });
});
