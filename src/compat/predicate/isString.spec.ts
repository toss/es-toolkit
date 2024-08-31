import { describe, expect, it } from 'vitest';
import { isString } from './isString';
import { falsey } from '../_internal/falsey';
import { args } from '../_internal/args';
import { slice } from '../_internal/slice';
import { symbol } from '../_internal/symbol';

describe('isString', () => {
  it('returns true if the value is string', () => {
    expect(isString('a')).toBe(true);
    expect(isString(Object('a'))).toBe(true);
  });

  it('returns false if the value is not string', () => {
    const expected = falsey.map(value => value === '');

    const actual = falsey.map(value => isString(value));

    expect(actual).toEqual(expected);

    expect(isString(args)).toBe(false);
    expect(isString([1, 2, 3])).toBe(false);
    expect(isString(true)).toBe(false);
    expect(isString(new Date())).toBe(false);
    expect(isString(new Error())).toBe(false);
    expect(isString(slice)).toBe(false);
    expect(isString({ '0': 1, length: 1 })).toBe(false);
    expect(isString(1)).toBe(false);
    expect(isString(/x/)).toBe(false);
    expect(isString(symbol)).toBe(false);
  });
});
