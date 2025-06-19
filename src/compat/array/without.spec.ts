import { describe, expect, it, expectTypeOf } from 'vitest';
import type { without as withoutLodash } from 'lodash';
import { without } from './without';
import { args } from '../_internal/args';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/without.spec.js#L1
 */
describe('without', () => {
  it('should return the difference of values', () => {
    const actual = without([2, 1, 2, 3], 1, 2);
    expect(actual).toEqual([3]);
  });

  it('should use strict equality to determine the values to reject', () => {
    const object1 = { a: 1 };
    const object2 = { b: 2 };
    const array = [object1, object2];

    expect(without(array, { a: 1 })).toEqual(array);
    expect(without(array, object1)).toEqual([object2]);
  });

  it('should remove all occurrences of each value from an array', () => {
    const array = [1, 2, 3, 1, 2, 3];
    expect(without(array, 1, 2)).toEqual([3, 3]);
  });

  it('should return an empty array when the collection is null or undefined', () => {
    expect(without(null, 1, 2)).toEqual([]);
  });

  it('should return an empty array when the collection is not array-like', () => {
    // @ts-expect-error - invalid argument
    expect(without(1, 2)).toEqual([]);
    // @ts-expect-error - invalid argument
    expect(without(true, 2)).toEqual([]);
  });

  it('should support array-like object', () => {
    expect(without({ 0: 1, 1: 2, 2: 3, length: 3 }, 1, 2)).toEqual([3]);
    expect(without('123', '1', '2')).toEqual([]);
    expect(without(args, 1, 2)).toEqual([3]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(without).toEqualTypeOf<typeof withoutLodash>();
  });
});
