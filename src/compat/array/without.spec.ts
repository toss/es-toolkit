import { describe, expect, it } from 'vitest';
import { without } from '../../array/without';

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
});
