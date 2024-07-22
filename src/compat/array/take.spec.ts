import { describe, expect, it } from 'vitest';
import { take } from './take.ts';

describe('take', () => {
  const array = [1, 2, 3];

  it('should take the first two elements', () => {
    expect(take(array, 2)).toEqual([1, 2]);
  });

  it('should return an empty array when `n` < `1`', () => {
    [0, -1, -Infinity].forEach(n => {
      expect(take(array, n)).toEqual([]);
    });
  });

  it('should return all elements when `n` >= `length`', () => {
    [3, 4, 2 ** 32, Infinity].forEach(n => {
      expect(take(array, n)).toEqual(array);
    });
  });
});
