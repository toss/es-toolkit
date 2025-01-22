import { describe, expect, it } from 'vitest';
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

  it('should return an empty string for empty values', () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined, ''];
    const expected = map(values, stubString);

    const actual = map(values, (value, index) => (index ? deburr(value as any) : deburr()));

    expect(actual).toEqual(expected);
  });
});
