import { describe, expect, it } from 'vitest';
import { last } from '../index';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/last.spec.js#L1
 */
describe('last', () => {
  const array = [1, 2, 3, 4];

  it('should return the last element', () => {
    expect(last(array)).toBe(4);
  });

  it('should return `undefined` when querying empty arrays', () => {
    const array: number[] = [];
    array['-1'] = 1;

    expect(last([])).toBe(undefined);
  });

  it('should work as an iteratee for methods like `map`', () => {
    const array = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const actual = array.map(last);

    expect(actual).toEqual([3, 6, 9]);
  });
});
