import { describe, expect, it } from 'vitest';
import { minBy } from './minBy';

describe('minBy', () => {
  it('should work with Date objects', () => {
    const curr = new Date();
    const past = new Date(0);

    expect(minBy([curr, past], date => date.getTime())).toBe(past);
  });

  it('should work with extremely large arrays', () => {
    const array = Array.from({ length: 5e5 }, (_, i) => i);
    expect(minBy(array, x => x)).toBe(0);
  });

  it('should work when chaining on an array with only one value', () => {
    const array = [40];
    expect(minBy(array, x => x)).toBe(40);
  });

  const array = [1, 2, 3];

  it('should work with an `iteratee`', () => {
    const actual = minBy(array, n => -n);
    expect(actual).toBe(3);
  });

  it('should work with `_.property` shorthands', () => {
    const objects = [{ a: 2 }, { a: 3 }, { a: 1 }];
    expect(minBy(objects, 'a')).toEqual(objects[2]);

    const arrays = [[2], [3], [1]];
    expect(minBy(arrays, 0)).toEqual(arrays[2]);
  });

  it('should work when `iteratee` returns +/-Infinity', () => {
    const value = -Infinity;
    const object = { a: value };

    const actual = minBy([object, { a: value }], obj => obj.a);
    expect(actual).toBe(object);
  });

  it('should handle null and undefined values', () => {
    expect(minBy(null)).toBe(undefined);
    expect(minBy(undefined)).toBe(undefined);
  });

  it('should work without iteratee parameter (default to identity)', () => {
    const numbers = [3, 1, 2];

    expect(minBy(numbers)).toBe(1);
  });

  it('should work with string values returned by iteratee', () => {
    const items = [{ v: 'b' }, { v: 'a' }];
    const result = minBy(items, item => item.v);
    expect(result).toEqual({ v: 'a' });
  });

  it('should skip NaN values, matching lodash', () => {
    expect(minBy([NaN, 3, 1, 2], x => x)).toBe(1);
    expect(minBy([3, NaN, 1, 2], x => x)).toBe(1);
  });

  it('should return undefined when every value is NaN', () => {
    expect(minBy([NaN, NaN], x => x)).toBeUndefined();
  });

  it('should skip symbol values', () => {
    const sym = Symbol('a');
    expect(minBy([sym, 3, 1, 2], x => x)).toBe(1);
    expect(minBy([3, sym, 1, 2], x => x)).toBe(1);
  });

  it('should return undefined when every value is a symbol', () => {
    expect(minBy([Symbol('a'), Symbol('b')], x => x)).toBeUndefined();
  });

  it('should skip null and undefined values, matching lodash', () => {
    // Positive values so `null` (coerced to 0) would wrongly win as the min on the old code.
    expect(minBy([{ a: undefined }, { a: 5 }, { a: null }], 'a')).toEqual({ a: 5 });
    expect(minBy([5, undefined, 3, null], x => x)).toBe(3);
  });

  it('should return undefined when the iteratee yields no comparable value', () => {
    // A missing key makes the iteratee return `undefined` for every element.
    expect(minBy([{ a: 1 }, { a: 2 }], 'b')).toBeUndefined();
    expect(minBy([{ a: undefined }, { a: undefined }], 'a')).toBeUndefined();
    expect(minBy([{ a: null }, { a: null }], 'a')).toBeUndefined();
  });
});
