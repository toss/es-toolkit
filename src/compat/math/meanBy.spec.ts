import { describe, expect, it } from 'vitest';
import { meanBy } from './meanBy';
import { slice } from '../_internal/slice';

describe('meanBy', () => {
  const objects = [{ a: 2 }, { a: 3 }, { a: 1 }];

  it('should work with an `iteratee`', () => {
    const actual = meanBy(objects, object => object.a);

    expect(actual).toEqual(2);
  });

  it('should provide correct `iteratee` arguments', () => {
    let args: any;

    meanBy(objects, function () {
      // eslint-disable-next-line
      args || (args = slice.call(arguments));
    });

    expect(args).toEqual([{ a: 2 }]);
  });

  it('should work with `_.property` shorthands', () => {
    const arrays = [[2], [3], [1]];
    expect(meanBy(arrays, 0)).toBe(2);
    expect(meanBy(objects, 'a')).toBe(2);
  });

  it('should handle null and undefined values', () => {
    expect(meanBy(null)).toBe(NaN);
    expect(meanBy(undefined)).toBe(NaN);
  });

  it('should work without iteratee parameter (default to identity)', () => {
    const numbers = [1, 2, 3];

    expect(meanBy(numbers)).toBe(2);
  });

  it('should skip `undefined` values when summing, but still count them in the divisor', () => {
    expect(meanBy([{ a: 1 }, {}], 'a')).toBe(0.5);
    expect(meanBy([{ a: 1 }, { a: undefined }, { a: 3 }], 'a')).toBe(4 / 3);
    expect(meanBy([1, undefined, 2])).toBe(1);
    expect(meanBy([{ a: { b: 1 } }, {}], 'a.b')).toBe(0.5);
  });

  it('should return `NaN` when every value is `undefined`', () => {
    expect(meanBy([{}, {}], 'a')).toBe(NaN);
  });

  it('should work with array-like objects', () => {
    expect(meanBy({ 0: { a: 1 }, 1: {}, length: 2 }, 'a')).toBe(0.5);
  });
});
