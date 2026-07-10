import { describe, expect, it } from 'vitest';
import { slice } from './slice';
import { args } from '../_internal/args';
import { falsey } from '../_internal/falsey';

describe('slice', () => {
  const array = [1, 2, 3];

  it('should use a default `start` of `0` and a default `end` of `length`', () => {
    const actual = slice(array);
    expect(actual).toEqual(array);
    expect(actual).not.toBe(array);
  });

  it('should work with a positive `start`', () => {
    expect(slice(array, 1)).toEqual([2, 3]);
    expect(slice(array, 1, 3)).toEqual([2, 3]);
  });

  it('should work with a `start` >= `length`', () => {
    [3, 4, 2 ** 32, Infinity].forEach(start => {
      expect(slice(array, start)).toEqual([]);
    });
  });

  it('should treat falsey `start` values as `0`', () => {
    const expected = falsey.map(() => array);

    const actual = falsey.map(start => slice(array, start as any));

    expect(actual).toEqual(expected);
  });

  it('should work with a negative `start`', () => {
    expect(slice(array, -1)).toEqual([3]);
  });

  it('should work with a negative `start` <= negative `length`', () => {
    [-3, -4, -Infinity].forEach(start => {
      expect(slice(array, start)).toEqual(array);
    });
  });

  it('should work with `start` >= `end`', () => {
    [2, 3].forEach(start => {
      expect(slice(array, start, 2)).toEqual([]);
    });
  });

  it('should work with a positive `end`', () => {
    expect(slice(array, 0, 1)).toEqual([1]);
  });

  it('should work with a `end` >= `length`', () => {
    [3, 4, 2 ** 32, Infinity].forEach(end => {
      expect(slice(array, 0, end)).toEqual(array);
    });
  });

  it('should treat falsey `end` values, except `undefined`, as `0`', () => {
    const expected = falsey.map(value => (value === undefined ? array : []));

    const actual = falsey.map((end, index) => (index ? slice(array, 0, end as any) : slice(array, 0)));

    expect(actual).toEqual(expected);
  });

  it('should work with a negative `end`', () => {
    expect(slice(array, 0, -1)).toEqual([1, 2]);
  });

  it('should work with a negative `end` <= negative `length`', () => {
    [-3, -4, -Infinity].forEach(end => {
      expect(slice(array, 0, end)).toEqual([]);
    });
  });

  it('should coerce `start` and `end` to integers', () => {
    const positions = [[0.1, 1.6], ['0', 1], [0, '1'], ['1'], [NaN, 1], [1, NaN]];

    const actual = positions.map(pos => slice(array, ...(pos as any)));

    expect(actual).toEqual([[1], [1], [1], [2, 3], [1], []]);
  });

  it('should work as an iteratee for methods like `_.map`', () => {
    const array = [[1], [2, 3]];
    const actual = array.map(slice as any);

    expect(actual).toEqual(array);
    expect(actual).not.toBe(array);
  });

  it('should not return dense arrays', () => {
    const emptyArray = new Array(3);
    emptyArray[1] = 2;
    const actual = slice(emptyArray);
    expect('2' in actual).toBe(true);
  });

  it('should return an empty array when provided `null` or `undefined`', () => {
    expect(slice(null as any)).toEqual([]);
    expect(slice(undefined as any)).toEqual([]);
  });

  it('should support array-like', () => {
    expect(slice({ 0: 1, 1: 2, 2: 3, length: 3 })).toEqual([1, 2, 3]);
    expect(slice('123')).toEqual(['1', '2', '3']);
    expect(slice(args)).toEqual([1, 2, 3]);
  });
});
