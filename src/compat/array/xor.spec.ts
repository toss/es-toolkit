import { describe, expect, it, expectTypeOf } from 'vitest';
import type { xor as xorLodash } from 'lodash';
import { xor } from './xor';
import { args } from '../_internal/args';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/xor-methods.spec.js
 */
describe('xor', () => {
  it(`should return the symmetric difference of two arrays`, () => {
    const actual = xor([2, 1], [2, 3]);
    expect(actual).toEqual([1, 3]);
  });

  it(`should return the symmetric difference of multiple arrays`, () => {
    let actual = xor([2, 1], [2, 3], [3, 4]);
    expect(actual).toEqual([1, 4]);

    actual = xor([1, 2], [2, 1], [1, 2]);
    expect(actual).toEqual([]);
  });

  it(`should return an empty array when comparing the same array`, () => {
    const array = [1];
    const actual = xor(array, array, array);

    expect(actual).toEqual([]);
  });

  it(`should return an array of unique values`, () => {
    let actual = xor([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]);
    expect(actual).toEqual([1, 4]);

    actual = xor([1, 1]);
    expect(actual).toEqual([1]);
  });

  it(`should return a new array when a single array is given`, () => {
    const array = [1];
    expect(xor(array)).not.toBe(array);
  });

  it(`should ignore individual secondary arguments`, () => {
    const array = [0];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(xor(array, 3, null, { 0: 1 })).toEqual(array);
  });

  it(`should ignore values that are not arrays or \`arguments\` objects`, () => {
    const array = [1, 2];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(xor(array, 3, { 0: 1 }, null)).toEqual(array);
    expect(xor(null, array, null, [2, 3])).toEqual([1, 3]);
    expect(xor(array, null, args, null)).toEqual([3]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(xor).toEqualTypeOf<typeof xorLodash>();
  });
});
