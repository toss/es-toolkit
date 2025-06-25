import { describe, expect, expectTypeOf, it } from 'vitest';
import type { intersectionBy as intersectionByLodash } from 'lodash';
import { intersection } from './intersection';
import { intersectionBy } from './intersectionBy';
import { range } from '../../math';
import { args } from '../_internal/args';
import { LARGE_ARRAY_SIZE } from '../_internal/LARGE_ARRAY_SIZE';
import { slice } from '../_internal/slice';
import { stubNaN } from '../_internal/stubNaN';
import { constant } from '../util/constant';
import { times } from '../util/times';
import { toString } from '../util/toString';

describe('intersectionBy', () => {
  /**
   * @see https://github.com/lodash/lodash/blob/afcd5bc1e8801867c31a17566e0e0edebb083d0e/test/intersection-methods.spec.js#L1
   */
  it('should return the intersection of two arrays', () => {
    const actual = intersection([2, 1], [2, 3]);
    expect(actual).toEqual([2]);
  });

  it('should return the intersection of multiple arrays', () => {
    const actual = intersection([2, 1, 2, 3], [3, 4], [3, 2]);
    expect(actual).toEqual([3]);
  });

  it('should return an array of unique values', () => {
    const actual = intersection([1, 1, 3, 2, 2], [5, 2, 2, 1, 4], [2, 1, 1]);
    expect(actual).toEqual([1, 2]);
  });

  it('should work with a single array', () => {
    const actual = intersection([1, 1, 3, 2, 2]);
    expect(actual).toEqual([1, 3, 2]);
  });

  it('should work with `arguments` objects', () => {
    const array = [0, 1, null, 3];
    const expected = [1, 3];

    expect(intersection(array, args)).toEqual(expected);
    expect(intersection(args, array)).toEqual(expected);
  });

  it('should treat `-0` as `0`', () => {
    const values = [-0, 0];
    const expected = values.map(constant(['0']));

    const actual = values.map(value => intersection(values, [value]).map(toString));

    expect(actual).toEqual(expected);
  });

  it('should match `NaN`', () => {
    const actual = intersection([1, NaN, 3], [NaN, 5, NaN]);
    expect(actual).toEqual([NaN]);
  });

  it('should work with large arrays of `-0` as `0`', () => {
    const values = [-0, 0];
    const expected = values.map(constant(['0']));

    const actual = values.map(value => {
      const largeArray = times(LARGE_ARRAY_SIZE, constant(value));
      return intersection(values, largeArray).map(toString);
    });

    expect(actual).toEqual(expected);
  });

  it('should work with large arrays of `NaN`', () => {
    const largeArray = times(LARGE_ARRAY_SIZE, stubNaN);
    expect(intersection([1, NaN, 3], largeArray)).toEqual([NaN]);
  });

  it('should work with large arrays of objects', () => {
    const object = {};
    const largeArray = times(LARGE_ARRAY_SIZE, constant(object));

    expect(intersection([object], largeArray)).toEqual([object]);
    expect(intersection(range(LARGE_ARRAY_SIZE), [1])).toEqual([1]);
  });

  it('should treat values that are not arrays or `arguments` objects as empty', () => {
    const array = [0, 1, null, 3];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(intersection(array, 3, { 0: 1 }, null)).toEqual([]);
    expect(intersection(null, array, null, [2, 3])).toEqual([]);
    expect(intersection(array, null, args, null)).toEqual([]);
  });

  /**
   * @see https://github.com/lodash/lodash/blob/afcd5bc1e8801867c31a17566e0e0edebb083d0e/test/intersectionBy.spec.js#L1
   */
  it('should accept an `iteratee`', () => {
    const actual1 = intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
    expect(actual1).toEqual([2.1]);

    const actual2 = intersectionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x');
    expect(actual2).toEqual([{ x: 1 }]);

    const actual3 = intersectionBy([2.1, 1.2], [2.3, 3.4], [1.2, 2.4], Math.floor);
    expect(actual3).toEqual([2.1]);

    const actual4 = intersectionBy([1], [1], [1], [1], [1], [1], [1]);
    expect(actual4).toEqual([1]);
  });

  it('should provide correct `iteratee` arguments', () => {
    let args: number[] | undefined;

    intersectionBy([2.1, 1.2], [2.3, 3.4], function () {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions, prefer-rest-params
      args || (args = slice.call(arguments));
    });

    expect(args).toEqual([2.3]);
  });

  it('should return empty array if no arrays provided', () => {
    expect(intersectionBy(null)).toEqual([]);
    expect(intersectionBy(undefined)).toEqual([]);
  });

  it('should return as it is if only one array provided', () => {
    expect(intersectionBy([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('should return empty array if non array-like object is provided in the middle', () => {
    expect(intersectionBy([1, 2, 3], '123', [1, 2])).toEqual([]);
  });

  it('should support array-like object', () => {
    expect(intersectionBy({ 0: 'a', 1: 'b', 2: 'c', length: 3 }, { 0: 'b', 1: 'c', length: 2 })).toEqual(['b', 'c']);
    expect(intersectionBy({ 0: 1.1, 1: 2.2, 2: 3.3, length: 3 }, { 0: 1.7, 1: 2.7, length: 2 }, Math.floor)).toEqual([
      1.1, 2.2,
    ]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(intersectionBy).toEqualTypeOf<typeof intersectionByLodash>();
  });
});
