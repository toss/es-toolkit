import { describe, expect, expectTypeOf, it } from 'vitest';
import type { intersection as intersectionLodash } from 'lodash';
import { intersection } from './intersection';
import { range } from '../../math';
import { args } from '../_internal/args';
import { LARGE_ARRAY_SIZE } from '../_internal/LARGE_ARRAY_SIZE';
import { stubNaN } from '../_internal/stubNaN';
import { constant } from '../util/constant';
import { times } from '../util/times';
import { toString } from '../util/toString';

/**
 * @see https://github.com/lodash/lodash/blob/afcd5bc1e8801867c31a17566e0e0edebb083d0e/test/intersection-methods.spec.js#L1
 */
describe('intersection', () => {
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

  it('should return an empty array when there are no arguments', () => {
    expect(intersection()).toEqual([]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(intersection).toEqualTypeOf<typeof intersectionLodash>();
  });
});
