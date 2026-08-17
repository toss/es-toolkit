import { describe, expect, expectTypeOf, it } from 'vitest';
import { isArray } from './isArray';
import { args } from '../_internal/args';
import { falsey } from '../_internal/falsey';

describe('isArray', function () {
  it('returns true if value is an array', () => {
    expect(isArray([])).toBe(true);
  });

  it('returns false if value is not an array', () => {
    expect(isArray('abc')).toBe(false);
    expect(isArray(() => {})).toBe(false);
  });

  it('can be used with TypeScript as a type predicate', () => {
    const arr1 = ['abc', () => {}, [1, 2, 3]];
    const result1 = arr1.filter(isArray);
    expect(result1).toStrictEqual([[1, 2, 3]]);
    expectTypeOf(result1).toEqualTypeOf<any[][]>();

    const arr2 = ['abc', () => {}, [1, 2, 3] as const];
    const result2 = arr2.filter(isArray);
    expect(result2).toStrictEqual([[1, 2, 3]]);
  });

  it('should return `true` for arrays', () => {
    expect(isArray([1, 2, 3])).toBe(true);
  });

  it('should return `false` for non-arrays', () => {
    const expected = falsey.map(() => false);

    const actual = falsey.map((value, index) => (index ? isArray(value) : isArray()));

    expect(actual).toEqual(expected);

    expect(isArray(args)).toBe(false);
    expect(isArray(true)).toBe(false);
    expect(isArray(new Date())).toBe(false);
    expect(isArray(new Error())).toBe(false);
    expect(isArray(Array.prototype.slice)).toBe(false);
    expect(isArray({ 0: 1, length: 1 })).toBe(false);
    expect(isArray(1)).toBe(false);
    expect(isArray(/x/)).toBe(false);
    expect(isArray('a')).toBe(false);
    expect(isArray(Symbol('a'))).toBe(false);
  });
});
