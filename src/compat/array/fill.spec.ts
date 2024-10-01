import { describe, expect, it } from 'vitest';
import { fill } from './fill.ts';
import { falsey } from '../_internal/falsey';

describe('fill', () => {
  it('should use a default `start` of `0` and a default `end` of `length`', () => {
    const array = [1, 2, 3];
    expect(fill(array, 'a')).toEqual(['a', 'a', 'a']);
  });

  it('should use `undefined` for `value` if not given', () => {
    const array = [1, 2, 3];
    const actual = fill(array);

    expect(actual).toEqual(Array(3));
    expect(actual).toEqual([undefined, undefined, undefined]);
  });

  it('should work with a positive `start`', () => {
    const array = [1, 2, 3];
    expect(fill(array, 'a', 1)).toEqual([1, 'a', 'a']);
  });

  it('should work with a `start` >= `length`', () => {
    [3, 4, 2 ** 32, Infinity].forEach(start => {
      const array = [1, 2, 3];
      expect(fill(array, 'a', start)).toEqual([1, 2, 3]);
    });
  });

  it('should treat falsey `start` values as `0`', () => {
    const expected = falsey.map(() => ['a', 'a', 'a']);
    const actual = falsey.map(start => {
      const array = [1, 2, 3];
      return fill(array, 'a', start);
    });

    expect(actual).toEqual(expected);
  });

  it('should work with a negative `start`', () => {
    const array = [1, 2, 3];
    expect(fill(array, 'a', -1)).toEqual([1, 2, 'a']);
  });

  it('should work with a negative `start` <= negative `length`', () => {
    [-3, -4, -Infinity].forEach(start => {
      const array = [1, 2, 3];
      expect(fill(array, 'a', start)).toEqual(['a', 'a', 'a']);
    });
  });

  it('should work with `start` >= `end`', () => {
    [2, 3].forEach(start => {
      const array = [1, 2, 3];
      expect(fill(array, 'a', start, 2)).toEqual([1, 2, 3]);
    });
  });

  it('should work with a positive `end`', () => {
    const array = [1, 2, 3];
    expect(fill(array, 'a', 0, 1)).toEqual(['a', 2, 3]);
  });

  it('should work with a `end` >= `length`', () => {
    [3, 4, 2 ** 32, Infinity].forEach(end => {
      const array = [1, 2, 3];
      expect(fill(array, 'a', 0, end)).toEqual(['a', 'a', 'a']);
    });
  });

  it('should treat falsey `end` values, except `undefined`, as `0`', () => {
    const expected = falsey.map(value => (value === undefined ? ['a', 'a', 'a'] : [1, 2, 3]));
    const actual = falsey.map(end => {
      const array = [1, 2, 3];
      return fill(array, 'a', 0, end);
    });

    expect(actual).toEqual(expected);
  });

  it('should work with a negative `end`', () => {
    const array = [1, 2, 3];
    expect(fill(array, 'a', 0, -1)).toEqual(['a', 'a', 3]);
  });

  it('should work with a negative `end` <= negative `length`', () => {
    [-3, -4, -Infinity].forEach(end => {
      const array = [1, 2, 3];
      expect(fill(array, 'a', 0, end)).toEqual([1, 2, 3]);
    });
  });

  it('should coerce `start` and `end` to integers', () => {
    const positions = [[0.1, 1.6], ['0', 1], [0, '1'], ['1'], [NaN, 1], [1, NaN]];
    const actual = positions.map(pos => {
      const array = [1, 2, 3];
      return fill(array, 'a', pos[0], pos[1]);
    });

    expect(actual).toEqual([
      ['a', 2, 3],
      ['a', 2, 3],
      ['a', 2, 3],
      [1, 'a', 'a'],
      ['a', 2, 3],
      [1, 2, 3],
    ]);
  });

  it('should work as an iteratee for methods like `_.map`', () => {
    const array = [
      [1, 2],
      [3, 4],
    ];
    const actual = array.map(fill);

    expect(actual).toEqual([
      [0, 0],
      [1, 1],
    ]);
  });
});
