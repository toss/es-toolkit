import { describe, expect, it } from 'vitest';
import { initial } from '../index';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/initial.spec.js#L1
 */
describe('initial', () => {
  const array = [1, 2, 3];

  it('should exclude last element', () => {
    expect(initial(array)).toEqual([1, 2]);
  });

  it('should return an empty when querying empty arrays', () => {
    expect(initial([])).toEqual([]);
  });

  it('should work as an iteratee for methods like `_.map`', () => {
    const array = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const actual = array.map(initial);

    expect(actual).toEqual([
      [1, 2],
      [4, 5],
      [7, 8],
    ]);
  });
});
