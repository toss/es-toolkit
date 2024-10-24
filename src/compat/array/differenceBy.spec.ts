import { describe, expect, it } from 'vitest';
import { LARGE_ARRAY_SIZE } from '../_internal/LARGE_ARRAY_SIZE';
import { range } from '../../math/range';
import { differenceBy } from './differenceBy';
import { slice } from '../_internal/slice';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/difference-methods.spec.js#L1
 */
describe('difference', () => {
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
});

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/src/differenceBy.ts#L1
 */
describe('differenceBy', () => {
  it('should accept an `iteratee`', () => {
    const actual1 = differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
    expect(actual1).toEqual([1.2]);

    expect(differenceBy([1, 2, 3, 4, 5, 6], [1], [2], [3], [4, 5], value => value)).toEqual([6]);

    const actual2 = differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], 'x');
    expect(actual2).toEqual([{ x: 2 }]);
  });

  it('should provide correct `iteratee` arguments', () => {
    let args: number[] | undefined;

    differenceBy([2.1, 1.2], [2.3, 3.4], function () {
      args || (args = slice.call(arguments));
    });

    expect(args).toEqual([2.3]);
  });
});
