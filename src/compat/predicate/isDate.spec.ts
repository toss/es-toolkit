import { describe, expect, it } from 'vitest';
import { isDate } from './isDate';
import { args } from '../_internal/args';
import { falsey } from '../_internal/falsey';
import { slice } from '../_internal/slice';
import { stubFalse } from '../_internal/stubFalse';
import { symbol } from '../_internal/symbol';

describe('isDate', () => {
  it('should return `true` for dates', () => {
    expect(isDate(new Date())).toBe(true);
  });

  it('should return `false` for non-dates', () => {
    const expected = falsey.map(() => stubFalse());

    const actual = falsey.map((value, index) => (index ? isDate(value) : isDate()));
    expect(actual).toEqual(expected);

    expect(isDate(args)).toBe(false);
    expect(isDate([1, 2, 3])).toBe(false);
    expect(isDate(true)).toBe(false);
    expect(isDate(new Error())).toBe(false);
    expect(isDate(slice)).toBe(false);
    expect(isDate({ a: 1 })).toBe(false);
    expect(isDate(1)).toBe(false);
    expect(isDate(/x/)).toBe(false);
    expect(isDate('a')).toBe(false);
    expect(isDate(symbol)).toBe(false);
  });
});
