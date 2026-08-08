import { describe, expect, it } from 'vitest';
import { differenceBy } from './differenceBy';
import { range } from '../../math';
import { args } from '../_internal/args';
import { LARGE_ARRAY_SIZE } from '../_internal/LARGE_ARRAY_SIZE';
import { slice } from '../_internal/slice';

describe('differenceBy', () => {
  it('should accept an `iteratee`', () => {
    let actual: any = differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
    expect(actual).toEqual([1.2]);

    actual = differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], 'x');
    expect(actual).toEqual([{ x: 2 }]);
  });

  it('should provide correct iteratee arguments', () => {
    let args: any;

    differenceBy([2.1, 1.2], [2.3, 3.4], function (...rest: any[]) {
      if (!args) {
        args = slice.call(rest);
      }
    });

    expect(args).toEqual([2.3]);
  });

  it('should calculate the difference if iteratee is not provided', () => {
    const actual = differenceBy([2, 1, 2, 3], [3, 4], [3, 2]);
    expect(actual).toEqual([1]);
  });

  /**
   * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/difference-methods.spec.js#L1
   */

  it(`should return the difference of two arrays`, () => {
    const actual = differenceBy([2, 1], [2, 3]);
    expect(actual).toEqual([1]);
  });

  it(`should return the difference of multiple arrays`, () => {
    const actual = differenceBy([2, 1, 2, 3], [3, 4], [3, 2]);
    expect(actual).toEqual([1]);
  });

  it(`should treat \`-0\` as \`0\``, () => {
    const array = [-0, 0];

    const actual = array.map(value => differenceBy(array, [value]));

    expect(actual).toEqual([[], []]);

    expect(differenceBy([-0, 1], [1])).toEqual([-0]);
  });

  it(`should match \`NaN\``, () => {
    expect(differenceBy([1, NaN, 3], [NaN, 5, NaN])).toEqual([1, 3]);
  });

  it(`should work with large arrays`, () => {
    const array1: unknown[] = range(LARGE_ARRAY_SIZE + 1);
    const array2: unknown[] = range(LARGE_ARRAY_SIZE);

    const a = {};
    const b = {};
    const c = {};

    array1.push(a, b, c);
    array2.push(b, c, a);

    expect(differenceBy(array1, array2)).toEqual([LARGE_ARRAY_SIZE]);
  });

  it(`should work with large arrays of \`-0\` as \`0\``, () => {
    const array = [-0, 0];

    const actual = array.map(value => {
      const largeArray = Array.from({ length: LARGE_ARRAY_SIZE }).map(() => value);

      return differenceBy(array, largeArray);
    });

    expect(actual).toEqual([[], []]);

    const largeArray = Array.from({ length: LARGE_ARRAY_SIZE }).map(() => 1);
    expect(differenceBy([-0, 1], largeArray)).toEqual([-0]);
  });

  it(`should work with large arrays of \`NaN\``, () => {
    const largeArray = Array.from({ length: LARGE_ARRAY_SIZE }).map(() => NaN);
    expect(differenceBy([1, NaN, 3], largeArray)).toEqual([1, 3]);
  });

  it(`should work with large arrays of objects`, () => {
    const object1 = {};
    const object2 = {};
    const largeArray = Array.from({ length: LARGE_ARRAY_SIZE }).map(() => ({}));

    expect(differenceBy([object1, object2], largeArray)).toEqual([object1, object2]);
  });

  it(`should work with \`arguments\` objects`, () => {
    const array = [0, 1, null, 3];

    expect(differenceBy(array, args)).toEqual([0, null]);
    expect(differenceBy(args, array)).toEqual([2]);
  });

  it('should work with arrayLike objects', () => {
    const array = { 0: 1, 1: 2, length: 2 };

    expect(differenceBy(array, [2, 3])).toEqual([1]);
    expect(differenceBy([1, 2, 3], array)).toEqual([3]);
    expect(differenceBy([1, 2, 3], array, value => value)).toEqual([3]);
  });

  it('should return an empty array when the first array is not array-like object', () => {
    expect(differenceBy('23', ['2', '3'])).toEqual([]);
  });

  it('should filter out values that are not arrays or array-like objects', () => {
    expect(differenceBy(['2', '3'], '2', ['3'])).toEqual(['2']);
    expect(differenceBy(['2', '3'], '2', ['3'], value => value)).toEqual(['2']);
  });
});
