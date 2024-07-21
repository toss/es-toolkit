import { describe, expect, it } from 'vitest';
import { takeRight } from '../index';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/takeRight.spec.js#L1
 */
describe('takeRight', () => {
  const array = [1, 2, 3];

  it('should take the last two elements', () => {
    expect(takeRight(array, 2)).toEqual([2, 3]);
  });

  it('should return an empty array when `n` < `1`', () => {
    [0, -1, -Infinity].forEach(n => {
      expect(takeRight(array, n)).toEqual([]);
    });
  });

  it('should return all elements when `n` >= `length`', () => {
    [3, 4, 2 ** 32, Infinity].forEach(n => {
      expect(takeRight(array, n)).toEqual(array);
    });
  });

  it('should work as an iteratee for methods like `map`', () => {
    const array = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const actual = array.map(item => takeRight(item));
    expect(actual).toEqual([[3], [6], [9]]);
  });
});
