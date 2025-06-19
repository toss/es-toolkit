import { describe, expect, it, expectTypeOf } from 'vitest';
import type { xorBy as xorByLodash } from 'lodash';
import { xorBy } from './xorBy';
import { args } from '../_internal/args';

/**
 * @see https://github.com/lodash/lodash/blob/v5-wip/test/xor-methods.spec.js
 * @see https://github.com/lodash/lodash/blob/v5-wip/test/xorBy.spec.js
 */
describe('xorBy', () => {
  it(`should return the symmetric difference of two arrays`, () => {
    const actual = xorBy([2, 1], [2, 3]);
    expect(actual).toEqual([1, 3]);
  });

  it(`should return the symmetric difference of multiple arrays`, () => {
    let actual = xorBy([2, 1], [2, 3], [3, 4]);
    expect(actual).toEqual([1, 4]);

    actual = xorBy([1, 2], [2, 1], [1, 2]);
    expect(actual).toEqual([]);
  });

  it(`should return an empty array when comparing the same array`, () => {
    const array = [1];
    const actual = xorBy(array, array, array);

    expect(actual).toEqual([]);
  });

  it(`should return an array of unique values`, () => {
    let actual = xorBy([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]);
    expect(actual).toEqual([1, 4]);

    actual = xorBy([1, 1]);
    expect(actual).toEqual([1]);
  });

  it(`should return a new array when a single array is given`, () => {
    const array = [1];
    expect(xorBy(array)).not.toBe(array);
  });

  it(`should ignore individual secondary arguments`, () => {
    const array = [0];
    expect(xorBy(array, 3, null, { 0: 1 } as any)).toEqual(array);
  });

  it(`should ignore values that are not arrays or \`arguments\` objects`, () => {
    const array = [1, 2];
    expect(xorBy(array, 3, { 0: 1 } as any, null)).toEqual(array);
    expect(xorBy(null, array, null, [2, 3])).toEqual([1, 3]);
    expect(xorBy(array, null, args, null)).toEqual([3]);
  });

  it('should accept an `iteratee`', () => {
    let actual: any = xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
    expect(actual).toEqual([1.2, 3.4]);

    actual = xorBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x');
    expect(actual).toEqual([{ x: 2 }]);
  });

  it('should provide correct `iteratee` arguments', () => {
    let args: any;

    xorBy([2.1, 1.2], [2.3, 3.4], function (...params) {
      if (args === undefined) {
        args = params;
      }
    });

    expect(args).not.toEqual([1.2, 3.4]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(xorBy).toEqualTypeOf<typeof xorByLodash>();
  });
});
