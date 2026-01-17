import { describe, expect, it } from 'vitest';
import { isNumber } from './isNumber';

describe('isNumber', () => {
  it('returns true if the value is a number', () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(123)).toBe(true);
    expect(isNumber(-456)).toBe(true);
    expect(isNumber(3.14)).toBe(true);
    expect(isNumber(Infinity)).toBe(true);
    expect(isNumber(-Infinity)).toBe(true);
    expect(isNumber(NaN)).toBe(true);
    expect(isNumber(new Number(42))).toBe(true);
  });

  it('returns false if the value is not a number', () => {
    expect(isNumber('123')).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber(false)).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber({ a: 1 })).toBe(false);
    expect(isNumber([1, 2, 3])).toBe(false);
  });
});
