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
});
