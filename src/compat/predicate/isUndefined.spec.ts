import { describe, expect, it } from 'vitest';
import { isUndefined } from '../../predicate';
import { falsey } from '../_internal/falsey';

describe('isUndefined', () => {
  it('should return `true` for `undefined` values', () => {
    expect(isUndefined(undefined)).toBe(true);
  });

  it('should return `false` for non `undefined` values', () => {
    const expected = falsey.map(value => value === undefined);
    const actual = falsey.map((value, index) => (index ? isUndefined(value) : isUndefined(undefined)));
    expect(actual).toEqual(expected);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (function (..._: any[]) {
      // eslint-disable-next-line prefer-rest-params
      expect(isUndefined(arguments)).toBe(false);
    })(1, 2, 3);
    expect(isUndefined([1, 2, 3])).toBe(false);
    expect(isUndefined(true)).toBe(false);
    expect(isUndefined(new Date())).toBe(false);
    expect(isUndefined(new Error())).toBe(false);
    expect(isUndefined(Array.prototype.slice)).toBe(false);
    expect(isUndefined({ a: 1 })).toBe(false);
    expect(isUndefined(1)).toBe(false);
    expect(isUndefined(/x/)).toBe(false);
    expect(isUndefined('a')).toBe(false);
    expect(isUndefined(Symbol('a'))).toBe(false);
  });
});
