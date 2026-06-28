import { describe, expect, expectTypeOf, it } from 'vitest';
import type { deburr as deburrLodash } from 'lodash';
import { deburr } from './deburr';
import { burredLetters } from '../../_internal/burredLetters';
import { comboMarks } from '../../_internal/comboMarks';
import { deburredLetters } from '../../_internal/deburredLetters';
import { map } from '../array/map';
import { constant } from '../util/constant';
import { stubString } from '../util/stubString';

describe('deburr', () => {
  it('should convert Latin Unicode letters to basic Latin', () => {
    const actual = map(burredLetters, deburr);
    expect(actual).toEqual(deburredLetters);
  });

  it('should not deburr Latin mathematical operators', () => {
    const operators = ['\xd7', '\xf7'];
    const actual = map(operators, deburr);

    expect(actual).toEqual(operators);
  });

  it('should deburr combining diacritical marks', () => {
    const expected = map(comboMarks, constant('ei'));

    const actual = map(comboMarks, chr => deburr(`e${chr}i`));

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

  it('should return an empty string for empty values', () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined, ''];
    const expected = map(values, stubString);

    const actual = map(values, (value, index) => (index ? deburr(value as any) : deburr()));

    expect(actual).toEqual(expected);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(deburr).toEqualTypeOf<typeof deburrLodash>();
  });
});
