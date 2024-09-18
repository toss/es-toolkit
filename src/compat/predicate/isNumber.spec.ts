import { describe, it, expect } from 'vitest';
import { isNumber } from './isNumber';
import { falsey } from '../_internal/falsey';
import { args } from '../_internal/args';
import { slice } from '../_internal/slice';
import { symbol } from '../_internal/symbol';

describe('isNumber', () => {
  it('should return true for number values', () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(1)).toBe(true);
    expect(isNumber(-1)).toBe(true);
    expect(isNumber(1.5)).toBe(true);
    expect(isNumber(Infinity)).toBe(true);
    expect(isNumber(-Infinity)).toBe(true);
  });

  it('should return false for non-number values', () => {
    expect(isNumber('123')).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber(false)).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber({})).toBe(false);
    expect(isNumber([])).toBe(false);
    expect(isNumber(() => {})).toBe(false);
  });

  it('should return true for NaN', () => {
    expect(isNumber(NaN)).toBe(true);
  });

  it('should return `true` for numbers', () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(Object(0))).toBe(true);
    expect(isNumber(NaN)).toBe(true);
  });

  it('should return `false` for non-numbers', () => {
    const expected = falsey.map(value => typeof value === 'number');

    const actual = falsey.map((value, index) => (index ? isNumber(value) : isNumber()));

    expect(actual).toEqual(expected);

    expect(isNumber(args)).toBe(false);
    expect(isNumber([1, 2, 3])).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber(new Date())).toBe(false);
    expect(isNumber(new Error())).toBe(false);
    expect(isNumber(slice)).toBe(false);
    expect(isNumber({ a: 1 })).toBe(false);
    expect(isNumber(/x/)).toBe(false);
    expect(isNumber('a')).toBe(false);
    expect(isNumber(symbol)).toBe(false);
  });
});
