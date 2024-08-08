import { describe, expect, it } from 'vitest';
import { isBoolean } from '../../predicate/isBoolean';
import { falsey } from '../_internal/falsey';
import { args } from '../_internal/args';
import { slice } from '../_internal/slice';
import { symbol } from '../_internal/symbol';

describe('isBoolean', () => {
  it('should return `true` for booleans', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean(Object(true))).toBe(true);
    expect(isBoolean(Object(false))).toBe(true);
  });

  it('should return `false` for non-booleans', () => {
    const expected = falsey.map((value) => value === false);

    const actual = falsey.map((value, index) => isBoolean(value));

    expect(actual).toEqual(expected);

    expect(isBoolean(args)).toBe(false);
    expect(isBoolean([1, 2, 3])).toBe(false);
    expect(isBoolean(new Date())).toBe(false);
    expect(isBoolean(new Error())).toBe(false);
    expect(isBoolean(slice)).toBe(false);
    expect(isBoolean({ a: 1 })).toBe(false);
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean(/x/)).toBe(false);
    expect(isBoolean('a')).toBe(false);
    expect(isBoolean(symbol)).toBe(false);
  });
});
