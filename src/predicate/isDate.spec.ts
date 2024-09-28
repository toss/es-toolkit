import { describe, expect, it } from 'vitest';
import { isDate } from './isDate';

describe('isDate', () => {
  it('should return `true` for dates', () => {
    expect(isDate(new Date())).toBe(true);
  });

  it('should return `false` for non-dates', () => {
    expect(isDate('2024-01-01')).toBe(false);
    expect(isDate(2024)).toBe(false);
    expect(isDate({ year: 2024, month: 1, day: 1 })).toBe(false);
    expect(isDate([2024, 1, 1])).toBe(false);
    expect(isDate(new Error())).toBe(false);
    expect(isDate(/a/)).toBe(false);
    expect(isDate(Symbol('2024'))).toBe(false);
    expect(isDate(null)).toBe(false);
    expect(isDate(undefined)).toBe(false);
  });

  it('should work on date within object', () => {
    const obj = {
      date: new Date(),
    };
    expect(isDate(obj.date)).toBe(true);
  });
});
