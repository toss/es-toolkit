import { describe, expect, it } from 'vitest';
import { first, head } from '../index';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/head.spec.js#L1
 */
describe('head', () => {
  const array = [1, 2, 3, 4];

  it('should return the first element', () => {
    expect(head(array)).toBe(1);
  });

  it('should work as an iteratee for methods like `map`', () => {
    const array = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const actual = array.map(head);

    expect(actual).toEqual([1, 4, 7]);
  });

  it('should be aliased', () => {
    expect(first).toBe(head);
  });
});
