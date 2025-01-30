import { describe, expect, it } from 'vitest';
import { sum } from './sum';
import { empties } from '../_internal/empties';
import { stubZero } from '../_internal/stubZero';

describe('sum', () => {
  const array = [6, 4, 2];

  it(`should return the sum of an array of numbers`, () => {
    expect(sum(array)).toBe(12);
  });

  it(`should return \`0\` when passing empty \`array\` values`, () => {
    const expected = empties.map(stubZero);

    const actual = empties.map(value => sum(value as any));

    expect(actual).toEqual(expected);
  });

  it(`should skip \`undefined\` values`, () => {
    expect(sum([1, undefined])).toBe(1);
    expect(sum([undefined, 1, 2, 3])).toBe(6);
  });

  it(`should not skip \`NaN\` values`, () => {
    expect(sum([1, NaN])).toEqual(NaN);
  });

  it(`should not coerce values to numbers`, () => {
    expect(sum(['1', '2'])).toBe('12');
  });
});
