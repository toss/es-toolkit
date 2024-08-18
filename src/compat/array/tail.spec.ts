import { describe, expect, it } from 'vitest';
import { tail } from '../index';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/tail.spec.js#L1
 */
describe('tail', () => {
  const array = [1, 2, 3];

  it('should exclude the first element', () => {
    expect(tail(array)).toEqual([2, 3]);
  });

  it('should return an empty when querying empty arrays', () => {
    expect(tail([])).toEqual([]);
  });

  it('should work as an iteratee for methods like `map`', () => {
    const array = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const actual = array.map(tail);

    expect(actual).toEqual([
      [2, 3],
      [5, 6],
      [8, 9],
    ]);
  });
});
