import { describe, expect, it } from 'vitest';
import { difference } from './difference';
import { range } from '../../math/range';
import { LARGE_ARRAY_SIZE } from '../_internal/LARGE_ARRAY_SIZE';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/difference-methods.spec.js#L1
 */
describe('difference', () => {
  it(`should return the difference of two arrays`, () => {
    const actual = difference([2, 1], [2, 3]);
    expect(actual).toEqual([1]);
  });

  it(`should return the difference of multiple arrays`, () => {
    const actual = difference([2, 1, 2, 3], [3, 4], [3, 2]);
    expect(actual).toEqual([1]);
  });

  it(`should treat \`-0\` as \`0\``, () => {
    const array = [-0, 0];

    const actual = array.map(value => difference(array, [value]));

    expect(actual).toEqual([[], []]);

    expect(difference([-0, 1], [1])).toEqual([-0]);
  });

  it(`should match \`NaN\``, () => {
    expect(difference([1, NaN, 3], [NaN, 5, NaN])).toEqual([1, 3]);
  });

  it(`should work with large arrays`, () => {
    const array1: unknown[] = range(LARGE_ARRAY_SIZE + 1);
    const array2: unknown[] = range(LARGE_ARRAY_SIZE);

    const a = {};
    const b = {};
    const c = {};

    array1.push(a, b, c);
    array2.push(b, c, a);

    expect(difference(array1, array2)).toEqual([LARGE_ARRAY_SIZE]);
  });

  it(`should work with large arrays of \`-0\` as \`0\``, () => {
    const array = [-0, 0];

    const actual = array.map(value => {
      const largeArray = Array.from({ length: LARGE_ARRAY_SIZE }).map(() => value);

      return difference(array, largeArray);
    });

    expect(actual).toEqual([[], []]);

    const largeArray = Array.from({ length: LARGE_ARRAY_SIZE }).map(() => 1);
    expect(difference([-0, 1], largeArray)).toEqual([-0]);
  });

  it(`should work with large arrays of \`NaN\``, () => {
    const largeArray = Array.from({ length: LARGE_ARRAY_SIZE }).map(() => NaN);
    expect(difference([1, NaN, 3], largeArray)).toEqual([1, 3]);
  });

  it(`should work with large arrays of objects`, () => {
    const object1 = {};
    const object2 = {};
    const largeArray = Array.from({ length: LARGE_ARRAY_SIZE }).map(() => ({}));

    expect(difference([object1, object2], largeArray)).toEqual([object1, object2]);
  });
});
