import { describe, expect, it } from 'vitest';
import { differenceWith } from './differenceWith';
import { range } from '../../math';
import { isEqual } from '../../predicate';
import { args } from '../_internal/args';
import { LARGE_ARRAY_SIZE } from '../_internal/LARGE_ARRAY_SIZE';
import { stubNaN } from '../_internal/stubNaN';
import { stubOne } from '../_internal/stubOne';
import { constant } from '../util/constant';
import { eq } from '../util/eq';
import { times } from '../util/times';
import { toString } from '../util/toString';

describe('differenceWith', () => {
  /**
   * @see https://github.com/lodash/lodash/blob/afcd5bc1e8801867c31a17566e0e0edebb083d0e/test/difference-methods.spec.js#L1
   */
  it(`should return the difference of two arrays`, () => {
    const actual = differenceWith([2, 1], [2, 3]);
    expect(actual).toEqual([1]);
  });

  it(`should return the difference of multiple arrays`, () => {
    const actual = differenceWith([2, 1, 2, 3], [3, 4], [3, 2]);
    expect(actual).toEqual([1]);
  });

  it(`should treat \`-0\` as \`0\``, () => {
    const array = [-0, 0];

    const actual = array.map(value => differenceWith(array, [value]));

    expect(actual).toEqual([[], []]);

    expect(differenceWith([-0, 1], [1])).toEqual([-0]);
  });

  it(`should match \`NaN\``, () => {
    expect(differenceWith([1, NaN, 3], [NaN, 5, NaN])).toEqual([1, 3]);
  });

  it(`should work with large arrays`, () => {
    const array1: unknown[] = range(LARGE_ARRAY_SIZE + 1);
    const array2: unknown[] = range(LARGE_ARRAY_SIZE);
    const a = {};
    const b = {};
    const c = {};

    array1.push(a, b, c);
    array2.push(b, c, a);

    expect(differenceWith(array1, array2)).toEqual([LARGE_ARRAY_SIZE]);
  });

  it(`should work with large arrays of \`-0\` as \`0\``, () => {
    const array = [-0, 0];

    const actual = array.map(value => {
      const largeArray = times(LARGE_ARRAY_SIZE, constant(value));

      return differenceWith(array, largeArray);
    });

    expect(actual).toEqual([[], []]);

    const largeArray = times(LARGE_ARRAY_SIZE, stubOne);
    expect(differenceWith([-0, 1], largeArray)).toEqual([-0]);
  });

  it(`should work with large arrays of \`NaN\``, () => {
    const largeArray = times(LARGE_ARRAY_SIZE, stubNaN);
    expect(differenceWith([1, NaN, 3], largeArray)).toEqual([1, 3]);
  });

  it(`should work with large arrays of objects`, () => {
    const object1 = {};
    const object2 = {};
    const largeArray = times(LARGE_ARRAY_SIZE, constant(object1));

    expect(differenceWith([object1, object2], largeArray)).toEqual([object2]);
  });

  it(`should ignore values that are not array-like`, () => {
    const array = [1, null, 3];

    // @ts-expect-error
    expect(differenceWith(args, 3, { 0: 1 })).toEqual([1, 2, 3]);
    // @ts-expect-error
    expect(differenceWith(null, array, 1)).toEqual([]);
    // @ts-expect-error
    expect(differenceWith(array, args, null)).toEqual([null]);
  });

  /**
   * @see https://github.com/lodash/lodash/blob/afcd5bc1e8801867c31a17566e0e0edebb083d0e/test/differenceWith.spec.js#L1
   */

  it('should work with a `comparator`', () => {
    const objects = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ];
    const actual = differenceWith(objects, [{ x: 1, y: 2 }], isEqual);

    expect(actual).toEqual([objects[1]]);
  });

  it('should preserve the sign of `0`', () => {
    const array = [-0, 1];
    const largeArray = times(LARGE_ARRAY_SIZE, stubOne);
    const others = [[1], largeArray];
    const expected = others.map(constant(['-0']));

    const actual = others.map(other => differenceWith(array, other, eq).map(toString));

    expect(actual).toEqual(expected);
  });
});
