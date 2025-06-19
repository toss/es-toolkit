import { describe, expect, it, expectTypeOf } from 'vitest';
import type { xorWith as xorWithLodash } from 'lodash';
import { xorWith } from './xorWith';
import { isEqual } from '../../predicate';
import { args } from '../_internal/args';

/**
 * @see https://github.com/lodash/lodash/blob/v5-wip/test/xor-methods.spec.js
 * @see https://github.com/lodash/lodash/blob/v5-wip/test/xorWith.spec.js
 */
describe('xorWith', () => {
  it(`should return the symmetric difference of two arrays`, () => {
    const actual = xorWith([2, 1], [2, 3]);
    expect(actual).toEqual([1, 3]);
  });

  it(`should return the symmetric difference of multiple arrays`, () => {
    let actual = xorWith([2, 1], [2, 3], [3, 4]);
    expect(actual).toEqual([1, 4]);

    actual = xorWith([1, 2], [2, 1], [1, 2]);
    expect(actual).toEqual([]);
  });

  it(`should return an empty array when comparing the same array`, () => {
    const array = [1];
    const actual = xorWith(array, array, array);

    expect(actual).toEqual([]);
  });

  it(`should return an array of unique values`, () => {
    let actual = xorWith([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]);
    expect(actual).toEqual([1, 4]);

    actual = xorWith([1, 1]);
    expect(actual).toEqual([1]);
  });

  it(`should return a new array when a single array is given`, () => {
    const array = [1];
    expect(xorWith(array)).not.toBe(array);
  });

  it(`should ignore individual secondary arguments`, () => {
    const array = [0];
    expect(xorWith(array, 3 as any, null, { 0: 1 } as any)).toEqual(array);
  });

  it(`should ignore values that are not arrays or \`arguments\` objects`, () => {
    const array = [1, 2];
    expect(xorWith(array, 3 as any, { 0: 1 } as any, null)).toEqual(array);
    expect(xorWith(null, array, null, [2, 3])).toEqual([1, 3]);
    expect(xorWith(array, null, args, null)).toEqual([3]);
  });

  it('should work with a `comparator`', () => {
    const objects = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ];
    const others = [
      { x: 1, y: 1 },
      { x: 1, y: 2 },
    ];
    const actual = xorWith(objects, others, isEqual);

    expect(actual).toEqual([objects[1], others[0]]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(xorWith).toEqualTypeOf<typeof xorWithLodash>();
  });
});
