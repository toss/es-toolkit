import { describe, expect, it } from 'vitest';
import { drop } from './drop';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/drop.spec.js#L1
 */
describe('drop', () => {
  const array = [1, 2, 3];

  it('should drop the first two elements', () => {
    expect(drop(array, 2)).toEqual([3]);
  });

  it('should return all elements when `n` < `1`', () => {
    [0, -1, -Infinity].forEach(n => {
      expect(drop(array, n)).toEqual(array);
    });
  });

  it('should return an empty array when `n` >= `length`', () => {
    [3, 4, 2 ** 32, Infinity].forEach(n => {
      expect(drop(array, n)).toEqual([]);
    });
  });

  it('should coerce `n` to an integer', () => {
    expect(drop(array, 1.6)).toEqual([2, 3]);
  });

  it('should return an empty array when the collection is null or undefined', () => {
    expect(drop(null, 2)).toEqual([]);
  });
});
