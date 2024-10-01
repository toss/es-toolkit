import { describe, expect, it } from 'vitest';
import { isArrayLike } from './isArrayLike';
import { args } from '../_internal/args';
import { falsey } from '../_internal/falsey';

describe('isArrayLike', () => {
  it('should return `true` for array-like values', () => {
    const values = [args, [1, 2, 3], { 0: 'a', length: 1 }, 'a'];
    const expected = values.map(() => true);
    const actual = values.map(isArrayLike);

    expect(actual).toEqual(expected);
  });

  it('should return `false` for non-arrays', () => {
    const expected = falsey.map(value => value === '');

    const actual = falsey.map(isArrayLike);

    expect(actual).toEqual(expected);

    const slice = Array.prototype.slice;
    const asyncFunc = async function () {};
    const genFunc = function* () {};
    const symbol = Symbol ? Symbol('a') : undefined;

    expect(isArrayLike(true)).toBe(false);
    expect(isArrayLike(new Date())).toBe(false);
    expect(isArrayLike(new Error())).toBe(false);
    expect(isArrayLike(asyncFunc)).toBe(false);
    expect(isArrayLike(genFunc)).toBe(false);
    expect(isArrayLike(slice)).toBe(false);
    expect(isArrayLike({ a: 1 })).toBe(false);
    expect(isArrayLike(1)).toBe(false);
    expect(isArrayLike(/x/)).toBe(false);
    expect(isArrayLike(symbol)).toBe(false);
  });
});
