import { describe, expect, it } from 'vitest';
import { isNull } from '../../predicate';
import { falsey } from '../_internal/falsey';

/**
 * @see https://github.com/lodash/lodash/blob/main/test/isNull.spec.js
 */
describe('isNull', () => {
  it('should return `true` for `null` values', () => {
    expect(isNull(null)).toBe(true);
  });

  it('should return `false` for non `null` values', () => {
    const expected = falsey.map(value => value === null);
    const actual = falsey.map((value, index) => (index ? isNull(value) : isNull(undefined)));

    // eslint-disable-next-line
    (function (..._args: any[]) {
      // eslint-disable-next-line
      expect(isNull(arguments)).toBe(false);
    })(1, 2, 3);
    expect(actual).toEqual(expected);
    expect(isNull([1, 2, 3])).toBe(false);
    expect(isNull(true)).toBe(false);
    expect(isNull(new Date())).toBe(false);
    expect(isNull(new Error())).toBe(false);
    expect(isNull(Array.prototype.slice)).toBe(false);
    expect(isNull({ a: 1 })).toBe(false);
    expect(isNull(1)).toBe(false);
    expect(isNull(/x/)).toBe(false);
    expect(isNull('a')).toBe(false);
    expect(isNull(Symbol('a'))).toBe(false);
    expect(isNull(undefined)).toBe(false);
  });
});
